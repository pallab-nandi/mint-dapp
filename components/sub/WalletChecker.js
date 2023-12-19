import React, { useState } from "react";
import { toast } from "react-toastify";
import { contractAddress, abi } from "../../utils/web3/contract";
import { allowListChecker, stageChecker } from "../../utils/web3/stageChecker";
import StageOne from "../status/StageOne";
import StageTwo from "../status/StageTwo";
import Claimed from "../status/Claimed";
import Ineligible from "../status/Ineligible";

const { ethers } = require("ethers");

export default function WalletChecker() {
  const [inputValue, setInputValue] = useState("");

  const [stageOne, setStageOne] = useState(false);
  const [stageTwo, setStageTwo] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [ineligible, setIneligible] = useState(false);

  const handleSubmit = () => {
    walletCheck(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePopUp = (bool) => {
    setIneligible(bool);
    setStageOne(bool);
    setStageTwo(bool);
    setClaimed(bool);
  };

  const validateAddress = (accounts) => {
    // Ethereum address regular expression pattern
    const ethereumAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;

    // Check if the input matches the Ethereum address pattern
    const isValidAddress = ethereumAddressPattern.test(accounts);

    // Update the state to reflect the validation result
    return isValidAddress;
  };

  const _claimStatus = async (accounts) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const status = await contract.checkStatus(accounts);
    return status;
  };

  async function walletCheck(address) {
    toast.loading("Checking Initialized...");

    const validWalletAddress = validateAddress(address);

    if (!validWalletAddress) {
      toast.dismiss();
      toast.error(
        "Invalid Wallet Address! Please enter a correct wallet address."
      );
      return;
    }

    const verifyStatus = await allowListChecker(address);
    const stageStatus = await stageChecker(address);
    const claimStatus = await _claimStatus(address);

    if (!verifyStatus) {
      toast.dismiss();
      setIneligible(true);
    } else if (claimStatus) {
      toast.dismiss();
      setClaimed(true);
    } else if (stageStatus) {
      toast.dismiss();
      setStageOne(true);
    } else {
      toast.dismiss();
      setStageTwo(true);
    }
  }

  return (
    <>
      <div className="flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0x000...000"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </div>
      {stageOne && <StageOne value={handlePopUp}/>}
      {stageTwo && <StageTwo value={handlePopUp}/>}
      {claimed && <Claimed value={handlePopUp}/>}
      {ineligible && <Ineligible value={handlePopUp} />}
    </>
  );
}
