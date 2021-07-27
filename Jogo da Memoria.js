
/***************************************************************************
 * 
 * DESAFIE A INTELIGENCIA ARTIFICIAL
 * E TENTE SAIR VENCEDOR!!
 * 
 * O JOGADOR COMEÇA ABRINDO DUAS CARTAS,
 * DEPOIS ESPERA A JOGADA DO PROGRAMA(ATÉ QUE AS DUAS CARTAS SEJAM VIRADAS).
 * 
 * QUEM ENCONTRAR UM PAR CORRETO, CONTINUA NA JOGADA!
 * QUEM ABRIR O MAIOR NUMERO DE PARES É O VENCEDOR!
 * 
 * *************************************************************************/



/*********************** VARIAVEIS GLOBAIS *******************************/

var segundos = 0;
var minutos = 0;
var contador = true;
var tempototal;
var tempofinal;
var timefinal;
var temptime = frameCount;

var jogada = "Player";
var vencedor = false;
var pontuacaoPlayer = 0;
var pontuacaoIA = 0;

var vetorIA = [];
var cartasViradasIA = [];
var delayIA = null;
var contadorIA = 0;
var novoDelay = null;

var ladoX = 100;
var bombaSize = 50;
var bombaSpeed = 1;
var contBomba = 0;
var yBomba = 200;
var delayGameOver = null;

/**************************************************************************/



/***************** Função de tempo ****************/

var timer = function(){
    
   if(contador === true){
        
        if(temptime + 60 === frameCount){
            temptime = frameCount;
            segundos++;
        }
        
        
        if(segundos === 60){
            
            minutos++;
            segundos = 0;
        }
        
        if(minutos <= 0){
            if(segundos < 10){
                tempototal = "00:0"+segundos;
                return "00:0"+segundos;
            }else{
                tempototal = "00:"+segundos;
                return "00:"+segundos;
            }
        }
        
        else if(minutos < 10){
            if(segundos < 10){
                tempototal = "0"+minutos+":0"+segundos;
                return "0"+minutos+":0"+segundos;
            }else{
                tempototal = "0"+minutos+":"+segundos;
                return "0"+minutos+":"+segundos;
            }
        }
        
        else{
            if(segundos < 10){
                tempototal = minutos +":0"+ segundos;
                return minutos +":0"+ segundos;
            }
        }
    }
    
};

/*******************************************************/


/************ Mais variaveis Globais *******************/

var screenGame = 1;
var mod = 0;

var delayNewGame = null;

var inicio = false;

var nivel = "";

var escolha = false;

var xMensagem;

var NUM_LINHAS;
var NUM_COLUNAS;
var ESPACAMENTO;
var VARIANTE;

/*******************************************************/

/**************** Objeto de Carta *********************/

var Carta = function(x, y, face) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.color = color(168, 255, 245);
    this.face = face;
    this.isFaceUp = false;
    this.isMatch = false;
    this.virada = false;
};

Carta.prototype.draw = function() {
    
    //Estado de suspenção as cartas
    if(mouseX >= this.x - 5 && mouseX <= this.x - 5 + 50 && mouseY >= this.y - 5 && mouseY <= this.y -5 + 50){
        
        this.color = color(165, 230, 163);
        
    }else{
        
        this.color = color(168, 255, 245);
        
    }
    
    //fill
    fill(this.color);
    strokeWeight(2);
    rect(this.x - 5, this.y - 5, this.size + 10, this.size + 10, 10);
    if (this.isFaceUp) {

        image(this.face, this.x, this.y, this.size, this.size);

    } else {

        image(getImage("avatars/questionmark"), this.x, this.y, this.size, this.size);

    }

};

Carta.prototype.isUnderMouse = function(x, y) {
    
    return x >= this.x && x <= this.x + this.size  &&
    y >= this.y && y <= this.y + this.size;
    

};

/*******************************************************/


/****************** Objeto de botão ********************/

var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.color = config.color || color(0, 234, 255);
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};


Button.prototype.draw = function() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    textAlign(LEFT, TOP);
    text(this.label, this.x+10, this.y+this.height/4);
};


Button.prototype.isMouseInside = function() {
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};


Button.prototype.handleMousePressed = function() {
    if (this.isMouseInside()) {
        this.onClick();
    }
};

/********************************************************/


/**************** variaveis do tabuleiro **************/

var NUM_COLUNAS = 0;
var NUM_LINHAS = 0;
var faces = [];
var possiveisFaces;
var selecao = [];

var cartas = [];
var cartaX;
var cartaY;
var cartaFace;

