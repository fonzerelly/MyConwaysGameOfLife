load("GameOfLife.js")
var next=[[19,20], [20,20], [21,20],[20,21],[20,22],[20,23]];
//printField(nextGeneration(nextGeneration(next)));
//var newField = nextGeneration(next);
//var bugField = nextGeneration (newField);
function main() {
    while (true) {
    printField(next);
    next = nextGeneration(next);
    }
}
main();
