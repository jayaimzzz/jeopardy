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

}

class JeopardyCell extends Cell {
    constructor(options){
        super(options)
        this.question = 'yes'
    }
}