let gridOfLife = [];
const gridColumns = 30;
const gridRows = 30;

(function () {

    for (let i = 0; i < gridColumns; i++) {
        gridOfLife[i] = [];
        for (let j = 0; j < gridRows; j++) {
            gridOfLife[i][j] = {
                position: [i, j],
                state: getRandomInt(2)
            };
        }
    }

    full();

    setInterval(() => {
        const canvas = document.getElementById("cnv");
        nextStep();
        draw(canvas);
    }, 1000);

    window.addEventListener("resize", () => {
        full();
    });
})();


function full() {
    const canvas = document.getElementById("cnv");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    draw(canvas);
}

function draw(canvas) {
    var ctx = canvas.getContext("2d");
    gridOfLife.forEach((column) => {
        column.forEach(row => {
            const element = row.position;
            const size = 20;
            ctx.rect(element[0] * size, element[1] * size, size, size);
            ctx.stroke();
            if (row.state === 0) {
                ctx.fillStyle = "#4c1f36";
                ctx.fillRect(element[0] * size, element[1] * size, size, size);
            } else {
                ctx.fillStyle = "#659D32";
                ctx.fillRect(element[0] * size, element[1] * size, size, size);
            }
        });
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getAlive(x, y) {
    let alive = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (x + i > 0 && y + j > 0 && x + i < gridColumns && y + j < gridRows) {
                if (gridOfLife[x + i][y + j].state === 1 && i !== 0 && j !== 0) {
                    alive++;
                }
            }
        }
    }
    return alive;
}

function nextStep() {
    const nextGridOfLife = [];
    for (let i = 0; i < gridColumns; i++) {
        nextGridOfLife[i] = [];
        for (let j = 0; j < gridRows; j++) {
            const live = getAlive(i, j);
            if (gridOfLife[i][j].state === 1) {
                if (live < 2) {
                    nextGridOfLife[i][j] = setState(i, j, 0);
                }
                if (live === 2 || live == 3) {
                    nextGridOfLife[i][j] = setState(i, j, 1);
                }
                if (live > 3) {
                    nextGridOfLife[i][j] = setState(i, j, 0);
                }
            } else {
                if (live == 3) {
                    nextGridOfLife[i][j] = setState(i, j, 1);
                } else {
                    nextGridOfLife[i][j] = setState(i, j, 0);
                }
            }
        }
    }
    gridOfLife = nextGridOfLife;
}

function setState(i, j, state) {
    return {
        position: [i, j],
        state: state
    };
}