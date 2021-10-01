class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.keyboard = null;

        this.isPause = false;

        this.player = null;
        this.dot = null;
    }

    init(canvas_id, width, height, level) {
        this.canvas = document.getElementById(canvas_id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.keyboard = new Keyboard();
        this.keyboard.init();

        this.field = new Field(DIMENSIONS.field_width, DIMENSIONS.field_height);
        this.field.init();

        this.player = new Player(3, 3, 'images/hero.png', 'images/goblin.png');
        this.player.change_difficulty(level);

        this.dot = new Dot(5, 3, 'images/water.jpg');

        this.field.delete_point(this.player.x, this.player.y);
    }

    start(){
        if (!game.isPause) {
            game.engine();
            window.requestAnimationFrame(game.start);
        }
    }

    pause() {
        this.isPause = !this.isPause;
        window.requestAnimationFrame(game.start);
    }

    engine() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.alive){
            this.field.draw(this.context);
            this.player.draw(this.context);
            let moved = this.player.move(this.keyboard, this.field);
            if (moved){
                if (this.dot.got_cought(this.player, this.field)) this.player.point_eaten(this.field);
                else this.player.change_location(this.field);
            }
            this.dot.draw(this.context);
        }
        else{
            this.death_img = new Image();
            this.death_img.src = 'images/Dark_Souls_You_Died_Screen_-_Completely_Black_Screen_0-2_screenshot.png';
            this.context.drawImage(this.death_img, 0, 0, DIMENSIONS.width, DIMENSIONS.height);
        }
    }
}