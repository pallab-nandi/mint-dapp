import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
} from "../../utils/motion";
import Image from "next/image";
import TimerLogic from "../main/TimerLogic";
import ScrollDown from "./ScrollDown";
const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-12  my-64  h-full w-full z-[20]"
    >
      <div className="md:w-1/2 flex flex-col justify-center md:items-start text-start md:text-start md:pl-8 lg:pl-16">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-[600px] w-full"
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
        <ScrollDown/>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full md:w-1/2 flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={500}
          width={500}
          className="hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
