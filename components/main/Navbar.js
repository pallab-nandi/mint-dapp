import { Socials } from "../../constants";
import Image from "next/image";
import React from "react";
import WalletConnect from "../sub/WalletConnect";

const Navbar = () => {
  return (
    <div className="w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] pl-2 pr-2 backdrop-blur-md z-50 ">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="hover:scale-125"
          />

          {/* <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            NFA
          </span> */}
        </a>

        <div className=" h-full flex flex-row items-center justify-center">
          <WalletConnect />
        </div>

        <div className="flex flex-row gap-4">
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
