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
        this.cellDiv.addEventListener('click', callBackFunction);

    }
    removeClickEventListner(callBackFunction) {
        this.cellDiv.removeEventListener('click', callBackFunction);
    }
    displayInCell(text){
        let t = document.createTextNode(text);
        let span = document.createElement('span');
        span.appendChild(t);
        this.cellDiv.appendChild(span)
    }
}

class JeopardyCell extends Cell {
    constructor(options){
        super(options)
        this.question = 'yes'
    }
    // async getClue(categoryID, value){
    //     const category = await fetch('http://jservice.io/api/category?id=' + categoryID);
    //     const wetCategory = await category.json();
    //     const clues = wetCategory.clues.filter(clue => clue.value === value);
    //     const clue = clues[Math.floor(Math.random() * clues.length)]
    //     return clue
    // }
}