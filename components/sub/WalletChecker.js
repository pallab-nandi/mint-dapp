import React, { useState } from "react";
import { toast } from "react-toastify";
import { allowListChecker, stageChecker } from "../../utils/web3/stageChecker";

const { ethers } = require("ethers");

export default function WalletChecker() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    walletCheck(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const validateAddress = (accounts) => {
    // Ethereum address regular expression pattern
    const ethereumAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;

    // Check if the input matches the Ethereum address pattern
    const isValidAddress = ethereumAddressPattern.test(accounts);

    // Update the state to reflect the validation result
    return isValidAddress;
  };

  async function walletCheck(address) {
    toast.loading("Checking Initialized...");

    const validWalletAddress = validateAddress(address);

    if (!window.ethereum) {
      toast.dismiss();
      toast.error("Metamask Provider is absent!");
      return;
    }

    if (!validWalletAddress) {
      toast.dismiss();
      toast.error(
        "Invalid Wallet Address!"
      );
      return;
    }

    const verifyStatus = await allowListChecker(address);
    const stageStatus = await stageChecker(address);
    // const claimStatus = await _claimStatus(address);

    if (!verifyStatus) {
      toast.dismiss();
      // setIneligible(true);
      toast.error("Your wallet is not eligible")
    } else if (stageStatus) {
      toast.dismiss();
      toast.success("You are Fruitlisted! 🎉")
      // setStageOne(true);
    } else {
      toast.dismiss();
      toast.success("You are Friendlisted! 🎉")
      // setStageTwo(true);
    }
  }

  return (
    <>
      <div className="flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-white dark:text-white"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.5008 14.1502H16.5098M19 4.00098H6.2C5.0799 4.00098 4.51984 4.00098 4.09202 4.21896C3.71569 4.41071 3.40973 4.71667 3.21799 5.093C3 5.52082 3 6.08087 3 7.20098V16.801C3 17.9211 3 18.4811 3.21799 18.909C3.40973 19.2853 3.71569 19.5912 4.09202 19.783C4.51984 20.001 5.07989 20.001 6.2 20.001H17.8C18.9201 20.001 19.4802 20.001 19.908 19.783C20.2843 19.5912 20.5903 19.2853 20.782 18.909C21 18.4811 21 17.9211 21 16.801V11.201C21 10.0809 21 9.52082 20.782 9.093C20.5903 8.71667 20.2843 8.41071 19.908 8.21896C19.4802 8.00098 18.9201 8.00098 17.8 8.00098H7M16.9508 14.1502C16.9508 14.3987 16.7493 14.6002 16.5008 14.6002C16.2523 14.6002 16.0508 14.3987 16.0508 14.1502C16.0508 13.9017 16.2523 13.7002 16.5008 13.7002C16.7493 13.7002 16.9508 13.9017 16.9508 14.1502Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    </>
  );
}
