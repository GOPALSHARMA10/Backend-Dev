const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const rateLimit = require("express-rate-limit")

const app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/bank")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.get("/", (req, res) => res.send("API is running"))

const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, default: "user" }
})

const Account = mongoose.model("Account", {
  userId: mongoose.Schema.Types.ObjectId,
  balance: { type: Number, default: 0 },
  accountType: String
})

const Transaction = mongoose.model("Transaction", {
  fromAccount: mongoose.Schema.Types.ObjectId,
  toAccount: mongoose.Schema.Types.ObjectId,
  amount: Number,
  date: { type: Date, default: Date.now }
})

const SECRET = "secret"

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.sendStatus(401)
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.sendStatus(403)
  }
}

const admin = (req, res, next) => {
  if (req.user.role !== "admin") return res.sendStatus(403)
  next()
}

app.use(rateLimit({ windowMs: 60000, max: 20 }))

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6)
})

app.post("/register", async (req, res) => {
  const { error } = schema.validate(req.body)
  if (error) return res.send(error.message)

  const hash = await bcrypt.hash(req.body.password, 10)
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    passwordHash: hash
  })

  await Account.create({ userId: user._id, accountType: "savings" })

  res.send("User created")
})

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.send("Invalid")

  const ok = await bcrypt.compare(req.body.password, user.passwordHash)
  if (!ok) return res.send("Invalid")

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET)
  res.json({ token })
})

const check = async (id, amt) => {
  const acc = await Account.findById(id)
  if (!acc || acc.balance < amt) throw "Insufficient funds"
  return acc
}

app.post("/deposit", auth, async (req, res) => {
  const acc = await Account.findOne({ userId: req.user.id })
  acc.balance += req.body.amount
  await acc.save()

  await Transaction.create({ toAccount: acc._id, amount: req.body.amount })
  res.send("Deposited")
})

app.post("/withdraw", auth, async (req, res) => {
  try {
    const acc = await Account.findOne({ userId: req.user.id })
    await check(acc._id, req.body.amount)

    acc.balance -= req.body.amount
    await acc.save()

    await Transaction.create({ fromAccount: acc._id, amount: req.body.amount })
    res.send("Withdrawn")
  } catch (e) {
    res.send(e)
  }
})

app.post("/transfer", auth, async (req, res) => {
  try {
    const from = await Account.findOne({ userId: req.user.id })
    const to = await Account.findById(req.body.toAccount)

    await check(from._id, req.body.amount)

    from.balance -= req.body.amount
    to.balance += req.body.amount

    await from.save()
    await to.save()

    await Transaction.create({
      fromAccount: from._id,
      toAccount: to._id,
      amount: req.body.amount
    })

    res.send("Transferred")
  } catch (e) {
    res.send(e)
  }
})

app.get("/transactions", auth, async (req, res) => {
  const acc = await Account.findOne({ userId: req.user.id })
  const data = await Transaction.find({
    $or: [{ fromAccount: acc._id }, { toAccount: acc._id }]
  })
  res.json(data)
})

app.get("/accounts", auth, admin, async (req, res) => {
  res.json(await Account.find())
})

app.listen(3000, () => console.log("Server running on port 3000"))