/********************************************************/


/*********** Função que embaralha o vetor **************/

var embaralharArray = function(array) {
    
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {

        // Escolha um índice aleatório
        var ind = Math.floor(Math.random() * counter);
        
        counter--;

        // And swap the last element with it
        var temp = array[counter];

        array[counter] = array[ind];

        array[ind] = temp;

    }

};

/********************************************************/


/********************************************************/
var btnEasy = new Button({
    x: 70,
    y: 45,
    width: 60,
    height: 40,
    label: "Easy",
    onClick: function() {
        escolha = true;
        nivel = "Easy";
    }
});
var btnHard = new Button({
    x: 70,
    y: 100,
    width: 60,
    height: 40,
    label: "Hard",
    onClick: function() {
        escolha = true;
        nivel = "Hard";
    }
});
var btnNovo = new Button({
    x: 185,
    y: 70,
    width: 120,
    height: 40,
    label: "NOVO JOGO",
    onClick: function() {
        
        contador = true;
        
        if(escolha === false){
            
            xMensagem = 150;
            
        }
        else{
            
            if(nivel === "Easy"){
                //5
                NUM_COLUNAS = 5;
                //4
                NUM_LINHAS = 4;
                
                ESPACAMENTO = 75;
                
                VARIANTE = 10;
                
            }
            
            if(nivel === "Hard"){
                
                NUM_COLUNAS = 6;
                //4
                NUM_LINHAS = 5;
                
                ESPACAMENTO = 65;
                
                VARIANTE = 0;
            }
            
        
            segundos = 0;
            minutos = 0;
            frameCount = 0;
            delayNewGame = frameCount;
            screenGame = 2;
            
            
    
    
            // Declarando um array com todas as faces posssiveis
           faces = [
                getImage("space/star"),
                getImage("space/healthheart"),
                getImage("cute/EnemyBug"),
                getImage("cute/GemBlue"),
                getImage("creatures/Winston"),
                getImage("creatures/Hopper-Cool"),
                getImage("avatars/robot_female_3"),
                getImage("avatars/piceratops-tree"),
                getImage("avatars/orange-juice-squid"),
                getImage("avatars/duskpin-ultimate"),
                getImage("avatars/spunky-sam"),
                getImage("avatars/aqualine-seed"),
                getImage("avatars/aqualine-seedling"),
                getImage("avatars/robot_male_3"),
                getImage("avatars/robot_male_2"),
                getImage("avatars/robot_male_1")
            ];
    
            // Faça uma matriz com 2 de cada, e então randomize-a
            possiveisFaces = faces.slice(0);
    
    
            for (var i = 0; i < (NUM_COLUNAS * NUM_LINHAS) / 2; i++) {
            
                // Escolha aleatoriamente uma das faces restantes
                var randomInd = floor(random(possiveisFaces.length));
                
                var face = possiveisFaces[randomInd];
                // Push twice onto array
                selecao.push(face);
                selecao.push(face);
            
                // Remover da matriz
                possiveisFaces.splice(randomInd, 1);
            }
    
            // Agora embaralhe os elementos desse array
            embaralharArray(selecao);
    
    
            //criacao das cartas
            for (var i = 0; i < NUM_COLUNAS; i++) {
                for (var j = 0; j < NUM_LINHAS; j++) {
                    var cartaX = i * ESPACAMENTO + 15 + VARIANTE;
                    var cartaY = j * ESPACAMENTO + 45 + VARIANTE;
                    var cartaFace = selecao.pop();
                    cartas.push(new Carta(cartaX, cartaY, cartaFace));
                }
            }
        }
    }
});
/**********************************************************/


/***************************/
var numAcertos = 0;
var cartasViradas = [];
var delayStartFC = null;
/***************************/


/******************* Mouse Clicked ***********************/

mouseClicked = function() {
    
    if (jogada === "Player") {
    
        mod = 0;
        
        for (var i = 0; i < cartas.length; i++) {
            
            var carta = cartas[i];
            
            if (carta.isUnderMouse(mouseX, mouseY)) {
                
                if (cartasViradas.length < 2 && !carta.isFaceUp && inicio && jogada === "Player") {
                    carta.isFaceUp = true;
                    
                    cartasViradas.push(carta);
                    
                    
                    carta.virada = true; //ATRIBUTO QUE TODA CARTA VIRADA TERÁ
                    
                    
                    if (cartasViradas.length === 2) {
                        
                        vetorIA = [];
                        
                        if (cartasViradas[0].face === cartasViradas[1].face) {
                            cartasViradas[0].isMatch = true;
                            cartasViradas[1].isMatch = true;
                            cartasViradas.length = 0;
                            pontuacaoPlayer++;
                            numAcertos++;
                            
                        }else{
                            
                            cartasViradasIA = [];
                            
                            contadorIA = 0;
                            
                            jogada = "IA";
                            
                            mod = 1;
                            
                        }
                        
                        delayStartFC = frameCount;
                    }
                } 
            }
        }
    }
};

