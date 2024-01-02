import React, { useCallback, useEffect, useState } from "react";
import TimerUI from "../sub/TimerUI";

const TimerLogic = () => {
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
      date: new Date("2023-01-15T16:10:20"),
    },
    {
      name: "Stage 1",
      date: new Date("2023-01-15T11:59:59"),
    },
    {
      name: "Stage 2",
      date: new Date("2024-01-05T23:59:59"),
    },
  ];

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
    <div>
      {isCountdownCompleted && (
        <button
          onClick={redirectToOpenSea}
        >
          <h1 className="Welcome-text text-[30px] mx-20 py-[110px] md:text-[25px] md:mx-0 md:pt-[50px] md:pb-[10px] hover:scale-105">
            View On opensea!
          </h1>
        </button>
      )}

      <TimerUI
        countDownTime={countDownTime}
        isMintButtonVisible={isMintButtonVisible}
        timerName={timers[currentTimer].name}
        isVisible={new Date() < timers[currentTimer].date}
        redirectToOpenSea={redirectToOpenSea}
      />
    </div>
  );
};

export default TimerLogic;
