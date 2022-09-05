


exports.logout = () => {
    return async (req, res) => {
        try {
        res.clearCookie("jwtoken", { path: "/" });
        res.status(200).send("User logout");
        } catch (error) {
        console.log(error);
        }
    };
}