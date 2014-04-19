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

//Catehdral_100
var next=[[20,9],[13,10],[27,10],[13,9],[27,9],[14,9],[26,9],[14,10],[26,10],[16,18],[24,18],[19,21],[21,21],[9,21],[31,21],[7,14],[33,14],[15,19],[25,19],[6,14],[34,14],[15,18],[25,18],[5,22],[35,22],[19,23],[21,23],[16,20],[24,20],[3,17],[37,17],[18,27],[18,29],[19,27],[21,27],[22,27],[22,29],[9,22],[31,22],[16,17],[24,17],[19,24],[21,24],[5,23],[35,23],[19,22],[21,22],[3,16],[4,18],[36,18],[37,16],[4,15],[5,14],[35,14],[36,15],[16,23],[24,23],[13,27],[27,27],[17,21],[23,21],[19,9],[21,9],[7,15],[33,15],[15,17],[25,17],[6,21],[7,21],[33,21],[34,21],[18,20],[22,20],[6,24],[10,20],[30,20],[34,24],[6,13],[6,15],[34,15],[34,13],[14,29],[15,30],[18,30],[22,30],[25,30],[26,29],[13,26],[13,28],[14,25],[27,28],[27,26],[26,25],[5,15],[35,15],[11,19],[11,17],[29,19],[29,17],[17,22],[23,22],[19,28],[21,28]];

//Blinker
//var next=[[19,20], [20,20], [21,20]];

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
