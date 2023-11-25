import { generateQueryConstructor } from "../utils/object.utils";
import GridCell from "./gridCell";
import GridDraw from "./gridDraw";

class Grid {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }

  get gridElement() {
    return document.querySelector(this.settings.gridSelector);
  }

  get svgElement() {
    return document.querySelector(this.settings.svgSelector);
  }

  build() {
    this.#buildGridLayout();
    this.#buildGridCells();
    this.#buildGridSvg();
  }

  draw() {
    const gridDraw = new GridDraw({ grid: this });
    gridDraw.draw();
  }

  #buildGridLayout() {
    const { settings, gridElement } = this;
    const { cellSize, borderSize, borderColor } = settings;
    const { innerWidth, innerHeight } = window;

    const fullCellSize = cellSize + borderSize * 2;
    this.numCols = Math.floor(innerWidth / fullCellSize);
    this.numRows = Math.floor(innerHeight / fullCellSize);

    this.gridWidth = this.numCols * fullCellSize;
    this.gridHeight = this.numRows * fullCellSize;

    this.gridMarginX = (innerWidth - this.gridWidth - borderSize * 2) / 2;
    this.gridMarginY = (innerHeight - this.gridHeight - borderSize * 2) / 2;

    Object.assign(gridElement.style, {
      width: `${this.gridWidth}px`,
      height: `${this.gridHeight}px`,
      marginLeft: `${this.gridMarginX}px`,
      marginTop: `${this.gridMarginY}px`,
      border: `${borderSize}px solid ${borderColor}`,
    });
  }

  #buildGridCells() {
    const { numRows, numCols } = this;
    this.gridCells = {};

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const gridCell = new GridCell({ grid: this, row, col });
        gridCell.render();
        this.gridCells[gridCell.position] = gridCell;
      }
    }
  }

  #buildGridSvg() {
    const { svgElement, gridWidth, gridHeight, gridMarginX, gridMarginY } =
      this;

    Object.assign(svgElement.style, {
      width: `${gridWidth}px`,
      height: `${gridHeight}px`,
      left: `${gridMarginX}px`,
      top: `${gridMarginY}px`,
    });

    svgElement.setAttribute("viewbox", `0 0 ${gridWidth} ${gridHeight}`);
  }
}

export default Grid;
