const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const user = await authService.registerUser(name, email, password, role);
        res.status(201).json({ message: 'User registered successfully', id: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const { user, token, refreshToken } = await authService.loginUser(email, password);
        res.json({ id: user._id, name: user.name, email: user.email, role: user.role, token, refreshToken });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await authService.getUser(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({user});
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { register, login, getUser };
