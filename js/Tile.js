class Tile {
    constructor(x, y, image_src, moveable) {
        this.x = x;
        this.y = y;
        this.width = DIMENSIONS.tile_width;
        this.height = DIMENSIONS.tile_height;
        this.moveable = moveable;
        this.image = new Image();
        this.image.src = image_src;
    }

    draw(context) {
        context.drawImage(this.image, this.x * DIMENSIONS.tile_width, this.y * DIMENSIONS.tile_height, this.width, this.height);
    }
}