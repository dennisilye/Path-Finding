import { generateQueryConstructor } from "../utils/object.utils";

class GridCell {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }

  get position() {
    return `${this.row}-${this.col}`;
  }

  render() {
    this.#renderHtmlElement();
    this.#renderHtmlStyling();
    this.#renderHtmlAttributes();
    this.renderGridCellsDynamics();
    this.#renderEvents();
  }

  #renderHtmlElement() {
    const {
      grid: { gridElement },
    } = this;

    const gridCellElement = document.createElement("div");

    gridCellElement.classList.add("gridcell");
    gridCellElement.setAttribute("position", this.position);

    gridElement.appendChild(gridCellElement);
    this.gridCellElement = gridCellElement;
  }

  #renderHtmlStyling() {
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

    gridCellElement.setAttribute("draggable", true);
  }

  #renderHtmlAttributes() {
    const {
      grid: { numRows, numCols },
    } = this;

    this.isBlocked = false;
    this.isOutCell = this.position === "0-0";
    this.isInCell = this.position === `${numRows - 1}-${numCols - 1}`;
  }

  renderGridCellsDynamics() {
    this.gridCellElement.classList[this.isBlocked ? "add" : "remove"](
      "blocked"
    );
    this.gridCellElement.classList[this.isInCell ? "add" : "remove"](
      "out-cell"
    );
    this.gridCellElement.classList[this.isOutCell ? "add" : "remove"](
      "in-cell"
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
      this.renderGridCellsDynamics();
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

      this.renderGridCellsDynamics();

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

  resetCell() {
    this.isInCell = false;
    this.isOutCell = false;
    this.isBlocked = false;

    this.renderGridCellsDynamics();
  }
}

export default GridCell;
