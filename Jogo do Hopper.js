
/*********************************************
 *  GAME ADVENTURE HOPPER
 * _______________________
 * 
 * 
 * MISSÃO: CONQUISTAR 35 PONTOS EM CADA NIVEL.
 * 
 * 1 GRAVETO = 1 PONTO.
 * 1 CHAVE = 3 PONTOS. (SÓ EXISTE 1 CHAVE POR NÍVEL)
 * 
 * AO ENCOSTAR NOS INIMIGOS VOCÊ PERDE 1 PONTO.
 * 
 * POR PADRÃO O JOGO SE INICIA NO NIVEL EASY E SEM SOM.
 * 
 * NO MENU OPÇÕES VOCÊ ESCOLHE A OPÇÃO DE NIVEL EASY, HARD OU HELL
 * ESCOLHE TAMBÉM A OPÇÃO DE JOGAR COM SOM OU NÃO.
 * 
 * OBS: A CADA NÍVEL(EASY OU HARD) CONQUISTADO VOCÊ GANHA MAIS +1 VIDA.
 * PORTANTO COMEÇANDO DO INÍCIO E VENCENDO, VOCE TEM MAIS CHANCES AO CHEGAR NO ÚLTIMO NÍVEL.
 * 
 * UTILIZE "ESPAÇO" PARA PULAR!
 * 
 * 
 * BOM JOGO!
 * ******************************************/



/**** Variáveis básicas do projeto ****/
//mudança de tela
var screenGame = 0; 
var sound = false;
var nivel = "Easy";
var life = 1;
/******************************************/


/****** Função construtora do hopper ******/
var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
};
/******************************************/


/************ Draw Hopper **************/
Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.x = constrain(this.x, 0, 370);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};
/******************************************/


/** Função que faz o movimento de subida do Hopper **/
Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};
/*****************************************************/


/************* Descida do Hopper ********************/
Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};
/*****************************************************/


/********* Checa se o Hopper pegou o stick ************/
Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
            if(sound === true){
                playSound(getSound("retro/coin"));
            }
            stick.y = -400;
            this.sticks++;
    }
};
/*********************************************************/


/********** Checa se o Hopper pegou a chave ****************/
Beaver.prototype.checkForKeyGrab = function(key1){
    if ((key1.x >= this.x - 20  && key1.x <= (this.x + 20)) &&
        (key1.y >= this.y - 20  && key1.y <= (this.y + 20))) {
            if(sound === true){
                playSound(getSound("retro/coin"));
            }
            key1.y = -400;
            this.sticks = this.sticks + 3;
    }
};
/***********************************************************/


/******** Função que checa se atingimos os obstaculos **********/
Beaver.prototype.checkForInimigos = function(inimigo){
    if ((inimigo.x >= this.x - 20 && inimigo.x <= this.x + 20) &&
        (inimigo.y >= this.y - 20 && inimigo.y <= this.y + 20)) {
            if(sound === true){
                playSound(getSound("retro/boom1"));
            }
            inimigo.y = -400;
            this.sticks--;
        }
};
/****************************************************************/


/******************* Construtor dos Sticks *********************/
var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};
/****************************************************************/


/************************* Stick draw ***************************/
Stick.prototype.draw = function() {
    fill(237, 14, 59);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};
/*****************************************************************/


/************************* construtor da chave *******************/
var Key = function(x, y){
    this.x = x;
    this.y = y;
};
/*******************************************************************/


/**************************** key draw ****************************/
Key.prototype.draw = function() {
    image(getImage("cute/Key"), this.x, this.y, 50, 50);
};
/******************************************************************/



/******************* Construtor dos obstáculos ********************/
var inimigo = function(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
};
/*******************************************************************/


/************************* Obstáculos draw **************************/
inimigo.prototype.draw = function() {
     image(this.img, this.x, this.y, 40, 40);
};
/*******************************************************************/


/**************** Chamada do Hopper **********************************/
var beaver = new Beaver(120, 300);
/*******************************************************************/


