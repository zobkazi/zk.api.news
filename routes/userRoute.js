// routes/userRoutes.js
const router = require("express").Router();
const {
  homePage,
  createUser,
  register,
  getDashboard,
  getLogin,
  getProfile,
  postLogin,
  logout,
  getUpdateProfilePage,
  updateProfile,
  getResetPasswordPage,
  resetPassword,
  deleteAccount
} = require("../controllers/userController");

router.get("/", homePage);

// Render user registration form
router.get("/createUser", register);
router.post("/register", createUser);

// Dashboard route
router.get("/dashboard", getDashboard);

//getLogin
router.get("/login", getLogin);
router.post('/login', postLogin); 


router.get('/profile', getProfile);
router.get('/logout', logout);


router.get('/profile/edit', getUpdateProfilePage);
router.post('/profile/update', updateProfile);


// Reset password page route
router.get('/reset-password', getResetPasswordPage);
router.post('/reset-password', resetPassword);

router.post('/deleteAccount', deleteAccount);


module.exports = router;
