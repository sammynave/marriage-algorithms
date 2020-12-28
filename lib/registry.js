"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
/*
 * A Registry stores the list of partners to which a given Player is associated
 */
exports.createRegistry = function () { return ({}); };
exports.engage = function (registry, player1, player2) {
    if (!registry.hasOwnProperty(player1.name)) {
        registry[player1.name] = [];
    }
    if (!registry.hasOwnProperty(player2.name)) {
        registry[player2.name] = [];
    }
    registry[player1.name].push(player2);
    registry[player2.name].push(player1);
};
exports.disengage = function (registry, player1, player2) {
    var indexPlayer2 = registry[player1.name].indexOf(player2);
    var indexPlayer1 = registry[player2.name].indexOf(player1);
    registry[player1.name].splice(indexPlayer2, 1);
    registry[player2.name].splice(indexPlayer1, 1);
};
var numberOfEngagments = function (registry, player) {
    return registry[player.name] ? registry[player.name].length : 0;
};
exports.isOverEngaged = function (registry, player) {
    return numberOfEngagments(registry, player) > player.capacity;
};
exports.isFullyEngaged = function (registry, player) {
    return numberOfEngagments(registry, player) === player.capacity;
};
exports.isSingle = function (registry, player) {
    return numberOfEngagments(registry, player) === 0;
};
exports.currentPartner = function (registry, player) {
    return numberOfEngagments(registry, player) > 0 ? registry[player.name][0] : null;
};
exports.worstPartner = function (registry, player) {
    if (exports.isSingle(registry, player)) {
        return null;
    }
    var max = -1;
    var worst = null;
    registry[player.name].forEach(function (partner) {
        var rankNumber = player_1.rank(player, partner);
        if (rankNumber > max) {
            max = rankNumber;
            worst = partner;
        }
    });
    return worst;
};
exports.allAssigned = function (registry, players) {
    var unassignedPlayers = players.filter(function (player) { return exports.isSingle(registry, player) && player_1.hasCandidate(player); });
    return unassignedPlayers.length === 0;
};
exports.extractMatching = function (registry) {
    var names = Object.keys(registry);
    return names.reduce(function (acc, name) {
        acc[name] = registry[name].map(function (player) { return player.name; });
        return acc;
    }, {});
};
