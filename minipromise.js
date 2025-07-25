//possible states of minipromise
const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
class minipromise {
  constructor(executer) {
    //setting its initial properties
    console.log("contructor is running ! a new promise is being built ");
    this.state = STATE.PENDING;
    this.value = undefined;
    this.reason = undefined;
    //these handle problem on what to do when .then() is called before the promise has finished its work
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    //resolve function
    const resolve = (value) => {
      if (this.state === STATE.PENDING) {
        this.state = STATE.FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
      }
    };

    //reject function
    const reject = (reason) => {
      if (this.state === STATE.PENDING) {
        this.state = STATE.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
      }
    };
    try {
      executer(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    //if promise already fulfilled
    if (this.state === STATE.FULFILLED) {
      if (typeof onFulfilled === "function") {
        onFulfilled(this.value);
      }
    }
    //if promise already rejected
    if (this.state === STATE.REJECTED) {
      if (typeof onRejected === "function") {
        onRejected(this.reason);
      }
    }
    //if promise is still pending
    if (this.state === STATE.PENDING) {
      if (typeof onFulfilled === "function") {
        this.onFulfilledCallbacks.push(onFulfilled);
      }
      if (typeof onRejected === "function") {
        this.onRejectedCallbacks.push(onRejected);
      }
    }
  }
}
