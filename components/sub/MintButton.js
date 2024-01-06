import React, { useEffect, useState } from "react";
import { contractAddress, abi } from "../../utils/web3/contract";
import { addressProof } from "../../utils/web3/merkleTree";
import { toast } from "react-toastify";
import { stageChecker } from "../../utils/web3/stageChecker";
import PopUp from "./PopUp";

const { ethers } = require("ethers");

export default function MintButton({ check, onTransactionComplete, setTx, setPop }) {
  // const [getTx, setTx] = useState("");
  // const [popUp, setPop] = useState(false);
  const [supplyCount, setSupplyCount] = useState(5);
  const [totalSupply, setTotalSupply] = useState(supplyCount);

  // const handlePopUp = (bool) => {
  //   setPop(bool);
  // };

  const contractData = async () => {
    if (window.ethereum) {
      try {
        if (window.ethereum.selectedAddress == null) {
          toast.dismiss();
          toast.error("Oops! your wallet is not connected!");
          return [];
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(window.ethereum.selectedAddress);
        const balanceInEth = ethers.formatEther(balance);
        console.log(balanceInEth)

        if (balanceInEth < 0.2) {
          toast.dismiss();
          toast.warning("Not enough fund for Mint!");
          return [];
        }

        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const address = accounts[0];

        return [contract, address, provider];
      } catch (error) {
        toast.dismiss();
        console.error("Error fetching contract data:", error);
        return [];
      }
    } else {
      toast.dismiss();
      toast.error("Metamask is not installed!");
      return [];
    }
  };

  const fetchTotalSupply = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const count = await contract.totalSupply();
      return parseInt(count);
    } catch (error) {
      console.error("Error fetching total supply from smart contract:", error);
      return supplyCount;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const supply = await fetchTotalSupply();
      setTotalSupply(supply);
    }

    fetchData();
  }, []);

  const verify = async (accounts) => {
    const proof = await addressProof(accounts);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const status = await contract.verifyWhitelist(accounts, proof);

    return status;
  };

  const _claimStatus = async (accounts) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const status = await contract.checkStatus(accounts);
    return status;
  };

  const stageOneMint = async () => {
    toast.loading("Initializing...");

    const data = await contractData();

    if (data.length === 0) return;

    const contract = data[0];
    const address = data[1];

    const proof = await addressProof(address);

    let status = await verify(address);
    let claimStat = await _claimStatus(address);
    let supply = await fetchTotalSupply();
    let stageVerify = await stageChecker(address);

    try {
      if (!status) {
        toast.dismiss();
        toast.error("Your wallet is not eligible!");
        return;
      }

      if (!stageVerify) {
        toast.dismiss();
        toast.error(
          "You are not eligible for Fruitlist! Wait for the next phase!"
        );
        return;
      }

      if (claimStat) {
        toast.dismiss();
        toast.warn("You have already minted!");
        return;
      }

      if (supply >= 726) {
        toast.dismiss();
        toast.error("Oops! We are out of stock.");
        return;
      }

      toast.dismiss();
      toast.loading("Transaction is under process...");

      const transactionResponse = await contract.whitelistMint(proof, {
        value: ethers.parseEther("0.2"),
      });

      await transactionResponse.wait(2);

      toast.dismiss();
      toast.success("Transaction Done!");

      const updatedSupply = await fetchTotalSupply();
      setSupplyCount((prevCount) => prevCount + 1);
      setTx(transactionResponse.hash);
      setPop(true);
      setTotalSupply(updatedSupply);
      onTransactionComplete(updatedSupply);

      return transactionResponse.hash;
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const stageTwoMint = async () => {
    toast.loading("Initializing!");

    const data = await contractData();

    if (data.length === 0) return;

    const contract = data[0];
    const address = data[1];

    const proof = await addressProof(address);

    let status = await verify(address);
    let claimStat = await _claimStatus(address);
    let supply = await fetchTotalSupply();

    try {
      if (!status) {
        toast.dismiss();
        toast.error("Your wallet is not eligible!");
        return;
      }

      if (claimStat) {
        toast.dismiss();
        toast.warn("You have already minted!");
        return;
      }

      if (supply >= 786) {
        toast.dismiss();
        toast.error("Oops! We are out of stock.");
        return;
      }

      toast.dismiss();
      toast.loading("Transaction is under process...");

      const transactionResponse = await contract.whitelistMint(proof, {
        value: ethers.parseEther("0.2"),
      });

      await transactionResponse.wait(1);

      toast.dismiss();
      toast.success("Transaction Done!");

      const updatedSupply = await fetchTotalSupply();
      setSupplyCount((prevCount) => prevCount + 1);
      setTx(transactionResponse.hash);
      setPop(true);
      setTotalSupply(updatedSupply);
      onTransactionComplete(updatedSupply);

      return transactionResponse.hash;
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center md:justify-start">
        <button
          onClick={check ? () => stageOneMint() : () => stageTwoMint()}
          className="text-gray-100 background-opacity-75 hover:bg-gray-900 border border-gray-400 focus:ring-2 focus:outline-none font-medium rounded-md text-xl px-4 py-2 flex items-center"
        >
          <svg
            className="w-4 h-4 me-2 -ms-1 text-[#626890]"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="ethereum"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
            ></path>
          </svg>
          Mint Now
        </button>
      </div>
      <span className="text-xs lg:text-xl text-white font-semibold uppercase ">
        Mint Price : 0.2 ETH &nbsp;&nbsp; Total Supply : {totalSupply}/786
      </span>
      {/* {popUp && <PopUp tx={getTx} value={handlePopUp} id={totalSupply} />} */}
    </div>
  );
}
