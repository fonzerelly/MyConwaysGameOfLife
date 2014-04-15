load("GameOfLife.js")

var createField = function () {
    var output = "";
    _.each(_.range(30), function (y) {
        var line="";
        _.each(_.range(30), function (x) {
            line += "."; 
        });
        line += "\n";
        output += line;
    });
    return output;
};
var setAt = function (field, pos) {
    var index = pos[0] + 31*pos[1];
    return  [
        field.slice(0,index),
        "X",
        field.slice(index+1)
    ].join("");
};


var base_field = createField();
var printField = function (cells) {
    print(
        _.reduce(cells,function (newField, cell) {
           return setAt(newField, cell);
        }, base_field)
    );
};

    

//Cathedral
var next=[[19,20], [20,20], [21,20],[20,21],[20,22],[20,23]];

//Glider
//var next=[[5,6], [6,6], [7,6],[7,5],[6,4],[20,23]];
printField (next);
//printField(nextGeneration(nextGeneration(next)));
//var newField = nextGeneration(next);
//var bugField = nextGeneration (newField);
var start_time = new Date().getTime();
var max_count = 15;
function main() {
    while (max_count-->0) {
    printField(next);
    next = nextGeneration(next);
    }
}
main();
print ("Duration: "+(new Date().getTime()-start_time));
