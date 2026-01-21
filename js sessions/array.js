// used to store mulitple values of similar or different data types

// [ ] are used to create an array, where items are divided by comma ","

// ordered, indexed, changable , allows duplicates

let marks = [23, 23, 12, 3, 1, 3, 3, 431];

console.log(marks);

console.log(marks[0]);
console.log(marks[4]);
console.log(marks[-1]); // supports only positive indexing not negative

marks.push(345); // adds a new item at the end
console.log(marks);
marks.unshift(545); // adds a new item at the start
console.log(marks);
marks.pop(); // removes last item from array
console.log(marks);
marks.shift(); // removes first item from array
console.log(marks);
