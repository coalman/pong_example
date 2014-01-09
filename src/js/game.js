window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload, 
        create: create,
        update: update
    });
    var paddle;
    var ball;
    var cursors;

    function preload() {
        game.load.image('paddle0', 'img/paddleBlu.png');
        game.load.image('ball0', 'img/ballGrey.png');
    }

    function create() {
        paddle = game.add.sprite(game.world.centerX, game.world.height - 100, 'paddle0');
        paddle.anchor.setTo(0.5, 0.5);

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

        paddle.body.velocity.x = input;
    }
};