/**************** Chamada da chave(5 pontos no game) **************/
var key1 = new Key(random(1000, 3000), random(20, 300));
/*******************************************************************/


/************* Alimenta um vetor de objetos stick *******************/
var sticks = [];
for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 25 + 400, random(20, 260)));
}
/**********************************************************************/


/******************* Alimenta os vetores de obstaculos *********************/
var inimigo1 = [];
for (var j = 0; j < 8; j++){
    inimigo1.push(new inimigo(j * 250 + 500, random(20, 260), getImage("avatars/aqualine-ultimate")));
}

var inimigo2 = [];
for (var j = 0; j < 12; j++){
    inimigo2.push(new inimigo(j * 300 + 600, random(20, 260), getImage("avatars/leafers-sapling")));
}

var inimigo3 = [];
for (var j = 0; j < 16; j++){
    inimigo3.push(new inimigo(j * 300 + 700, random(20, 260), getImage("avatars/piceratops-ultimate")));
}
/*****************************************************************************/



/***************************** grama da tela ********************************/
var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}
/*****************************************************************************/


/*******************ELEMENTOS CENARIOS *****************/
var nuvensXs = [];
for (var i = 0; i < 6; i++) { 
    nuvensXs.push(i*150);
}

var arvoresCenario1 = [];
for(var i = 0; i < 10; i++){
    arvoresCenario1.push(i * 80);
}

var chuvaCenario2X = [];
var chuvaCenario2Y = [];

for(var i = 0; i < 50; i++){
    chuvaCenario2X.push(random(0, 390));
    chuvaCenario2Y.push(random(-50, 400));
}
/**********************************************************/



/***********************************************************************/
/***************************** BOTOES ***********************************/

/****************** Construtores **************************/
var Button = function(config){
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 120;
    this.height = config.height || 50;
    this.label = config.label || "Click";
    this.color = config.color || color(0, 234, 255);
    this.onClick = config.onClick || function(){};
};


Button.prototype.draw = function() {
     fill(this.color);
     rect(this.x, this.y, this.width, this.height, 5);
     fill(255,255,255);
     textSize(20);
     textAlign(LEFT, TOP);
     text(this.label, this.x, this.y + this.height/4);
};


Button.prototype.isMouseInside = function() {
    
    return mouseX > this.x - 5 &&
           mouseX < (this.x + this.width) + 5 &&
           mouseY > this.y - 5 &&
           mouseY < (this.y + this.height) + 5;
           
};


Button.prototype.handleMouseClick = function() {
    
    if (this.isMouseInside()) {
        this.onClick();
        
    }
};

/*************************************************************/


/************* Criações ****************************/
var btnPlay = new Button({
    x: 27,
    y: 146,
    width: 100,
    label: "\t\t\t\tPLAY",
    color: color(247, 162, 24),
    onClick: function() {
        screenGame = 1;
    }
}); 

var btnOptions = new Button({
    x: 27,
    y: 218,
    width: 100,
    label: "\tOPTIONS",
    color: color(227, 220, 13),
    onClick: function() {
        screenGame = 2;
    }
});

var btnOptionsConfirm = new Button({
    x: 180,
    y: 332,
    width: 60,
    height: 40,
    label: "\t\t OK",
    color: color(102, 44, 5),
    onClick: function() {
        screenGame = 0;
    }
});

var btnSoundYes = new Button({
    x: 153,
    y: 150,
    width: 50,
    height: 40,
    label: "\tYes",
    color: color(227, 220, 13, 50),
    onClick: function() {
        sound = true;
        this.color = (0);
    }
});

var btnSoundNo = new Button({
    x: 225,
    y: 150,
    width: 50,
    height: 40,
    label: "\tNo",
    color: color(0),
    onClick: function() {
        sound = false;
        this.color = (0);
    }
});

var btnEasy = new Button({
    x: 134,
    y: 234,
    width: 60,
    height: 40,
    label: "\tEasy",
    color: color(0),
    onClick: function() {
        nivel = "Easy";
        this.color = (0);
    }
});

