"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var problem_1 = require("../problem");
var player_1 = require("../player");
var algorithms_1 = require("../algorithms");
/*
 * To be able to use Roth-Shapley algorithm
 * each Player should have a capacity of 1
 * Therefore, we create as many hospitals as needed to simulate capacities
 * for example Hospital-0_0, Hospital-0_1, Hospital-0_2 to simulate an Hospital-0 with capacity 3
 */
exports.createHospitalsResidentsWithoutCapacityProblem = function (numberOfResidents, hospitalsCapacities) {
    var residents = Array.from({ length: numberOfResidents }, function (v, residentNumber) {
        return player_1.createPlayer("Resident-" + residentNumber);
    });
    var hospitals = [];
    Array.from({ length: hospitalsCapacities.length }).forEach(function (_, hospitalNumber) {
        Array.from({ length: hospitalsCapacities[hospitalNumber] }).forEach(function (_, copyNumber) {
            hospitals.push(player_1.createPlayer("Hospital-" + hospitalNumber + "_" + copyNumber));
        });
    });
    residents.forEach(function (resident) {
        player_1.addCandidates(resident, hospitals);
    });
    var reversedResidents = residents.slice().reverse();
    hospitals.forEach(function (hospital) {
        player_1.addCandidates(hospital, reversedResidents);
    });
    return { players1: residents, players2: hospitals };
};
// We have 3 hospitals (Hospital-0, Hospital-1, and Hospital-2) with respective capacities 3, 3 and 4
// We have 10 residents, whose names are Resident-0, Resident-1, ..., Resident-9
// Each Resident prefers Hospital-0 first, and then Hospital-1 and Hospital-2
// But each Hospital prefers Resident-9, Resident-8, etc.
exports.runHospitalsResidentsWithoutCapacityProblem = function () {
    var hospitalsResidentsProblemWithoutCapacity = exports.createHospitalsResidentsWithoutCapacityProblem(10, [3, 3, 4]);
    console.log('Hospitals-Residents problem: ', problem_1.toString(hospitalsResidentsProblemWithoutCapacity));
    var hospitalsResidentsWithoutCapacityResult = algorithms_1.galeShapley(hospitalsResidentsProblemWithoutCapacity);
    console.log('Solution', hospitalsResidentsWithoutCapacityResult);
};
