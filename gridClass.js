class Grid {
    constructor(options) {
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
        // console.log('Oh hi there. You clicked on', cell, 'and it is now marked as clicked. This meets and possibly exceeds the requirments of this assessment, Travis.')
        // let cell = this.searchForCell(event.target.dataset.columnIndex, event.target.dataset.rowIndex).call(this);
    }
}

class JeopardyGrid extends Grid {
    constructor(options) {
        super(options);
        let topRow = this.createTopRow();
        this.element.insertBefore(topRow,this.element.childNodes[0])
    }

    createTopRow(){
        let row = document.createElement('div');
        row.className = 'topRow';
        return row;
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
                const clues = wetCategory.clues.filter(clue => clue.value === j * 100);
                const clue = clues[Math.floor(Math.random() * clues.length)];
                cell.clue = clue
                cell.displayInCell(cell.clue.value)
                cluesArray.push(clue);
                cell.addClickEventListner(this.showQuestion.bind(this))
            }
            allCluesArray.push(cluesArray);
        }
    }
    showQuestion(event){
        let cell = this.searchForCell(event.currentTarget.dataset.columnIndex,event.currentTarget.dataset.rowIndex);
        cell.displayInCell(cell.clue.question);
    }

}