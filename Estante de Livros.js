
//interaçao ao clicar nos livros com uma estrela(*)

//variável para verificar as trocas de tela
var verific_tela;


//vetor que guardará as cores de cada livro
var cores = [];


//Função principal com todo o código
var principal = function(){
    
    //tela principal carrega a variavel com 0
    verific_tela = 0;
    
    background(255,255,255);
    
    noStroke();
    
    //estante de livros
    fill(86,86,86);
    
    for(var e = 0; e < 4; e++){
        
        for(var j = 0; j < 2; j++){
            
            if(j % 2 === 0){
                
                rect(e * 133 + 2, 11 + j * 56, 130, 80);
                
            }else{
                
                rect(-65 + e * 133 + 2, 38 + j * 56, 128, 80);
                
            }
        }
    }
    //fim estante
    
    
    //Adiciona 25 cores(para os livros) ao vetor criado anteriormente
    for(var c = 1; c < 26; c++){
        cores.push(color(random(0,255), random(0,255), random(0,255)));
    }
    //fim for de cores
    
    
    //inicio do vetor com objetos livros
    var livros = [
        
        // ************ primeiro nicho  ************
        {x: 4 , y: 15 , altura: 75, largura: 20, cor: cores[0], rotate: 0, detalhe: 2},
        
        {x: 51 , y: 0, altura: 70, largura: 15, cor: cores[1], rotate: 20, detalhe: 1},
        
        {x: 70 , y: -4, altura: 70, largura: 10, cor: cores[2], rotate: 20, detalhe: 2},
        
        {x: 80 , y: 15, altura: 75, largura: 18, cor: cores[3], rotate: 0, detalhe: 1},
        
        {x: 101 , y: 19, altura: 70, largura: 28, cor: cores[4], rotate: 0, detalhe: 3}, 
        
        
        // ********* segundo nicho ************
        {x: 149 , y: 64, altura: 24, largura: 50, cor: cores[5]}, 
        
        {x: 154 , y: 40, altura: 19, largura: 45, cor: cores[6]}, 
        
        {x: 159 , y: 15, altura: 19, largura: 40, cor: cores[7]}, 
        
        {x: 198 , y: 51, altura: 75, largura: 15, cor: cores[8], rotate: -10, detalhe: 1},
        
        {x: 237 , y: 15, altura: 75, largura: 22, cor: cores[9], rotate: 0, detalhe: 2},
        
        
        // ************ Terceiro nicho  ************
        {x: 272 , y: 20, altura: 68, largura: 25, cor: cores[10], rotate: 0, detalhe: 2},
        
        {x: 282 , y: 93, altura: 75, largura: 15, cor: cores[11], rotate: -15, detalhe: 3},
        
        {x: 301 , y: 104, altura: 70, largura: 10, cor: cores[12], rotate: -15, detalhe: 2},
        
        {x: 348 , y: 19, altura: 70, largura: 20, cor: cores[13], rotate: 0, detalhe: 3},
        
        {x: 373 , y: 19, altura: 70, largura: 20, cor: cores[14], rotate: 0, detalhe: 3},
        
        
        // ************ quarto nicho  ************
        {x: 2 , y: 102, altura: 70, largura: 20, cor: cores[15], rotate: 0, detalhe: 1},
        
        {x: 55 , y: 89, altura: 75, largura: 10, cor: cores[16], rotate: 10, detalhe: 2},
        
        {x: 71 , y: 87, altura: 75, largura: 10, cor: cores[17], rotate: 10, detalhe: 2},
        
        
        // ************ quinto nicho  ************
        {x: 181 , y: 97, altura: 75, largura: 16, cor: cores[18], rotate: 0, detalhe: 3},
        
        {x: 177 , y: 79, altura: 70, largura: 14, cor: cores[19], rotate: 7, detalhe: 1},
        
        
        
        // ************ sexto nicho  ************
        {x: 279 , y: 149, altura: 24, largura: 50, cor: cores[20]}, 
        
        {x: 279 , y: 123, altura: 20, largura: 50, cor: cores[21]}, 
        
        {x: 289 , y: 98, altura: 18, largura: 40, cor: cores[22]}, 
        
        
        //  ************ sétimo nicho  ************
        {x: 342 , y: 97, altura: 75, largura: 25, cor: cores[23], rotate: 0, detalhe: 1},
        
        {x: 371 , y: 97, altura: 75, largura: 25, cor: cores[24], rotate: 0, detalhe: 2}
        
    ];
    //fim do vetor com objetos livros
    
    
    //inicio do laco de livros gerais
    for(var l = 0; l < livros.length; l++){
        
        //Esse if verifica quais livros tem detalhes definidos
        if(livros[l].detalhe !== undefined){
            
            //Esse if verifica quais livros tem alguma rotação
            //Caso tenha alguma rotação definida usamos a função rotate com os 
            //parametros definidos no objeto
            if(livros[l].rotate !== 0){
                rotate(livros[l].rotate);
            }
            
            //cor
            fill(livros[l].cor);
            
            //livro
            rect(livros[l].x, livros[l].y, livros[l].largura, livros[l].altura, 2);
            
            
            //detalhe 1 
            //(3 linhas na parte superior do livro)
            if(livros[l].detalhe === 1){
                
                stroke(255, 242, 199);
                strokeWeight(2);
                
                for(var d = 0; d < 3; d++){
                    
                    line(livros[l].x + 2, livros[l].y + 10 + 5 * d, livros[l].x + livros[l].largura - 2, livros[l].y + 10 + 5 * d);
                    
                }
                
                noStroke();
            }
            //fim detalhe 1
            
            
            //detalhe 2 
            //1 quadrado na parte superior + 
            //1 linha na parte inferior do livro
            if(livros[l].detalhe === 2){
                
                fill(255, 242, 199);
                
                rect(livros[l].x + 1, livros[l].y + 10, livros[l].largura - 2, livros[l].altura / 100 * 20);
                
                stroke(255, 242, 199);
                strokeWeight(4);
                
                line(livros[l].x + 2.4, livros[l].y  + 55, livros[l].x + livros[l].largura - 3, livros[l].y + 55);
                
                noStroke();
            }
            //fim detalhe 2
            
            
            //detalhe3
            //1 linha na parte superior e 1 linha na parte inferior +
            //um circulo no meio do livro
            if(livros[l].detalhe === 3){
                
                stroke(255, 242, 199);
                strokeWeight(2);
                
                for(var d = 0; d < 2; d++){
                    
                    line(livros[l].x + 1, livros[l].y + 10 + 50 * d, livros[l].x + livros[l].largura - 1.7, livros[l].y + 10 + 50 * d);
                    
                }
                
                fill(255, 242, 199);
                rect(livros[l].x + 0.5, livros[l].y + 28, livros[l].largura - 3, livros[l].altura / 100 * 15, 10);
                
            }
            //fim detalhe 3
            
            noStroke();
            
            //Volta com a rotação normal aos outros objetos do programa
            rotate(-livros[l].rotate);
            
        }
        //Fim da condicional if para os livros com algum detalhe definido
            
            
        //Para os livros que não constam o detalhe   
        //São os livros que ficam "deitados"
        if(livros[l].detalhe === undefined){
            
            stroke(livros[l].cor);
            strokeWeight(3);
            
            fill(255,255,255);
            
            ellipse(livros[l].x, livros[l].y + (livros[l].altura/2), livros[l].altura, livros[l].altura );
            
            noStroke();
            
            fill(255,255,255);
            
            rect(livros[l].x, livros[l].y, livros[l].largura, livros[l].altura, 2);
            
            for(var linhas = 0; linhas < 5; linhas ++){
                
                stroke(livros[l].cor);
                
                line(livros[l].x + 2, livros[l].y + 5 * linhas, livros[l].x + livros[l].largura, livros[l].y + 5 * linhas);
                
                noStroke();
            }
            
        }
        
    }
    //fim do laço for de livros gerais
    
    
    //inicio do vetor que apresenta os melhores livros
    var topLivros = [
        
        {x: 72 , y: 97 , altura: 75, largura: 44, cor: color(0), titulo: "Holy\nBible", autor: "KJ", indicação: true},
        
        {x: 119 , y: 97 , altura: 75, largura: 37, cor: color(136, 16, 13), titulo: "   Casais\nInteligentes\nenriquecem\n    juntos", autor: " Gustavo C.", indicação: true},
        
        {x: 205 , y: 97 , altura: 75, largura: 30, cor: color(255,255,255), titulo: "Os segredos da mente Milionária", autor: "T. Harv Eker", indicação: false},
        
        {x: 238 , y: 97 , altura: 75, largura: 28, cor:color(238, 73, 90), titulo: "PRO\nCRAS\nTIN\nAÇÃO", autor: "Lilian S", indicação: false}
        
    ];
    //fim do vetor que apresenta os melhores livros
    
    
    //inicio do laço for com os Top livros
    //São 4 livros
    for(var t = 0; t < topLivros.length; t++){
        
        fill(topLivros[t].cor);
        
        //Primeiro livro Biblia    
        if(t === 0){
            
            rect(topLivros[t].x, topLivros[t].y, topLivros[t].largura, topLivros[t].altura, 2);
            //detalhes da bíblia
            for(var h = 0; h < 2; h++){
                
                stroke(205, 212, 12);
                strokeWeight(1.6);
                
                line(topLivros[t].x + 1.5, topLivros[t].y + 8 + 32 * h, topLivros[t].x + topLivros[t].largura - 1.5, topLivros[t].y + 8 + 32 * h);
                
                line(topLivros[t].x + 1.5, topLivros[t].y + 65 + 5 * h, topLivros[t].x + topLivros[t].largura - 1.5, topLivros[t].y + 65 + 5 * h);
                
            }
            
            fill(255, 255, 255);
            textSize(11);
            text(topLivros[t].titulo, topLivros[t].x + 5, topLivros[t].y + 21);
            text(topLivros[t].autor, topLivros[t].x + 5, topLivros[t].y + 53);
            noStroke();
            //fim dos detalhes da bíblia
            
        }
        
        //Segundo livro Casais inteligentes enriquecem juntos
        else if(t === 1){
            
            rect(topLivros[t].x, topLivros[t].y, topLivros[t].largura, topLivros[t].altura, 2);
            
            fill(255, 255, 255);
            
            textSize(7.4);
            text(topLivros[t].titulo, topLivros[t].x, topLivros[t].y + 14);
            text(topLivros[t].autor, topLivros[t].x, topLivros[t].y + 67);
            
            noStroke();
            
        }
        
        //Terceiro livro os Segredos da mente milionária
        else if(t === 2){
            
            rect(topLivros[t].x, topLivros[t].y, topLivros[t].largura, topLivros[t].altura, 2);
            
            fill(18, 224, 224);
            rotate(-90);
            textSize(10);
            text(topLivros[t].titulo, topLivros[t].x - 377, topLivros[t].y + 109, 100, 200);
            
            
            textSize(8);
            fill(8, 8, 8);
            text(topLivros[t].autor, topLivros[t].x - 376, topLivros[t].y + 136);
            rotate(90);
            
        }
        
        //Quarto livro procrastinação
        else{
            
            rect(topLivros[t].x, topLivros[t].y, topLivros[t].largura, topLivros[t].altura, 2);
            
            fill(229, 237, 5);
            textSize(10);
            text(topLivros[t].titulo, topLivros[t].x, topLivros[t].y + 11);
            textSize(8);
            text(topLivros[t].autor, topLivros[t].x, topLivros[t].y + 72);
            
        }
        
        
        //Verifica quais livros tem indicação True
        if(topLivros[t].indicação === true){
            
            //Se o livro for indicável adciona uma estrela ao mesmo
            image(getImage("cute/Star"), topLivros[t].x + topLivros[t].largura - 20, topLivros[t].y + 45, 15, 15);
            
        }
        //Fim indicação
        
    }
    //fim do laço for com os Top livros
    
    
    
    //bordas cinzas da estante
    fill(137, 135, 136);
    rect(0, 178, width, 10);
    rect(0, 0, width, 10);
    //fim bordas cinzas da estante
    
    
    //inicio da parede de tijolos
    fill(234,233,225);
    for(var x = 0; x < 13; x++){
        
        rect(32 * x, 190, 30, 15, 3.5);
        
        for(var y = 0; y < 12; y++){
            
            if((x === 0 && y === 0) || (x === 2 && y === 5) || (x === 5 && y === 1) || (x === 8 && y === 3) || (x === 10 && y === 7) || (x === 5 && y === 6) || (x === 1 && y === 10) || (x === 12 && y === 11) || (x === 6 && y === 10) || (x === 10 && y === 0) || (x === 11 && y === 4)){
          
                fill(224, 218, 200);
                
            }else if((x === 1 && y === 1) || (x === 1 && y === 6) || (x === 5 && y === 0) || (x === 8 && y === 4) || (x === 10 && y === 9) || (x === 6 && y === 7) || (x === 1 && y === 9) || (x === 11 && y === 10) || (x === 7 && y === 11) || (x === 11 && y === 1) || (x === 12 && y === 5)){
                
                fill(192,174,152);
                
            }else{
                
                fill(234,233,225);
                
            }
            
            if(y % 2 === 0){
                
                rect(32 * x, 190 + 19 * y, 30, 15, 3.5);
                
            }else{
                
                rect(-30 + 32 * x + 15, 190 + 19 * y, 30, 15, 3.5);
                
            }
        }
    }
    //fim parede de tijolos
    
    
    //piso
    fill(192, 189, 180);
    rect(0, 350, 400, 100);
    //fim piso
    
    
    //sombra no piso
    fill(170, 169, 159);
    rect(62, 369, 270, 10);
    // fim sombra no piso
    
    
    //pes da cama
    //esquerdo
    fill(139, 118, 80);
    rotate(15);
    rect(172, 287.3, 15, 50);
    rotate(-15);
    rect(75, 323, 18, 50);
    
    
    //direito
    rotate(-15);
    rect(194, 387, 15, 50);
    rotate(15);
    rect(301, 324, 18, 50);
    //fim pes da cama
    
    
    //encosto
    rect(68, 193, 250, 100, 10);
    //fim encosto
    
    
    //colchao
    fill(255, 238, 195);
    rect(60, 261, 270, 50, 10);
    //fim colchao
    
    
    //sombra colchao
    fill(223, 196, 151);
    rect(67, 270, 253, 40, 10);
    //fim sombra colchao
    
    
    //base da cama
    fill(139, 118, 80);
    stroke(122, 101, 67);
    strokeWeight(1);
    rect(45,310,300, 15);
    noStroke();
    //fim base da cama
    
    
    //travesseiros
    fill(234, 99, 103);
    rect(85, 228, 100, 40, 10);
    rect(200, 228, 100, 40, 10);
    //fim travesseiros
    
    
    //abajur
    //haste
    stroke(139, 118, 80);
    fill(139, 118, 80);
    strokeWeight(6);
    line(370, 370, 370, 180);
    noStroke();
    ellipse(370, 374, 35, 5);
    
    
    //copo
    fill(234, 99, 103);
    ellipse(370, 161, 36, 40);
    fill(197, 86, 86);
    ellipse(345, 170, 30, 20);
    ellipse(394, 170, 30, 20);
    
    
    fill(197, 86, 86);
    rect(335, 116, 30, 60, 5);
    rect(375, 116, 30, 60);
    rotate(8);
    rect(349, 68, 20, 58, 5);
    rotate(-8);
    fill(234, 99, 103);
    rect(355, 116, 30, 60, 5);
    //fim copo
    //fim abajur
    
    noStroke();
};
//Fim função principal 