/**********************************************************/

/***********************************************************/

var btnReturn = new Button({
    x: 320,
    y: 5,
    width: 75,
    height: 28,
    color: color(235, 228, 171),
    label: "Voltar",
    onClick: function() {
        
        pontuacaoPlayer = 0;
        pontuacaoIA = 0;
        
        vetorIA = [];
        cartasViradasIA = [];
        delayIA = null;
        contadorIA = 0;
        novoDelay = null;
        
        
        tempototal = 0;
        tempofinal = 0;
        timefinal = 0;
        temptime = 0;
        
        cartasViradas.length = 0;
        jogada = "Player";
        NUM_LINHAS = 0;
        NUM_COLUNAS = 0;
        
        segundos = 0;
        minutos = 0;
        frameCount = 0;
        screenGame = 1;
        
        // Declarando um array com todas as faces posssiveis
        faces = [
        getImage("space/star"),
        getImage("space/healthheart"),
        getImage("cute/EnemyBug"),
        getImage("cute/GemBlue"),
        getImage("creatures/Winston"),
        getImage("creatures/Hopper-Cool"),
        getImage("avatars/robot_female_3"),
        getImage("avatars/piceratops-tree"),
        getImage("avatars/orange-juice-squid"),
        getImage("avatars/duskpin-ultimate"),
        getImage("avatars/spunky-sam"),
        getImage("avatars/aqualine-seed"),
        getImage("avatars/aqualine-seedling"),
        getImage("avatars/robot_male_3"),
        getImage("avatars/robot_male_2"),
        getImage("avatars/robot_male_1")
    ];
    
        // Faça uma matriz com 2 de cada, e então randomize-a
        possiveisFaces = faces.slice(0);
        
        selecao = [];

        for (var p = 0; p < (NUM_COLUNAS * NUM_LINHAS) / 2; p++) {
        
            // Escolha aleatoriamente uma das faces restantes
            var randomInd = floor(random(possiveisFaces.length));
            
            var face = possiveisFaces[randomInd];
            // Push twice onto array
            selecao.push(face);
            selecao.push(face);
        
            // Remover da matriz
            possiveisFaces.splice(randomInd, 1);
        }
        
        embaralharArray(selecao);

        // Criação das cartas
        cartas = [];
        
        for (var k = 0; k < NUM_COLUNAS; k++) {
            for (var n = 0; n < NUM_LINHAS; n++) {
                cartaX = k * 75 + 15;
                cartaY = n * 75 + 50;
                cartaFace = selecao.pop();
                cartas.push(new Carta(cartaX, cartaY, cartaFace));
            }
        }
        
        numAcertos = 0;
        cartasViradas = [];
        delayStartFC = null;
    }
});

/***********************************************************/


/***************** Tela inicial do game *********************/

var telaInicial = function (){
    
    inicio = false;
    
    mousePressed = function() {
        btnNovo.handleMousePressed();
        btnEasy.handleMousePressed();
        btnHard.handleMousePressed();
    };

    background(0, 199, 43);
    
    
    var faces = [
        getImage("space/star"),
        getImage("space/healthheart"),
        getImage("cute/EnemyBug"),
        getImage("cute/GemBlue"),
        getImage("creatures/Winston"),
        getImage("creatures/Hopper-Cool"),
        getImage("avatars/robot_female_3"),
        getImage("avatars/piceratops-tree"),
        getImage("avatars/orange-juice-squid"),
        getImage("avatars/duskpin-ultimate"),
        getImage("avatars/spunky-sam"),
        getImage("avatars/aqualine-seed"),
        getImage("avatars/aqualine-seedling"),
        getImage("avatars/robot_male_3"),
        getImage("avatars/robot_male_2"),
        getImage("avatars/robot_male_1")
    ];
    
    var positionsXcartas = [];
    
    for(var x = 0; x < 16; x++){
        positionsXcartas.push(20 * x);
    }
    
    
    fill(168, 255, 245);
    strokeWeight(2);
    
    for(var i = 0; i < 8; i++){
        rotate(30);
        rect(positionsXcartas[i] + 75, 140 , 60, 60, 10);
        image(faces[i], positionsXcartas[i] + 80, 145, 50, 50);
        rotate(-32);
    }  
    

    for(var i = 8; i < 16; i++){
        rotate(30);
        rect(positionsXcartas[i] + 75, 145, 60, 60, 10);
        image(faces[i], positionsXcartas[i] + 80, 150, 50, 50);
        rotate(-32);
    }  
    
    
    rotate(32);
    var f = createFont("monospace");
    textFont(f, 45);
    fill(255, 255, 255);
    text("JOGO DA MEMORIA", 15, 300);
    
    btnNovo.draw();
    btnEasy.draw();
    btnHard.draw();
    
    text("Escolha um nível!!", xMensagem, 20);
    
    
    
    
};

