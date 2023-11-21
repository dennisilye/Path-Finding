import { generateQueryConstructor } from "../utils/object.utils";
import GridPathFinding from "./gridPathFinding";

class GridDraw {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }

  get outCell() {
    const gridCells = Object.values(this.grid.gridCells);
    return gridCells.find((cell) => cell.isOutCell);
  }

  get inCell() {
    const gridCells = Object.values(this.grid.gridCells);
    return gridCells.find((cell) => cell.isInCell);
  }

  draw() {
    const { grid, outCell, inCell } = this;
    const gridPathFinding = new GridPathFinding({ grid, outCell, inCell });

    this.helperPath = gridPathFinding.generateHelperPath();
  }
}

export default GridDraw;
