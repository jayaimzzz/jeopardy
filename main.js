let dest = document.getElementById('mainWrapper')
let categories = [
    {name: 'Animals', id: 21},
    {name: 'Science', id: 25},
    {name: 'Musical Instruments', id: 184},
    {name: 'Body Language', id: 897},
    {name: 'Mythology', id: 680} 
]
let grid1 = new JeopardyGrid({
    numberOfRows: 6,
    numberOfColumns: 5,
    cellType: JeopardyCell,
    name: 'JeopardyGrid'
})
let contestant = new Contestant('Sam');
grid1.displayOnPage(dest)

// async function getClue(categoryID, value){
//     const category = await fetch('http://jservice.io/api/category?id=' + categoryID);
//     const wetCategory = await category.json();
//     const clues = wetCategory.clues.filter(clue => clue.value === value);
//     const clue = clues[Math.floor(Math.random() * clues.length)]
//     console.log(clue)
// }
let clues = grid1.getClues(categories)
