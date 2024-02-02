# Express project setup

**_For clean example setup: remove `dev.sqlite` and setup you example app_**

## Signup function

In sign up handler, we have added default role_slug as `protected` so we need to create a `protected` slug role in auths before we can sign up any user in users system.

```js
app.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await signup(email, password, "protected"); // here
    return res.status(201).json(result);
  } catch (error) {
    // Handling error in async handler
    next(error);
  }
});
```

## Adding Permissions

```json
{
  "isSeeded": false, // should be false if you want to execute seed permission. This will be automatically turned to true once permission is seeded
  "permission": [
    {
      "name": "read",
      "slug": "read"
    },
    ... // more permissions here
  ]
}
```

you can access auths dashboard on `localhost:3000/auths` api. default email `admin@admin.com` and password `admin123`
