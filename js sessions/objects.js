const car = {
  model: "i10",
  brand: "hyundai",
  year: 2020,
};

console.log(car["model"]);
console.log(car.model);

car["model"] = "i20 asta";

console.log(car["model"]);

car["color"] = "grey";

console.log(car);
