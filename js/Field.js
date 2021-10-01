const FIELDS_SPRITE = {
    '1': 'images/grass.jpg',
    '2': 'images/tree.jpg',
}
class Field {
    constructor(width, height) {
        this.field = []
        this.width = width;
        this.height = height;

        this.points = [];
    }

    init() {
        for (let i = 0; i < this.height; i++) {
            this.field.push([]);
            for (let j = 0; j < this.width; j++) {
                if (i === 0 || i === this.height - 1 || j === 0 || j === this.width - 1){
                    this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['2'], false)  // Для границ поля
                }
                else{
                    this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['1'], true)  // Пустое поле
                    this.points.push([i, j])
                }
            }
        }
    }

    delete_point(x, y){
        if (IsInside(this.points, [x, y]))
            this.points.splice(IsInside(this.points, [x, y]), 1);
        else console.log(1);
    }

    draw(context) {
        for (let i in this.field) {
            for (let j in this.field[i]) {
                this.field[i][j].draw(context);
            }
        }
    }
}