/************************************************************/



/******************** Tela de GAME OVER *********************/

var gameOver = function (){
    
    background (0);
    
    stroke (255, 255, 255);
    strokeWeight (5);
    
    fill(0);
    rect (ladoX, 58, 200, 60, 20);
    
    fill(255, 255, 255);
    textSize (28);
    text ("GAME OVER", ladoX + 25, 75);
    
    textSize (bombaSize); //Minimo de 50 e máximo de 240
    text("💣",100,yBomba);
    
    ladoX -= 1;
    
    bombaSize += bombaSpeed;
    
    if (ladoX < -235){
        
        ladoX = 410;
        
    }
    
    
    if (contBomba < 3){
        
        if (bombaSize > 200){
            
        contBomba++;
        bombaSpeed = -2.5;
        
    }
    
        if (bombaSize < 80){
            
            bombaSpeed = 2.5;
            
        }
    
    }else{
        
        yBomba = -300;
        
    }
    
    if (contBomba >= 3 && contBomba <= 30){
        
        textSize(250);
        text("💥",100,200);
        contBomba++;
        
    }else if (contBomba === 31){
        textSize(20);
        text("Duração: " + tempofinal, 90, 160);
        text("Pontuação IA: " + pontuacaoIA, 75, 200);
        text("Jogador: " + pontuacaoPlayer, 124, 240);
        
    }
    
    noStroke();
    btnReturn.draw();

};

/*************************************************************/


/********************* TELA DE JOGO **************************/

var Game = function() {
    
    xMensagem = -500;
    escolha = false;
    
    mousePressed = function() {
        
        btnReturn.handleMousePressed();
        
    };
    
    background(232, 135, 0);
    
    if (delayStartFC && (frameCount - delayStartFC) > 90) {

        for (var i = 0; i < cartas.length; i++) {
            var carta = cartas[i];
            if (!carta.isMatch) {
                carta.isFaceUp = false;
            }
        }

        cartasViradas = [];
        delayStartFC = null;
        screenGame = screenGame + mod;
        contadorIA = 0;
        delayIA = frameCount;
        
    }
    
    for (var k = 0; k < cartas.length; k++) {
        cartas[k].draw();
    }
    
    
    if (numAcertos === cartas.length/2) {
        
        fill(255, 255, 255);
        textSize(20);
        
        if(pontuacaoPlayer > pontuacaoIA){
            
            if(vencedor === false){
                timefinal = tempototal;
                vencedor = true;
            }

            text("YOU WIN!!", 20, 375);
            
            text("TEMPO: " + timefinal, 123, 8 );
            text("JOGADOR:" + pontuacaoPlayer + " / MÁQUINA:" + pontuacaoIA, 148, 375);
            
        }else{
            
            screenGame = 4;
            mod = 0;
            delayGameOver = frameCount;
            tempofinal = tempototal;
        
        }
        
        contadorIA = 2;
        
    }
    
    btnReturn.draw();
    
};

/*************************************************************/


/************ FUNÇÃO QUE FAZ A JOGADA DO PROGRAMA ************/

