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
const whiteList_phaseTwo = stageOne.concat(stageTwo);

const leaves_phaseOne = stageOne.map(x => Buffer.from(keccak256(x)).toString('hex'));
const leaves_phaseTwo = whiteList_phaseTwo.map(x => Buffer.from(keccak256(x)).toString('hex'));

const tree_phaseOne = new MerkleTree(leaves_phaseOne, keccak256, { sortPairs: true });
const tree_phaseTwo = new MerkleTree(leaves_phaseTwo, keccak256, { sortPairs: true });


export const addressProof_phaseOne = (address) => {
  const leaf = keccak256(address);
  const proof = tree_phaseOne.getHexProof(leaf);

  return proof;
}

export const addressProof_phaseTwo = (address) => {
  const leaf = keccak256(address);
  const proof = tree_phaseTwo.getHexProof(leaf);

  return proof;
}