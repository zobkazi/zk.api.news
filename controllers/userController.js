const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.homePage = (req, res) => {
  res.render("index");
};

// Controller to render the dashboard
exports.getDashboard = async (req, res, next) => {
  try {
    // Fetch all users from the database (you may want to add pagination here)
    const users = await User.find();

    const authenticated = req.session.userId !== undefined;

    let user;
    if (authenticated) {
      user = await User.findById(req.session.userId);
    }

    res.render("dashboard", { user, authenticated });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username is provided
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    } else {
      console.log("data save success");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // Add more fields as needed
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.redirect("/api/login");
  } catch (error) {
    console.log(err);
    next(error);
  }
};

//responds-user

exports.register = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user by id
    const user = await User.findOne({ email });

    console.log("User:", user); // Add this line

    if (!user) {
      console.log("User not found."); // Add this line
      return res.redirect("/api/login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Is password valid:", isPasswordValid); // Add this line

    if (!isPasswordValid) {
      console.log("Invalid password."); // Add this line
      return res.redirect("/api/login");
    }

    req.session.userId = user._id;

    res.redirect("/api/dashboard");
  } catch (error) {
    console.error(error);
    next();
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("profile", { user });
  } catch (error) {
    console.log(error);
    next();
  }
};

//logoutUser

exports.logout = (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }

    // Redirect to the home page after logout
    res.redirect("/api");
  });
};

// getUpdateProfilePage

exports.getUpdateProfilePage = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("updateProfile", { user });
  } catch (error) {
    next(error);
  }
};

//updateProfile

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { newUsername, newEmail } = req.body;

    // Validate and update the user's information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername, email: newEmail },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("profile", { user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// controllers/userController.js
exports.getResetPasswordPage = (req, res) => {
  // Render the password reset page
  res.render("resetPassword");
};



exports.resetPassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password matches
    const isOldPasswordValid = await bcrypt.compare(
      oldPassword.trim(),
      user.password
    );

    console.log('Provided Old Password:', oldPassword);
    console.log('Stored Hashed Password:', user.password);
    console.log('Trimmed Provided Old Password:', oldPassword.trim());
    console.log('Is Old Password Valid:', isOldPasswordValid);
    
    const hashedProvidedOldPassword = await bcrypt.hash(oldPassword.trim(), 10);
    console.log('Hashed Provided Old Password:', hashedProvidedOldPassword);
    console.log('Stored Hashed Password:', user.password);
    
    if (!isOldPasswordValid) {
      return res.render("resetPassword", { errors: { oldPassword: "Invalid old password" } });
    }

    // Check if the new password and confirm password match

    if (newPassword !== confirmNewPassword) {
      return res.render("resetPassword", { errors: { confirmNewPassword: "New password and confirm password do not match" } });
    }

    // Update the user's password to the new password
    user.password = await bcrypt.hash(newPassword, 10);

    console.log(newPassword);
    req.session.destroy();

    // Save the updated user
    await user.save();

    return res.render("login");
  } catch (error) {
    next(error);
  }
};







exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Clear the session after account deletion
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
      }

      // Redirect to the home page after account deletion
      res.redirect("/api");
    });
  } catch (error) {
    next(error);
  }
};
