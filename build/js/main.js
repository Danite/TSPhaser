var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nain;
(function (Nain) {
    var State;
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/preload-bar.png');
            };
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0xFFFFFF;
                // Assign global settings here
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(State = Nain.State || (Nain.State = {}));
})(Nain || (Nain = {}));
var Nain;
(function (Nain) {
    var State;
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
                this.load.setPreloadSprite(this.preloadBar);
                this.load.image('menu-background', 'assets/images/koala.jpg');
                this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
                this.load.image('ground', 'assets/images/platform.png');
                this.load.image('star', 'assets/images/star.png');
                this.load.image('sky', 'assets/images/sky.png');
                // Load remaining assets here
            };
            Preload.prototype.create = function () {
                this.game.state.start('menu');
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(State = Nain.State || (Nain.State = {}));
})(Nain || (Nain = {}));
var Nain;
(function (Nain) {
    var State;
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.create = function () {
                var _this = this;
                this.background = this.add.sprite(80, 0, 'menu-background');
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('main');
                });
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(State = Nain.State || (Nain.State = {}));
})(Nain || (Nain = {}));
var Nain;
(function (Nain) {
    var State;
    (function (State) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.apply(this, arguments);
                this.score = 0;
            }
            Main.prototype.create = function () {
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.add.sprite(0, 0, 'sky');
                this.add.sprite(0, 0, 'star');
                this.platforms = this.add.group();
                this.platforms.enableBody = true;
                var ground = this.platforms.create(0, this.world.height - 64, 'ground');
                ground.scale.setTo(2, 2);
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
                for (var i = 0; i < 12; i++) {
                    var star = this.stars.create(i * 70, 0, 'star');
                    star.body.gravity.y = 600;
                    star.body.bounce.y = 0.7 + Math.random() * 0.2;
                }
                this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            };
            Main.prototype.update = function () {
                this.physics.arcade.collide(this.mPlayer, this.platforms);
                this.physics.arcade.collide(this.stars, this.platforms);
                this.physics.arcade.overlap(this.mPlayer, this.stars, this.collectStar, null, this);
                this.mPlayer.body.velocity.x = 0;
                if (this.cursors.left.isDown) {
                    this.mPlayer.body.velocity.x = -150;
                    this.mPlayer.animations.play('left');
                }
                else if (this.cursors.right.isDown) {
                    this.mPlayer.body.velocity.x = 150;
                    this.mPlayer.animations.play('right');
                }
                else {
                    this.mPlayer.animations.stop();
                    this.mPlayer.frame = 4;
                }
                if (this.cursors.up.isDown && this.mPlayer.body.touching.down) {
                    this.mPlayer.body.velocity.y = -350;
                }
            };
            Main.prototype.collectStar = function (mPlayer, star) {
                star.kill();
                this.score += 10;
                this.scoreText.text = 'Score: ' + this.score;
            };
            return Main;
        })(Phaser.State);
        State.Main = Main;
    })(State = Nain.State || (Nain.State = {}));
})(Nain || (Nain = {}));
/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/Main.ts'/>
var Nain;
(function (Nain) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'game-div');
            this.state.add('boot', Nain.State.Boot);
            this.state.add('preload', Nain.State.Preload);
            this.state.add('menu', Nain.State.Menu);
            this.state.add('main', Nain.State.Main);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Nain.Game = Game;
})(Nain || (Nain = {}));
window.onload = function () {
    var game = new Nain.Game();
};
//# sourceMappingURL=main.js.map