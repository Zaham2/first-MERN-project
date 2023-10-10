const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// Its common to add comments to these controllers explaining what they do
// @desc Get all users
// @route GET /users
// @access Private (later on)
// notice that there's no (next) parameter as the controller should be
// the end of the line (stack)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean() //lean will tell mongoose to get the data as json... readable format rather than full document file. lean also stops mongoose from saving the data
    if(!users?.length ) {
        return res.status(400).json({ message: 'No users found '})
    }
    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
    const {username, password, roles } = req.body

    // confirm data
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({ message: 'All fields are required'})
    }

    const duplicate = await User.findOne({ username }).lean().exec() //why do we use exec()?

    if(duplicate){
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds

    const userObject = {
        username,
        "password": hashedPassword,
        roles
    }

    // create and store new user
    const user = await User.create(userObject)

    if(user){
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: "Invalid user data received "})
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({ message: 'All fields are required'} )
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    const duplicate = await User.findOne({ username }).lean().exec() //why do we use exec()?
    //allow updates to the original user

    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password) {
        // hash pw again
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save() //this is why we needed the exec and not lean

    res.json({ message: `${updatedUser.username} updated`})
})

// @desc Delete user
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id){
        return res.status(400).json({message: 'User ID Required'})
    }

    const note = await Note.findOne({ user: id }).lean().exec()
    if(note?.length) {
        return res.status(400).json({message: 'User has assigned notes'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with id ${result._id} is now deleted`
    
    res.json(reply)
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}

