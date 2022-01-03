const express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    host = app.use(express.static("public"))

app.listen(port, () => console.log(`litnin ${port}`))