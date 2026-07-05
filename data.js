// CodeEasy - Full Curriculum Data

export const javaLessons = [
  {
    id: "java-intro",
    title: "What is Java?",
    analogy: "Java is like a <b>universal translator</b>. You write code once, and any computer — Windows, Mac, Android phone — can understand it, as long as it has the 'translator box' called the <b>Java Virtual Machine (JVM)</b> installed!",
    explanation: "Java is a popular programming language created in 1995. It is known for being safe, fast, and 'Write Once, Run Anywhere'. It's used to build Android apps, games (like Minecraft!), and banking systems.",
    codeExample: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    exercise: { question: "Change the message to print: CodeEasy is fun!", initialCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`, expectedOutput: "CodeEasy is fun!" }
  },
  {
    id: "java-variables",
    title: "Variables",
    analogy: "A variable is like a <b>labeled storage box</b>. You put a label on a box (e.g. 'myScore') and store something inside. Later you can open the box and use what's inside!",
    explanation: "In Java, every variable must declare its type first. Types tell Java what kind of data to store — whole numbers (int), decimals (double), or text (String).",
    codeExample: `int score = 100;\nString playerName = "Alex";\nSystem.out.println(playerName + " scored: " + score);`,
    exercise: { question: "Create an int variable named 'age' set to 15, then print it.", initialCode: `public class Main {\n    public static void main(String[] args) {\n        // Create int age here\n        \n    }\n}`, expectedOutput: "15" }
  },
  {
    id: "java-datatypes",
    title: "Data Types",
    analogy: "Storage boxes come in <b>different sizes</b>! You use a tiny box for a single letter, a medium box for numbers, and a big box for sentences. Java's data types are just different box sizes!",
    explanation: "Key Java data types:\n• int — whole numbers (10, -5)\n• double — decimals (3.14)\n• String — text (\"Hello\")\n• boolean — true or false\n• char — single character ('A')",
    codeExample: `int legs = 4;\ndouble price = 5.99;\nString day = "Monday";\nboolean isSunny = true;\nchar grade = 'A';`,
    exercise: { question: "Declare a double called 'price' set to 9.99 and a boolean 'isSold' set to true. Print both.", initialCode: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n        \n    }\n}`, expectedOutput: "9.99\ntrue" }
  },
  {
    id: "java-operators",
    title: "Operators",
    analogy: "Operators are the <b>buttons on a calculator</b>! + adds, - subtracts, * multiplies, / divides. There's also % which gives the leftover after division — like sharing 5 cookies among 2 friends: 1 cookie is left over!",
    explanation: "Arithmetic operators: +, -, *, /, %\nComparison operators: == (equal), != (not equal), >, <, >=, <=\nThese return true or false.",
    codeExample: `int a = 10, b = 3;\nSystem.out.println(a + b);   // 13\nSystem.out.println(a % b);   // 1 (leftover)\nSystem.out.println(a > b);   // true`,
    exercise: { question: "Calculate the remainder of 20 divided by 6. Store it in 'leftover' and print it.", initialCode: `public class Main {\n    public static void main(String[] args) {\n        int leftover = // your code\n        System.out.println(leftover);\n    }\n}`, expectedOutput: "2" }
  },
  {
    id: "java-loops",
    title: "Loops",
    analogy: "Loops are like a <b>gym teacher saying 'Do 5 jumping jacks!'</b>. Instead of writing the same code 5 times, you tell Java to repeat a block of code until a condition is met!",
    explanation: "The for loop: for(start; condition; step). Runs while the condition is true, then adds the step.\nThe while loop: runs while a condition is true.",
    codeExample: `for (int i = 1; i <= 5; i++) {\n    System.out.println("Jumping jack " + i);\n}`,
    exercise: { question: "Write a loop that prints 'CodeEasy' exactly 4 times.", initialCode: `public class Main {\n    public static void main(String[] args) {\n        // Your loop here\n        \n    }\n}`, expectedOutput: "CodeEasy\nCodeEasy\nCodeEasy\nCodeEasy" }
  },
  {
    id: "java-arrays",
    title: "Arrays",
    analogy: "An array is like an <b>egg carton</b> — one container with multiple numbered slots. Instead of 6 separate boxes, you have one carton with slots 0 to 5!",
    explanation: "Arrays store multiple values of the same type. Access them using index numbers starting at 0.",
    codeExample: `String[] fruits = {"Apple", "Banana", "Cherry"};\nSystem.out.println(fruits[0]); // Apple\nSystem.out.println(fruits.length); // 3`,
    exercise: { question: "Create a String array 'colors' with 3 colors. Print the second one (index 1).", initialCode: `public class Main {\n    public static void main(String[] args) {\n        // Your array here\n        \n    }\n}`, expectedOutput: "Green" }
  },
  {
    id: "java-methods",
    title: "Methods",
    analogy: "A method is like a <b>recipe card</b>. You write the steps once on the card and reuse it whenever you want that dish. Instead of rewriting steps, you just call the recipe name!",
    explanation: "Methods are reusable blocks of code. They can accept inputs (parameters) and return results.",
    codeExample: `public static int addNumbers(int a, int b) {\n    return a + b;\n}\n\npublic static void main(String[] args) {\n    int result = addNumbers(5, 7);\n    System.out.println(result); // 12\n}`,
    exercise: { question: "Fix the squareNumber method to return number * number.", initialCode: `public class Main {\n    public static int squareNumber(int n) {\n        return 0; // Fix this!\n    }\n    public static void main(String[] args) {\n        System.out.println(squareNumber(5));\n    }\n}`, expectedOutput: "25" }
  },
  {
    id: "java-oop",
    title: "Object-Oriented Programming",
    analogy: "OOP is like a <b>blueprint for a dog house</b>. The blueprint (Class) is not a real house — but you can use it to build 100 real dog houses (Objects)! Each house can have different colors (properties) and features (methods).",
    explanation: "A Class is a template. An Object is a real instance built from that template. Objects have attributes (data) and methods (actions).",
    codeExample: `class Dog {\n    String name;\n    void bark() {\n        System.out.println(name + " says Woof!");\n    }\n}\n\nDog myDog = new Dog();\nmyDog.name = "Buddy";\nmyDog.bark(); // Buddy says Woof!`,
    exercise: { question: "Create a Dog object named 'dog2', set name to 'Rover', and call bark().", initialCode: `class Dog {\n    String name;\n    void bark() { System.out.println(name + " says Woof!"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`, expectedOutput: "Rover says Woof!" }
  }
];

export const jsLessons = [
  {
    id: "js-intro",
    title: "Introduction to JavaScript",
    analogy: "If HTML is the <b>skeleton</b> and CSS is the <b>clothing</b>, JavaScript is the <b>brain</b>! It makes pages think, react, and do cool tricks when users interact.",
    explanation: "JavaScript runs in every browser. It powers interactive buttons, live data, animations, games, and form validation.",
    codeExample: `console.log("Hello from JavaScript!");`,
    exercise: { question: "Print 'Welcome to JavaScript!' using console.log.", initialCode: `// Write your code below\n`, expectedOutput: "Welcome to JavaScript!" }
  },
  {
    id: "js-variables",
    title: "Variables",
    analogy: "Variables are <b>labeled storage boxes</b> just like in Java! But JS is smarter — you use <code>let</code> for changeable boxes and <code>const</code> for locked steel boxes that never change.",
    explanation: "Use let for values that may change. Use const for permanent values. No type declaration needed — JS figures it out.",
    codeExample: `let score = 10;\nscore = 20; // OK!\n\nconst birthYear = 2010;\n// birthYear = 2015; // Error!\n\nconsole.log(score); // 20`,
    exercise: { question: "Create const 'userName' = 'Sienna' and let 'score' = 100. Print both.", initialCode: `// Your code here\n`, expectedOutput: "Sienna\n100" }
  },
  {
    id: "js-functions",
    title: "Functions",
    analogy: "A function is a <b>magic vending machine</b>! You insert ingredients (parameters), the machine does its work, and gives you back a snack (return value)!",
    explanation: "Functions group code under one name. Define once, call many times. They can take inputs and return outputs.",
    codeExample: `function makeJuice(fruit1, fruit2) {\n    return fruit1 + "-" + fruit2 + " Smoothie!";\n}\nconsole.log(makeJuice("Apple", "Banana")); // Apple-Banana Smoothie!`,
    exercise: { question: "Write a function 'multiply(x, y)' that returns x * y. Test with multiply(4, 5).", initialCode: `// Write multiply function here\n\nconsole.log(multiply(4, 5)); // Should print 20`, expectedOutput: "20" }
  },
  {
    id: "js-conditions",
    title: "Conditions",
    analogy: "Conditions are like a <b>traffic light</b>: IF green → GO, ELSE IF yellow → SLOW DOWN, ELSE → STOP. They let your code take different paths based on situations.",
    explanation: "Use if, else if, and else. Comparisons: === (strictly equal), > (greater than), < (less than).",
    codeExample: `let time = 8;\nif (time < 12) {\n    console.log("Good Morning!");\n} else if (time < 18) {\n    console.log("Good Afternoon!");\n} else {\n    console.log("Good Evening!");\n}`,
    exercise: { question: "If score is >= 80 print 'Passed!', else print 'Try again!'. Use score = 85.", initialCode: `let score = 85;\n// Your if/else here\n`, expectedOutput: "Passed!" }
  },
  {
    id: "js-loops",
    title: "Loops",
    analogy: "Loops are like a <b>coach saying 'Run 3 laps!'</b>. You run one lap, count up, check if you've hit 3, and repeat if not!",
    explanation: "for loops count through a range. while loops run until a condition is false.",
    codeExample: `for (let i = 1; i <= 3; i++) {\n    console.log("Lap " + i + " complete!");\n}`,
    exercise: { question: "Print numbers from 5 down to 1 using a loop.", initialCode: `// Your loop here\n`, expectedOutput: "5\n4\n3\n2\n1" }
  },
  {
    id: "js-arrays",
    title: "Arrays",
    analogy: "A JS array is like a <b>shopping list</b>. You write items in order, can add more to the bottom, and check items off. Very flexible!",
    explanation: "Arrays hold multiple values. Add with .push(), check size with .length. Indices start at 0.",
    codeExample: `let list = ["Apples", "Milk", "Bread"];\nlist.push("Cookies");\nconsole.log(list[0]); // Apples\nconsole.log(list.length); // 4`,
    exercise: { question: "Create array 'colors' with red, green, blue. Push 'yellow'. Print its length.", initialCode: `// Your code here\n`, expectedOutput: "4" }
  },
  {
    id: "js-dom",
    title: "DOM Manipulation",
    analogy: "The DOM is a <b>magic billboard</b>! Normally HTML is static. JavaScript has a wand that lets you rewrite text, change colors, or make things disappear while users are watching!",
    explanation: "DOM = Document Object Model. JS uses document.getElementById() or querySelector() to grab elements and change their content or style.",
    codeExample: `// Imagine: <p id="msg">Hello</p>\nlet p = document.getElementById("msg");\np.innerText = "Changed by JavaScript!";\np.style.color = "blue";`,
    exercise: { question: "Grab element with id 'title' and change its innerText to 'Hello CodeEasy!'", initialCode: `// Imagine: <h1 id="title">Old Title</h1>\n// Your code below:\n`, expectedOutput: "Successfully changed to: Hello CodeEasy!" }
  },
  {
    id: "js-events",
    title: "Events",
    analogy: "Events are like <b>mousetraps</b>! The trap sits quietly doing nothing. But the moment a mouse steps on it — SNAP! An action fires. JS events snap when users click, hover, or type!",
    explanation: "Add event listeners using .addEventListener(eventName, callback). Common events: 'click', 'mouseover', 'keypress'.",
    codeExample: `let btn = document.getElementById("myBtn");\nbtn.addEventListener("click", function() {\n    console.log("Button clicked! Snap!");\n});`,
    exercise: { question: "Register a 'click' listener on myBtn that logs 'Clicked!'", initialCode: `let myBtn = { addEventListener: (e, cb) => { window._testCb = cb; } };\n// Register listener:\n`, expectedOutput: "Registered click listener!" }
  },
  {
    id: "js-es6",
    title: "ES6 Features",
    analogy: "ES6 is like <b>upgrading from a basic screwdriver to a smart electric drill</b>! Arrow functions, template literals, and destructuring make code shorter and smarter.",
    explanation: "Key ES6 features:\n• Arrow functions: const add = (a,b) => a + b;\n• Template literals: `Hello ${name}`\n• Destructuring: const [a, b] = [1, 2];",
    codeExample: `const name = "Luna";\nconst greet = (person) => \`Hello, \${person}!\`;\nconsole.log(greet(name)); // Hello, Luna!`,
    exercise: { question: "Write arrow function 'doubleNum' that returns n*2. Print Result: 10 using template literal.", initialCode: `// Arrow function here\n`, expectedOutput: "Result: 10" }
  }
];

export const javaQuiz = [
  { id: 1, question: "What does 'Write Once, Run Anywhere' mean?", options: ["Write code once a day", "Java runs on any device with a JVM", "Copy code to every computer", "Java only works on Windows"], answer: 1, explanation: "Java compiles to bytecode that runs on any device with a JVM installed." },
  { id: 2, question: "Which type stores a decimal number like 5.99?", options: ["int", "String", "double", "boolean"], answer: 2, explanation: "double stores decimal numbers. int is for whole numbers." },
  { id: 3, question: "What index does a Java array start at?", options: ["1", "-1", "0", "Any number"], answer: 2, explanation: "Arrays always start at index 0 in Java." },
  { id: 4, question: "What does the % operator do?", options: ["Multiply", "Returns remainder", "Divide", "Add percentage"], answer: 1, explanation: "% is the modulo operator — it returns the remainder of division." },
  { id: 5, question: "What is a Class in OOP?", options: ["A school class", "An object running code", "A blueprint for creating objects", "A type of loop"], answer: 2, explanation: "A Class is a blueprint/template. Objects are built from classes." }
];

export const jsQuiz = [
  { id: 1, question: "What makes JavaScript special for web pages?", options: ["Prints web pages", "Adds background colors", "Handles interactions and updates dynamically", "Creates HTML bones"], answer: 2, explanation: "JS powers interactivity — clicks, animations, live data updates." },
  { id: 2, question: "What is the difference between let and const?", options: ["let can change, const cannot", "const can change, let cannot", "let is for numbers only", "No difference"], answer: 0, explanation: "let values can be reassigned. const values are locked forever." },
  { id: 3, question: "How do you add to the end of a JS array?", options: ["array.addLast()", "array.push()", "array.append()", "array.insert()"], answer: 1, explanation: ".push() adds an element to the end of an array." },
  { id: 4, question: "What does the DOM represent?", options: ["Computer hardware", "Database on a server", "HTML document structure JS can modify", "Password security system"], answer: 2, explanation: "The DOM is the live structure of an HTML page that JS can read and change." },
  { id: 5, question: "Which is a valid ES6 arrow function?", options: ["function add(a,b){return a+b}", "const add = (a,b) => a+b;", "const add = a+b => arrow;", "add(a,b)->a+b;"], answer: 1, explanation: "Arrow functions use the => syntax for a cleaner shorthand." }
];

export const challenges = [
  { id: "ch-hello", title: "Hello, CodeEasy!", difficulty: "Easy", description: "Write a program that prints exactly: Welcome to CodeEasy!", initialJava: `public class Main {\n    public static void main(String[] args) {\n        // Print "Welcome to CodeEasy!"\n        \n    }\n}`, initialJs: `// Print "Welcome to CodeEasy!"\n`, expectedOutput: "Welcome to CodeEasy!" },
  { id: "ch-sum", title: "Sum Two Numbers", difficulty: "Easy", description: "Create variables a=12 and b=8. Print their sum (should be 20).", initialJava: `public class Main {\n    public static void main(String[] args) {\n        // a=12, b=8, print sum\n        \n    }\n}`, initialJs: `// Create a=12 and b=8, print their sum\n`, expectedOutput: "20" },
  { id: "ch-even", title: "Even or Odd?", difficulty: "Medium", description: "Check if number=14 is even. Print 'Even' or 'Odd'.", initialJava: `public class Main {\n    public static void main(String[] args) {\n        int number = 14;\n        // if/else check here\n        \n    }\n}`, initialJs: `let number = 14;\n// if/else check here\n`, expectedOutput: "Even" },
  { id: "ch-loop", title: "Print Hello 3 Times", difficulty: "Medium", description: "Use a loop to print 'Hello' exactly 3 times on separate lines.", initialJava: `public class Main {\n    public static void main(String[] args) {\n        // Loop here\n        \n    }\n}`, initialJs: `// Loop here\n`, expectedOutput: "Hello\nHello\nHello" }
];
