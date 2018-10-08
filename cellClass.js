class Cell {
    constructor(columnNumber, rowNumber) {
        this.columnNumber = columnNumber;
        this.rowNumber = rowNumber;
        this.divID = `cellAtColumn${columnNumber}Row${rowNumber}`;
        this.clicked = false;
        // this.createCellDiv()
    }
    createCellDiv() {
        let cell = document.createElement('div');
        cell.dataset.columnIndex = this.columnNumber;
        cell.dataset.rowIndex = this.rowNumber;
        cell.id = this.divID;
        cell.className = 'cell';
        this.cellDiv = cell;
        return cell;
    }
    setAsClicked() {
        this.clicked = true;
    }
    addClickEventListner(callBackFunction) {
        this.callBackFunction = callBackFunction
        this.cellDiv.addEventListener('click', callBackFunction);

    }
    removeClickEventListner() {
        this.cellDiv.removeEventListener('click', this.callBackFunction);
    }
    displayInCell(text){
        let t = document.createTextNode(text);
        let div = document.createElement('div');
        div.classList.add('info')
        div.appendChild(t);
        this.cellDiv.innerHTML = ''
        this.cellDiv.appendChild(div)
    }
    changeCellColor(color){
        this.cellDiv.style.backgroundColor = color;
    }
}

class JeopardyCell extends Cell {
    constructor(r,c,options){
        super(r,c,options);
        // this.question = options.question;
        // this.answer = options.answer;
        // this.value = options.value;
    }
    // async getClue(categoryID, value){
    //     const category = await fetch('http://jservice.io/api/category?id=' + categoryID);
    //     const wetCategory = await category.json();
    //     const clues = wetCategory.clues.filter(clue => clue.value === value);
    //     const clue = clues[Math.floor(Math.random() * clues.length)]
    //     return clue
    // }
    
}