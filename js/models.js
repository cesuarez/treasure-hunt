var Counter = function(group, x, y, tries){
	var counterStyle = {
		font: '50px Arial',
		fill: '#ffffff',
		wordWrap: true,
		wordWrapWidth: 100,
		align: "center" };
	text = new Phaser.Text(game, x, y, tries, counterStyle);
	group.add(text);

	return {
		text: text,
		tries: tries,
		isGameOver: function() {
			return this.tries == 0;
		},
		try: function() {
			this.tries -= 1;
			this.text.setText(this.tries);
		}
	};
}; 

var Tile = function(grid, sprite, value, images, mouseInput) {
	sprite.inputEnabled = true;
	var tile = {
		grid: grid,
		value: value,
		sprite: sprite,
		state: 'normal',
		statesUpdates: {
			normal: function(tile) {
				console.log(tile.state);
				tile.state = 'pressed';
				sprite.loadTexture(images[tile.state]);
				if (value == 0) {
					var treasure = grid.group.create(0, 0, 'treasure');
					treasure.scale.setTo(0.24);
					treasure.alignIn(sprite, Phaser.CENTER);
					tile.grid.gameOver = true;
				} else {
				    var style = { font: "20px Arial", wordWrap: true, wordWrapWidth: sprite.width, align: "center" };
				    sprite.inputEnabled = true;
					var text = new Phaser.Text(game, 0, 0, value, style);
					grid.group.add(text);
					text.alignIn(sprite, Phaser.CENTER);
					tile.grid.try();
				}
			},
			pressed: function(tile) {console.log("PRESSED");}
		},
		stateUpdate: function() {
			if (!this.grid.gameOver) {
				this.statesUpdates[this.state](this);
			}
		}
	};

	sprite.events.onInputDown.add(function(sprite, pointer, tile){
		tile.stateUpdate();
	}, this, 0, tile);

	return tile;
}

var Grid = function(group, width, height, tileSize, images, mouseInput) {
	var self = {};

	self.tiles = {};
	self.group = group;
	self.gameOver = false;
	self.counter = Counter(group, 440, -70, 7);

	self.try = function() {
		self.counter.try();
		if (self.counter.isGameOver()) {
			self.gameOver = true;
		}
	};

	treasureI = game.rnd.integerInRange(0, width - 1); 
	treasureJ = game.rnd.integerInRange(0, height - 1);

	console.log(treasureI);
	console.log(treasureJ);

	for (var i = width - 1; i >= 0; i--) {
	    for (var j = height - 1; j >= 0; j--) {
	    	if (!self.tiles.hasOwnProperty(i)) {
	    		self.tiles[i] = {};
	    	}
	    	value = Math.abs(treasureI - i) + Math.abs(treasureJ - j);
	    	var sprite = group.create(i*tileSize, j*tileSize, images.normal);
	    	self.tiles[i][j] = Tile(self, sprite, value, images, mouseInput);
	    }
	}

	return self;
}