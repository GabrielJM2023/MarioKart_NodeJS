const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRALIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};


const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRALIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;        
        default:
            result = "CONFRONTO";
            break; 
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function declareWinner(character1, character2){
    if (character1.PONTOS > character2.PONTOS) {
        console.log(`🏆 ${character1.NOME} venceu a corrida!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`🏆 ${character2.NOME} venceu a corrida!`);
    } else {
        console.log(`🤝 A corrida terminou empatada!`);
    }

    console.log(`\n🏁 Placar Final: ${character1.NOME} ${character1.PONTOS} x ${character2.PONTOS} ${character2.NOME}`);
}

async function playRaceEngine(character1, character2){
    let block;
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);
        block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkil1 = 0;
        let totalTestSkil2 = 0;

        if(block === "RETA"){
            totalTestSkil1 = character1.VELOCIDADE + diceResult1;
            totalTestSkil2 = character2.VELOCIDADE + diceResult2;

            await logRollResult(character1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE);
        } else if(block === "CURVA"){
            totalTestSkil1 = character1.MANOBRALIDADE + diceResult1;
            totalTestSkil2 = character2.MANOBRALIDADE + diceResult2;

            await logRollResult(character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRALIDADE);
            await logRollResult(character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRALIDADE);
        } else if(block === "CONFRONTO"){
            let powerResult1 = character1.PODER + diceResult1;
            let powerResult2 = character2.PODER + diceResult2;

            console.log(`Em um confronto entre ${character1.NOME} ⚔️  ${character2.NOME}`);
            
            await logRollResult(character1.NOME, "Poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "Poder", diceResult2, character2.PODER);

            if(powerResult1 > powerResult2){
                console.log(`💥 ${character1.NOME} venceu o confronto! \n`);
                console.log(`💥 ${character2.NOME} perde um ponto 🐢!`);
                if (character2.PONTOS > 0) {
                    character2.PONTOS--;
                }
            } else if(powerResult2 > powerResult1){
                console.log(`💥 ${character2.NOME} venceu o confronto! \n`);
                console.log(`💥 ${character1.NOME} perde um ponto 🐢!`);
                if (character1.PONTOS > 0) {
                    character1.PONTOS--;
                }
            } else {
                console.log(`💥 O confronto terminou empatado!`);
            }            
        }    

        if (block !== "CONFRONTO"){
            if(totalTestSkil1 > totalTestSkil2){
                console.log(`🏆 ${character1.NOME} venceu a rodada e marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTestSkil2 > totalTestSkil1){
                console.log(`🏆 ${character2.NOME} venceu a rodada e marcou um ponto!`);
                character2.PONTOS++;
            } else {
                console.log(`🤝 Empate! Ninguém marcou ponto nessa rodada.`);
            }
        }

        console.log("_______________________________________________ \n");
    }

    declareWinner(character1, character2);
}

(async function Main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e "${player2.NOME}" começando... \n`);

    await playRaceEngine(player1, player2);
})();

