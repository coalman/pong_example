'use strict';

function Paddle(game, id) {
	this.game = game;
	this.id = id;
}

Paddle.prototype.init = function(x, y) {
	this.sprite = this.game.add.sprite(x, y,
		'paddle' + this.id.toString());
	this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.bounce.setTo(1, 1);
    this.sprite.body.immovable = true;
    this.sprite.body.collideWorldBounds = true;
};

Paddle.prototype.hitBall = function(ball, paddle) {
	var delta = ball.y - paddle.y ||
        Math.max(0.2, Math.random()) * Phaser.Math.randomSign();

    ball.body.velocity.y = 10 * delta;
};