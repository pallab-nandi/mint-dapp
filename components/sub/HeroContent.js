import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "../../utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TimerLogic from "../main/TimerLogic";
// import Timer from "./timer";
// import MintButton from "./MintButton";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center pt-20 px-20 mt-40 h-full w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center text-start">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span className="hover:scale-105">
            NFT
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Friends{" "}
            </span>
            ALPHA
          </span>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col gap-6 mt-1 text-6xl font-bold text-white max-w-[550px] w-auto h-auto"
        >
          <TimerLogic />
        </motion.div>

        {/* <motion.div
          variants={slideInFromTop}
          className="Welcome-box cursor-pointer py-[10px] px-[10px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[20px] ml-2 mr-5 hover:scale-105">
            Lorem, ipsum dolor sit amet consectetur. Libero!
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col gap-6 mt-1 text-6xl font-bold text-white max-w-[550px] w-auto h-auto"
        >
          <Timer />
        </motion.div>
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="cursor-pointer"
        >
          <MintButton />
        </motion.div> */}
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center "
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={600}
          width={600}
          // className="hover:animate-spin-slow "
          className="hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
