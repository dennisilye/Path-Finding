import Grid from "./app/grid/grid";
import "./style.css";

const grid = new Grid({
  settings: {
    gridSelector: "#grid",
  },
});

grid.draw();
