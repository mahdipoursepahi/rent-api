const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Advertisement, validate } = require("../models/advertisement");
const auth = require("../middleware/auth");
const _ = require("lodash");

router.get("/", async (req, res) => {
    const advertisements = await Advertisement.find().select("-__v");
    res.send(advertisements);
});

router.get("/userAdvertisements/:id", auth, async (req, res) => {
    const advertisements = await Advertisement.find({ owner: req.params.id }).select("-__v")
    res.send(advertisements)
});

router.get("/:id", auth, async (req, res) => {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("Invalid advertisement")

    const advertisement = await Advertisement.findById(id)
    if (!advertisement) return res.status(404).send("The advertisement with the given ID was not found.")
    res.send(advertisement)
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const advertisement = new Advertisement(_.pick(req.body, ["title", "address", "phoneNumber", "coordinates"]))
    advertisement.owner = req.user._id
    await advertisement.save()
    res.send(advertisement)
});

router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const advertisement = await Advertisement.findByIdAndUpdate(
        req.params.id,
        {
            $set: _.pick(req.body, ["title", "address", "phoneNumber", "coordinates"])
        },
        { new: true }
    );
    if (!advertisement) return res.status(404).send("The advertisement with the given ID was not found.");
    res.send(advertisement)
});

router.delete("/:id", auth, async (req, res) => {
    const advertisement = await Advertisement.findByIdAndRemove(req.params.id)
    if (!advertisement) return res.status(404).send("The advertisement with the given ID was not found.")
    res.send(advertisement)
});

module.exports = router;