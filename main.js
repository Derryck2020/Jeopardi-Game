//Initializing the Game on page Load

initCategoryRow() //we call the function
initBoard()  //we call the function 


function initCategoryRow(){
    let categoryRow = document.getElementById('category-row')

    for (let i = 0; i < 6; i++){
        let box = document.createElement('div') // This will create the box
        box.className = 'clue-box category-box' //We gave our box a className of 'clue-box' and 'category-box'
        categoryRow.appendChild(box) //we nest the box inside the categoryRow(like putting each box in the row it will be sitting )
    }

}

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
            box.addEventListener('click',getclue,false) //we added an addEventListener to the box
            row.appendChild(box) //This will nest the box inside the row(like putting each box in the row it will be sitting )
        }

        board.appendChild(row) //we need to attach each row we created in the game board itself(so it can be seen)
    }
}


function randInt (){
    return Math.floor(Math.random() * (18418) + 1)
}


function buildCategories(){

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
    })

}










function getclue(){
    console.log('Just getting started')
}
