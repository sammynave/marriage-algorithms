"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var registry_1 = require("./registry");
describe('Registry', function () {
    it('should create a registry', function () {
        var registry = registry_1.createRegistry();
        var player = player_1.createPlayer('player', 1);
        expect(registry_1.isOverEngaged(registry, player)).toBeFalsy();
        expect(registry_1.isFullyEngaged(registry, player)).toBeFalsy();
        expect(registry_1.isSingle(registry, player)).toBeTruthy();
        expect(registry_1.currentPartner(registry, player)).toBeNull();
        expect(registry_1.worstPartner(registry, player)).toBeNull();
    });
    it('should engage a player', function () {
        var registry = registry_1.createRegistry();
        var player1 = player_1.createPlayer('player 1', 1);
        var player2 = player_1.createPlayer('player 2', 1);
        registry_1.engage(registry, player1, player2);
        expect(registry_1.isOverEngaged(registry, player1)).toBeFalsy();
        expect(registry_1.isOverEngaged(registry, player2)).toBeFalsy();
        expect(registry_1.isFullyEngaged(registry, player1)).toBeTruthy();
        expect(registry_1.isFullyEngaged(registry, player2)).toBeTruthy();
        expect(registry_1.isSingle(registry, player1)).toBeFalsy();
        expect(registry_1.isSingle(registry, player2)).toBeFalsy();
        expect(registry_1.currentPartner(registry, player1)).toEqual(player2);
        expect(registry_1.currentPartner(registry, player2)).toEqual(player1);
        expect(registry_1.worstPartner(registry, player1)).toEqual(player2);
        expect(registry_1.worstPartner(registry, player2)).toEqual(player1);
        expect(registry_1.allAssigned(registry, [player1, player2])).toBeTruthy();
    });
    it('should disengage an engaged player', function () {
        var registry = registry_1.createRegistry();
        var player1 = player_1.createPlayer('player 1', 1);
        var player2 = player_1.createPlayer('player 2', 1);
        registry_1.engage(registry, player1, player2);
        registry_1.disengage(registry, player1, player2);
        expect(registry_1.isOverEngaged(registry, player1)).toBeFalsy();
        expect(registry_1.isFullyEngaged(registry, player1)).toBeFalsy();
        expect(registry_1.isSingle(registry, player1)).toBeTruthy();
        expect(registry_1.currentPartner(registry, player1)).toBeNull();
        expect(registry_1.worstPartner(registry, player1)).toBeNull();
        expect(registry_1.isOverEngaged(registry, player2)).toBeFalsy();
        expect(registry_1.isFullyEngaged(registry, player2)).toBeFalsy();
        expect(registry_1.isSingle(registry, player2)).toBeTruthy();
        expect(registry_1.currentPartner(registry, player2)).toBeNull();
        expect(registry_1.worstPartner(registry, player2)).toBeNull();
    });
    it('should extract matching', function () {
        var registry = registry_1.createRegistry();
        var player1 = player_1.createPlayer('player 1', 1);
        var player2 = player_1.createPlayer('player 2', 1);
        registry_1.engage(registry, player1, player2);
        var matching = registry_1.extractMatching(registry);
        expect(matching[player1.name]).toContain(player2.name);
        expect(matching[player2.name]).toContain(player1.name);
    });
});
