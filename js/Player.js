class Player {
    constructor(x, y, image_src, head_image_src) {
        this.x = x;
        this.y = y;
        this.width = DIMENSIONS.tile_width;
        this.height = DIMENSIONS.tile_height;

        this.image = new Image();
        this.image.src = image_src;

        this.image_head = new Image();
        this.image_head.src = head_image_src;

        this.level = 0
        this.alive = true;
        this.last_move = null;
        this.direction_prev = null  // С каким направлением мы пришли
        this.direction_now = null // Текущее направление
        this.massiv = [[x, y]]  // места, занимаемые телом
    }

    move(keyboard, field) {
        // Смена направления
        if (keyboard.isDown('DOWN')){
            this.direction_now = 'DOWN';}
        else if (keyboard.isDown('UP')){
            this.direction_now = 'UP';}
        else if (keyboard.isDown('RIGHT')){
            this.direction_now = 'RIGHT';}
        else if (keyboard.isDown('LEFT')){
            this.direction_now = 'LEFT';}
        if (this.last_move === null || Date.now() - this.last_move >= 1000 - 50 * this.level) {
            this.last_move = Date.now();

            if (this.direction_now === 'DOWN' && this.direction_prev !== 'UP'){
                this.direction_prev = 'DOWN';}
            else if (this.direction_now === 'UP' && this.direction_prev !== 'DOWN'){
                this.direction_prev = 'UP';}
            else if (this.direction_now === 'LEFT' && this.direction_prev !== 'RIGHT'){
                this.direction_prev = 'LEFT';}
            else if (this.direction_now === 'RIGHT' && this.direction_prev !== 'LEFT'){
                this.direction_prev = 'RIGHT';}

            if (this.direction_prev === "DOWN")
                if (field.field[this.y + 1][this.x].moveable) {
                    this.y += 1;
                    return true;
                }
                else this.alive = false;
            else if (this.direction_prev === "UP")
                if (field.field[this.y - 1][this.x].moveable) {
                    this.y -= 1;
                    return true;
                }
                else this.alive = false;
            else if (this.direction_prev === "RIGHT")
                if (field.field[this.y][this.x + 1].moveable) {
                    this.x += 1;
                    return true;
                }
                else this.alive = false;
            else if (this.direction_prev === "LEFT")
                if (field.field[this.y][this.x - 1].moveable) {
                    this.x -= 1;
                    return true;
                }
                else this.alive = false;
            else return false;
        }
    }

    change_difficulty(level){
        if (!isNaN(level - parseFloat(level))){
            if (level < 0) level = 0;
            if (level > 19) level = 19;
            this.level = level;
        }
    }
    point_eaten(field){
        this.massiv.unshift([this.x, this.y]);
        field.delete_point([this.x, this.y]);
    }

    change_location(field){
        if (IsInside(this.massiv, [this.x, this.y]) > -1) this.alive = false;
        this.massiv.unshift([this.x, this.y]);
        field.delete_point(this.x, this.y);

        field.points.push(this.massiv.pop());
    }

    draw(context) {
        for(let i = 1; i < this.massiv.length; i++)  //Отрисовка всего тела
            context.drawImage(this.image, this.massiv[i][0] * DIMENSIONS.tile_width, this.massiv[i][1] * DIMENSIONS.tile_height, this.width, this.height);
        context.drawImage(this.image_head, this.massiv[0][0] * DIMENSIONS.tile_width, this.massiv[0][1] * DIMENSIONS.tile_height, this.width, this.height);
    }
}