const question = document.getElementById('question');
const p = document.getElementById("text");
const next = document.getElementById('next-btn');
const start = document.getElementById('start-btn');
const finish = document.getElementById('finish-btn');
let numQuestion = 1;
let myAnswers = [];
let correctAnswer = 0;

start.addEventListener('click', kreni)
next.addEventListener('click', novo)
finish.addEventListener('click', gotovo)

 function pisi(){
    if(numQuestion>9){
        finish.classList.remove('hide')
        next.classList.add('hide')
    }
   let questions ;
   let output = '';
    fetch("./questions.json")
.then(res => res.json())
.then(data => {
    data = data.filter(d => d.id== numQuestion)
    questions = data[0]
    let odg =''
    for(i=0;i<questions.answers.length;i++){
        odg += `<li>
        <input type="radio" value="${questions.answers[i].correct}" name="radio">
        ${questions.answers[i].opt}
        </li>`
    }
    output = `<h2>Question ${numQuestion}</h2><h4>${questions.question}</h4>
    <ul>
        ${odg}
    </ul>`
let m = document.createElement('div')
m.id = 'ja'
document.getElementById("text").innerHTML = output
})
}

function kreni(){
    start.classList.add('hide')
    next.classList.remove('hide')
    pisi();
}

function novo(){
    let counter = document.querySelector('input[name = "radio"]:checked');  
    if(counter == null){
        alert("Select your answer")
        return 0
    }
    myAnswers.push(counter.value)
    console.log(myAnswers)
    if(numQuestion<10){
        numQuestion = numQuestion+1
    }
    pisi();
}

function gotovo(){
    let counter = document.querySelector('input[name = "radio"]:checked');  
    if(counter == null){
        alert("Select your answer")
        return 0
    }
    myAnswers.push(counter.value)
    console.log(myAnswers)
    for(let i = 0; i<myAnswers.length;i++){
        if(myAnswers[i] == 'true'){
            correctAnswer +=1
        }
    }
    alert(`out of 10 questions you have ${correctAnswer} correct answers    `)
    window.location.reload(true);
}





