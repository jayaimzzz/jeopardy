class Grid {
    constructor(options) {
        this.destination = document.getElementById(options.destination)
        this.cellType = options.cellType || Cell;
        let gridArray = [];
        this.gridArray = gridArray;
        this.name = options.name || 'grid';
        this.numberOfColumns = options.numberOfColumns;
        this.numberOfRows = options.numberOfRows;
        // this.borderColor = options.borderColor || 'black';
        // this.borderThickness = options.borderThickness || '1px';
        let wrapper = document.createElement('div');
        wrapper.id = options.name + 'Div';
        wrapper.className = 'grid';
        wrapper.style.display = 'flex'
        for (let c = 0; c < options.numberOfColumns; c++) {
            let column = [];
            let columnDiv = document.createElement('div');
            columnDiv.id = `column${c}`;
            columnDiv.class = 'column';
            for (let r = 0; r < options.numberOfRows; r++) {
                const cell = new this.cellType(c, r);
                let cellDiv = cell.createCellDiv();
                // cell.addClickEventListner(this.hello.bind(this))
                column.push(cell);
                columnDiv.appendChild(cellDiv)
            }
            gridArray.push(column);
            wrapper.appendChild(columnDiv);
        }
        this.element = wrapper
        this.destination.appendChild(this.element)
        // dest.appendChild(wrapper);
    }
    displayOnPage(destination) {
        destination.appendChild(this.element);
    }

    searchForCell(columnNumber, rowNumber) {
        return this.gridArray[columnNumber][rowNumber];
    }

    findNeighbors(cell) {
        let neighborCordinates = [
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [0, -1],
            [-1, 1]
        ]
        let neighbors = [];
        for (let i = 0; i < neighborCordinates.length; i++) {
            let neighbor = this.gridArray[cell.columnNumber + neighborCordinates[i][0]][cell.rowNumber + neighborCordinates[i][1]]
            if (neighbor) {
                neighbors.push(neighbor)
            }
        }
        return neighbors
    }
    forEachCell(callBackFunction) {
        for (let c = 0; c < this.numberOfColumns; c++) {
            for (let r = 0; r < this.numberOfRows; r++) {
                callBackFunction(this.gridArray[c][r]);
            }
        }
    }
    hello(event) {
        let cell = this.searchForCell(event.target.dataset.columnIndex, event.target.dataset.rowIndex)
        cell.setAsClicked();
    }
}

class JeopardyGrid extends Grid {
    constructor(options) {
        super(options);
        this.getClues(options.categories);
        this.createBottomRow();
        this.answer = '';
        this.contestant = new Contestant(options.contestantName);
    }

    createBottomRow(){
        let row = document.createElement('div');
        row.className = 'bottomRow';
        row.id = 'bottomRow';
        this.bottomRow = row
        this.destination.appendChild(row)
    }

    displayInBottomRow(text){
        let t = document.createTextNode(text);
        let span = document.createElement('span');
        let br = document.createElement('br');
        span.appendChild(t);
        this.bottomRow.appendChild(span);
        this.bottomRow.appendChild(br);
        
    }
    clearBottomRow(){
        this.bottomRow.innerHTML = ''
    }
    showInputBox(){
        let input = document.createElement('input');
        let t = document.createTextNode('What/who is ');
        input.id = 'inputText';
        this.bottomRow.appendChild(t);
        this.bottomRow.appendChild(input)
    }
    displaySubmitButton() {
        let button = document.createElement('button');
        button.textContent = 'Submit';
        button.addEventListener('click', this.submit.bind(this))
        this.bottomRow.appendChild(button)
    }
    displaySkipButton() {
        let button = document.createElement('button');
        button.textContent = 'Skip';
        button.addEventListener('click', this.skip.bind(this));
        this.bottomRow.appendChild(button);
    }
    
    async getClues(categories) {
        let allCluesArray = []
        for (let i = 0; i < categories.length; i++) {
            let cell = this.searchForCell(i,0)
            cell.displayInCell(categories[i].name)
            let cluesArray = [];
            const categoryID = categories[i].id
            const category = await fetch('http://jservice.io/api/category?id=' + categoryID);
            const wetCategory = await category.json();
            for (let j = 1; j <= 5; j++) {
                cell = this.searchForCell(i,j)
                
                cell.cellDiv.classList.add('money')
                const clues = wetCategory.clues.filter(clue => clue.value === j * 100);
                const clue = clues[Math.floor(Math.random() * clues.length)];
                cell.clue = clue
                cell.displayInCell("$" + cell.clue.value)
                cluesArray.push(clue);
                cell.addClickEventListner(this.showQuestion.bind(this));
            }
            allCluesArray.push(cluesArray);
        }
    }
    removeEventListenersOnEachCell(){
        for(let i = 0; i< categories.length; i++){
            for(let j = 1; j <= 5; j++){
                let cell = this.searchForCell(i,j);
                // if (cell.clicked === false){
                    cell.removeClickEventListner();
                // }
            }
        }
    }
    addEventListenersOnEachCell(){
        for(let i = 0; i< categories.length; i++){
            for(let j = 1; j <= 5; j++){
                let cell = this.searchForCell(i,j);
                if (cell.clicked === false){
                    cell.addClickEventListner(this.showQuestion.bind(this));
                }
            }
        }
    }
    showQuestion(event){
        this.clearBottomRow();
        this.currentCell = this.searchForCell(event.currentTarget.dataset.columnIndex,event.currentTarget.dataset.rowIndex);
        this.currentCell.setAsClicked();
        this.currentCell.changeCellColor('grey')
        this.displayInBottomRow(this.currentCell.clue.question + '.');
        this.showInputBox();
        this.displaySubmitButton(this.currentCell.clue.answer);
        this.displaySkipButton();
        // this.currentCell.removeClickEventListner();
        this.removeEventListenersOnEachCell();
        
    }
    submit(){
        let answer = this.currentCell.clue.answer.toLowerCase().replace(/[^\w\s]/gi, '');
        let userInput = document.getElementById('inputText').value;
        let userAnswer = userInput.toLowerCase().replace(/[^\w\s]/gi, '');
        answer = answer.replace('a ','').replace('the ','').replace('is ','').replace(' ','').replace('s','').replace('es','');
        userAnswer = userAnswer.replace('a ','').replace('the ','').replace('is ','').replace(' ','').replace('s','').replace('es','');
        let isCorrect = this.compareAnswer(answer, userAnswer)
        this.contestant.adjustScore(this.currentCell.clue.value, isCorrect)
        this.clearBottomRow();
        this.displayInBottomRow(this.generateMessage(isCorrect,userInput))
        this.addEventListenersOnEachCell();
    }
    skip(){
        this.currentCell.changeCellColor('black');
        this.currentCell.displayInCell('');
        this.clearBottomRow();
        this.addEventListenersOnEachCell();
        this.displayInBottomRow(`What/who is ${this.currentCell.clue.answer}`)
    }

    compareAnswer(answer, userAnswer){
        if (answer === userAnswer){
            return true;
        } else {
            return false;
        }
    }
    generateMessage(correct,userInput){
        if (correct === true){
            this.currentCell.changeCellColor('green')
            return `What/who is ${this.currentCell.clue.answer} is correct! You earned $${this.currentCell.clue.value}. Your score is $${this.contestant.score}.`;
        }
        if (correct === false){
            this.currentCell.changeCellColor('red')
            return `What/who is ${userInput} is incorrect. What/who is ${this.currentCell.clue.answer} is what/who we where looking for. You lost $${this.currentCell.clue.value}. Your score is $${this.contestant.score}.`;
        }
    }
}