const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const { JWT_SECRET } = process.env;

router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
     
    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            res.send({
                error: "UserExistsError",
                name: "UserExistsError",
                message: `User ${username} is already taken.`,
            })
        }
        if (password.length < 8) {
            res.send({
                error: "PasswordTooShortError",
                message: "Password needs at least 8 characters",
                name: "PasswordTooShortError",
            })
        }

        const user = await createUser({
            username, 
            password,
        });

        const token = jwt.sign({id: user.id, username,}, JWT_SECRET)

        res.send({
            message: "Thank you for signing up",
            token,
            user: {
                id: user.id,
                username,
            },
        })
    } catch (error) {
        next(error)
    }
});

router.post("login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.send({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
        });
    }

    try {
    const user = await getUserByUsername(username);
    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (user && isValid) {
      res.send({
        message: "you're logged in!",
        user: {
          id: user.id,
          username,
        },
        token: token,
      });
    } else {
      res.send({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
    } catch (error) {
        next(error);
    }
})

module.exports = router;