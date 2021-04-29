const Walker = require("../models/Walker");

exports.getWalkers = async (req, res, next) => {
    try{
        const walkers = await Walker.find();

        return res.status(200).json({
            success: true,
            count: walkers.length,
            data: walkers
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error'})
        }
    }


exports.addWalker = async (req, res, next) => {
    try{
        const walker = await Walker.create(req.body);

        return res.status(200).json({
            success: true,
            data: walker
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error'})
        }
    }
