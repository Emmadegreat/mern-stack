const express = require('express');
const router = express.Router()
const User = require('../model/usermodel');
//const { add, form, getAll, edit, update, deleteUser, viewAll, getOne} = require("../controller/contoller")

//router.get("/getadd", form)

router.post("/register", async(req, res) => {
    const { name, email, phone, city } = req.body;
    //console.log({ body:req.body });
    if (!name || !email || !phone || !city) {
        res.status(400).json();
    }

    try {
        const userExist = await User.findOne({ email: email });
        //console.log(userExist);
        if (userExist) {
            alert(`user with email ${email} already exist`);
        } else {
            const newUser = new User({
                name, email, phone, city,
            });
            await newUser.save();
            res.status(200).json();
            console.log(`new user with email: ${email} has just been added.`);


            /*const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
            })
            newUser;
            console.log(`The user ${newUser.name} has been added`);*/
            //res.redirect('/');
        }
    } catch (error) {
        res.status(500).json();
    }

})


//get all users
router.get("/getall", async (req, res) => {
    try {
        let getUsers = await User.find();
        res.status(200).json({
            getUsers,

        });
         //console.log(getUsers);
    } catch (error) {
        res.status(500).json();
    }
})

router.get("/getsingle/:id", async (req, res) => {
    try {
        let singleUser = await User.findById(req.params.id);
        res.status(200).json({
            singleUser
        })
    } catch (error) {
        res.status(500).json({rror:`error`})
    }

})


router.delete("/deletesingle/:id", async (req, res) => {
    try {
        let deleteSingle = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            deleteSingle
        })
    } catch (error) {
        res.status(500).json({rror:`error`})
    }

})

/*router

    .get("/form", form)
    .post("/post", add)
    .get("/", getAll)
    .get("/edit/:id", edit)
    .post("/edit/:id", update)
    .get("/delete/:id", deleteUser)
    .get("/users", viewAll)
    .get("/view/:id", getOne)
    //.patch("/:id", patch)
//router.get("/:id", controller.getOne)
//router.delete("/:id", controller.delete)*/



module.exports = router