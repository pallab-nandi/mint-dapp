export const walletChecker = async (address) => {
  let bool = await fetch(`https://silly-rose-fish.cyclic.app/verify/${address}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(value => value.data)
    .catch(err => console.log(err));
  return bool;
}