var btnHard = new Button({
    x: 206,
    y: 234,
    width: 60,
    height: 40,
    label: "\tHard",
    color: color(227, 220, 13, 50),
    onClick: function() {
        nivel = "Hard";
        this.color = color(0);
    }
});

var btnHell = new Button({
    x: 281,
    y: 234,
    width: 50,
    height: 40,
    label: "\tHell",
    color: color(227, 220, 13, 50),
    onClick: function() {
        nivel = "Hell";
        this.color = color(0);
    }
});

var btnNext = new Button({
    x: 330,
    y: 55,
    width: 25,
    height: 15,
    label: " ",
    color: color(0),
    onClick: function() {
        
        life = life + 1;
        
        sticks = [];
        
        for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 25 + 400, random(20, 260)));}
    
        inimigo1 = [];
        for (var j = 0; j < 8; j++){
    inimigo1.push(new inimigo(j * 250 + 500, random(20, 260), getImage("avatars/aqualine-ultimate")));}
    
        inimigo2 = [];
        for (var j = 0; j < 8; j++){
    inimigo2.push(new inimigo(j * 300 + 600, random(20, 260), getImage("avatars/leafers-sapling")));}
    
        inimigo3 = [];
        for (var j = 0; j < 10; j++){
    inimigo3.push(new inimigo(j * 300 + 700, random(20, 260), getImage("avatars/piceratops-ultimate")));}
    
    
        key1 = new Key(random(1000, 1500), random(20, 350));
    
        beaver.sticks = 0;
        if(nivel === "Easy"){
            nivel = "Hard";
        }else if(nivel === "Hard"){
            nivel = "Hell";
        }
        screenGame = 1;
    }
});

var btnReturn = new Button({
    x: 80,
    y: 350,
    width: 50,
    height: 25,
    label: " ",
    color: color(240, 239, 223),
    onClick: function() {
        
        life --;
        
        beaver.sticks = 0;
        
        sticks = [];
        
        for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 25 + 400, random(20, 260)));}
    
        inimigo1 = [];
        for (var j = 0; j < 8; j++){
    inimigo1.push(new inimigo(j * 250 + 500, random(20, 260), getImage("avatars/aqualine-ultimate")));}
    
        inimigo2 = [];
        for (var j = 0; j < 8; j++){
    inimigo2.push(new inimigo(j * 300 + 600, random(20, 260), getImage("avatars/leafers-sapling")));}
    
        inimigo3 = [];
        for (var j = 0; j < 12; j++){
    inimigo3.push(new inimigo(j * 300 + 700, random(20, 260), getImage("avatars/piceratops-ultimate")));}
    
    
        key1 = new Key(random(1000, 1500), random(20, 350));
    
        screenGame = 1;
    }
});

/*************************************************************/

/********************** Mouse Clicked **************************/
mouseClicked = function() {
    
    btnPlay.handleMouseClick();
    btnOptions.handleMouseClick();
    btnOptionsConfirm.handleMouseClick();
    btnSoundYes.handleMouseClick();
    btnSoundNo.handleMouseClick();
    btnEasy.handleMouseClick();
    btnHard.handleMouseClick();
    btnHell.handleMouseClick();
    btnNext.handleMouseClick();
    btnReturn.handleMouseClick();
    
};
/*************************************************************/

/******************************* FIM BOTOES *************************************/
/********************************************************************************/



/************************ Tela inicial *********************/
var telaPrincipal = function(){
    
    btnPlay.y = 146;
    btnOptions.y = 218;
    
    /** CHAO MARRON **/
    background(0, 212, 235);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    stroke(255,255,255);
    strokeWeight(2);
    
    btnPlay.draw();
    btnOptions.draw();
    
    /** GRAMA **/
    for (var i = 0; i < grassXs.length; i++) {
            noStroke();
            image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
            grassXs[i] -= 1;
            if (grassXs[i] <= -20) {
                grassXs[i] = width;
            }
    }
    
    image(getImage("creatures/Hopper-Happy"), 175, 161, 300, 300);
    
    fill(255, 255, 255);
    //textFont(createFont("Brush Script MT"), 60);
    textSize(40);
    text("Adventure Hopper", 25, 21);
    
};
/***********************************************************/


