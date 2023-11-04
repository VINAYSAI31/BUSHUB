const router = require('express').Router();
const Bus = require("../models/busModel");

// addbus router
router.post('/addbus', async (req, res) => {
    try {
        const existingBus = await Bus.findOne({ number: req.body.number });
        if (existingBus) {
            return res.status(200).send({
                success: false,
                message: "Bus already exists",
            })
        }
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({
            success: true,
            message: "Bus added successfully",
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

//update-bus
router.post("/update-bus",async(req,res) => {
    try{
        await Bus.findByIdAndUpdate(req.body._id,req.body);
        return res.status(200).send({
            success:true,
            message: "Bus updated successfully",
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message});

    
    }
    });

    //delete-bus
    router.post("/delete-bus",async(req,res) => {
     try{
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success:true,
            message: "Bus deleted successfully",
        });

     }catch (error) {
        res.status(500).send({ success: false, message: error.message});
     }
    });
// get-all-buses
router.post('/get-all-buses', async (req, res) => {
    try {
        const allBuses = await Bus.find();
        return res.status(200).send({
            success: true,
            message: "Bus fetched successfully",
            data: allBuses, // Changed from 'buses' to 'allBuses'
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

//get-bus-by-id
router.post("/bus-by-id", async (req, res) => {
    try{
        const bus = await Bus.findById(req.body._id);
        return res.status(200).send({
             success: true,
             message: "Bus fetched successfully",
             data: bus,
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;
