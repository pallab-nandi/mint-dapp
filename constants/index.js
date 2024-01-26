export const Socials = [
  {
    name: "Twitter",
    src: "/icons8-twitter.svg",
    link: "https://twitter.com/nftfriendsalpha",
  },

  {
    name: "Discord",
    src: "/discord.svg",
    link: "https://discord.com/invite/TrGWEQFY8U",
  }
];

export const utils = {
  rpc_url: "https://rpc.sepolia.org",
  twitter_url: "https://bit.ly/3Slgu7r",
  opensea_url: "https://testnets.opensea.io/collection/nftfriendsalpha-8",
  opensea_view_url: (contractAddress, id) =>{
    return `https://testnets.opensea.io/assets/sepolia/${contractAddress}/${id - 1}`
  },
  etherscan_view_url: (tx) => {
    return `https://sepolia.etherscan.io/tx/${tx}`
  }
};