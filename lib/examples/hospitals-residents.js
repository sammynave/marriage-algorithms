"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var problem_1 = require("../problem");
var player_1 = require("../player");
var algorithms_1 = require("../algorithms");
exports.createHospitalsResidentsProblem = function (numberOfResidents, hospitalsCapacities) {
    var residents = Array.from({ length: numberOfResidents }, function (v, residentNumber) {
        return player_1.createPlayer("Resident-" + residentNumber);
    });
    var hospitals = hospitalsCapacities.map(function (capacity, hospitalNumber) {
        return player_1.createPlayer("Hospital number " + hospitalNumber, capacity);
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
// The current Roth-Shapley implementation gives preference to Hospitals instead of Residents
exports.runHospitalsResidentsProblem = function () {
    var hospitalsResidentsProblem = exports.createHospitalsResidentsProblem(10, [3, 3, 4]);
    console.log('Hospitals-Residents problem: ', problem_1.toString(hospitalsResidentsProblem));
    var hospitalsResidentsResult = algorithms_1.rothShapley(hospitalsResidentsProblem);
    console.log('Solution', hospitalsResidentsResult);
};
