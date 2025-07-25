//possible states of minipromise
const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
class minipromise {
  constructor(executor) {
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
        this.onFulfilledCallbacks.forEach((callback) => callback());
      }
    };

    //reject function
    const reject = (reason) => {
      if (this.state === STATE.PENDING) {
        this.state = STATE.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // Return a new promise to make it chainable.
    return new minipromise((resolve, reject) => {
      // Helper function to handle the fulfilled case.
      const handleFulfilled = () => {
        // Use setTimeout to ensure the code runs asynchronously.
        setTimeout(() => {
          try {
            // If onFulfilled isn't a function, pass the original value through.
            if (typeof onFulfilled !== "function") {
              resolve(this.value);
            } else {
              // Run the callback and get its result.
              const result = onFulfilled(this.value);
              // Resolve the new promise with that result to continue the chain.
              resolve(result);
            }
          } catch (error) {
            // If the callback throws an error, reject the new promise.
            reject(error);
          }
        }, 0);
      };

      // Helper function to handle the rejected case.
      const handleRejected = () => {
        setTimeout(() => {
          try {
            // If onRejected isn't a function, pass the rejection along.
            if (typeof onRejected !== "function") {
              reject(this.reason);
            } else {
              // Run the error handler.
              const result = onRejected(this.reason);
              // If the error handler succeeds, resolve the new promise.
              resolve(result);
            }
          } catch (error) {
            // If the error handler itself throws an error, reject the new promise.
            reject(error);
          }
        }, 0);
      };

      // Check the state of the original promise and act accordingly.
      if (this.state === STATE.FULFILLED) {
        handleFulfilled();
      } else if (this.state === STATE.REJECTED) {
        handleRejected();
      } else if (this.state === STATE.PENDING) {
        // If pending, queue the handlers to be run later when the promise settles.
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }
}
