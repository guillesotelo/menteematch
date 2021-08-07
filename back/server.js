const express = require("express")
const morgan = require("morgan")

const { connection } = require("./db")
const routes = require("./routes")
const app = express()

// LOGGUER
app.use(morgan("dev"))

//PARSER
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

app.use((err, _, res, __) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

const PORT = 3000

connection.on("error", console.error.bind(console, "connection error:"))

connection.once("open", () => {
  console.log("Connectado a la DB")
  app.listen(PORT, () => console.log(`Server conectado y escuchando en Cluster`))
})
