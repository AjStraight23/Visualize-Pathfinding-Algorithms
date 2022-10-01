import React, { Component } from "react";
import Node from "./Node/Node";
import { aStar } from "../Algorithms/aStar";
import { getNodesInShortestPathOrder } from "../Algorithms/aStar";
import { dijkstra } from "../Algorithms/dijkstra";
import { greedyBFS } from "../Algorithms/greedyBFS";
import "./PathFinding.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BFS } from "../Algorithms/BFS";
import Draggables from './Node/Draggables';
import { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Popover } from "bootstrap";




const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;

export default class PathFinding extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      diffX: 0,
      diffY: 0,
      dragging: false,
      pressedStartNode: false,
      pressedFinishNode: false,
      startNode: [],
    };

    this.dragStart = this.dragStart.bind(this);
    this.dragging = this.dragging.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
  }

  

  
  dragStart(e) {
    this.setState({
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true,
    });
  }

  dragEnd(e) {
    this.setState({
      dragging: false,
    });
  }

  dragging(e) {
    let left = e.screenX - this.state.diffX;
    let top = e.screenY - this.state.diffY;
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  animateaStar(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 8 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 6 * i);
    }
  }
  animateGreedyBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 8 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 6 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    console.log("I hit button for dijkstra");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeaStar() {
    console.log("I hit button for aStar");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateaStar(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizegreedyBFS() {
    console.log("I hit button for greedy");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = greedyBFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateGreedyBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBFS() {
    console.log("I hit button for BFS");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  

  render() {
    const { grid, mouseIsPressed, isStart, isFinish } = this.state;
    
    
    
    return (
      <>
        <div>
          <Router>
            <Navbar bg="dark" variant="dark" expand="lg" color="">
              <Container fluid>
                <Navbar.Brand href="#">Pathfinding Algorithms</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "150px" }}
                    navbarScroll
                  >
                  <NavDropdown
                      title="About the Algorithms"
                      id="navbarScrollingDropdown"
                    >
                      
                      <NavDropdown.Item
                        href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
                        target="_blank"
                      >
                        About Dijkstra
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="https://en.wikipedia.org/wiki/A*_search_algorithm"
                        target="_blank"
                      >
                        About A*
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="https://en.wikipedia.org/wiki/Best-first_search"
                        target="_blank"
                      >
                        About Greedy BFS
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="Choose a Maze!"
                      id="navbarScrollingDropdown"
                    ></NavDropdown>

                    <NavDropdown
                      title="Choose an Algorithm!"
                      id="navbarScrollingDropdown"
                    >
                      <NavDropdown.Item
                        href="#"
                        onClick={() => this.visualizeDijkstra()}
                      >
                        Dijkstra's
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#"
                        onClick={() => this.visualizeaStar()}
                      >
                        A*
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        href="#"
                        onClick={() => this.visualizegreedyBFS()}
                      >
                        Greedy BFS
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#"
                        onClick={() => this.visualizeBFS()}
                      >
                        BFS
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={() => window.location.reload()}>Clear Board</Nav.Link>
                    <NavDropdown 
                    title="Choose Speed"
                    id="navbarScrollingDropdown"
                    >
                    <NavDropdown.Item onClick={() => this.fastAnimation()}
                    >Fast
                    </NavDropdown.Item>
                    </NavDropdown>
                 </Nav>

                

                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Router>
        </div>

        

        <div className="grid">
          
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                     
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}>

                      
                    </Node>
                    

                    
                  
                  );
                })}
              </div>
            );
          })}
          </div>
        
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 55; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    f: 0,
    g: 0,
    h: 0,
    pos: 0,
    closest: 0,
    totalDis: 0,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    dis: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const createWall = (col, row) => {
  return {
    col,
    row,
    f: 0,
    g: 0,
    h: 0,
    pos: 0,
    closest: 0,
    totalDis: 0,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    dis: Infinity,
    isVisited: false,
    isWall: true,
    previousNode: null,
  };

}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};




const getNewStartWithStartNodeToggled = (grid, row, col) => {
    const newStartNode = grid.slice();
    const startNode = newStartNode[row][col];
    const newNode = {
      ...startNode,

  };

  newStartNode[row][col] = newNode;
  return newStartNode;



} 




















