"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = function (_a) {
    var name = _a.name, candidates = _a.candidates, capacity = _a.capacity;
    return "" + name + (capacity > 1 ? " (capacity=" + capacity + ")" : '') + " prefers: " + candidates
        .map(function (_a) {
        var name = _a.name;
        return name;
    })
        .join(', ');
};
exports.createPlayer = function (name, capacity) {
    if (capacity === void 0) { capacity = 1; }
    return ({
        name: name,
        candidates: [],
        rankTable: {},
        capacity: capacity,
    });
};
exports.addCandidate = function (player, candidate) {
    player.candidates.push(candidate);
    player.rankTable[candidate.name] = player.candidates.length - 1;
};
exports.addCandidates = function (player, candidates) {
    candidates.forEach(function (candidate) {
        exports.addCandidate(player, candidate);
    });
};
exports.removeCandidate = function (player, candidate) {
    var index = player.candidates.indexOf(candidate);
    player.candidates.splice(index, 1);
    delete player.rankTable[candidate.name];
};
exports.hasCandidate = function (_a) {
    var candidates = _a.candidates;
    return candidates.length > 0;
};
exports.topCandidate = function (_a) {
    var candidates = _a.candidates;
    return candidates[0];
};
exports.nextCandidate = function (player) {
    var topCandidate = player.candidates.shift();
    if (topCandidate) {
        delete player.rankTable[topCandidate.name];
        return topCandidate;
    }
    return null;
};
exports.successorsOf = function (_a, candidate) {
    var candidates = _a.candidates;
    return candidates.slice(1 + candidates.indexOf(candidate));
};
exports.rank = function (_a, candidate) {
    var rankTable = _a.rankTable;
    return rankTable.hasOwnProperty(candidate.name) ? rankTable[candidate.name] : Infinity;
};
