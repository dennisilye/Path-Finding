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

  #renderGridCell() {
    const {
      grid: { numRows, numCols },
    } = this;

    this.isBlocked = false;
    this.isOutCell = this.position === "0-0";
    this.isInCell = this.position === `${numRows - 1}-${numCols - 1}`;
  }

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

  renderOutInCells() {
    this.gridCellElement.classList[this.isInCell ? "add" : "remove"](
      "out-cell"
    );
    this.gridCellElement.classList[this.isOutCell ? "add" : "remove"](
      "in-cell"
    );
  }

  renderBlockedCells() {
    this.gridCellElement.classList[this.isBlocked ? "add" : "remove"](
      "blocked"
    );
  }

  #renderEvents() {
    this.#renderClickEvent();
    this.#renderHoverEvent();
    this.#renderDragDropEvents();
  }

  #renderClickEvent() {
    const { gridCellElement } = this;

    gridCellElement.addEventListener("click", () => {
      if (this.isInCell || this.isOutCell) {
        return;
      }

      this.isBlocked = !this.isBlocked;
      this.renderBlockedCells();
    });
  }

  #renderHoverEvent() {
    const { gridCellElement } = this;

    gridCellElement.addEventListener("mouseover", () => {
      if (this.isInCell || this.isOutCell) {
        gridCellElement.style.cursor = "grab";
      } else if (!this.isBlocked) {
        gridCellElement.style.cursor = "pointer";
      } else {
        gridCellElement.style.cursor = "crosshair";
      }
    });
  }

  #renderDragDropEvents() {
    const { gridCellElement, grid } = this;

    gridCellElement.addEventListener("dragover", (event) => {
      if (downAllowDrop.call(this)) return;
      event.preventDefault();
    });

    gridCellElement.addEventListener("dragstart", (event) => {
      if (downAllowDrag.call(this)) {
        event.preventDefault();
        return;
      }

      grid.draggedGridCell = this;
    });

    gridCellElement.addEventListener("drop", () => {
      this.resetCell();

      this.isOutCell = grid.draggedGridCell.isOutCell;
      this.isInCell = grid.draggedGridCell.isInCell;

      this.renderOutInCells();

      grid.draggedGridCell.resetCell();
      // grid.draw();
    });

    function downAllowDrop() {
      return !this.isInCell && !this.isInCell;
    }

    function downAllowDrag() {
      const { gridCellElement, grid } = this;

      if (grid.draggedGridCell.gridCellElement === gridCellElement) return true;
      if (grid.draggedGridCell.gridCellElement && this.isInCell) return true;
      if (grid.draggedGridCell.gridCellElement && this.isOutCell) return true;

      return false;
    }
  }

  resetCell() {}
}

export default GridCell;
