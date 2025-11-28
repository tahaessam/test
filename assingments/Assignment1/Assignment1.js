// 1
let str1 = '123'
STRI_CONVERTED = Number(str1)
let str2 = STRI_CONVERTED + 7;
console.log(str2); // after covert and add 7 
console.log(str1);// ba3d conv
//=====
//q2
let x = 0
if (x == 0) { console.log("falsy") }
else { console.log("Invalid") }
//qus 3 
console.log("awl el loop  ")
let i;
for (i = 0; i <= 10; i++) {
  if (i % 2 == 1) { console.log(i) }
}
console.log("a5er el loop even num q3  ")
//q4 
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let evenNumbers = arr.filter(function (num) {
  return num % 2 === 0;
})
console.log(evenNumbers);
//ضعس5
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];

console.log(numbersCombined);
//6
let day;
function getday(day) {

  switch (day) {
    case 1:
      return "Sunday";
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    default:
      return "Invalid day number";
  }
}
console.log(getday(4));
// q 7
const arr4 = ["a", "ab", "abc"];
const lengths = arr4.map(l => l.length);

console.log(lengths);

//q8 
let z;
function div(z) {

  if (z % 3 == 0 && z % 5 == 0) {
    console.log("Divisible by both")
  }
  else {
    console.log(" not Divisible by both")

  }

}
div(15)
//q9 

let t = (num1) => num1 ** 2;
console.log(t(2))
// q 10

const person = { name: 'John', age: 25 }
console.log(person.name + " is " + person.age + " years old")
//q11
function sumall(...numbers) {
  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }
  return sum;
}

console.log(sumall(1, 2, 3, 4, 5));

//q12 //? advancad **
function waitForSuccess() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Success");
    }, 3000); // 3 seconds
  });
}
waitForSuccess().then((msg) => console.log(msg));


//q13


// var arr3 = [3, 6, 2, 56, 32, 5, 89, 32];
function findLargest(arr) {
  return Math.max(...arr);
}
console.log(findLargest([1, 3, 7, 2, 4]));

// q14
function getKeys(obj) {
  return Object.keys(obj); //!  important (object. keys built in  ) 
}
const person2 = { name: "John", age: 30 };
console.log(getKeys(person));

//q15 need help 
// function split_arr ( s)
// {
//   arr=["aaaaa"]
// arr.sp
// }