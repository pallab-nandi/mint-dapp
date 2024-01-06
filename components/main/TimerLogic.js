import React, { useCallback, useEffect, useState } from "react";
import TimerUI from "../sub/TimerUI";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/opensea";
import PopUp from "../sub/PopUp";

const TimerLogic = () => {
  const [totalSupply, setTotalSupply] = useState(567);
  const [popUp, setPop] = useState(false);
  const [getTx, setTx] = useState("");
  const [currentTimer, setCurrentTimer] = useState(0);
  const [countDownTime, setCountDownTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isMintButtonVisible, setIsMintButtonVisible] = useState(false);
  const [isCountdownCompleted, setIsCountdownCompleted] = useState(false);

  let intervalId;

  const timers = [
    {
      name: "Mint Start",
      date: new Date("2024-01-04T16:10:20"),
    },
    {
      name: "Stage 1",
      date: new Date("2024-01-04T11:59:59"),
    },
    {
      name: "Stage 2",
      date: new Date("2024-01-04T23:59:59"),
    },
  ];

  const handlePopUp = (bool) => {
    setPop(bool);
  };

  const handleTx = (tx) => {
    setTx(tx);
  }
  const handleVisiblePopUp = (bool) => {
    setPop(bool);
  }

  const fetchTotalSupply = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const count = await contract.totalSupply();
      return parseInt(count);
    } catch (error) {
      console.error("Error fetching total supply from smart contract:", error);
      return totalSupply;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const supply = await fetchTotalSupply();
      setTotalSupply(supply);
    }

    fetchData();
  }, []);

  const handleUpdateCount = (count) => {
    setTotalSupply(count);
  }

  const getTimeDifference = useCallback(() => {
    const currentTime = new Date().getTime();
    const timeDifference = timers[currentTimer].date - currentTime;

    if (timeDifference < 0) {
      setCountDownTime({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      clearInterval(intervalId);
      setCurrentTimer((prevTimer) => (prevTimer + 1) % timers.length);

      if (currentTimer === 0) {
        setIsMintButtonVisible(true);
      }

      if (currentTimer === timers.length - 1) {
        setIsCountdownCompleted(true);
      }
    } else {
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
        .toString()
        .padStart(2, "0");
      const hours = Math.floor(
        (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      )
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
      )
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000)
        .toString()
        .padStart(2, "0");

      setCountDownTime({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  }, [currentTimer, timers]);

  const startCountDown = useCallback(() => {
    intervalId = setInterval(() => {
      getTimeDifference();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [getTimeDifference]);

  useEffect(() => {
    startCountDown();
    return () => clearInterval(intervalId);
  }, [startCountDown]);

  const redirectToOpenSea = () => {
    window.location.href = "https://opensea.io/";
  };

  return (
    <>
    <div>
      {(isCountdownCompleted || totalSupply == 786) && (
        <div className="py-[45px] md:py-[20px]">
          <span>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500  text-[50px] md:text-[55px] mx-20 md:mx-20 md:pt-[50px] md:pb-[10px] hover:scale-105 cursor-pointer">
              Sold out!
            </h1>
          </span>
          <button
            onClick={redirectToOpenSea}
            className="button cursor-pointer mt-1 mb-3 inline-block w-full
            bg-white py-2 text-lg font-bold uppercase tracking-widest
            text-black rounded-lg hover:scale-105"
          >
            View on&nbsp;&nbsp;
            <SocialIcon
              network="opensea"
              style={{ height: 40, width: 40 }}
            />
          </button>
        </div>
      )}

      <TimerUI
        updateCount={handleUpdateCount}
        updateTx={handleTx}
        updatePop={handleVisiblePopUp}
        countDownTime={countDownTime}
        isMintButtonVisible={isMintButtonVisible}
        timerName={timers[currentTimer].name}
        isVisible={new Date() < timers[currentTimer].date && totalSupply < 786}
        redirectToOpenSea={redirectToOpenSea}
      />
    </div>
    {popUp && <PopUp tx={getTx} value={handlePopUp} id={totalSupply} />}
    </>
  );
};

export default TimerLogic;
