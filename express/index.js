const express = require("express");
const auths = require("@iambpn/auths");
const path = require("path");

process.env["AUTHS_DB_URI"] = path.join(__dirname, "./dev.sqlite");
process.env["AUTHS_SECRET"] = "secret_key";
process.env["AUTHS_DB_DRIVER"] = "better-sqlite";

const app = express();

console.log(path.join(__dirname, "permission.json"));

auths.authsInit(app, path.join(__dirname, "permission.json")).then(() => {
  app.get("/", (req, res) => {
    return res.send({ status: "ok" });
  });

  app.get("/protected", auths.isAuthenticated, auths.requiredPermissions(["read"]), (req, res) => {
    return res.send({ status: "protected", user: req.currentUser });
  });

  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await auths.signup(email, password, "protected");
      return res.status(201).json(result);
    } catch (error) {
      // Handling error in async handler
      next(error);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, token } = req.body;
      const result = await auths.login(token, email);
      return res.status(201).json(result);
    } catch (error) {
      // Handling error in async handler
      next(error);
    }
  });

  app.post("/forgetPassword", async (req, res, next) => {
    try {
      const { email } = req.body;
      const resetPasswordDetails = await initiateForgotPassword(email);

      // send email or send sms

      return res.json(resetPasswordDetails);
    } catch (error) {
      next(error);
    }
  });

  app.use((error, req, res, next) => {
    return res.status(500).json({ message: error.message, type: "global error handler" });
  });

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
});
