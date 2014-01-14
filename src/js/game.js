var States = {};

States.Game = function(game) {
    this.game = game;
    this.paddles = null;
    this.paddle0 = null;
    this.paddle1 = null;
    this.ball = null;
    this.ballAlive = false;
};
States.Game.prototype = {
    preload: function() {
        this.game.load.image('paddle0', 'img/paddleBlu.png');
        this.game.load.image('paddle1', 'img/paddleRed.png');
        this.game.load.image('ball0', 'img/ballGrey.png');
    },

    create: function() {
        var add = this.game.add;
        this.paddles = add.group();

        this.paddle0 = add.sprite(this.game.world.centerX,
            this.game.world.height - 50, 'paddle0');
        this.paddle0.anchor.setTo(0.5, 0.5);
        this.paddle0.body.bounce.setTo(1, 1);
        this.paddle0.body.immovable = true;
        this.paddle0.body.collideWorldBounds = true;
        this.paddles.add(this.paddle0);

        this.paddle1 = add.sprite(this.game.world.centerX,
            50, 'paddle1');
        this.paddle1.anchor.setTo(0.5, 0.5);
        this.paddle1.body.bounce.setTo(1, 1);
        this.paddle1.body.immovable = true;
        this.paddle1.body.collideWorldBounds = true;
        this.paddles.add(this.paddle1);

        this.ball = add.sprite(this.game.world.centerX,
            this.game.world.centerY, 'ball0');
        this.ball.body.bounce.setTo(1, 1);
        this.ball.body.collideWorldBounds = true;
        this.ball.anchor.setTo(0.5, 0.5);
    },

    update: function() {
        var input = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            input -= 250;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            input += 250;
        }

        this.paddle0.body.velocity.x = input;
        input = 0;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
            input -= 250;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
            input += 250;
        }

        this.paddle1.body.velocity.x = input;

        if (!this.ballAlive && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.ballAlive = true;

            this.ball.body.velocity.y = 250;
        }

        if (this.ballAlive) {
            this.game.physics.collide(this.ball, this.paddles,
                this.ballHitPaddle, null, this);
        }
    },

    ballHitPaddle: function(ball, paddle) {
        var delta = ball.x - paddle.x ||
            Math.max(0.2, Math.random()) * Phaser.Math.randomSign();

        ball.body.velocity.x = 10 * delta;
    }
};

window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.state.add('Game', States.Game);
    game.state.start('Game');
};