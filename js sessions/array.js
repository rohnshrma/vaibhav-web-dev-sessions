let dishdata = [
  {
    name: "Butter Chicken",
    price: 320,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    description:
      "Creamy tomato-based chicken curry cooked with butter and spices.",
    type: "non-veg",
    category: "Main Course",
  },
  {
    name: "Paneer Butter Masala",
    price: 280,
    imageUrl:
      "https://images.pexels.com/photos/30858402/pexels-photo-30858402.jpeg",
    description: "Soft paneer cubes in rich buttery tomato gravy.",
    type: "veg",
    category: "Main Course",
  },
  {
    name: "Chicken Biryani",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    description: "Aromatic basmati rice cooked with chicken and spices.",
    type: "non-veg",
    category: "Rice",
  },
  {
    name: "Veg Biryani",
    price: 280,
    imageUrl:
      "https://www.whiskaffair.com/wp-content/uploads/2020/08/Veg-Biryani-2-3.jpg",
    description: "Flavored rice cooked with mixed vegetables.",
    type: "veg",
    category: "Rice",
  },
  {
    name: "Masala Dosa",
    price: 120,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg",
    description: "Crispy dosa stuffed with spiced potato filling.",
    type: "veg",
    category: "South Indian",
  },
  {
    name: "Idli Sambar",
    price: 90,
    imageUrl:
      "https://sapanarestaurant.com/wp-content/uploads/2019/11/idli-sambar.jpg",
    description: "Steamed rice cakes served with sambar and chutney.",
    type: "veg",
    category: "South Indian",
  },
  {
    name: "Chole Bhature",
    price: 180,
    imageUrl:
      "https://madhurasrecipe.com/wp-content/uploads/2025/09/MR-Chole-Bhature-featured.jpg",
    description: "Spicy chickpeas served with fluffy fried bhature.",
    type: "veg",
    category: "North Indian",
  },
  {
    name: "Rajma Chawal",
    price: 160,
    imageUrl:
      "https://www.secondrecipe.com/wp-content/uploads/2017/08/rajma-chawal-1.jpg",
    description: "Kidney bean curry served with rice.",
    type: "veg",
    category: "North Indian",
  },
  {
    name: "Dal Makhani",
    price: 220,
    imageUrl:
      "https://www.pureindianfoods.com/cdn/shop/articles/Dal-Makhani.webp?v=1753479167",
    description: "Slow-cooked black lentils with butter and cream.",
    type: "veg",
    category: "Main Course",
  },
  {
    name: "Palak Paneer",
    price: 240,
    imageUrl:
      "https://healthynibblesandbits.com/wp-content/uploads/2020/01/Saag-Paneer-FF.jpg",
    description: "Paneer cooked in smooth spinach gravy.",
    type: "veg",
    category: "Main Course",
  },
  {
    name: "Samosa",
    price: 40,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    description: "Crispy fried snack filled with spiced potatoes.",
    type: "veg",
    category: "Snacks",
  },
  {
    name: "Pav Bhaji",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027",
    description: "Spicy mashed vegetables served with buttered pav.",
    type: "veg",
    category: "Street Food",
  },
  {
    name: "Vada Pav",
    price: 35,
    imageUrl:
      "https://blog.swiggy.com/wp-content/uploads/2024/11/Image-1_mumbai-vada-pav-1024x538.png",
    description: "Mumbai-style potato fritter burger.",
    type: "veg",
    category: "Street Food",
  },
  {
    name: "Tandoori Chicken",
    price: 360,
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be",
    description: "Yogurt-marinated chicken roasted in tandoor.",
    type: "non-veg",
    category: "Starters",
  },
  {
    name: "Fish Curry",
    price: 320,
    imageUrl:
      "https://www.teaforturmeric.com/wp-content/uploads/2023/06/Fish-Curry-Recipe.jpg",
    description: "Indian-style fish curry with spices.",
    type: "non-veg",
    category: "Seafood",
  },
  {
    name: "Aloo Paratha",
    price: 90,
    imageUrl:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/08/aloo-paratha-recipe-500x500.jpg",
    description: "Stuffed paratha filled with spiced potatoes.",
    type: "veg",
    category: "Breakfast",
  },
  {
    name: "Poha",
    price: 70,
    imageUrl:
      "https://www.funfoodfrolic.com/wp-content/uploads/2024/04/Kanda-Poha-Blog.jpg",
    description: "Flattened rice cooked with onions and peanuts.",
    type: "veg",
    category: "Breakfast",
  },
  {
    name: "Gulab Jamun",
    price: 80,
    imageUrl:
      "https://www.cadburydessertscorner.com/hubfs/dc-website-2022/articles/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know.webp",
    description: "Milk-solid balls soaked in sugar syrup.",
    type: "veg",
    category: "Dessert",
  },
  {
    name: "Rasgulla",
    price: 90,
    imageUrl: "https://static.toiimg.com/photo/52743612.cms",
    description: "Soft spongy cheese balls in sugar syrup.",
    type: "veg",
    category: "Dessert",
  },
];

// Array is used to store multiple values
// These values can be of same or different data types

