function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action",
        })
    }
    next();
}

async function requireAdmin(req, res, next) {
    const role = await getRoleById(req.user.role_id)
    if (role !== 'Admin') {
        next({
            name: "UnauthorizedUser",
            message: "You must be an admin to perform this action",
        })
    }
}

module.exports = {
    requireUser,
    requireAdmin,
}