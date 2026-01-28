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
