function buildMaze(size) {
  const maze = [];
  for (let i = 0; i < size; i++) {
    maze[i] = [];
    for (let j = 0; j < size; j++) {
      maze[i][j] = Math.random() > 0.3 ? 1 : 0;
    }
  }
  maze[0][0] = 1;
  maze[maze.length - 1][maze.length - 1] = 1;

  return maze;
}

const maze = buildMaze(4);

function isSafe(maze, x, y) {
  const n = maze.length;
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true;
  }
  return false;
}

function findPath(maze, x, y, solution) {
  const n = maze.length;
  if (x === n - 1 && y === n - 1) {
    solution[x][y] = 1;
    return true;
  }
  if (isSafe(maze, x, y) === true) {
    solution[x][y] = 1;
    if (findPath(maze, x + 1, y, solution)) {
      return true;
    }
    if (findPath(maze, x, y + 1, solution)) {
      return true;
    }
    solution[x][y] = 0;
    return false;
  }
  return false;
}

function ratInAMaze(maze) {
  maze.forEach((row) => console.log(row));
  console.log("-----------------");
  const solution = [];
  for (let i = 0; i < maze.length; i++) {
    solution[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }
  if (findPath(maze, 0, 0, solution) === true) {
    return solution;
  }
  return "NO PATH FOUND";
}

const ans = ratInAMaze([
  [1, 1, 1, 1],
  [1, 0, 1, 0],
  [0, 0, 1, 1],
  [1, 1, 1, 1],
]);

if (typeof ans === "object") ans.forEach((row) => console.log(row));
else console.log(ans);

/**
[ 1, 1, 1, 1 ]
[ 1, 1, 1, 0 ]
[ 0, 1, 1, 1 ]
[ 1, 1, 1, 1 ]
 */

// https://chatgpt.com/c/67b37692-d19c-800c-bb9c-5f183236c316
