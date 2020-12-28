"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
exports.toString = function (_a) {
    var players1 = _a.players1, players2 = _a.players2;
    return ({
        players1: players1.map(function (player) { return player_1.toString(player); }),
        players2: players2.map(function (player) { return player_1.toString(player); }),
    });
};
