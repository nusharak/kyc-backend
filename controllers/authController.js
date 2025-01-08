const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.registerUser(username, email, hashedPassword, role, (err, result) => {
    if (err) return res.status(500).send('Database error');
    res.status(200).send('User registered');
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (!result.length) return res.status(400).send('User not found');

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user });
  });
};
