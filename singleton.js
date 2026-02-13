class Counter {

  constructor() {
    if (Counter.instance) {
      return Counter.instance;
    }
  }


  static instance = new Counter();
}

const a = new Counter();
const b = new Counter();

console.log(a.instance === b.instance); // true