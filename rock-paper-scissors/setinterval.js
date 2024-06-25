let randomnumber;
let computer;
let computer1;
let result;
let score = JSON.parse(localStorage.getItem( 'score'));
if (score === null ) {
    score = {
        WIN : 0,
        LOSE: 0,
        TIE : 0
    };
}

updatescore();



document.querySelector('.js-rock').addEventListener('click', function() {
    computermove();
    checkvalue('Rock', computer);
}
)

document.querySelector('.js-paper').addEventListener('click', function() {
    computermove();
    checkvalue('paper', computer);
}
)

document.querySelector('.js-scissor').addEventListener('click', function() {
    computermove();
    checkvalue('scissors', computer);
}
)

document.body.addEventListener('keydown', function(event){
    if ( event.key ==='r'){
        computermove()
        checkvalue( 'Rock' , computer);
    }
    else if(event.key ==='p'){
        computermove()
        checkvalue( 'paper' , computer);
    }
    else if (event.key ==='s'){
        computermove();
        checkvalue( 'scissors' , computer);
    }
})


// the cheking function
function checkvalue(players_choice,a){
    if(players_choice === 'Rock'){
        if(a === 'Rock'){
            result ='tie';
            
        }
        else if( a === 'paper'){
            result = 'you lose';
            
        }
        else if( a === 'scissors'){
            result = 'you win';
            
        }

    }
    else if(players_choice === 'paper'){
        if(a === 'Rock'){
            result ='you win';
            
        }
        else if( a === 'paper'){
            result = 'tie';
            
        }
        else if( a === 'scissors'){
            result = 'you lose';
            
        }
        
    }
    else if(players_choice === 'scissors'){
        if(a === 'Rock'){
            result ='you lose';
            
        }
        else if( a === 'paper'){
            result = 'you win';
            
        }
        else if( a === 'scissors'){
            result = 'tie';
            
        }
    }

    if(result === 'you win'){
        score.WIN++;
    }
    else if(result === "you lose"){
        score.LOSE++;
    }
    else if(result ==='tie'){
        score.TIE++
    }

    localStorage.setItem('score', JSON.stringify(score)); 

     updatescore();
     showresult();

     document.querySelector('.js-moves')
     .innerHTML = `  you
     <img src="${players_choice}-emoji.png" class="move-icon">
     <img src="${a}-emoji.png" class="move-icon">
     computer`;

}

//extra functions 

function showresult(){
 document.querySelector('.js-result').innerHTML = result;

}

function updatescore(){
    document.querySelector('.js-score')
    .innerHTML =` win: ${score.WIN}, lose: ${score.LOSE}, tie: ${score.TIE}`
}


//computer moves function

function computermove(){

    randomnumber = Math.random()

    if(randomnumber >= 0 && randomnumber < 1/3){
        computer = 'Rock';
    }
    else if (randomnumber >= 1/3 && randomnumber < 2/3){
        computer = 'paper';
    
    }
    else if(randomnumber >= 2/3 && randomnumber<1){
        computer = 'scissors';
        
    }
    else{
        console.log('Error in program');
    }   
    return computer;
}

function computermove1(){

    randomnumber = Math.random()

    if(randomnumber >= 0 && randomnumber < 1/3){
        computer1 = 'Rock';
    }
    else if (randomnumber >= 1/3 && randomnumber < 2/3){
        computer1 = 'paper';
    
    }
    else if(randomnumber >= 2/3 && randomnumber<1){
        computer1 = 'scissors';
        
    }
    else{
        console.log('Error in program');
    }   
    return computer1;
}
let interval;
let is_playing = false;

function auto_play(){
    
    if(!is_playing){
        interval = setInterval(function(){
            const complay = computermove1();
            const complay2 = computermove()
            checkvalue(complay, complay2);
        },1000); 
        is_playing = true;
    }
    else{
        clearInterval(interval);
        is_playing = false
    }
   
};

function keyplay(a){
    if(a==='r'){
        computer = 'Rock'
    }
    else if(a === "p"){
        computer = 'paper'
}
    else if (a ==="s") {
        computer= 'Scissors'
    }
}