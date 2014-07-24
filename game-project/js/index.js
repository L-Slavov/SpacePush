"use strict";
var app = {
    // Application Constructor
    
    initialize: function(playerImg,boxImg,bgImg,bgOverlayImg,worldW,worldH) {
        
        function preload() {
            
            // loading background image
            game.load.image('bg','data:image.png;base64,' + bgImg ); 

            // loading background image
            game.load.image('bgOverlay','data:image.png;base64,' + bgOverlayImg );     

            // loading the player image
            game.load.image('player','data:image.png;base64,' + playerImg );

            // loading the box image
            game.load.image('box','data:image.png;base64,' + boxImg );
            
        }
        
        // on game create
        function create() {

            // make the bg to stay on bottom of the screen
                var posY;

                if(height>worldH){
                    posY=height-worldH;
                }else{
                    posY=0;
                }

                bg = game.add.tileSprite(0, posY, worldW, worldH, 'bg');
                bgOverlay = game.add.tileSprite(0, posY, worldW, worldH, 'bgOverlay');

            //enable Arcade physics
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // create player obj
            player=game.add.sprite(50,64,'player');
            player.anchor.setTo(0.5, 0.5);
            player.checkWorldBounds = true;
            game.physics.enable(player, Phaser.Physics.ARCADE);

            // add boxes
            boxes = game.add.group();
            boxes.enableBody = true;
            boxes.physicsBodyType = Phaser.Physics.ARCADE;
            

            for (var i = 0; i <20; i++){
                var c = boxes.create(Math.random()*worldW,Math.random()*worldH,'box');
                c.name = 'box' + i;
                c.body.collideWorldBounds=true;
                // c.body.immovable = true;
                // c.body.bounce.y = 0.1;
            }
            
            // set the world size ( equal to the size of the background image )
            game.world.setBounds(0, 0,worldW,worldH);

            // add event listener for screen tap
            // game.input.onDown.add(screenTap, this);

            setEnvironment();

            //game.physics.arcade.gravity.y = 250;
            player.body.bounce.y = 0.4;
            player.body.collideWorldBounds = true;
            
            // set player camera offset to 0
            player.cameraOffset.x = 0;
            player.cameraOffset.y = 0;
            
            // make camera follow player
            game.camera.follow(player);
            
        }
        
        // called on some update (called many times)
        function update() {
            game.physics.arcade.collide(player, boxes);
            game.physics.arcade.collide(boxes);

            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

                // if is pressed top arrow
                player.body.velocity.x = -playerSpeed;
                player.body.velocity.y = 0;

                // turn player to left
                player.scale.x=-1;

            }else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

                // if is pressed right arrow

                player.body.velocity.x = playerSpeed;
                player.body.velocity.y = 0;

                // turn player to right
                player.scale.x=1;

            }else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){

                // go up

                player.body.velocity.y = -playerSpeed;
                player.body.velocity.x = 0;
                
            }else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){

                // go down
                player.body.velocity.y = playerSpeed;
                player.body.velocity.x = 0;
            }
        }

        function setEnvironment(){
            player.x=50;
            player.y=Math.random()*(height-(height/3));
            stopMoving(player);
        }

        function crash(){

            // play the beep sound and buffer it again
            beep.play();
            beep = new Audio("beep.wav"); // buffers automatically when created
            
        }
        
        // function to stop moving some obj
        function stopMoving(obj){
            obj.body.velocity.x=0;
            obj.body.velocity.y=0;
            obj.body.gravity.y = 0;
            obj.angle = 0;
            obj.body.angularVelocity=0;
        }
        
        // function to return random int in some range(min and max)
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // if game is not initialized
    
        if(initialized==false){
            
            initialized=true;

            var bg; // holding th background image 
            var bgOverlay;
            var player;
            var playerSpeed = 150;
            var boxes;
            

            // screen size getting the window size
            var width=0.8*$(window).width();
            var height=$(window).height();
            
            
            /* S O U N D S */
            
            var beep= new Audio("beep.wav"); // buffers automatically when created

            // create new Phaser Game object
            var game = new Phaser.Game( width, height, Phaser.AUTO, 'gameSpace', { preload: preload, create: create, update: update} );
        }
    }
};

                          