/******************** Menu de Opções ***********************/
var telaOptions = function(){
    
    btnPlay.y = -10;
    btnOptions.y = -10;
    
    if(sound === true){
        
        btnSoundNo.color = color(227, 220, 13, 50);
        
    }else{
        
        btnSoundYes.color = color(227, 220, 13, 50);
        
    }
    
    
    if(nivel === "Easy"){
        
        btnHard.color = color(227, 220, 13, 50);
        btnHell.color = color(227, 220, 13, 50);
        
    }else if(nivel === "Hard"){
        
        btnEasy.color = color(227, 220, 13, 50);
        btnHell.color = color(227, 220, 13, 50);
        
    }else{
        
        btnEasy.color = color(227, 220, 13, 50);
        btnHard.color = color(227, 220, 13, 50);
        
    }
    
    background(139,69,19);
    image(getImage("cute/ShadowNorth"), 0, -50, 400, 700);
    
    noStroke();
    fill(217, 188, 0, 50);
    rect(50, 60, 300, 300, 10);
    
    fill(255, 186, 13, 200);
    rect(130, 40, 140, 60, 10);
    
    textFont(createFont("Verdana (sans-serif)"), 60);
    fill(255,255,255);
    textSize(20);
    text("OPTIONS", 155, 57);
    
    textSize(16);
    text("SOUND:", 65, 165);
    text("LEVEL:", 68, 246);
    
    btnSoundYes.draw();
    btnSoundNo.draw();
    btnEasy.draw();
    btnHard.draw();
    btnHell.draw();
    btnOptionsConfirm.draw();
    
};
/**********************************************************/


