const checkAuth = require('./checkAuth');
const deleteUser = require('./deleteUser');
const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');

module.exports = { signup, login, logout, checkAuth, deleteUser };
