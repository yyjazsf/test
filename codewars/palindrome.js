// https://www.codewars.com/kata/525f039017c7cd0e1a000a26/train/javascript

const isPalindrome = v => {
  v = v.toString()
  for (let i = 0, len = v.length-1, half = Math.floor(len / 2); i < len; i++) {
    if (v[i] !== v[len - i]) {
      return false
    }
  }
  return true
}
const palindromeChainLength = v => {
  let steps = 0
  let tmp_v = v
  while (!isPalindrome(tmp_v)) {
    steps++;
    tmp_v += parseInt(tmp_v.toString().split('').reverse().join(''), 10)
    console.log(tmp_v);
  }
  return steps
}

console.log(palindromeChainLength(87));