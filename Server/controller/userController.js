/* eslint-disable operator-assignment */
/* eslint-disable prefer-template */
const multer = require('multer');

let uid = 1000;

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
        cb(null, `user_${Date.now()}.${ext}`);
    },
});
const upload = multer({ storage: storage });

exports.updatePhoto = upload.single('photo');

const User = require('../models/userModel');

exports.getAllUsers = async(req, res) => {
    try {
        const user = await User.find();

        res.status(201).json({
            status: 'sucess',
            data: { user },
        });
    } catch (err) {
        req.status(404).json({
            status: 'not found',
            message: err,
        });
    }
};

exports.getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'ok',
            data: { user },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'this routes is not yet defined',
        });
    }
};

exports.createUser = async(req, res) => {
    //              http://loacalhost:3000/img1.png\
    if (req) {
        uid = uid + 1;
        req.body.userId = uid;
        console.log(uid);
    }

    if (req.file)
        req.body.photo =
        req.protocol + '://' + req.get('host') + '/' + req.file.filename;

    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: 'sucess',
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateUser = async(req, res) => {
    if (req.file)
        req.body.photo =
        req.protocol + '://' + req.get('host') + '/' + req.file.filename;

    try {
        const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'ok',
            data: {
                newUser,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'something went wrong while updating docs',
        });
    }
};

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong while deleting',
        });
    }
};