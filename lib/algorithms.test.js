"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var player_1 = require("./player");
var algorithms_1 = require("./algorithms");
var createProblem2301 = function () {
    var students = Array.from({ length: 4 }, function (v, i) {
        return player_1.createPlayer("Student" + i);
    });
    var correctors = Array.from({ length: 4 }, function (v, i) {
        return player_1.createPlayer("Corrector" + i);
    });
    player_1.addCandidates(students[0], [
        correctors[0],
        correctors[1],
        correctors[2],
        correctors[3],
    ]);
    player_1.addCandidates(students[1], [
        correctors[0],
        correctors[3],
        correctors[2],
        correctors[1],
    ]);
    player_1.addCandidates(students[2], [
        correctors[1],
        correctors[0],
        correctors[2],
        correctors[3],
    ]);
    player_1.addCandidates(students[3], [
        correctors[3],
        correctors[1],
        correctors[2],
        correctors[0],
    ]);
    player_1.addCandidates(correctors[0], [
        students[3],
        students[2],
        students[0],
        students[1],
    ]);
    player_1.addCandidates(correctors[1], [
        students[1],
        students[3],
        students[0],
        students[2],
    ]);
    player_1.addCandidates(correctors[2], [
        students[3],
        students[0],
        students[1],
        students[2],
    ]);
    player_1.addCandidates(correctors[3], [
        students[2],
        students[1],
        students[0],
        students[3],
    ]);
    return { students: students, correctors: correctors };
};
describe("Gale-Shapley algorithm", function () {
    it("should return an empty solution when there is no student", function () {
        var students = [];
        var result = algorithms_1.galeShapley(students);
        expect(result).toEqual({});
    });
    it("should return [2, 3, 0, 1] for this well known problem", function () {
        // http://www.ams.org/publicoutreach/feature-column/fc-2015-03
        var students = createProblem2301().students;
        var result = algorithms_1.galeShapley(students);
        expect(result["Student0"][0]).toEqual("Corrector2");
        expect(result["Student1"][0]).toEqual("Corrector3");
        expect(result["Student2"][0]).toEqual("Corrector0");
        expect(result["Student3"][0]).toEqual("Corrector1");
    });
});
describe("Roth-Shapley algorithm", function () {
    it("should return an empty solution when there is no student", function () {
        var students = [];
        var result = algorithms_1.rothShapley(students);
        expect(result).toEqual({});
    });
    it("should find a solution when there is more students than correctors", function () {
        var students = Array.from({ length: 10 }, function (v, i) {
            return player_1.createPlayer("Student" + i);
        });
        var correctors = Array.from({ length: 2 }, function (v, i) {
            return player_1.createPlayer("Corrector" + i, 2);
        });
        students.forEach(function (student) {
            player_1.addCandidates(student, correctors);
        });
        var reversedStudents = students.slice().reverse();
        correctors.forEach(function (corrector) {
            player_1.addCandidates(corrector, reversedStudents);
        });
        var result = algorithms_1.rothShapley(students);
        expect(result["Student0"]).toHaveLength(0);
        expect(result["Student1"]).toHaveLength(0);
        expect(result["Student2"]).toHaveLength(0);
        expect(result["Student3"]).toHaveLength(0);
        expect(result["Student4"]).toHaveLength(0);
        expect(result["Student5"]).toHaveLength(0);
        expect(result["Student6"][0]).toEqual("Corrector1");
        expect(result["Student7"][0]).toEqual("Corrector1");
        expect(result["Student8"][0]).toEqual("Corrector0");
        expect(result["Student9"][0]).toEqual("Corrector0");
    });
    it("should find a solution when there is more correctors than students ", function () {
        var students = Array.from({ length: 2 }, function (v, i) {
            return player_1.createPlayer("Student" + i);
        });
        var correctors = Array.from({ length: 10 }, function (v, i) {
            return player_1.createPlayer("Corrector" + i, 10);
        });
        students.forEach(function (student) {
            player_1.addCandidates(student, correctors);
        });
        correctors.forEach(function (corrector) {
            player_1.addCandidates(corrector, students.slice());
        });
        var result = algorithms_1.rothShapley(students);
        expect(result["Student0"][0]).toEqual("Corrector0");
        expect(result["Student1"][0]).toEqual("Corrector0");
    });
    it("should return [2, 3, 0, 1] for this well known problem", function () {
        // http://www.ams.org/publicoutreach/feature-column/fc-2015-03
        var students = createProblem2301().students;
        var result = algorithms_1.rothShapley(students);
        expect(result["Student0"][0]).toEqual("Corrector2");
        expect(result["Student1"][0]).toEqual("Corrector3");
        expect(result["Student2"][0]).toEqual("Corrector0");
        expect(result["Student3"][0]).toEqual("Corrector1");
    });
});
