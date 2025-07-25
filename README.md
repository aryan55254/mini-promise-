# `minipromise`

A lightweight JavaScript class that simulates the core behavior of a native JavaScript `Promise`, including chaining. This project serves as a practical guide to understanding the fundamental mechanics of asynchronous operations in JavaScript.

---

## Key Features ⚙️

* **State Machine:** Manages the three core promise states: `pending`, `fulfilled`, and `rejected`.
* **Executor Function:** The constructor accepts an executor function which is immediately passed `resolve` and `reject` callbacks to control the promise's outcome.
* **Chainable `.then()` Method:** Implements a `.then()` method that not only handles fulfillment and rejection but also returns a new promise. This is the key to enabling **promise chaining**, allowing for complex asynchronous sequences.
* **Callback Queues:** Utilizes `onFulfilledCallbacks` and `onRejectedCallbacks` arrays to manage the asynchronous execution of multiple callbacks attached to a promise before it settles.