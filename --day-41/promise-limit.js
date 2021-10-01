// 參考資料 : https://github.com/featurist/promise-limit
// [面試] 考驗你對 Promise 的熟度之進階應用題 , 參考資料 : https://medium.com/starbugs/%E9%9D%A2%E8%A9%A6-%E8%80%83%E9%A9%97%E4%BD%A0%E5%B0%8D-promise-%E7%9A%84%E7%86%9F%E5%BA%A6%E4%B9%8B%E9%80%B2%E9%9A%8E%E6%87%89%E7%94%A8%E9%A1%8C-6eda0dd0d767

const promiseLimit = (promises, concurrent = 3) => {

  const donePromises = [];
  const runningPromises = [];
  const pendingPromises = promises;

  // promise 跑完
  const run = (isDone = false) => {

    if (isDone) {
      donePromises.push(runningPromises.shift())
    }

    while (pendingPromises.length > 0) {

      // 如果正在跑的 promise 跟 concurrent 數量相同 , 不跑
      if (runningPromises.length === concurrent) break;

      // 將第一個取出
      const promise = pendingPromises.shift()
      runningPromises.push(promise)
      promise()
        .then(result => {
          console.log(result)
          run(true)
        })
        .catch(console.error)
    }
  }

  run()
}

const wait = (second, value) => {

  return () => new Promise((resolve, reject) => {

    console.log(`value=${value} , Promise is runned`)

    if (!second) reject('必須傳入等待秒數( second )')
    else if (!value) reject('必須傳入回傳數值( value )')
    else setTimeout(() => resolve(value), second * 1000)
  })
}

const promises = [
  wait(1, 1),
  wait(4, 2),
  wait(3, 3),
  wait(2, 4),
  wait(1, 5),
  wait(5, 6),
  wait(9, 7),
  wait(4, 8),
  wait(2, 9),
]

promiseLimit(promises,3)
