'use strict';

function Player(game) {
	this.game = game;

	this.score = 0;
	this.name = 'Player';
}

Player.prototype.create = function(x, y) {
	this.scoreTxt = this.game.add.text(x, y,
		this.score.toString(), { font: '32px arial', fill: '#00FFFF' });
};

Player.prototype.onScore = function(points) {
	this.score += points;
	this.scoreTxt.setText(this.score.toString());
};