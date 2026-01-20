console.log("Node.js Backend Started");  // Prints a message to the console indicating the backend has started

let name="gopal";  //Declares a variable 'name' and stores a string value
let age=20;        //Declares a variable 'age' and stores a numeric value
const country="India";  //Declares a constant 'country' and stores a string value
let isStudent=true;   //Declare a variable 'isStudent' and store a boolean value (true/false)

console.log("Name:", name);  //print the value of the variable 'name to the console
console.log("Age:", age);    //print the value of the variable 'age to the console
console.log("Country:", country); //print the value of the constant 'country' to the console
console.log("Is Student:", isStudent);  //print the value of the variable 'isStudent' to the console

//Data Types    
let score;
let data = null;
console.log("Score:", score);  //undefined      
console.log("Data:", data);    //null

//object
let user={     //creates an object 'user' with properties
    name: "gopal",
    age: 20,
    country: "India",
    email: "jaindhruv322@gmail.com"
};

//Operations
let a=5;
let b=10;

console.log("Addition:", a + b);          //Addition
console.log("Subtraction:", b - a);       //Subtraction
console.log("Multiplication:", a * b);  //Multiplication
console.log("Division:", b / a);         //Division         

//Conditional Statements
let ageCheck=18;
if(ageCheck >= 18){   //checks if ageCheck is 18 or older
    console.log(name + " is an adult.");
} else {
    console.log(name + " is a minor.");
}

//Loops(for loop)
for(let i=1; i<=5; i++){      
    console.log("Loop Count:", i);   //prints the current loop count to the console
}

//Function
function add(x,y){
    return x + y;      //returns the sum of x and y

}

let result=add(15,25);
console.log("Function Result:", result);  //print the result of the function to the console

//login Credentials
const admin={
    username: "admin",
    password: "password123"             
}

function login(username, password){
    if(username === admin.username && password === admin.password){       //checks if the provided username and password match the admin credentials
        console.log("Login Successful");
    } else {
        console.log("Login Failed");
    }
}

login("admin", "password123");     //Test the login function with correct credentials
login("user", "wrongpassword");    //Test the login function with incorrect credentials