/**
 * 未完成
 * https://www.codewars.com/kata/5259510fc76e59579e0009d4/train/javascript
 */

function Dictionary(words) {
  this.words = words;
}

Dictionary.prototype.findMostSimilar = function (term) {
  // TODO: this is your task ;)
  let ret
  let needChange = Number.MAX_VALUE
  this.words.forEach(item => {
    if (item === term) {
      needChange = 0
      return ret = item
    }
    let tmpNeedChange = 0

    // term.indexOf?

    if (tmpNeedChange < needChange) {
      needChange = tmpNeedChange
      return ret = item
    }


  })
  return ret
}

const Test = {
  expect: (ok, msg) => {
    if (!ok) {
      console.log(msg);
    }
  }
}

function TestDictionary(spec) {

  var matcher = new Dictionary(spec.words);

  spec.expectations.forEach(function (e) {
    let ret = matcher.findMostSimilar(e.query)
    Test.expect(
      ret == e.nearest
      , `${e.query} need ${e.nearest} (but get ${ret})`
    );
  });
}

TestDictionary({
  words: ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'],
  expectations: [
    {
      query: 'strawbery',
      nearest: 'strawberry'
    },
    {
      query: 'berry',
      nearest: 'cherry'
    }
  ],
});

TestDictionary({
  words: ['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript'],
  expectations: [
    {
      query: 'heaven',
      nearest: 'java'
    },
    {
      query: 'javascript',
      nearest: 'javascript'
    }
  ],
});