//Chama a função principal para execução
principal();


//Inicio da função de clique do mouse
mouseClicked = function(){
    

    //Verifica se está sendo clicado na bíblia
    if(mouseX >= 74 && mouseX <= 114 && mouseY >= 99 && mouseY <= 171 && verific_tela === 0){
        //Nova tela apresentando a bíblia
        background(86, 226, 245);
        
        //seta para voltar a tela principal
        fill(0);
        rect(28, 33, 20, 15);
        triangle(8, 40, 30, 26, 30, 57);
        
        //biblia
        noStroke();
        fill(0, 0, 0);
        rect(120, 38, 135, 175);
        
        textSize(20);
        fill(251,221,150);
        text("BÍBLIA", 163, 85);
        
        textSize(16);
        text("KING JAMES", 143, 120);
        
        fill(0);
        stroke(251,221,150);
        strokeWeight(2);
        
        //enfeites lateral da bíblia
        for(var e = 0; e < 24; e++){
            ellipse(130, 44 + 7*e, 4, 8);
        }
        
        //texto inferior
        rect(0, 250, 400, 200);
        fill(255,255,255);
        textSize(15.4);
        text("A Bíblia, formalmente chamada de Bíblia Sagrada. É uma coleção de textos religiosos de valor sagrado para o cristianismo e parcialmente para o judaísmo e islamismo, em que se narram interpretações religiosas do motivo da existência do homem na Terra. É considerada para os cristãos como divinamente inspirada, tratando-se de importante documento doutrinário.", 10, 258, 390, 200);
        
        noStroke();
        
        verific_tela = 1;
        
    }
    //Fim verificação primeiro clique
    
    
    //Verifica se está sendo clicado no segundo livro
    //casais inteligentes enriquecem juntos
    else if(mouseX >= 119 && mouseX <= 155 && mouseY >= 99 && mouseY <= 171 && verific_tela === 0){
    
        background(86, 226, 245);
        
        fill(0);
        rect(28, 33, 20, 15);
        triangle(8, 40, 30, 26, 30, 57);
        
        noStroke();
        fill(243, 236, 194);
        rect(115, 26, 152, 190);
        
        textSize(18);
        fill(224,34,56);
        text("      CASAIS\nINTELIGENTES\nENRIQUECEM\n     JUNTOS", 127, 78);
        
        textSize(9);
        fill(199, 157, 72);
        text("Gustavo Cerbasi", 155, 56);
        text("FINANÇAS PARA CASAIS", 138, 161);
        
        fill(243, 236, 194);
        strokeWeight(3);
        stroke(199, 157, 72);
        
        ellipse(198,184,30,30);
        ellipse(185,184,30,30);
        
        arc(199, 185, 30, 30, 140, 230);
        fill(240, 171, 9);
        textSize(13);
        text("$", 188, 189);
        
        fill(0);
        stroke(251,221,150);
        strokeWeight(2);
        rect(0, 250, 400, 200);
        fill(255,255,255);
        textSize(15.4);
        text("Casais Inteligentes Enriquecem Juntos é um livro do escritos brasileiro Gustavo Cerbasi, lançado em 2004. Foi o nono livro mais vendido do Brasil em 2009 na categoria Autoajuda e esoterismo, conforme levantamento da revista veja. \n\nO livro aborda o assunto que é uma das principais causas de divórcio no Brasil: Dinheiro.", 10, 258, 390, 200);
        
        noStroke();
        
        verific_tela = 1;
        
    }
    //Fim verificação segundo clique
    
    
    //Verifica o clique na seta para voltar a tela principal
    else if(mouseX >= 14 && mouseX <= 46 && mouseY >= 31 && mouseY <= 46 && verific_tela === 1){
       principal();
        
    }
    //Fim verificação
    
};
//Fim clique do mouse





        





















