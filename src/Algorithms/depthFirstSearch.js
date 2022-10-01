export function depthFristSearch(grid, node, finishNode) {
    const openSet = [];
    const closedSet = [];
    node.isVisited = true;
    openSet.push(node);
    

    if (node === finishNode) { 
        console.log("found the finish node");
        return closedSet;
    }
    const neighbors = updateUnvisitedNeighbors(node, grid);
    for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (!neighbor.isVisited) {
            closedSet.push(neighbor);
            depthFristSearch(grid, neighbor, finishNode);
        }
    }


}



function getUnvisitedNeighbors(node, grid) {
    console.log("In neighbors function");
    const neighbors = [];
  
    const { col, row } = node;
  
    if (row > 0) {
      console.log("inside first if");
      neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
      console.log("inside second if");
      neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
      console.log("inside third if");
      neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
      console.log("inside fourth if");
      neighbors.push(grid[row][col + 1]);
    }
  
    console.log("here before return of nieghbor array");
    for (let i = 0; i < neighbors; i++) {
      console.log(neighbors[i]);
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }


  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.dis = node.dis + 1;
      neighbor.previousNode = node;
    }
  }