import { toast } from 'react-toastify';
import { contractAddress, abi } from './contract';
import { addressProof } from './merkleTree';

const { ethers } = require('ethers');

const contractData = async () => {
  if (window.ethereum) {
    if (window.ethereum.selectedAddress == null) {
      toast.error('Oops! your wallet is not connected!');
      return [];
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const address = accounts[0]

    return [contract, address, provider];
  } else {
    toast.error('Metamask is not installed!');
    return [];
  }
}

const totalSupply = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const count = await contract.totalSupply();
    return parseInt(count);
  }
}

export const verify = async (accounts) => {
  const proof = await addressProof(accounts);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const status = await contract.verifyWhitelist(accounts, proof);

  return status;
}

export const _claimStatus = async (accounts) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const status = await contract.checkMintStatus(accounts);
  return status;
}

export const Mint = async () => {
  const data = await contractData();

  if (data.length === 0) return;

  const contract = data[0];
  const address = data[1];
  const proof = await addressProof(address);

  let status = await verify(address);
  let claimStat = await _claimStatus(address);
  let supply = await totalSupply();

  try {
    if (!status) {
      toast.error('You are not Eligible!');
      return;
    }

    if (claimStat) {
      toast.warn('You have already claimed!');
      return;
    }

    if (supply > 786) {
      toast.error('Oops! We are out of stock.');
      return;
    }

    toast.loading('Transaction is under process...')

    const transactionResponse = await contract.whitelistMint(proof, {
      value: ethers.parseEther("0.2"),
    });

    return transactionResponse.wait(1)
      .then(() => {
        toast.dismiss();
        toast.success('Transaction Done!');
        return transactionResponse.hash;
      })
      .catch(err => {
        toast.dismiss();
        toast.error('Something goes wrong!');
        console.log(err);
        return;
      })
  } catch (error) {
    toast.dismiss();
    toast.error('Something went wrong.');
    console.log(error)
  }
}

export const supply = await totalSupply();