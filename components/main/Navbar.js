import { Socials } from "../../constants";
import Image from "next/image";
import React from "react";
import WalletConnect from "../sub/WalletConnect";

const Navbar = () => {
  return (
    <div className="w-full h-[55px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="hover:scale-125"
          // className="cursor-pointer hover:animate-spin-slow"
          />

          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            NFA
          </span>
        </a>

        <div className="w-[271px] h-full flex flex-row items-center justify-between">
          <WalletConnect />
        </div>

        <div className="flex flex-row gap-5">
          {Socials.map((social, index) => (
            <a key={index} href={social.link} target="_blank">
              <Image
                src={social.src}
                alt={social.name}
                key={social.name}
                width={30}
                height={30}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;