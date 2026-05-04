const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));

const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017/calculatorDB";

mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

const Calculation = mongoose.model("Calculation", {
  num1: Number,
  num2: Number,
  operator: String,
  result: Number,
  createdAt: { type: Date, default: Date.now }
});

app.get("/", async (req, res) => {
  const history = await Calculation.find().sort({ createdAt: -1 }).limit(10);

  let historyHtml = history.map(item => {
    return `<li>${item.num1} ${item.operator} ${item.num2} = ${item.result}</li>`;
  }).join("");

  res.send(`
    <h1>Simple Calculator</h1>

    <form method="POST" action="/calculate">
      <input name="num1" type="number" step="any" placeholder="First number" required>
      <select name="operator">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input name="num2" type="number" step="any" placeholder="Second number" required>
      <button type="submit">Calculate</button>
    </form>

    <h2>Last 10 Calculations</h2>
    <ul>${historyHtml}</ul>
  `);
});

app.post("/calculate", async (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const operator = req.body.operator;

  let result;

  if (operator === "+") result = num1 + num2;
  else if (operator === "-") result = num1 - num2;
  else if (operator === "*") result = num1 * num2;
  else if (operator === "/") result = num2 === 0 ? 0 : num1 / num2;

  await Calculation.create({ num1, num2, operator, result });

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Web app running on port 3000");
});