var jogadaIA = function(){
    
    var etapa = 0;
    
    if (numAcertos === cartas.length/2) {
        screenGame = 2;
    }
    
    /********** INICIO DA JOGADA *********/
    if(contadorIA < 1){
        
        for (var u = 0; u < cartas.length; u++) {
            
/**** AQUI O PROGRAMA VERIFICA TODAS AS POSSIVEIS CARTAS QUE ELE PODE VIRAR ***/
            if (cartas[u].isFaceUp === false) {
                vetorIA.push(cartas[u]);
                    
            }
        }
    }
    
    /*********** contadorIA É A VARIAVEL QUE CARREGA QUANTAS CARTAS O PROGRAMA VIROU ****/
    if(contadorIA < 1){
        
        var rand = floor(random(vetorIA.length));
        
        /***** A PRIMEIRA CARTA É VIRADA ALEATORIAMENTE ****/
        vetorIA[rand].isFaceUp = true;
        vetorIA[rand].virada = true;
        
        /**** ADICIONA AO VETOR DE CARTAS VIRADAS DA IA ****/
        cartasViradasIA.push(vetorIA[rand]);
        
        contadorIA++;
        
        vetorIA = [];
        
        /***** CASO ELE TENHA VIRADO APENAS 1 CARTA ATÉ O MOMENTO ****/
        if(contadorIA === 1){
            
            /******* FAZ UMA PRIMEIRA VERIFICAÇÃO EM TODAS AS CARTAS QUE 
             * EM ALGUM MOMENTO JA FORAM ABERTAS NO JOGO cartas.virada === true 
             E ADICIONA TODAS ESSAS POSSIVEIS CARTAS EM UM VETOR DE INTELIGENCIA ****/
            for (var p = 0; p < cartas.length; p++) {
                
                if(cartas[p].virada === true && cartas[p].isFaceUp === false){
                    
                    vetorIA.push(cartas[p]);
                    
                }
            }
            
            /************************************************************************
             * AQUI É ONDE SE PERCORRE TODO O VETOR DAS CARTAS DA ETAPA ANTERIOR
             * E CASO A PRIMEIRA CARTA ABERTA(ALEATORIAMENTE) ESTEJA NESSE VETOR DE CARTAS
             * QUE JA FORAM VISTAS DURANTE O JOGO, O PROGRAMA DA MATCH
             * E INTELIGENTEMENTE ABRE A CARTA CORRESPONDENTE
             * **********************************************************************/
            for(var m = 0; m < vetorIA.length; m++){
                
                if(cartasViradasIA[0].face === vetorIA[m].face && vetorIA[m].isFaceUp === false){
                    vetorIA[m].isFaceUp = true;
                    
                    cartasViradasIA.push(vetorIA[m]);
                }
                
            }
            
        }
        
        etapa = 1;
        vetorIA = [];
    }
        
    
    /**********************************************************************
     * AQUI, CASO O PROGRAMA NAO TENHA VISTO AINDA 
     * UMA CARTA COM A MESMA FACE DA PRIMEIRA CARTA ABERTA ALEATORIAMENTE
     * ELE ABRE UMA SEGUNDA CARTA DE FORMA ALEATORIA, COMO QUALQUER JOGADOR
     * *********************************************************************/
    if(cartasViradasIA.length < 2 && etapa === 1){
        
        for (var v = 0; v < cartas.length; v++) {
            
            if (cartas[v].isFaceUp === false) {
                vetorIA.push(cartas[v]);
            }
        }
                    
        var rand2 = floor(random(vetorIA.length));
        
        vetorIA[rand2].isFaceUp = true;
        
        vetorIA[rand2].virada = true;
            
        cartasViradasIA.push(vetorIA[rand2]);
                
        vetorIA = [];
                    
    }
        /************ CONFIRMA SE A PRIMEIRA CARTA ABERTA PELO PROGRAMA
         * É REALMENTE IGUAL A SEGUNDA CARTA *****************************/
        if (cartasViradasIA[0].face === cartasViradasIA[1].face) {
                
                cartasViradasIA[0].isMatch = true;
                cartasViradasIA[1].isMatch = true;
                //cartasViradasIA.length = 0;
                delayStartFC = frameCount;
                delayNewGame = frameCount;
                pontuacaoIA++;
                numAcertos++;
                screenGame = 2;
                mod = 1;
                cartasViradasIA = [];
                
        }else{
        
            novoDelay = frameCount;
            screenGame = 2;
            mod = 0;
            jogada = "Player";
            delayStartFC = frameCount;
            delayNewGame = frameCount;
            cartasViradasIA = [];
            
        }
    
};

/***************************************************************/


/*********** FUNÇÃO DRAW QUE PERCORRE TODO O CÓGIGO ***********/

draw = function() {
    
    timer();
    
    
    if(screenGame === 1){
        
        telaInicial();
        
    }else if (screenGame === 2){
        

        if (frameCount - delayNewGame > 20) {
            
            inicio = true;
            
            Game();
            
        }
        
    }else if (screenGame === 3){
        
        
        if(frameCount - delayNewGame > 60) {
            
            jogadaIA();
        
        }
        
    }else{
        
        if(frameCount - delayGameOver > 60){
            
            gameOver();
            
        }
        
    }
    
};

/***************************************************************/
