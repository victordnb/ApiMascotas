'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');


//controller create pet:
const Pet = require('../models/pet');
const pet = require('../models/pet');

//controller create pet:
function createPet(req, res) {
    const pet = new Pet({
        name: req.body.name,
        species: req.body.species,
        gender: req.body.gender,
        age: req.body.age,
        dateBorn: req.body.dateBorn,
    });

    pet.save((err, petStored) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!petStored) {
                res.status(404).send({ message: "Can not stored." });
            } else {
                res.status(200).send({ pet: petStored });
            }
        }
    });
    console.log(res);
}

function getPet(req, res) {
    const petId = req.params.id;
    pet.findById(petId, (err, pet) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!pet) {
                res.status(404).send({ message: "Pet not found" });
            } else {
                res.status(200).send({ pet });
            }
        }
    });
}

function getPets(req, res) {
    pet.find({}, (err, pets) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!pets) {
                res.status(404).send({ message: "Pets not found" });
            } else {
                res.status(200).send({ pets });
            }
        }
    });
}

function updatePet(req, res) {
    const petId = req.params.id;
    const update = req.body;

    pet.findByIdAndUpdate(petId, update, (err, petUpdated) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!petUpdated) {
                res.status(404).send({ message: "Pet not found" });
            } else {
                res.status(200).send({ pet: petUpdated });
            }
        }
    });
}

function deletePet(req, res) {
    const petId = req.params.id;

    pet.findById(petId, (err, pet) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!pet) {
                res.status(404).send({ message: "Pet not found" });
            } else {
                pet.remove(err => {
                    if (err) {
                        res.status(500).send({ message: "Server error" });
                    } else {
                        res.status(200).send({ message: "Pet deleted" });
                    }
                });
            }
        }
    });
}



module.exports = {
    createPet,
    getPet,
    getPets,
    updatePet,
    deletePet

}


