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
  rpc_url: "https://mainnet.infura.io/v3/f3391304ef844c24b51283e45f7a6e13",
  twitter_url: "http://tinyurl.com/k9tvefvv",
  opensea_url: "https://opensea.io/collection/nftfriendsalpha",
  opensea_view_url: (contractAddress, id) => {
    return `https://opensea.io/assets/ethereum/${contractAddress}/${id - 1}`
  },
  etherscan_view_url: (tx) => {
    return `https://etherscan.io/tx/${tx}`
  }
};