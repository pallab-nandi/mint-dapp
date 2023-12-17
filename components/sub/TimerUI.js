import React from "react";
import MintButton from "./MintButton";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "../../utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

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

const TimerUI = ({
  countDownTime,
  isMintButtonVisible,
  timerName,
  isVisible,
}) => {
  return (
    <div>
      {isVisible && timerName === "Mint Start" && (
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box cursor-pointer py-[10px] px-[10px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[20px] ml-2 mr-5 hover:scale-105">
            Mint starts in!
          </h1>
        </motion.div>
      )}

      {isVisible && timerName === "Stage 1" && (
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="Welcome-box cursor-pointer py-[10px] px-[10px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[20px] ml-2 mr-5 py-[5px] hover:scale-105">
            Stage 1 count down!
          </h1>
        </motion.div>
      )}

      {isVisible && timerName === "Stage 2" && (
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="Welcome-box cursor-pointer py-[10px] px-[10px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[20px] ml-2 mr-5 py-[5px] hover:scale-105">
            Stage 2 count down!
          </h1>
        </motion.div>
      )}

      {isVisible && (
        <div className="flex justify-center gap-2 sm:gap-4 mt-5">
          <CountdownItem value={countDownTime.days} label="Days" />
          <CountdownItem value={countDownTime.hours} label="Hours" />
          <CountdownItem value={countDownTime.minutes} label="Minutes" />
          <CountdownItem value={countDownTime.seconds} label="Seconds" />
        </div>
      )}

      {isMintButtonVisible && isVisible && (
        <motion.div variants={slideInFromRight(0.8)} className="mt-5">
          <MintButton timerName={timerName}   check={timerName== "Stage 1" ? true : false}/>
        </motion.div>
      )}

    </div>
  );
};

export default TimerUI;
