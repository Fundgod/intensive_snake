class Dot{
    constructor(x, y, image_src) {
        this.x = x;
        this.y = y;
        this.width = DIMENSIONS.tile_width;
        this.height = DIMENSIONS.tile_height;
        this.image = new Image();
        this.image.src = image_src;
    }

    got_cought(player, field){
        if (player.x === this.x && player.y === this.y){
            let param = field.points[Math.floor(Math.random() * field.points.length)];
            this.x = param[0];
            this.y = param[1];
            return true;}
        return false;
    }

    draw(context){
        context.drawImage(this.image, this.x * DIMENSIONS.tile_width, this.y * DIMENSIONS.tile_height, this.width, this.height);
    }
}