"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
describe('Player', function () {
    it('should create a player', function () {
        var player = player_1.createPlayer('player', 1);
        expect(player.name).toEqual('player');
    });
    it('should add a candidate', function () {
        var player = player_1.createPlayer('player', 1);
        var candidate = player_1.createPlayer('candidate', 1);
        player_1.addCandidate(player, candidate);
        expect(player_1.hasCandidate(player)).toBeTruthy();
        expect(player_1.topCandidate(player)).toBe(candidate);
        expect(player_1.rank(player, candidate)).toEqual(0);
        expect(player_1.successorsOf(player, candidate)).toHaveLength(0);
    });
    it('should add two candidates', function () {
        var player = player_1.createPlayer('player', 1);
        var candidate1 = player_1.createPlayer('candidate 1', 1);
        var candidate2 = player_1.createPlayer('candidate 2', 1);
        player_1.addCandidates(player, [candidate1, candidate2]);
        expect(player_1.hasCandidate(player)).toBeTruthy();
        expect(player_1.topCandidate(player)).toBe(candidate1);
        expect(player_1.rank(player, candidate1)).toEqual(0);
        expect(player_1.rank(player, candidate2)).toEqual(1);
        expect(player_1.successorsOf(player, candidate1)).toEqual([candidate2]);
        var next = player_1.nextCandidate(player);
        expect(player_1.rank(player, candidate1)).toEqual(Infinity);
        player_1.removeCandidate(player, candidate2);
        player_1.addCandidates(player, [candidate1, candidate2]);
        player_1.removeCandidate(player, candidate1);
        expect(player_1.rank(player, candidate1)).toEqual(Infinity);
        expect(player_1.rank(player, candidate2)).toEqual(1);
        player_1.removeCandidate(player, candidate2);
        player_1.addCandidates(player, [candidate1, candidate2]);
        player_1.removeCandidate(player, candidate2);
        expect(player_1.rank(player, candidate1)).toEqual(0);
        expect(player_1.rank(player, candidate2)).toEqual(Infinity);
    });
});