/***************** Tela de jogo ***************************/
var game = function(){
    
    btnPlay.y = -10;
    btnOptions.y = -10;
    btnOptionsConfirm.y = -10;
    btnSoundNo.y = -10;
    btnSoundYes.y = -10;
    btnEasy.y = -10;
    btnHard.y = -10;
    btnHell.y = -10;
    btnNext.y = -10;
    
    noStroke();
    // static
    
    if(nivel === "Easy"){
        
        background(117, 241, 255);
        textSize(100);
        fill(235, 206, 14);
        text("☀", 320, -10);
        
        for (var i = 0; i < arvoresCenario1.length; i++){
            
            textSize(150);
            
            if(i === 0 || i === 3 || i === 6 || i === 9){
                
                text("🌴", arvoresCenario1[i],  190);
                
            }else if(i === 1 || i === 4 || i === 7 || i === 10){
                
                text("🌳", arvoresCenario1[i],  190);
                 
            }else{
                text("🌲", arvoresCenario1[i],  190);
            }
            
            arvoresCenario1[i] -=1;
            
            if (arvoresCenario1[i] <= -200) {
                arvoresCenario1[i] = width + 200;
            }   
        
        }
        
        
        
    }else if(nivel === "Hard"){
        
        background(115, 67, 74);
        
        for (var i = 0; i < chuvaCenario2X.length; i++){
            
            fill(27, 212, 190);
            
            
            ellipse(chuvaCenario2X[i], chuvaCenario2Y[i], 5, 10);
            
            chuvaCenario2Y[i] += 5;
            
            if (chuvaCenario2Y[i] >= 500) {
                chuvaCenario2Y[i] = -50;
            }
            
        }
        
        
    }else{
        
        background(0);
        textSize(150);
        fill(255,255,255);
        
        for(var i = 0; i < nuvensXs.length; i++){
            
            if(i % 2 === 0){
                
                text("☁", nuvensXs[i],  0);
                
            }else{
            
                text("☁", nuvensXs[i],  10);
            
                }
                
            nuvensXs[i] --;
            
            if(nuvensXs[i] < -300){
                nuvensXs[i] = 900;
            }
        
        }
    }
    
    
    
    fill(130, 79, 43);
    //rectMode(CORNER);
    rect(0, height*0.95, width+400, height*0.10);
    
        
    for (var i = 0; i < grassXs.length; i++) {
        
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
        
    }
        
    for (var i = 0; i < sticks.length; i++) {
        
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
        
    }
    
    
    key1.draw();
    beaver.checkForKeyGrab(key1);
    key1.x -= 3;
        
    /*******************Início inimigos ****************************/
        
    if(nivel === "Hell"){
        
        for (var i = 0; i < inimigo3.length; i++) {
                
            inimigo3[i].draw();
            beaver.checkForInimigos(inimigo3[i]);
            inimigo3[i].x -= 2.5;
        }
        
        for (var h = 0; h < inimigo2.length; h++) {
                
            inimigo2[h].draw();
            beaver.checkForInimigos(inimigo2[h]);
            inimigo2[h].x -= 2.0;
            
        }
        
    } 
    
    if(nivel === "Hard"){
            
        for (var h = 0; h < inimigo2.length; h++) {
                
            inimigo2[h].draw();
            beaver.checkForInimigos(inimigo2[h]);
            inimigo2[h].x -= 2.0;
            
        }
        
    }
        
    for (var e = 0; e < inimigo1.length; e++) {
        
        inimigo1[e].draw();
        beaver.checkForInimigos(inimigo1[e]);
        inimigo1[e].x -= 1.5;
    }
    
    /******************* FIM INIMIGOS ****************************/
        
    fill(255, 255, 255);
    textSize(18);
    text("SCORE: " + beaver.sticks, 10, 20);
    text("VIDAS: " + life, 10, 40);
        
    if (keyIsPressed && key.code === 32) {
        
        beaver.hop();
        
    } else if (keyIsPressed && keyCode === UP){
        
        beaver.hop();
        
    } else if (keyIsPressed && keyCode === LEFT){
        
        beaver.x = beaver.x - 3;
        
    } else if (keyIsPressed && keyCode === RIGHT){
        
        beaver.x = beaver.x + 3;
        
    } else {
        
        beaver.fall();
        
    }
    
    
    //if (beaver.sticks/sticks.length >= 0.95) {
    if(beaver.sticks >= 35 && (sticks[sticks.length-1].x < -10 && inimigo1[inimigo1.length-1].x < -10)){
        
        if(nivel === "Easy" || nivel === "Hard"){
            
            fill(0);
            textSize(40);
            text("YOU WIN!!!!", 80, 140);
            btnNext.y = 157;
            btnNext.draw();
            fill(0);
            triangle(330, 141, 352, 156, 330, 175);
            
        }else{
            
            
            fill(255,255,255);
            textSize(20);
            textFont(createFont("Arial (sans-serif)"), 20);
            text("      PARABENS !!!!", 90, 150);
            text("VOCÊ COMPLETOU O JOGO !!!!", 50, 200);
            
        }
    }
    
    beaver.draw();
    
     //if(beaver.sticks < 45 && life > 0)   
    if(beaver.sticks < 35 && (sticks[sticks.length - 1].x < -10 && inimigo1[inimigo1.length-1].x < -10)){
        
        if(life > 0){
            
            background(0);
        
            textSize(20);
            textFont(createFont("monospace"));
            fill(255,255,255);
            text("VOCE PRECISA DE 35 PONTOS!", 70, 100);
            text("SUA PONTUAÇÃO: "+ beaver.sticks, 70, 150);
            text("TENTATIVAS: " + life, 70, 200);
            btnReturn.draw();
            fill(0);
            textSize(30);
            text("<-", 62, 332);
        
        }else{
            
            background(0);
            image(getImage("creatures/OhNoes"), 118, 100);
            textSize(30);
            text("GAME OVER!", 123, 268);
           
        }
            
    }
    
    
};
/**********************************************************/


/*************** Função Draw que faz tudo acontecer *************/
draw = function() {
    
    if(screenGame === 0){
        
        telaPrincipal();
        
        
    }else if(screenGame === 1){
        
        game();
        
    }else if(screenGame === 2){
        
        telaOptions();
        
    }
    
};
/******************************************************************/


