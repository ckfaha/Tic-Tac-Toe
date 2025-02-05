//1 Deposit the money
//2 determine the no of line they bet
//3 Collect a bet amount
//4 Spin the slot machine
//5 check if the user won
//6 give the winning money to the user
//7 play again

const prompt=require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOLS_VALUES={
    "A":5,
    "B":4,
    "C":3,
    "D":2
}


const deposit=()=>{
  while(true){
    const depositAmount=prompt("Enter A Deposit Amount :")
    const numberDepositAmount=parseFloat(depositAmount)
    if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("Invalid Amount,Try Again")
    }
    else{
        return numberDepositAmount;
    }
}
};

const getNumberOfLines=()=>{
    while(true){
        const lines=prompt("Enter A Number Of Lines (1-3) :")
        const numberOfLines=parseFloat(lines)
        if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines >3) {
            console.log("Invalid Number Of Lines You Given,Try Again Between 1-3")
        }
        else{
            return numberOfLines;
        }
    }
}


const getBet=(balance,lines)=>{
    while(true){
        const bet=prompt("Enter A Bet For Per Lines:")
        const numberBet=parseFloat(bet)
        if(isNaN(numberBet) || numberBet<=0 || numberBet >balance/lines) {
            console.log("Invalid Bet Amount,Try Again")
        }
        else{
            return numberBet;
        }
    }

}

const spin =()=>{
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
       for(let i=0; i<count ; i++){
        symbols.push(symbol)   //symbols=["A","A","B","B","B","B","C"] and so on
       }
    }
    const reels=[];
    for(let i=0; i<COLS ; i++){
        reels.push([]);
        const reelSymbols=[...symbols] //Spread Operators
        for (let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length) // "floor" lowest whole no "random" randum no generate bet 0 - 1   //reelsymbols.len=20
            const selectedSymbol=reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex,1)
        }
    }
    return reels;
}

const transpose=(reels)=>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
    
}

const printRows=(rows)=>{
    for (let row of rows){
        let rowString="";
        for(let [i,symbol] of row.entries()){
            rowString+=symbol
            if(i != row.length-1){
               rowString+=" | "
            }
        }
        console.log(rowString)
    }
}


const getWinnings=(rows,bet,lines)=>{
    let winnings=0;
    for(let row=0;row<lines;row++){
        const symbols=rows[row];
        let allSame=true;

        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings=bet*SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game=()=>{
    let balance=deposit();
    while(true){
            console.log("Balance Amount $"+balance)
            const lines =getNumberOfLines()
            const bet=getBet(balance,lines)
            balance-=bet*lines
            const reels=spin()
            const rows=transpose(reels)
            
            printRows(rows)
            const winnings=getWinnings(rows,bet,lines)
            balance+=winnings
            console.log("You Won $"+ winnings.toString()+"  Total Balance: $"+balance )
            
            if(balance<=0){
                console.log("you ran out of money")
                break;
            }
            const playAgain=prompt("Do you want to continue(y/n)")
            if(playAgain!="y") {
                break;
            }
    }
}
game()
