let dest = document.getElementById('mainWrapper')
let grid1 = new JeopardyGrid({
    numberOfRows: 5,
    numberOfColumns: 6,
    cellType: JeopardyCell
})
grid1.displayOnPage(dest)
console.log(grid1.searchForCell(1,1));