
// dummy twofactor, response code is challenge + 1000
// challenge 234 => response 1234
function twofactor(challenge:number):number {
  return 1000 + challenge;
}

export default twofactor;
