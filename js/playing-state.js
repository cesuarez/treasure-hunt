
var PlayingState = {
    init: function(){
        // Para evitar la propagación de una Key hacia el browser
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        ]);

        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#182d3b';
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        game.scale.pageAlignVertically = true;
        game.imagesUrl = 'assets/images/';

        game.input.mouse.capture = true;
    },
    preload: function(){
        //this.load.spritesheet("erza_idle", "assets/images/erza_idle.png", 90, 200);
        this.load.image('square', game.imagesUrl + "gray_square.png");
        this.load.image('treasure', game.imagesUrl + "treasure.png");
        this.load.image('pressed_square', game.imagesUrl + "gray_square_pressed.png");
    },
    create: function(){
        this.cursors = game.input.keyboard.createCursorKeys();

        gridGroup = game.add.group();
        gridGroup.x = 190;
        gridGroup.y = 100;

        images = {
            normal: 'square',
            pressed: 'pressed_square'
        };

        grid = Grid(gridGroup, 20, 15, 45, images, game.input.activePointer);
    },
    update: function(){
    },
    render: function(){
        game.debug.text(game.time.fps, 2, 14);   
    }
};

