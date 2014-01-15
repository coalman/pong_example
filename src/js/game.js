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
		this.ball.sprite.body.velocity.x == 0) {
		this.ball.start();
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

//         if (!this.ballAlive && 
//             this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
//             this.ballAlive = true;

//             this.ball.body.velocity.x = 250;
//         }

//         if (this.ballAlive) {
//             this.game.physics.collide(this.ball, this.paddles,
//                 this.ballHitPaddle, null, this);
//             this.ballWorldCheck(this.ball);
//         }
//     },

//     ballHitPaddle: function(ball, paddle) {
//         var delta = ball.y - paddle.y ||
//             Math.max(0.2, Math.random()) * Phaser.Math.randomSign();

//         ball.body.velocity.y = 10 * delta;
//     },

//     ballWorldCheck: function(ball) {
//         if (ball.body.x < this.game.world.bounds.x)
//         {
//             this.onScore(ball, null);
//         }
//         else if (ball.body.x > this.game.world.bounds.right)
//         {
//             this.onScore(ball, null);
//         }

//         if (ball.body.y < this.game.world.bounds.y)
//         {
//             ball.body.y = this.game.world.bounds.y;
//             ball.body.velocity.y *= -ball.body.bounce.y;
//         }
//         else if (ball.body.y > this.game.world.bounds.bottom)
//         {
//             ball.body.y = this.game.world.bounds.bottom - ball.width;
//             ball.body.velocity.y *= -ball.body.bounce.y;
//         }
//     },

//     onScore: function(ball, player) {
//         // reset ball
//         ball.body.x = this.game.world.centerX;
//         ball.body.y = this.game.world.centerY;
//         ball.body.velocity.x = ball.body.velocity.y = 0;
//         this.ballAlive = false;

//         score += 1;
//         scoreText.setText('score:' + score);
//     }
// };

window.onload = function() {
    game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.state.add('Game', States.Game);
    game.state.start('Game');
};