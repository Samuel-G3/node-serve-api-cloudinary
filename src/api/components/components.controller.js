const Component = require("./components.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/delete-file");

const postNewComponent = async (req, res, next) => {

    try {
        
        const newComponent = new Component();
        newComponent.name = req.body.name;
        newComponent.model = req.body.model;

        const componentDB = await newComponent.save();

        return res.status(201).json(componentDB);

    } catch (error) {
        
        return next(setError(500, "Component not installed🐿"))

    }

};

const getAllComponents = async (req, res, next) => {

    try {

        const ComponentsDB = await Component.find();
        
        res.status(200).json(ComponentsDB)

    } catch (error) {

        return next(setError(500, "WHERE ARE MY COMPONENTS?!!!!! 🐿"));
    
    }
}

const getComponent = async (req, res, next) => {

    try {

        const { id } = req.params
        const ComponentDB = await Component.findById(id);

        if (!ComponentDB) {

            return next(setError(404, "WHERE IS MY COMPONENT?!!!!! 🐿"));

        }

        return res.status(200).json(ComponentDB)

    } catch (error) {

        return next(setError(500, "Component not installed🐿"))

    }
}

const patchComponent = async (req, res, next) => {
    
    try {

        const { id } = req.params
        const patchComponent = new Component(req.body)

        patchComponent._id = id

        if (req.file) {

            patchComponent.img = req.file.path

        }

        const ComponentDB = await Component.findByIdAndUpdate(id, patchComponent)

        if (!ComponentDB) {

            return next(setError(404, "WHERE IS MY COMPONENT?!!!!! 🐿"))

        }

        return res.status(200).json({ new: patchComponent, old: ComponentDB })

    } catch (error) {

        return next(setError(500, "Component cant be replaced 🐿"))

    }

}

const deleteComponent = async (req, res, next) => {

    try {

        const { id } = req.params
        const ComponentDB = await Component.findByIdAndDelete(id)

        if (!ComponentDB) {

            return next(setError(404, "WHERE IS MY COMPONENT?!!!!! 🐿"))

        }

        return res.status(200).json(ComponentDB)

    } catch (error) {

        return next(setError(500, "Component cant be removed🐿"))

    }

}


module.exports = {
    
    postNewComponent,
    getAllComponents,
    getComponent,
    patchComponent,
    deleteComponent,

}
