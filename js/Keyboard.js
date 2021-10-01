class Keyboard {
    constructor() {
        this.keys = {
            'LEFT': 37,
            'RIGHT': 39,
            'UP': 38,
            'DOWN': 40
        };

        this.keyStack = [];
    }

    isDown(keyName) {
        return ~this.keyStack.indexOf(this.keys[keyName]);
    }

    addKey(keyCode) {
        if (!~this.keyStack.indexOf(keyCode)) {
            this.keyStack.push(keyCode);
        }
    }

    removeKey(keyCode) {
        this.keyStack.splice(this.keyStack.indexOf(keyCode), 1);
    }

    init() {
        window.onkeydown = function(e) {
            this.addKey(e.keyCode);
        }.bind(this);

        window.onkeyup = function(e) {
            this.removeKey(e.keyCode);
        }.bind(this);
    }

    remove() {
        window.onkeydown = function() {};
        window.onkeyup = function() {};
    }
}