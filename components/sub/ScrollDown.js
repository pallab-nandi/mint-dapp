import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function ScrollDown() {
  const [isVisible, setIsVisible] = useState(true);

  const handleScrollButton = () => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY < 500);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollButton);
    return () => {
      window.removeEventListener("scroll", handleScrollButton);
    };
  }, []);

  return (
    <div className="jw-full h-full flex justify-center items-center pt-10 md:pt-20">
      <button
        className={` text-white rounded-full focus:outline-none focus:shadow-outline-blue  ${
          !isVisible ? "hidden" : ""
        }`}
        onClick={scrollToBottom}
      >
        <Image
          src="/scroll-down-96.png"
          height={80}
          width={80}
          alt="work icons"
          className="hover:scale-105 pl-7"
        />
        Wallet Checker
      </button>
    </div>
  );
}