// Square brackets [ ] are used to create an array
// Each item inside the array is separated by a comma (,)

// Array characteristics:
// 1. Ordered → maintains insertion order
// 2. Indexed → index starts from 0
// 3. Changeable → values can be modified
// 4. Allows duplicates → same value can repeat

let marks = [23, 23, 12, 3, 1, 3, 3, 431];

// Prints the entire array
console.log(marks);

// Accessing array elements using index
// Index starts from 0

console.log(marks[0]); // first element
console.log(marks[4]); // fifth element

// JavaScript does NOT support negative indexing using []
// So this will return undefined
console.log(marks[-1]);

// push() → adds a new element at the END of the array
marks.push(345);
console.log(marks);

// unshift() → adds a new element at the START of the array
marks.unshift(545);
console.log(marks);

// pop() → removes the LAST element from the array
marks.pop();
console.log(marks);

// shift() → removes the FIRST element from the array
marks.shift();
console.log(marks);

// reverse() → reverses the order of elements in the array
marks.reverse();
console.log(marks);

// flat() → converts a nested array into a single array
console.log(
  [
    [1, 2, 3],
    [4, 5, 6],
  ].flat()
);

// at() → returns element at a specific index
// Supports both positive and negative indexing

console.log(marks.at(1)); // second element
console.log(marks.at(-1)); // last element

// find() → returns the FIRST element that satisfies the condition
// Callback receives (element, index, array)

let res = marks.find(function (mark, i, arr) {
  return i == 2; // returns element at index 2
});

console.log(res);

// forEach() → used for iteration
// It does NOT return anything

marks.forEach((mark, i) => {
  console.log(mark, i);
});

// Creating an empty array
let sqs = [];

// Using for loop to store squares of numbers
for (let i = 0; i < marks.length; i++) {
  sqs.push(marks[i] ** 2);
}

// Using forEach() to store squares
marks.forEach(function (mark) {
  sqs.push(mark ** 2);
});

console.log(sqs);

// map() → returns a NEW array after applying logic
// Best alternative to forEach + push

let sqs2 = marks.map(function (mark) {
  return mark ** 2;
});

console.log(sqs2);

// 📝 20 Practice Tasks (Arrays – Same Concepts)
// 🔹 Basic Understanding

// Create an array of 5 city names and print it.

// Access and print the first and last element of the array.

// Try accessing an index that does not exist. What do you get?

// Check whether arrays allow duplicate values by example.

// 🔹 push / pop / shift / unshift

// Add a new number at the end of an array using push().

// Remove the last element using pop().

// Add a value at the beginning using unshift().

// Remove the first value using shift().

// 🔹 Indexing & at()

// Print the 3rd element using normal indexing.

// Print the last element using at() with negative index.

// 🔹 reverse & flat

// Reverse an array of numbers.

// Create a nested array and convert it into a single array using flat().

// 🔹 find()

// Use find() to get the first number greater than 50.

// Use find() to return the element at index 1.

// 🔹 forEach

// Print all elements with their index using forEach().

// Print only even numbers using forEach().

// 🔹 map

// Create a new array that contains squares of numbers using map().

// Convert an array of numbers into their cube using map().

// 🔹 Logic Based

// From an array of marks, create a new array where marks > 40 are increased by 5.

// Create an array of prices and use map() to add 18% GST to each price.

// ==== filter ====
// return item from an array which satisfies the condition

let evens = marks.map(function (mark) {
  return mark % 2 === 0;
});

console.log(evens);

let nums = [1, 2, 3];

// [{ 1: "odd" }, { 2: "even" }, { 3: "odd" }];

let solutions = [];

nums.forEach(function (n) {
  n % 2 === 0
    ? solutions.push({ [n]: "even" })
    : solutions.push({ [n]: "odd" });
});
console.log(solutions);

// let answers = nums.map(function (n) {
//   return n % 2 === 0 ? {[n]: "even" } : { [n]: "odd" };
// });
// console.log(answers);

// let answers = nums.map(function (n) {
//   if (n % 2 === 0) {
//     return { [n]: "even" };
//   } else {
//     return { [n]: "odd" };
//   }
// });
// console.log(answers);

// let answers = nums.map(function (n) {
//   return { [n]: n % 2 === 0 ? "even" : "odd" };
// });
// console.log(answers);

// let data = [{ name: "john" }, { name: "jake" }, { name: "sully" }];

// let x = data.map(function (obj, i) {
//   return { ...obj, id: i + 1 * 100 };
// });

// console.log(x);

console.log(dishdata);

dishdata = dishdata.map(function (dish) {
  return { ...dish, rating: Math.floor(Math.random() * 5) + 1 };
});
console.log(dishdata);

let bestDishes = dishdata.filter(function (dish) {
  return dish.rating >= 4;
});

console.log(bestDishes);

// let sorted = dishdata.sort(function (a, b) {
//   return a.price - b.price;
// });
// let sorted = dishdata.sort(function (a, b) {
//   return b.price - a.price;
// });
let sorted = dishdata.sort(function (a, b) {
  return b.name.localeCompare(a.name);
});

console.log(sorted);
