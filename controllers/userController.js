exports.dashboard = async (req, res) => {
    try {
        // Only return minimal info for Angular
        res.json({
            message: "Welcome to Admin Dashboard",
            user: req.user // optional: include role, email, etc.
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
