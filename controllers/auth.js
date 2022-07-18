const firebase = require("./../config/firebase");
const jwt = require('jsonwebtoken')

// signup
exports.signup = (req, res) => {
  console.log(req.body)
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
      let authData = {
        data: data.user.providerData,
        token: token
      }
      return res.status(201).json(authData);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        console.log("test", errorMessage)
        return res.status(500).json({ error: errorMessage });
      } else {
        console.log(errorMessage)
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// signin
exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
      let authData = {
        data: data.user.providerData,
        token: token
      }
      return res.status(201).json(authData);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
};