var sizeW = window.innerWidth * window.devicePixelRatio;
var sizeH = window.innerHeight * window.devicePixelRatio;
var game = new Phaser.Game(sizeW, sizeH, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var questionText = null;
var resultText1 = null;
var resultText2 = null;
var resultText3 = null;
var resultText4 = null;
var gameState = null;
var tNum1 = 0;
var tNum2 = 0;
var tRes1 = 0;
var tRes2 = 0;
var tRes3 = 0;
var tRes4 = 0;
var resArray = [0, 0, 0, 0];
var scoreText = null;
var score = 0;
var countText = null;
var count = 60;

function preload() {

    game.load.image('box', 'images/box.png');
    game.load.image('parcel', 'images/parcel.png');

}

function create() {
    game.stage.backgroundColor = 'rgb(63,200,207)';
    game.add.sprite(50, 150, 'parcel');

    var relW = parseInt(game.world.width / 13);
    var relH = parseInt(game.world.height / 6);
    var relS = 100;
    if (relS > relW) {
        relS = relW;
    }
    if (relS > relH) {
        relS = relH;
    }

    floor1 = game.add.sprite(game.world.width * 1 / 8, game.world.centerY * 1.5, 'box');
    floor1.scale.setTo(relS / 100);
    floor1.anchor.set(0.5);
    floor1.inputEnabled = true;
    floor1.events.onInputDown.add(evaluate1);

    floor2 = game.add.sprite(game.world.width * 3 / 8, game.world.centerY * 1.5, 'box');
    floor2.scale.setTo(relS / 100);
    floor2.anchor.set(0.5);
    floor2.inputEnabled = true;
    floor2.events.onInputDown.add(evaluate2);

    floor3 = game.add.sprite(game.world.width * 5 / 8, game.world.centerY * 1.5, 'box');
    floor3.scale.setTo(relS / 100);
    floor3.anchor.set(0.5);
    floor3.inputEnabled = true;
    floor3.events.onInputDown.add(evaluate3);

    floor4 = game.add.sprite(game.world.width * 7 / 8, game.world.centerY * 1.5, 'box');
    floor4.scale.setTo(relS / 100);
    floor4.anchor.set(0.5);
    floor4.inputEnabled = true;
    floor4.events.onInputDown.add(evaluate4);

    questionText = game.add.text(game.world.centerX, game.world.centerY / 2, '');
    resultText1 = game.add.text(game.world.width * 1 / 8, game.world.centerY * 1.5, '');
    resultText2 = game.add.text(game.world.width * 3 / 8, game.world.centerY * 1.5, '');
    resultText3 = game.add.text(game.world.width * 5 / 8, game.world.centerY * 1.5, '');
    resultText4 = game.add.text(game.world.width * 7 / 8, game.world.centerY * 1.5, '');

    scoreText = game.add.text(5, 5, '');
    countText = game.add.text(game.world.width - 50, 5, '');

    gameState = "start";

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

function update() {

    if (gameState === "start") {
        tNum1 = Math.floor((Math.random() * 12) + 1);
        tNum2 = Math.floor((Math.random() * 12) + 1);
        resArray[0] = tNum1 * tNum2;
        resArray[1] = getRandomResult();
        resArray[2] = getRandomResult();
        resArray[3] = getRandomResult();

        var newPos = Math.floor((Math.random() * 4) + 0);
        resArray[0] = resArray[newPos];
        resArray[newPos] = tNum1 * tNum2;

        gameState = "started";
    }

    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.parentIsWindow = true;
    displayText(tNum1 + " x " + tNum2, resArray[0], resArray[1], resArray[2], resArray[3]);

    if (count === 0) {
        game.time.events.stop(true);
        game.stage.backgroundColor = 'rgb(155,255,155)';

        gameState = "stopped"
    }
}

function displayText(text, result1, result2, result3, result4) {

    questionText.text = text;
    questionText.x = game.world.centerX;
    questionText.y = game.world.centerY / 2;
    questionText.anchor.set(0.5);
    questionText.align = "center";
    questionText.font = 'Arial';
    questionText.fontWeight = 'bold';
    var relW = parseInt(game.world.width / 13);
    var relH = parseInt(game.world.height / 6);
    var relS = 100;
    if (relS > relW) {
        relS = relW;
    }
    if (relS > relH) {
        relS = relH;
    }
    questionText.fontSize = relS;

    floor1.position.setTo(game.world.width * 1 / 8, game.world.centerY * 1.5);
    floor1.scale.setTo(relS / 100);
    floor1.anchor.set(0.5);

    floor2.position.setTo(game.world.width * 3 / 8, game.world.centerY * 1.5);
    floor2.scale.setTo(relS / 100);
    floor2.anchor.set(0.5);

    floor3.position.setTo(game.world.width * 5 / 8, game.world.centerY * 1.5);
    floor3.scale.setTo(relS / 100);
    floor3.anchor.set(0.5);

    floor4.position.setTo(game.world.width * 7 / 8, game.world.centerY * 1.5);
    floor4.scale.setTo(relS / 100);
    floor4.anchor.set(0.5);

    resultText1.text = result1;
    resultText1.x = game.world.width * 1 / 8;
    resultText1.y = game.world.centerY * 1.5;
    resultText1.anchor.set(0.5);
    resultText1.align = "center";
    resultText1.font = 'Arial';
    resultText1.fontWeight = 'bold';
    resultText1.fontSize = relS;

    resultText2.text = result2;
    resultText2.x = game.world.width * 3 / 8;
    resultText2.y = game.world.centerY * 1.5;
    resultText2.anchor.set(0.5);
    resultText2.align = "center";
    resultText2.font = 'Arial';
    resultText2.fontWeight = 'bold';
    resultText2.fontSize = relS;

    resultText3.text = result3;
    resultText3.x = game.world.width * 5 / 8;
    resultText3.y = game.world.centerY * 1.5;
    resultText3.anchor.set(0.5);
    resultText3.align = "center";
    resultText3.font = 'Arial';
    resultText3.fontWeight = 'bold';
    resultText3.fontSize = relS;

    resultText4.text = result4;
    resultText4.x = game.world.width * 7 / 8;
    resultText4.y = game.world.centerY * 1.5;
    resultText4.anchor.set(0.5);
    resultText4.align = "center";
    resultText4.font = 'Arial';
    resultText4.fontWeight = 'bold';
    resultText4.fontSize = relS;

    scoreText.text = "Score: " + score;
    scoreText.x = 5 * relS / 100;
    scoreText.y = 5 * relS / 100;
    scoreText.font = 'Arial';
    scoreText.fontWeight = 'bold';
    scoreText.fontSize = relS / 2;

    countText.text = "Counter: " + count;
    countText.x = game.world.width - 300 * relS / 100;
    countText.y = 5 * relS / 100;
    countText.font = 'Arial';
    countText.fontWeight = 'bold';
    countText.fontSize = relS / 2;
}

function getRandomResult() {
    var tRes = tNum1 * tNum2;
    while (resArray.indexOf(tRes) > -1) {
        tRes = (tNum1 + Math.floor((Math.random() * 3) - 1)) * (tNum2 + Math.floor((Math.random() * 3) - 1));
    }

    return tRes;
}

function evaluate1(floor1, pointer) {
    checkResult(0);
}

function evaluate2(floor1, pointer) {
    checkResult(1);
}

function evaluate3(floor1, pointer) {
    checkResult(2);
}

function evaluate4(floor1, pointer) {
    checkResult(3);
}

function checkResult(choice) {
    if (gameState !== "stopped") {
        if (resArray[choice] === tNum1 * tNum2) {
            gameState = "start";
            score++;
        } else {
            game.camera.shake(0.01, 200);
            score--;
        }
    }
}

function updateCounter() {
    count--;
}
