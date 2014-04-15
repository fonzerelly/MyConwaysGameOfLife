/*global _, load, print, runCommand*/
load("lib/lodash.js");
_.mixin({
    "containsNonPrimitive": function (collection, nonPrimitiveTarget) {
        return _.any(collection, _.partial(_.isEqual, nonPrimitiveTarget));
    },

    "assortedComparator" : function (predicate) {
        return function (x, y) {
            if (predicate(x, y)) {
                return -1;
            }
            if (predicate(y, x)) { 
                return 1;
            }
            return 0;
        };
    },

    "alikedComparator" : function (predicate) {
        return function (x, y) {
            if (predicate(x, y)) {
                return -1;
            }
            return 1;
        };
    }
});

var _defineNeighbors = _.memoize(
    function (myCell) {
        var x = myCell[0],
        y = myCell[1];
        return [[x-1, y], [x-1,y-1], [x-1,y+1], [x, y-1], [x,y+1], [x+1,y], [x+1,y+1], [x+1,y-1]];
    }
);

var _intersection = function(a, b) {
    return _.filter(a, function(x) {
        return _.containsNonPrimitive(b, x);
    });
};

var simpleCellPredicat = function (cellA, cellB) {
    var prevailDimension = Number(cellA[0] === cellB[0]);
    return cellA[prevailDimension] < cellB[prevailDimension]; 
};

var createIsAliveCheck = function (potentialNewCells) {
    return _.memoize (
        function (cell) {
            var count = _.reduce(
                potentialNewCells, 
                function (count, aNeighborCell) {
                    count += Number(_.isEqual(cell, aNeighborCell));
                    return count;
                },
                0
            );
            return count === 3;
        }
    );
};

var nextGeneration = function (initField) {
    var cleanedByDeadCells= _.filter(initField, function (cell) {
        var neighbors = _defineNeighbors(cell);
        var result = _intersection(neighbors, initField);
        return result.length > 1 && result.length <= 3;
    });

    var allPotentialNewCells = _.flatten(
        _.map(initField, _defineNeighbors),
        true
    );

    var enlivedCells = _.filter(
        _.filter(
            _.filter(
                allPotentialNewCells,
                createIsAliveCheck(allPotentialNewCells)
            ).sort(_.assortedComparator(simpleCellPredicat)),
            function(cell, index, array) {
                return (index % 3) === 0;
            }
        ),
        function(cell) {
            return !_.containsNonPrimitive(cleanedByDeadCells, cell);
        }
    );

    return cleanedByDeadCells.concat(enlivedCells);
};


