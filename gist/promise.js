const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor (callback) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined

    try {
      callback(this.resolve, this.reject)
    } catch(err) {
      this.reject(err)
    }
  }
  resolve = (value) => {
    if(this.status ===  PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }

  reject = (reason) => {
    if(this.status ===  PENDING) {
      this.status = REJECTED;
      this.reason = reason;
    }
  }

  then = (onFulfilled, onRejected) =>  {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}

const promise = new Promise((resolve, reject) => {
  resolve('成功');
})
.then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)
