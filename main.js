import Grid from "./app/grid/grid";
import gridConfig from "./app/config/grid.config";

const grid = new Grid(gridConfig);

grid.build();
grid.draw();
