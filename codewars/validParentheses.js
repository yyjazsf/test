/**
 * https://www.codewars.com/kata/valid-parentheses/train/javascript
 */

function validParentheses(parens) {
  //0 <= parens.length <= 100
  var need = []
  var ret = true
  // .replace(/\s/g,'')
  parens.split('').forEach((v, i) => {
    var tmp = v === '(' ? ')' : '('
    var index = need.indexOf(v)
    if (v === ')' && index === -1) {
      ret = false
    }
    if (index === -1) {
      need.push(tmp)
    } else {
      need.splice(index, 1)
    }
  });

  return ret && need.length === 0
}

console.log(validParentheses("())") == false);