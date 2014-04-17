/*global describe, it, expect, beforeEach,  _, load, java, nextGeneration*/
//load("GameOfLife.js");
/**/
describe("_.containsNonPrimitive", function () {
  it ("shall find an Array in an Array", function () {
    expect(_.containsNonPrimitive([[1,1], [1,2], [1,3]], [1,1])).toEqual(true);
  });
});

describe ("GameOfLife", function () {
  beforeEach(function () {
    this.addMatchers({
      toContainNonPrimitive: function (expected) {
        var actual = this.actual;
        var notText = this.isNot ? " not ": "";
        var cascadedArrayToString = function (cascadedArray) {
          var arrayString = _.reduce(
            cascadedArray,
            function (result, arrayElement, index, cascadedArray) {
              if (_.isArray(arrayElement)) {
                result += cascadedArrayToString(arrayElement);
              } else {
                result += String(arrayElement);
                if (index < (cascadedArray.length-1)) {
                  result += ", ";
                }
              }
              return result;
            },
            "["
            ) + "]";
          return arrayString;
        };


        this.message = function () {
          return "Expected " + cascadedArrayToString(actual) + notText + " to contain " + cascadedArrayToString(expected);
        };
        return _.containsNonPrimitive(actual, expected);
      }
    });
  });


  describe ("defineNeighbors", function () {
    it("should return an array with all neighbor coordinats of cell in the format of [x,y]", function() {
      var result = defineNeighbors([0,0]);
      expect(result).toContainNonPrimitive([-1,-1]);
      expect(result).toContainNonPrimitive([-1,0]);
      expect(result).toContainNonPrimitive([-1,1]);
      expect(result).toContainNonPrimitive([0,-1]);
      expect(result).toContainNonPrimitive([0,1]);
      expect(result).toContainNonPrimitive([1,-1]);
      expect(result).toContainNonPrimitive([1,0]);
      expect(result).toContainNonPrimitive([1,1]);
    });
  });

  describe ("collectNeighbors", function () {
    it("should return a flat list of cells, that are neighbors of the passed in cells", function () {
      var result = collectNeighbors([[1,1],[1,2],[1,3]]);
      _.forEach(result, function (shouldBeACell) {
        expect(shouldBeACell instanceof Array).toBe(true);
        expect(shouldBeACell.length).toBe(2);
        _.forEach(shouldBeACell, function (dimension) {
          expect(_.isNumber(dimension)).toBe(true);
        });
      });
    });
  });

  describe("intersect", function () {
    it("should return all nonprimitives, that two arrays share.", function () {
      var first_array = [[1,1],[1,2],[1,3],[1,4]],
          second_array = [[0,3],[1,3],[2,3],[3,3]];

      var result = intersect (first_array, second_array);
      expect(result).toContainNonPrimitive([1,3]);
    });
    it("should return an empty array if the two arrays do not intersect at all", function () {
      var first_array = [[1,1],[1,2],[1,3],[1,4]],
          second_array = [[0,5],[1,5],[2,5],[3,5]];
      var result = intersect (first_array, second_array);
      expect(result.length).toEqual(0);
    });
  });
  
  describe("simpleCellPredicat", function () {
    it ("should find cells with smaller X-Coordinate", function () {
      expect(simpleCellPredicat([1,1],[2,1])).toBe(true);
      expect(simpleCellPredicat([2,1],[1,1])).toBe(false);
    });
    it ("should find cells with smaller X-Coordinate even if Y-Coorinates smaller", function () {
      expect(simpleCellPredicat([1,1], [2,0])).toBe(true);
      expect(simpleCellPredicat([2,0], [1,1])).toBe(false);
    });

    it ("should find cells with smaller Y-Coordinate if X-Coordinates are equal", function () {
      expect(simpleCellPredicat([1,0], [1,1])).toBe(true);
      expect(simpleCellPredicat([1,1], [1,0])).toBe(false);
    });
  });

  describe("createIsAliveCheck", function () {
    it ("should return true if a cell occures exactly three times in an array of related cells", function () {
      var relatedCells = [[1,1],[1,1],[1,1]];
      expect(createIsAliveCheck(relatedCells)([1,1])).toBe(true);
      var tooFewRelatedCells = [[1,1],[1,1]];
      expect(createIsAliveCheck(tooFewRelatedCells)([1,1])).toBe(false);
      var tooMuchRelatedCells = [[1,1],[1,1],[1,1],[1,1]];
      expect(createIsAliveCheck(tooMuchRelatedCells)([1,1])).toBe(false);
    });
    it ("should return false if no related cells got passed", function () {
      expect(createIsAliveCheck()([1,1])).toBe(false);
    });
    it ("should return false if empty array gets passed", function () {
      expect(createIsAliveCheck([])([1,1])).toBe(false);
    });
    it ("should return false if cells do not correspond", function () {
      var unrelatedCells = [[1,1],[1,2],[1,3]];
      expect(createIsAliveCheck()([1,1])).toBe(false);
    });
  });

  describe("awakenCells", function () {
    it ("should return an array with all cells that are born", function () {
      var potentialNewCells = collectNeighbors([[1,1],[1,2],[1,3]]);
      var result = awakenCells(potentialNewCells);
      expect(result.length).toBe(2);
      expect(result).toContainNonPrimitive([0,2]);
      expect(result).toContainNonPrimitive([2,2]);
    });
  });
      
  describe("nextGeneration", function() {

    it("should stay empty", function() {
      var next = nextGeneration([]);
      expect(next.length).toEqual(0);
    });
    it("should die if single living cell", function() {
      var next = nextGeneration([[0,0]]);
      expect(next).toEqual([]);
    });
    it("should not die if living cell has two living neighbors", function() {
      var next = nextGeneration([[0,0], [1,1], [2,2]]);
      expect(next.length).toEqual(1);
      expect(_.containsNonPrimitive(next,[1,1])).toEqual(true);
    });
    it("should die if living cell has more then three neighbours", function() {
      var next = nextGeneration([[0,0],[1,0],[2,0],[1,1],[1,-1]]);
      expect(next).not.toContainNonPrimitive([1,0]);
      expect(next).toContainNonPrimitive([1,-1]);
      expect(next).toContainNonPrimitive([0,0]);
      expect(next).toContainNonPrimitive([1,1]);
      expect(next).toContainNonPrimitive([2,0]);
    });
    it("should enlive if surrounded by at exactly three neighbours", function () {
      var next = nextGeneration([[0,0],[0,2],[2,0]]);
      expect(next).toContainNonPrimitive([1,1]);
      expect(next.length).toEqual(1);
    });
    it("sould convert shortest cross to square", function () {
      var next = nextGeneration([[-1,0],[0,-1],[1,0],[0,1],[0,0]]);
      expect(next).not.toContainNonPrimitive([0,0]);
      expect(next).toContainNonPrimitive([-1,0]);
      expect(next).toContainNonPrimitive([-1,-1]);
      expect(next).toContainNonPrimitive([0,-1]);
      expect(next).toContainNonPrimitive([1,-1]);
      expect(next).toContainNonPrimitive([1,0]);
      expect(next).toContainNonPrimitive([1,1]);
      expect(next).toContainNonPrimitive([0,1]);
      expect(next).toContainNonPrimitive([-1,1]);
    });
  });
});
/*
   describe("HashSet", function () {
   it ("shall store no duplicates", function () {
   var mySet = new java.util.HashSet();
   expect(mySet.equals(new java.util.HashSet())).toEqual(true);
   });
   });
   */
/**__Jasmine_been_here_before__"
  ) :: failed*/
