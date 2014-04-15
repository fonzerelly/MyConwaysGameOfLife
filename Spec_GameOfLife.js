/*global describe, it, expect, beforeEach,  _, load, java, nextGeneration*/
//load("GameOfLife.js");
/**/
describe("_.containsNonPrimitive", function () {
    it ("shall find an Array in an Array", function () {
        expect(_.containsNonPrimitive([[1,1], [1,2], [1,3]], [1,1])).toEqual(true);
    });
});
describe("nextGeneration", function() {
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

    it("should stay empty", function() {
        var next = nextGeneration([]);
        expect(next).toEqual([]);
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
