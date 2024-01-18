# Express project setup

## Signup function

In sign up handler, we added default `protected` so we need to create protected role before we can sign up any user.

```js
app.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await signup(email, password, "protected");
    return res.status(201).json(result);
  } catch (error) {
    // Handling error in async handler
    next(error);
  }
});
```

you can access auths dashboard on `localhost:3000/auths` api. default email `admin@admin.com` and password `admin123`
