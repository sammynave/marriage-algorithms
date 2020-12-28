"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var problem_1 = require("../problem");
var player_1 = require("../player");
var algorithms_1 = require("../algorithms");
exports.createManWomanProblem = function () {
    var albert = player_1.createPlayer('Albert');
    var bob = player_1.createPlayer('Bob');
    var charles = player_1.createPlayer('Charles');
    var denis = player_1.createPlayer('Denis');
    var alice = player_1.createPlayer('Alice');
    var brigitte = player_1.createPlayer('Brigitte');
    var diane = player_1.createPlayer('Diane');
    var emily = player_1.createPlayer('Emily');
    player_1.addCandidates(albert, [alice, brigitte, diane, emily]);
    player_1.addCandidates(bob, [alice, emily, diane, brigitte]);
    player_1.addCandidates(charles, [brigitte, alice, diane, emily]);
    player_1.addCandidates(denis, [emily, brigitte, diane, alice]);
    player_1.addCandidates(alice, [denis, charles, albert, bob]);
    player_1.addCandidates(brigitte, [bob, denis, albert, charles]);
    player_1.addCandidates(diane, [denis, albert, bob, charles]);
    player_1.addCandidates(emily, [charles, bob, albert, denis]);
    return { players1: [albert, bob, charles, denis], players2: [alice, brigitte, diane, emily] };
};
exports.runManWomanProblem = function () {
    var manWomanProblem = exports.createManWomanProblem();
    console.log('Man-Woman problem: ', problem_1.toString(manWomanProblem));
    var manWomanResult = algorithms_1.galeShapley(manWomanProblem);
    console.log('Solution', manWomanResult);
};