export const addressProof = async (address) => {
  let proof = await fetch(`https://silly-rose-fish.cyclic.app/${address}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(value => value.data)
    .catch(err => console.log(err));
  return proof;
}