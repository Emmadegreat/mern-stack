const User = require('../model/usermodel');
const getAll = async (req, res) => {
    try {
        User.find((error, docs)=>{
            res.render('index', { users: docs });
        });
    } catch (error) {
        //res.status(500).json({
            //message: error.message = 'server error',
            //type: 'danger'
        console.log(error);
        //})
    }
}

//get register form
const form = async (req, res) => {
    res.render('add')
}


const add = async (req, res) => {
    //console.log(req.body, 'body');
    try {
        const user = await User.create({
            serial: req.body.serial,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,

        })
        user;
        console.log(`The user ${user.name} has been added`);
        res.redirect('/');
    } catch (error) {
        console.log(error);

    }
}

//route to show form to update
const edit = async (req, res) => {
    try {
        let editUser = User.findOneAndUpdate({ _id: req.params.id }, req.body, {new:true},(error, docs)=> {
            res.render('edit', { users: docs });
        })
        editUser
    } catch (error) {
        console.log(error);
    }
}


//route to update form
const update = async (req, res) => {
    try {
        let updateuser = User.findByIdAndUpdate({ _id: req.params.id }, req.body, (error, docs) => {
            //res.render('edit', { users: docs });
        })
        updateuser
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}


//route to delete a user
const deleteUser = async (req, res) => {
    try {
        let del = User.findByIdAndDelete({ _id: req.params.id }, (error, docs) => {

        })
        del;
        res.redirect('/');
        console.log(`deleted successfully`);
    } catch (error) {
        console.log(error);
    }
}


const viewAll = async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({
            message: 'Available users are: ',
            users,
            type: 'success',
        })
    } catch (error) {
        res.status(500).json({
            message: error.message=`unsuccessful, server error!`,
            type:`danger`
        })
    }

}


const Post = async (req, res) => {
    try {
        let Add = await User.create({
            serial: req.body.serial,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
        })
        res.status(200).json({
            message: error.message = `user added.`,
            type: `success`,
            Add
        })
    } catch (error) {
        res.status(500).json({
            message: error.message = `server error`,
            type:`dnger`
        })
    }
}
const getOne = async (req, res) => {
    try {
        const get = await User.findById(req.params.id)
        res.status(200).json({
            message: 'users available',
            type: 'success',
            get
        });
    } catch (error) {
        res.status(500).json({
            message: error.message = 'server error',
            type: 'danger'
        })
    }
}


const dele = async (req, res) => {
    try {
        const del = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'user deleted',
            type: 'success',
            del
        });
    } catch (error) {
        res.status(500).json({
            message: error.message = 'server error',
            type: 'danger'
        })
    }
}


const patch = async(req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const options = { new: true }
        const result = await User.findByIdAndUpdate(id, update, options)
        res.status(200).json({
            message: `Task updated successfully`,
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {getAll, form, add, edit, update, deleteUser, viewAll, getOne, dele, patch}