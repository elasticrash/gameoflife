const gridOfLife = [];
const gridWidth = 30;
const gridHeight = 30;

(function () {

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            gridOfLife.push([i, j]);
        }
    }

    full();
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
    gridOfLife.forEach(element => {
        const size = 20;
        ctx.rect(element[0] * size, element[1] * size, size, size);
        ctx.stroke();
        if (Math.round(Math.random()) === 1) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(element[0] * size, element[1] * size, size, size);
        } else {
            ctx.fillStyle = "#FF00FF";
            ctx.fillRect(element[0] * size, element[1] * size, size, size);
        }
    });
}