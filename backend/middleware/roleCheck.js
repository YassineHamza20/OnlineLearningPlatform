
//checking wether the user has the privilege to continue
const roleCheck = (roles) => {
    return (req, res, next) => {
        roles.push("user")
        console.log(req.user.role);
        if(req.user.role.includes(...roles)) {
            next()
        }else {
            res.status(403).json({message:"You are not authorized"})
        }
    }
}

module.exports = roleCheck