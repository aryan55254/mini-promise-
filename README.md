# `minipromise`

A lightweight JavaScript class that simulates the core behavior of a native JavaScript `Promise`. This project serves as a practical guide to understanding the fundamental mechanics of asynchronous operations in JavaScript.

---

## Key Features ⚙️

* **State Machine:** Manages the three core promise states: `pending`, `fulfilled`, and `rejected`.
* **Executor Function:** The constructor accepts an executor function which is immediately passed `resolve` and `reject` callbacks to control the promise's outcome.
* **`.then()` Method:** Provides a `.then()` method that can handle fulfillment and rejection scenarios. It correctly queues callbacks if the promise is still `pending`.
* **Callback Queues:** Utilizes `onFulfilledCallbacks` and `onRejectedCallbacks` arrays to manage the asynchronous execution of multiple callbacks attached to a promise.