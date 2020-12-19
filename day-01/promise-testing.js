const parser = async str => str.toString()

function postTag(str) {
  return parser(str)
    .then(res => {

      console.log('in postTag',res)
      return res
    })
    .catch(err => Promise.reject(err));
}

setTimeout(() => console.log('in setTimeout'), 0)

function newPostTag(str) {
  return new Promise((resolve, reject) => {

    console.log('in Promise')

    parser(str)
      .then(resolve)
      .catch(reject);
  })
}

console.log('in line')
console.log(newPostTag('sdfds'))
postTag('Good').then(console.log).catch(console.error)
