"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var registry_1 = require("./registry");
/*
 * Gale-Shapley algorithm can be used when the maximal capacity of each Player is 1
 */
exports.galeShapley = function (_a) {
    var players = _a.players1;
    var galeShapleyAux = function (registry, players) {
        players.forEach(function (player) {
            if (!registry_1.isSingle(registry, player)) {
                // do nothing
                return;
            }
            var candidate = player_1.nextCandidate(player);
            if (!candidate) {
                // do nothing
                return;
            }
            if (registry_1.isSingle(registry, candidate)) {
                registry_1.engage(registry, player, candidate);
            }
            else {
                var currentPartnerOfCandidate = registry_1.currentPartner(registry, candidate);
                if (currentPartnerOfCandidate !== null &&
                    player_1.rank(candidate, player) < player_1.rank(candidate, currentPartnerOfCandidate)) {
                    registry_1.disengage(registry, currentPartnerOfCandidate, candidate);
                    registry_1.engage(registry, player, candidate);
                }
            }
        });
        if (!registry_1.allAssigned(registry, players)) {
            galeShapleyAux(registry, players);
            return;
        }
    };
    var registry = registry_1.createRegistry();
    galeShapleyAux(registry, players);
    return registry_1.extractMatching(registry);
};
/*
 * Roth-Shapley algorithm can be used when Players have a capacity greater than 1
 *
 * 0. Assign all residents to be unmatched, and all hospitals to be totally unsubscribed.
 * 1. Take any unmatched resident with a non-empty preference list, r, and consider their most preferred hospital, h.
 *    Match them to one another.
 * 2. If, as a result of this new matching, h is now over-subscribed, find the worst resident currently assigned to h, r'.
 *    Set r' to be unmatched and remove them from the hospital's matching. Go to 3.
 * 3. If h is at capacity (fully subscribed) then find their worst current match r'.
 *    Then, for each successor, s, to r' in the preference list of h, delete the pair (s, h) from the game. Go to 4.
 * 4. Go to 1 until there are no such residents left, then end.
 */
exports.rothShapley = function (_a) {
    var players = _a.players1;
    var rothShapleyAux = function (registry, players) {
        players.forEach(function (player) {
            if (registry_1.isSingle(registry, player) && player_1.hasCandidate(player)) {
                var candidate_1 = player_1.topCandidate(player);
                registry_1.engage(registry, player, candidate_1);
                if (registry_1.isOverEngaged(registry, candidate_1)) {
                    var worstPartnerOfCandidate = registry_1.worstPartner(registry, candidate_1);
                    if (worstPartnerOfCandidate !== null) {
                        registry_1.disengage(registry, worstPartnerOfCandidate, candidate_1);
                    }
                }
                if (registry_1.isFullyEngaged(registry, candidate_1)) {
                    var worstPartnerOfCandidate = registry_1.worstPartner(registry, candidate_1);
                    if (worstPartnerOfCandidate !== null) {
                        var successors = player_1.successorsOf(candidate_1, worstPartnerOfCandidate);
                        successors.forEach(function (successor) {
                            player_1.removeCandidate(successor, candidate_1);
                            player_1.removeCandidate(candidate_1, successor);
                        });
                    }
                }
            }
        });
        if (!registry_1.allAssigned(registry, players)) {
            return rothShapleyAux(registry, players);
        }
    };
    var registry = registry_1.createRegistry();
    rothShapleyAux(registry, players);
    return registry_1.extractMatching(registry);
};
