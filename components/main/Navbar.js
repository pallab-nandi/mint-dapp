import { Socials } from "../../constants";
import Image from "next/image";
import React from "react";
import WalletConnect from "../sub/WalletConnect";
import AudioPlayer from "../sub/AudioPlayer";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] px-0 md:px-20 backdrop-blur-md z-50 ">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <Link href="/" className="h-auto w-auto flex flex-row items-center">
          <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="hover:scale-125"
          />
        </Link>

        <div className=" h-full flex flex-row items-center pl-0 md:pl-12 justify-center">
          <WalletConnect />
        </div>

        <div className="flex flex-row items-center gap-4 px-[10px] md:px-[0px]">
          <AudioPlayer />
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
