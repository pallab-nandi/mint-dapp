/* export const addressProof = async (address) => {
  let proof = await fetch(`https://silly-rose-fish.cyclic.app/${address}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(value => value.data)
    .catch(err => console.log(err));
  console.log(proof);
  return proof;
} */

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const { stageOne, stageTwo } = require('./contract');
const whiteList = stageOne.concat(stageTwo);

const leaves = whiteList.map(x => Buffer.from(keccak256(x)).toString('hex'));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });


export const addressProof = (address) => {
  const leaf = keccak256(address);
  const proof = tree.getHexProof(leaf);

  return proof;
}