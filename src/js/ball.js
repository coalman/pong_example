'use strict';

function Ball(game) {
	this.game = game;
}

Ball.prototype.init = function() {
	this.sprite = this.game.add.sprite(this.game.world.centerX,
		this.game.world.centerY, 'ball0');
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.body.bounce.setTo(1, 1);
};

Ball.prototype.boundsCheck = function(onScore) {
	if (this.sprite.body.x < this.game.world.bounds.x)
    {
        onScore(this, 0);
    }
    else if (this.sprite.body.x > this.game.world.bounds.right)
    {
        onScore(this, 1);
    }

    if (this.sprite.body.y < this.game.world.bounds.y)
    {
        this.sprite.body.y = this.game.world.bounds.y;
        this.sprite.body.velocity.y *= -this.sprite.body.bounce.y;
    }
    else if (this.sprite.body.y > this.game.world.bounds.bottom)
    {
        this.sprite.body.y = this.game.world.bounds.bottom - this.sprite.width;
        this.sprite.body.velocity.y *= -this.sprite.body.bounce.y;
    }
};

Ball.prototype.reset = function() {
	this.sprite.body.x = this.game.world.centerX;
    this.sprite.body.y = this.game.world.centerY;
    this.sprite.body.velocity.x = this.sprite.body.velocity.y = 0;
};