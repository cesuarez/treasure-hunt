var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'Treasure Hunt');

game.state.add('PlayingState', PlayingState);
game.state.start('PlayingState');
