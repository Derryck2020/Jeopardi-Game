//Initializing the Game on page Load
initCategoryRow() //we call the function
initBoard()  //we call the function 

document.querySelector('button').addEventListener('click', buildCategories)


//We create Category Row
function initCategoryRow(){
    let categoryRow = document.getElementById('category-row')

    for (let i = 0; i < 6; i++){
        let box = document.createElement('div') // This will create the box
        box.className = 'clue-box category-box' //We gave our box a className of 'clue-box' and 'category-box'
        categoryRow.appendChild(box) //we nest the box inside the categoryRow(like putting each box in the row it will be sitting )
    }

}


//We create clue board
function initBoard(){
    let board = document.getElementById('clue-board')

    //We generate 5 rows, then place 6 boxes in each row

    for (let i = 0; i < 5; i++){ //Creating of the rows (outer loop)
        let row = document.createElement('div') //we created a div tag so we assign it to row
        let boxValue = 200 * (i + 1) //This will help increment each row by a dollar value
        row.className = 'clue-row' //We gave our row a className of 'clue-row'

        for (let j = 0; j < 6; j++){ //Creating of the 6 boxes in each row(inner loop)
            let box = document.createElement('div')// This will create the box
            box.className = 'clue-box' //We gave our box a className of 'clue-box'
            box.textContent = '$' + boxValue //we will add the boxValue to the inside of the box
            box.addEventListener('click',getClue,false) //we added an addEventListener to the box
            row.appendChild(box) //This will nest the box inside the row(like putting each box in the row it will be sitting )
        }

        board.appendChild(row) //we need to attach each row we created in the game board itself(so it can be seen)
    }
}

//Calling of API's
function randInt (){ // This function which generate random integers will be used in the buildCategories function
    return Math.floor(Math.random() * (18418) + 1)
}

let categoryArray = [] //We declared an empty array so so we dump the result(res) in it and use it globally

function buildCategories(){//Function used for fecting the API's

    if(!(document.getElementById('category-row').firstChild.innerText == '')){//Check the category-row element (the first box) and see if the innerText is empty, if it is not empty, reset board.
        resetBoard()
    }

    const fetchReq1 = fetch(
        `https://jservice.io/api/category?id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq2 = fetch(
        `https://jservice.io/api/category?id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq3 = fetch(
        `https://jservice.io/api/category?id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq4 = fetch(
        `https://jservice.io/api/category?id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq5 = fetch(
        `https://jservice.io/api/category?id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq6 = fetch(
        `https://jservice.io/api/category?id=${randInt()}`
    ).then((res) => res.json());

    const allData = Promise.all([fetchReq1,fetchReq2,fetchReq3,fetchReq4,fetchReq5,fetchReq6])

    allData.then((res) =>{
        console.log(res)
        categoryArray = res //assign it to the res
        setCategories(categoryArray)
    })

}


//We are going to generate the categories so they appear on top of the board
function setCategories (categoryArray){
    let element = document.getElementById('category-row') //Here we are targeting the section where we wants the stuff to appear
        let children = element.children; //Inside the category-row, we have six boxes which are children of that row (parent-row)
        for (let i = 0; i < children.length; i++){ //we treat the boxes in the row as array and loop through them
            children[i].innerHTML = categoryArray[i].title; //For each child element, we set the innerHTML equal to the categoryArray item title
        }
}



//Figure what function was clicked
// Here when box is clicked it pulls out a clue for the user //event target is used to pinpoint what was actually clicked 
function getClue(event){
    let child = event.currentTarget //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
    child.classList.add('clicked-box') //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    let boxValue = child.innerHTML.slice(1) //we want to extract the value of the dollar boxes that was clicked
    let parent = child.parentNode //https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
    let index = Array.prototype.findIndex.call(parent.children, (c) => c === child)
    let cluesList = categoryArray[index].clues
    let clue = cluesList.find(obj =>{
        return obj.value == boxValue
    })
    showQuestion(clue, child, boxValue)
}


//Show Question to user and get their Answer
function showQuestion(clue, target, boxValue){
    let userAnswer = prompt(clue.question).toLowerCase()
    let correctAnswer = clue.answer.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "")
    let possiblePoints = +(boxValue)
    target.innerHTML = clue.answer
    target.removeEventListener('click', getClue, false)
    evaluateAnswer(userAnswer, correctAnswer, possiblePoints)
}


//Evaluate answer and show to user to confirm
function evaluateAnswer(userAnswer, correctAnswer, possiblePoints){
    let checkAnswer = (userAnswer == correctAnswer) ? 'correct' : 'incorrect'
    let confirmAnswer = 
    confirm(`For $${possiblePoints}, you answered "${userAnswer}", and the correct answer was "${correctAnswer}". Your answer appears to be ${checkAnswer}. Click OK to accept or click Cancel if the answer was not properly evaluated.`)
    awardPoints(checkAnswer, confirmAnswer, possiblePoints)
}


//Award Points
function awardPoints(checkAnswer, confirmAnswer, possiblePoints){
    if (!(checkAnswer == 'incorrect' && confirmAnswer == true)){
        let target = document.getElementById('score')
        let currentScore = +(target.innerText)
        currentScore += possiblePoints
        target.innerText = currentScore
    } else {
        alert(`No points awarded.`)
    }
}


//Reset Board
function resetBoard(){
    let clueParent = document.getElementById('clue-board')
    while(clueParent.firstChild) {
        clueParent.removeChild(clueParent.firstChild) //look for nested elements inside the parent and get rid of them
    }
    //We are doing the same thing for the category-row
    let catParent = document.getElementById('category-row')
    while(catParent.firstChild) {
        catParent.removeChild(catParent.firstChild)
    }
    document.getElementById('score').innerText = 0 //We reset the board to the initial state
    initBoard() //We call our initBoard function
    initCategoryRow() //We call our initCategoryRow function
}


