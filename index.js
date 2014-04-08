load("GameOfLife.js")

var printField = function (cells) {
    var output = "";
    _.each(_.range(30), function (y) {
        var line="";
        _.each(_.range(30), function (x) {
            var mask = [" ","X"];
            line += (mask[Number(_.containsNonPrimitive(cells, [x,y]))]); 
        });
        line += "\n";
        output += line;
    });
    print(output);
};


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
