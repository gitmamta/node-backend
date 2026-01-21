exports.getDashboard = async (req, res) => {
  try {
    // Just send a success message, Angular will show the page
    res.json({
      message: "Welcome to Admin Dashboard",
      user: req.user, // optional, can include email, role, etc.
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
