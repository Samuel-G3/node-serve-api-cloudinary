const Pc = require("./pc.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/delete-file");

const postNewPc = async (req, res, next) => {

    try {
        
        const newPc = new Pc();
        newPc.model = req.body.model;

        if (req.file) {

            newPc.img = req.file.path

        }

        newPc.price = req.body.price;
        newPc.components = req.body.components;

        const pcDB = await newPc.save();

        return res.status(201).json(pcDB);

    } catch (error) {
        
        return next(setError(500, "Pc not installed🐿"));

    }

};

const getAllPcs = async (req, res, next) => {

    try {

        const PcsDB = await Pc.find().populate("components");
        
        res.status(200).json(PcsDB)

    } catch (error) {

        return next(setError(500, "WHERE ARE MY PCS?!!!!! 🐿"));
    
    }
}

const getPc = async (req, res, next) => {

    try {

        const { model } = req.params;
        const PcDB = await Pc.find({ model: model }).populate("components");

        if (!PcDB) {

            return next(setError(404, "WHERE IS MY PC?!!!!! 🐿"));

        }

        return res.status(200).json(PcDB);

    } catch (error) {

        return next(setError(500, "Pc not installed🐿"));

    }
    
}

const patchPc = async (req, res, next) => {
    
    try {

        const { id } = req.params
        const patchPc = new Pc(req.body)

        patchPc._id = id

        if (req.file) {

            patchPc.img = req.file.path

        }

        const PcDB = await Pc.findByIdAndUpdate(id, patchPc)

        if (!PcDB) {

            return next(setError(404, "WHERE IS MY PC?!!!!! 🐿"))

        }

        if (PcDB.img) {

            deleteFile(PcDB.img);

        } 

        return res.status(200).json({ new: patchPc, old: PcDB })

    } catch (error) {

        return next(setError(500, "Pc cant be replaced 🐿"))

    }

}

/* const deletePc = async (req, res, next) => {

    try {

        const { model } = req.params;
        const PcDB = await Pc.findOneAndDelete({ model: model }).populate("components");

        if (!PcDB) {

            return next(setError(404, "WHERE IS MY PC?!!!!! 🐿"))

        }

        if (PcDB.img) {

            deleteFile(PcDB.img)

        } 

        return res.status(200).json(PcDB)

    } catch (error) {

        return next(setError(500, "Pc cant be removed🐿"))

    }

} */

module.exports = {
    
    postNewPc,
    getAllPcs,
    getPc,
    patchPc,
    /* deletePc, */

}
