module Nain.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('menu-background', 'assets/images/koala.jpg');
      this.load.spritesheet('dude', 'assets/images/dude.png',32 ,48);
      this.load.image('ground', 'assets/images/platform.png');
      this.load.image('star', 'assets/images/star.png');
      this.load.image('sky', 'assets/images/sky.png');


      // Load remaining assets here
    }

    create() {
      this.game.state.start('menu');
    }
  }
}
