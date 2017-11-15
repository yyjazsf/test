// https://www.codewars.com/kata/next-bigger-number-with-the-same-digits/train/javascript
// Next bigger number with the same digits
// http://blog.csdn.net/jiyanfeng1/article/details/41540857

// 
const getNextBigger = (arr, position) => {
  let tmpArr = arr.slice(position + 1).sort()
  for (let i = tmpArr.indexOf(arr[position]), len = tmpArr.length; i < len; i++) {
    if (tmpArr[i] > arr[position]) {
      const youGetMe = tmpArr.splice(i, 1)
      tmpArr.push(arr[position])
      tmpArr.sort()

      let ret = arr.slice(0, position)
      ret = ret.concat(youGetMe)
      ret = ret.concat(tmpArr)
      return parseInt(ret.join(''), 10)
    }
  }
}

function nextBigger(n) {
  var arr = n.toString().split('')
  if (arr.length === 1) {
    return -1
  }

  // all num 比较前面1位
  // compare 比较前面第二位 
  // loop
  var current_prev = 1
  while (current_prev < arr.length) {
    for (let i = arr.length - 1; i >= current_prev; i--) {
      console.log(`arr[${i}]:${arr[i]}    arr[i - ${current_prev}]: ${arr[i - current_prev]} `);
      if (arr[i] > arr[i - current_prev]) {
        console.log(`${n}`);
        return getNextBigger(arr, i-1)
      }
    }
    current_prev++;
  }

  return -1
}

console.log(nextBigger(12) === 21, nextBigger(12));
