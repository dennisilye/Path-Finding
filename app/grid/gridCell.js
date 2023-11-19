import { generateQueryConstructor } from "../utils/object.utils";

class GridCell {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }

  get position() {
    return `${this.row}-${this.col}`;
  }

  get gridCellElement() {
    return document.querySelector(`.gridCell[position="${this.position}"]`);
  }

  render() {
    this.#renderElement();
    this.#renderGridCell();
    this.#renderHtml();
    this.renderOutInCells();
    this.#renderEvents();
  }

  #renderElement() {
    const {
      grid: { gridElement },
    } = this;

    const gridCellElement = document.createElement("div");
    gridCellElement.classList.add("gridCell");
    gridCellElement.setAttribute("position", this.position);

    gridElement.appendChild(gridCellElement);
  }

  #renderGridCell() {}

  #renderHtml() {
    const {
      gridCellElement,
      grid: {
        settings: { cellSize, borderSize, borderColor },
      },
    } = this;

    Object.assign(gridCellElement.style, {
      width: `${cellSize}px`,
      height: `${cellSize}px`,
      border: `${borderSize}px solid ${borderColor}`,
    });
  }
  renderOutInCells() {}
  #renderEvents() {}
}

export default GridCell;
