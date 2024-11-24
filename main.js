// A maze is a 2d array representing the (x,y) board.
// the maze can be indexed using maze[y][x]
// to get an individual cell.

// A cell is represented as follows: { right: boolean, bottom: boolean }

const mazeEle = document.querySelector("#maze");
const mazeBtnEle = document.querySelector("#maze-btn");

function makeMaze(height, width) {
    const maze = [];
    for (h = 0; h < height; h++) {
        const row = [];
        for (w = 0; w < width; w++) {
            row.push({
                right: true,
                bottom: true,
            });
        }
        maze.push(row);
    }

    let x = 0;
    let y = 0;
    let visited = new Set();
    let history = [];

    const area = height * width;
    while (visited.size < area) {
        visited.add(`${x},${y}`);

        const availNextCells = [];

        // left
        if (x - 1 >= 0 && !visited.has(`${x - 1},${y}`)) {
            availNextCells.push({ x: x - 1, y });
        }
        // right
        if (x + 1 <= (width - 1) && !visited.has(`${x + 1},${y}`)) {
            availNextCells.push({ x: x + 1, y });
        }
        // top
        if (y - 1 >= 0 && !visited.has(`${x},${y - 1}`)) {
            availNextCells.push({ x, y: y - 1 });
        }
        // bottom
        if (y + 1 <= (height - 1) && !visited.has(`${x},${y + 1}`)) {
            availNextCells.push({ x, y: y + 1 });
        }

        // if there are no unvisited cells to traverse to,
        // pop() the most recent cell from visit history and backtrack
        if (availNextCells.length === 0) {
            const prevCell = history.pop();
            const prevX = prevCell.x;
            const prevY = prevCell.y;

            x = prevX;
            y = prevY;
            continue;
        }

        history.push({ x, y });

        const randIndex = Math.floor(Math.random() * availNextCells.length);
        const nextCell = availNextCells[randIndex];
        const nextX = nextCell.x;
        const nextY = nextCell.y;

        // moving left
        if (nextX === x - 1 && nextY === y) {
            maze[nextY][nextX].right = false;
        }
        // moving right
        if (nextX === x + 1 && nextY === y) {
            maze[y][x].right = false;
        }
        // moving up
        if (nextX === x && nextY === y - 1) {
            maze[nextY][nextX].bottom = false;
        }
        // moving down
        if (nextX === x && nextY === y + 1) {
            maze[y][x].bottom = false;
        }

        x = nextX;
        y = nextY;
    }

    return maze;
}

function drawMaze(ele, maze) {
    for (const row of maze) {
        for (const cell of row) {
            ele.insertAdjacentHTML(
                "beforeend",
                `<div class="cell${cell.right ? " right" : ""}${cell.bottom ? " bottom" : ""}"></div>`,
            );
        }
    }
}

mazeBtnEle.addEventListener("click", () => {
    mazeEle.innerHTML = "";
    drawMaze(mazeEle, makeMaze(10, 10));
});

drawMaze(mazeEle, makeMaze(10, 10));
