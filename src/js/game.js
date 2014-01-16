var States = {};
var score = 0;
var scoreText;

var score1 = 0;
var scoreText1;

States.Game = function(game) {
    this.game = game;
    this.paddles = [];
    this.players = [];
    this.ball = new Ball(game);
};
States.Game.prototype.preload = function() {
    this.game.load.image('paddle0', 'img/paddleBlu.png');
    this.game.load.image('paddle1', 'img/paddleRed.png');
    this.game.load.image('ball0', 'img/ballGrey.png');
};
States.Game.prototype.create = function() {
    this.ball.init();

    for (var i = 0; i < 2; i++) {
        var offset = this.game.world.width - (50 * 2);
        offset *= i;
        
        var player = new Player(this.game);
        player.create(16 + offset, 16);
        this.players.push(player);

        var paddle = new Paddle(this.game, i);
        paddle.init(50 + offset, this.game.world.centerY);
        this.paddles.push(paddle);
    }
};
States.Game.prototype.update = function() {
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) &&
		this.ball.sprite.body.velocity.x === 0) {
		this.ball.start();
	}

    if (this.ball.sprite.body.velocity.x !== 0) {
        this.ball.boundsCheck(function onScore(ball, scorer) {
            this.players[scorer].onScore(1);
            ball.reset();
        }.bind(this));

        for (var i = 0, len = this.paddles.length; i < len; i++) {
            this.game.physics.collide(this.ball.sprite,
                this.paddles[i].sprite, this.paddles[i].hitBall,
                null, this.paddles[i]);
        }
    }
};
// States.Game.prototype = {
//     update: function() {
//         var input = 0;
//         if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
//             input -= 250;
//         } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
//             input += 250;
//         }

//         this.paddle0.body.velocity.x = input;
//         input = 0;

//         if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
//             input -= 250;
//         } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
//             input += 250;
//         }

//         this.paddle1.body.velocity.x = input;
//     },
// };

window.onload = function() {
    game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.state.add('Game', States.Game);
    game.state.start('Game');
};