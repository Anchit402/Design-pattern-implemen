import { log } from "console";

type Callback = (...args: unknown[]) => void;

class Move {
  #handlers: Callback[] = [];

  subscribe(callback: Callback) {
    this.#handlers.push(callback);
  }

  unsubscribe(callback: Callback) {
    this.#handlers = this.#handlers.filter((cb) => cb !== callback);
  }

  fire(...args: unknown[]) {
    this.#handlers.forEach((cb) => cb(...args));
  }
}

// 1st observer
const moveHandler = function (item: unknown) {
  console.log("fired: " + item);
};

// 2nd observer
const moveHandler2 = function (item: unknown) {
  console.log("Moved: " + item);
};

const move = new Move();

// subscribe 1st observer
move.subscribe(moveHandler);
move.fire('event #1');

// unsubscribe 1st observer
move.unsubscribe(moveHandler);
move.fire('event #2');

// subscribe 1st & 2nd observer
move.subscribe(moveHandler);
move.subscribe(moveHandler2);

move.subscribe(() => {
  console.log("arrow function");
})


const obj = {
  name: 'anchit',
  fn: () => move.subscribe(() => {
    console.log(this);
  })
}

obj.fn()

const obj1 = {
  name: 'anchit',
  fn: function() {
    //
      move.subscribe(() => {
      console.log(this);
  })
  }
}

obj1.fn()

move.fire('event #3');