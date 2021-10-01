const DIMENSIONS = {
    'width': 700,
    'height': 700,
    'tile_width': 35,
    'tile_height': 35,
    'field_width': 20,
    'field_height': 20
}

function IsInside(big_mas, lil_mas){
    for (let i = 0; i < big_mas.length; i++)
        if (big_mas[i][0] === lil_mas[0] && big_mas[i][1] === lil_mas[1])
            return i;
    return -1
}


let username = null;
let level = null;
let game = null;


document.getElementById('button').onclick = function() {
    level = document.getElementById('level').value;

    game = new Game();
    game.init('canvas', DIMENSIONS.width, DIMENSIONS.height, level);
    game.start(username);
    console.log(username);
}