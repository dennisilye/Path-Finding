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
    const {
      grid,
      outCell,
      inCell,
      grid: { svgElement },
    } = this;
    const gridPathFinding = new GridPathFinding({ grid, outCell, inCell });

    this.helperPath = gridPathFinding.generateHelperPath();

    const pathElement = svgElement.querySelector("path");
    pathElement.setAttribute("d", this.buildPathD());
  }

  buildPathD() {
    const {
      outCell,
      inCell,
      grid: {
        settings: { cellSize, borderSize },
      },
    } = this;

    const [rowOut, colOut] = outCell.position.split("-");
    const [rowIn, colIn] = inCell.position.split("-");

    function generateM(startPos) {
      return startPos * cellSize - cellSize / 2 + startPos * borderSize * 2;
    }

    const m1 = generateM(parseInt(colOut) + 1);
    const m2 = generateM(parseInt(rowOut) + 1);

    let pathD = `M${m1} ${m2}`;
    const distance = cellSize + borderSize * 2;

    for (let i = 0; i < this.helperPath.length - 1; i++) {
      const [col, row] = this.helperPath[i];
      const [colNext, rowNext] = this.helperPath[i + 1];

      if (colNext < col) pathD += ` h-${distance}`;
      else if (colNext > col) pathD += ` h${distance}`;
      else if (rowNext < row) pathD += ` v-${distance}`;
      else if (rowNext > row) pathD += ` v${distance}`;
    }

    return pathD;
  }
}

export default GridDraw;
