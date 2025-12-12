// ============================================
// ASSIGNMENT 2: NESTED IF-ELSE & FOR LOOPS
// ============================================
// Instructions: Solve each task using nested if-else statements and/or for loops
// Do NOT use arrays, objects, or functions
// ============================================

// TASK 1: Grade Classification with Attendance
// Check if a student passes based on marks (>=40) and attendance (>=75%)
// If marks >= 40, check attendance. If attendance >= 75, print "Pass", else "Fail due to low attendance"
// If marks < 40, print "Fail due to low marks"

// let marks = 65;
// let attendance = 80;

// ============================================

// TASK 2: Age and Income Based Insurance Eligibility
// Check if person is eligible for insurance
// Age must be between 18 and 60 (inclusive)
// If age is valid, check if income > 25000
// Print appropriate eligibility message

// let age = 25;
// let income = 30000;

// ============================================

// TASK 3: Temperature and Humidity Check
// If temperature > 30, check humidity
// If humidity > 70, print "Hot and Humid"
// If humidity <= 70, print "Hot but Dry"
// If temperature <= 30, print "Pleasant Weather"

// let temperature = 35;
// let humidity = 75;

// ============================================

// TASK 4: Discount Calculator
// If purchase amount > 1000, check if customer is premium
// Premium customers get 20% discount, regular get 10%
// If amount <= 1000, no discount
// Print final amount after discount

// let purchaseAmount = 1500;
// let isPremium = true;

// ============================================

// TASK 5: Voting Eligibility with Citizenship
// Check if age >= 18
// If yes, check if person is citizen
// Print appropriate eligibility message

// let voterAge = 20;
// let isCitizen = true;

// ============================================

// TASK 6: Print all even numbers from 1 to 20

// ============================================

// TASK 7: Print all odd numbers from 1 to 15

// ============================================

// TASK 8: Calculate sum of numbers from 1 to 10

// let sum = 0;

// ============================================

// TASK 9: Count vowels in a string
// Given: let text = "Hello World"
// Count how many vowels (a, e, i, o, u) are in the text

// let text = "Hello World";
// let vowelCount = 0;

// ============================================

// TASK 10: Print multiplication table of 5 (from 5x1 to 5x10)

// let number = 5;

// ============================================

// TASK 11: Check if a number is prime
// A prime number is only divisible by 1 and itself
// Check numbers from 2 to number-1, if any divides evenly, it's not prime

// let num = 17;
// let isPrime = true;

// let isPrime = true;
// let num = 12;

// for (let i = 2 ; i < num;i+=1){
//   if (num % i ===0){
//     isPrime = false;
//     break;
//   }
// }

// console.log(`${num} ${isPrime ? "is a prime" : "is not a prime"}`);

// ============================================

// TASK 12: Print first 10 multiples of 3

// ============================================

// TASK 13: Reverse a number
// Given: let num = 12345
// Output should be: 54321
// Hint: Use % 10 to get last digit, then divide by 10

// let originalNum =123457654;
// let reversed = 0;

// for(; originalNum > 0 ;){
//   let lastDigit =  originalNum % 10
//   reversed = reversed * 10 + lastDigit
//  originalNum = Math.floor(originalNum / 10)
// }

// console.log(reversed)

// ============================================

// TASK 14: Count digits in a number
// Given: let num = 45678
// Count how many digits are in the number

// let num = 45678;
// let digitCount = 0;

// for(;num > 0;){
//   digitCount+=1
//   num = Math.floor(num / 10)
// }

// console.log(num)

// ============================================

// TASK 15: Calculate factorial of a number
// Factorial of 5 = 5 x 4 x 3 x 2 x 1 = 120

// let n = 5;
// let factorial = 1;

// for (let i = n ; i >= 1; i-=1){
//   factorial = factorial * i
// //   factorial *= i
// }
// console.log(factorial)

// ============================================

// TASK 16: Check if a number is palindrome
// A palindrome number reads the same forwards and backwards
// Example: 121, 1331, 12321

// let originalNum =111;
// let main = originalNum; // 121
// let reversed = 0;

// for(; originalNum > 0 ;){
//   let lastDigit =  originalNum % 10
//   reversed = reversed * 10 + lastDigit
//  originalNum = Math.floor(originalNum / 10)
// }

// console.log(`${main} ${main === reversed?"Palindrome": "Not a Palindrome"}`)

// ============================================

// TASK 17: Print Fibonacci sequence up to 10 terms
// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
// Each number is sum of previous two

// let a = 0;
// let b = 1;
// let c;

//   console.log(a)
//     console.log(b)

// for (let i = 3; i <= 10; i+=1){
//   c = a + b

//   console.log(c)

//   a = b
//   b = c
// }

// ============================================

// TASK 18: Count consonants in a string
// Given: let text = "JavaScript"
// Count all consonants (letters that are not vowels)

let text = "JavaScript ! ! Webigeeks123".toLowerCase();
let consonantCount = 0;

let cleanText = text.replace(/[^a-z]/g, "");
console.log(cleanText);

var vowels = "aeiou";
for (let i = 0; i < cleanText.length; i += 1) {
  if (!vowels.includes(cleanText[i])) {
    consonantCount += 1;
  }
}

console.log(consonantCount);
// ============================================

// TASK 19: Sum of even numbers from 1 to 50

// let evenSum = 0;

// ============================================

// TASK 20: Password Strength Checker (Nested If-Else)
// Check password length >= 8
// If yes, check if it contains a number (hint: check each character)
// If yes, check if it has uppercase letter
// Print strength: "Strong", "Medium", or "Weak"

let password = "pasS5678";
let hasNumber = false;
let hasUppercase = false;

for (let i = 0; i < password.length; i += 1) {
  let ch = password[i];

  if (ch >= "A" && ch <= "Z") {
    hasUppercase = true;
  }

  if (ch >= "0" && ch <= "9") {
    hasNumber = true;
  }
}

console.log(hasNumber);
console.log(hasUppercase);

if (password.length >= 8) {
  if (hasNumber) {
    if (hasUppercase) {
      console.log("strong");
    } else {
      console.log("medium");
    }
  } else {
    console.log("weak 2");
  }
} else {
  console.log("weak 1");
}

// ============================================
// END OF ASSIGNMENT
// ============================================
