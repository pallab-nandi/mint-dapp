import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../../utils/motion";
import Image from "next/image";
import TimerLogic from "../main/TimerLogic";
import ScrollDown from "./ScrollDown";
const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 md:px-12  mt-60 mb-40  lg:mt-64 lg:mb-48 h-full w-full z-[20]"
    >
      <div className="md:w-1/2 flex flex-col justify-center md:items-start text-center md:text-start md:pl-8 lg:pl-16">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="mb-6 text-6xl sm:text-6xl lg:text-6xl font-bold text-white max-w-[600px] w-full"
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
        <ScrollDown />
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full md:w-44 lg:w-1/2 flex justify-center items-center"
      >
        <Image
          src="/Asset11.png"
          alt="work icons"
          height={400}
          width={400}
          className="max-h-30 max-w-30 md:max-h-full md:max-w-full py-10 md:pb-96  lg:py-10 animate-bounce "
        />
        <Image
          src="/Asset2e.png"
          alt="work icons"
          height={270}
          width={270}
          className="max-h-50 max-w-30 md:max-h-full md:max-w-0 lg:max-w-full pb-96"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
