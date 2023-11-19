import { generateQueryConstructor } from "../utils/object.utils";

class Grid {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }

  build() {}
  draw() {}
}

export default Grid;
