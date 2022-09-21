const express = require('express');
const app = express();
app.use(express.json());

let foodList = [
  {
    id: 1,
    name: "apple",
    type: "fruit",
    vegan: true
  },
  {
    id: 2,
    name: "chorizo",
    type: "meat",
    vegan: false
  },
  {
    id: 3,
    name: "tortilla",
    type: "grain",
    vegan: true
  }
];

app.get("/foods", (req, res) => {
  res.status(200).json(foodList)
});

app.post("/foods", (req, res) => {
  //grab data sent by client
  //add data to foodList
  //return new list
  const newFood = req.body; //one can specify a certain element of the object (like name) but body represents the whole object
  foodList.push(newFood);
  res.json(foodList);
});

app.put("/foods", (req, res) => {
  //grab new name
  //loop through list and update names
  //return lists

  const newVegan = req.body.newVegan
  for (let i = 0; i < foodList.length; i++) {
    foodList[i].vegan = newVegan
  }

  res.json(foodList);
})

app.delete("/foods/:id", (req, res) => {
  //get id
  //delete food with id
  //return food list
  let foundId = false;
  const id = req.params.id;
  for (let i = 0; i < foodList.length; i++) {
    if (foodList[i].id == id) {
      foodList.splice(i, 1) //delete element at index i
      foundId = true;
    }
  }
  if (!foundId) {
    res.status(404).json({ error: "User id not found" });
  }
  res.json(foodList);
});

app.listen('3001', () => {
  console.log('Server running on port 3001')
});