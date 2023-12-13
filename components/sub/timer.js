import React, { useCallback, useEffect, useState } from "react";

const CountdownItem = ({ value, label }) => (
  <div
    className="flex flex-col gap-3 relative transform-gpu hover:scale-105"
    title={`${value} ${label.toLowerCase()}`}
  >
    <div className="h-12 w-12 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex justify-between items-center bg-[#343650] rounded-lg">
      <div className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 !-left-[4px] rounded-full bg-[#191A24]"></div>
      <span className="lg:text-4xl sm:text-3xl text-xl font-semibold text-[#a5b4fc]">
        {value}
      </span>
      <div className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 -right-[4px] rounded-full bg-[#191A24]"></div>
    </div>
    <span className="text-[#8486A9] text-xs sm:text-xl text-center capitalize">
      {parseInt(value, 10) === 1 ? label.slice(0, -1) : label}
    </span>
  </div>
);

const Timer = () => {
  const [countDownTime, setCountDownTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  let intervalId;

  const getTimeDifference = (countDownTime) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownTime - currentTime;

    if (timeDifference < 0) {
      setCountDownTime({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      clearInterval(intervalId);
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
  };

  const startCountDown = useCallback(() => {
    // Custom date
    const customCountdownDate = new Date("2023-12-13T23:20:50");

    intervalId = setInterval(() => {
      getTimeDifference(customCountdownDate.getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    startCountDown();
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [startCountDown]);

  return (
    <div>
      {/* <span className="text-lg sm:text-xl font-semibold text-white text-center tracking-widest px-2">
        Act Now, Time is Short
      </span> */}
      <div className="flex justify-center gap-2 sm:gap-4">
        <CountdownItem value={countDownTime.days} label="Days" />
        <CountdownItem value={countDownTime.hours} label="Hours" />
        <CountdownItem value={countDownTime.minutes} label="Minutes" />
        <CountdownItem value={countDownTime.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default Timer;
