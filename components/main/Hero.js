import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="#">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-370px] md:top-[-410px] lg:top-[-432px] xl:top-[-405px] h-full w-full  object-cover "
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      <HeroContent />
    </div>
  );
};

export default Hero;
