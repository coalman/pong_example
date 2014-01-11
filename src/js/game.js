window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload, 
        create: create,
        update: update
    });
    var paddle0;
    var ball;
    var cursors;

    function preload() {
        game.load.image('paddle0', 'img/paddleBlu.png');
        game.load.image('paddle1', 'img/paddleRed.png');
        game.load.image('ball0', 'img/ballGrey.png');
    }

    function create() {
        paddle0 = game.add.sprite(game.world.centerX, game.world.height - 100, 'paddle0');
        paddle0.anchor.setTo(0.5, 0.5);

        paddle1 = game.add.sprite(game.world.centerX, 100, 'paddle1');
        paddle1.anchor.setTo(0.5, 0.5);

        ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball0');
        ball.anchor.setTo(0.5, 0.5);

        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        var input = 0;
        if (cursors.right.isDown) {
            input += 250;
        }
        if (cursors.left.isDown) {
            input -= 250;
        }

        paddle0.body.velocity.x = input;
    }
};