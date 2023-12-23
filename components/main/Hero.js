import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="#">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-425px] md:top-[-440px] lg:top-[-440px] xl:top-[-460px] h-full w-full  object-cover "
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      <HeroContent />
    </div>
  );
};

export default Hero;
