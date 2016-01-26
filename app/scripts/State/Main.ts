module Nain.State {
  export class Main extends Phaser.State {
    public mPlayer;
    public platforms;
    public cursors;
    public stars;
    public score = 0;
    public scoreText;
    create() {

      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.add.sprite(0, 0, 'sky');
      this.add.sprite(0, 0, 'star');

      this.platforms = this.add.group();
      this.platforms.enableBody = true;

      var ground = this.platforms.create(0, this.world.height - 64 ,'ground');
      ground.scale.setTo(2,2);
      ground.body.immovable = true;

      var ledge = this.platforms.create(400, 400, 'ground');
      ledge.body.immovable = true;

      ledge = this.platforms.create(-150, 250, 'ground');
      ledge.body.immovable = true;

      this.mPlayer = this.add.sprite(32, this.world.height - 150, 'dude');
      this.physics.arcade.enable(this.mPlayer);

      this.mPlayer.body.bounce.y = 0.2;
      this.mPlayer.body.gravity.y = 300;
      this.mPlayer.body.collideWorldBounds = true;

      this.mPlayer.animations.add('left', [0, 1, 2, 3], 10, true);
      this.mPlayer.animations.add('right', [5, 6, 7, 8], 10, true);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.stars = this.add.group();
      this.stars.enableBody = true;

      for ( var i = 0; i < 12; i++) {

        var star = this.stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 600;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

      }

      this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    }
  update() {
      this.physics.arcade.collide(this.mPlayer, this.platforms);
      this.physics.arcade.collide(this.stars, this.platforms);
      this.physics.arcade.overlap(this.mPlayer, this.stars, this.collectStar, null, this);

      this.mPlayer.body.velocity.x = 0;

      if (this.cursors.left.isDown) {

        this.mPlayer.body.velocity.x = -150;
        this.mPlayer.animations.play('left');

      } else if (this.cursors.right.isDown) {

        this.mPlayer.body.velocity.x = 150;
        this.mPlayer.animations.play('right');

      } else{

        this.mPlayer.animations.stop();
        this.mPlayer.frame = 4;

      }

      if (this.cursors.up.isDown && this.mPlayer.body.touching.down) {

        this.mPlayer.body.velocity.y = -350;

      }
    }
    collectStar(mPlayer, star) {
      star.kill();
      this.score += 10;
      this.scoreText.text = 'Score: ' + this.score;
    }
  }
}
