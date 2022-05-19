const User = require('../model/client.model');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.email) return res.status(400).json({ "message": 'User email required' });
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User email ${req.body.email} not found` });
    }
    const result = await user.deleteOne({ email: req.body.email });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ "message": 'User Email required' });
    const user = await User.findOne({ email: req.params.email }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User Email ${req.params.email} not found` });
    }
    res.json(user);
}


module.exports = {
    getAllUsers,
    deleteUser,
    getUser,


}