export const JAVA_LESSONS = [
  {
    id: 'java-intro',
    title: 'What is Java?',
    analogy: 'Imagine Java as a universal translator. You write your instructions once, and it can be understood by many different types of computers, like a recipe that works in any kitchen.',
    explanation: 'Java is a popular programming language used to build apps for computers, phones, and even smart fridges! It is famous because of its motto: "Write Once, Run Anywhere."',
    code: '// A simple Java program\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Future Coder!");\n    }\n}',
    exercise: 'Try to remember the command used to print text in Java. It starts with System.out...'
  },
  {
    id: 'java-vars',
    title: 'Variables',
    analogy: 'Think of a variable as a labeled box. You can put something inside the box (like a number or a name) and give it a label so you can find it later.',
    explanation: 'In Java, we use variables to store data. We must tell Java what kind of data is in the box (like an integer for numbers or a String for text).',
    code: 'int age = 10; // Storing a whole number\nString name = "CodeEasy"; // Storing text\ndouble price = 19.99; // Storing a decimal',
    exercise: 'Create a variable named "score" and set it to 100.'
  },
  {
    id: 'java-data-types',
    title: 'Data Types',
    analogy: 'Just like you use a bottle for water and a plate for food, Java uses different "containers" for different types of data.',
    explanation: 'Common types include: int (whole numbers), double (decimals), char (single letters), and boolean (true or false).',
    code: 'int players = 5;\nboolean isGameOver = false;\nchar grade = \'A\';',
    exercise: 'Which data type would you use for the value 3.14?'
  },
  {
    id: 'java-operators',
    title: 'Operators',
    analogy: 'Operators are like the symbols on a calculator (+, -, *, /) that help you do math or compare things.',
    explanation: 'We use operators to perform operations on variables and values. Example: + adds, - subtracts, and == checks if two things are equal.',
    code: 'int sum = 10 + 5; // sum is 15\nboolean isEqual = (10 == 10); // true',
    exercise: 'What is the result of 10 * 2?'
  },
  {
    id: 'java-loops',
    title: 'Loops',
    analogy: 'A loop is like a treadmill. You keep running (repeating steps) until you reach a certain goal or time.',
    explanation: 'Loops allow you to run the same code multiple times. A "for" loop is perfect when you know exactly how many times you want to repeat.',
    code: 'for (int i = 1; i <= 5; i++) {\n    System.out.println("Lap number: " + i);\n}',
    exercise: 'Write a loop that prints "Hello" 3 times.'
  },
  {
    id: 'java-arrays',
    title: 'Arrays',
    analogy: 'An array is like an egg carton. It has multiple slots, and each slot can hold one item (like an egg). All slots together form one unit.',
    explanation: 'Arrays store multiple values of the same type in a single variable. You can access items using their position (index), starting from 0.',
    code: 'String[] fruits = {"Apple", "Banana", "Cherry"};\nSystem.out.println(fruits[0]); // Prints Apple',
    exercise: 'If an array has 5 items, what is the index of the last item?'
  },
  {
    id: 'java-methods',
    title: 'Methods',
    analogy: 'A method is like a "skill" or a "function" on a robot. You press a button, and the robot performs a specific task, like "Wave" or "Jump."',
    explanation: 'Methods are blocks of code that only run when called. They help organize code into reusable pieces.',
    code: 'static void sayHello() {\n    System.out.println("Hello!");\n}\n\n// Call it later\nsayHello();',
    exercise: 'What keyword do we use to define a method that doesn\'t return anything?'
  },
  {
    id: 'java-oop',
    title: 'Object-Oriented Programming',
    analogy: 'Imagine a "Dog" blueprint. The blueprint says a dog has a name and color, and can "Bark." Every actual dog you see is an "Object" made from that blueprint.',
    explanation: 'OOP is a way to organize code using "Classes" (blueprints) and "Objects" (the things created from blueprints). It makes code easier to manage.',
    code: 'class Dog {\n    String name;\n    void bark() {\n        System.out.println("Woof!");\n    }\n}\n\nDog myDog = new Dog(); // Creating an object',
    exercise: 'What do we call the "blueprint" in Java?'
  }
];

export const JS_LESSONS = [
  {
    id: 'js-intro',
    title: 'Introduction to JavaScript',
    analogy: 'If HTML is the skeleton and CSS is the skin, JavaScript is the brain that makes the body move and react.',
    explanation: 'JavaScript makes websites interactive. It can respond to clicks, show animations, and handle data without reloading the page.',
    code: '// Simple alert\nalert("Welcome to CodeEasy!");\nconsole.log("Hello from the console!");',
    exercise: 'What tool do developers use to see "console.log" output? (Hint: In the browser)'
  },
  {
    id: 'js-vars',
    title: 'Variables',
    analogy: 'Just like Java, JS uses variables as boxes. The difference is JS boxes are a bit more flexible about what you put inside.',
    explanation: 'We usually use "let" for variables that can change and "const" for things that stay the same.',
    code: 'let score = 0;\nconst playerName = "Alex";\nscore = 10; // This is okay',
    exercise: 'Use "const" to store your birth year.'
  },
  {
    id: 'js-functions',
    title: 'Functions',
    analogy: 'A function is like a recipe. You write the steps once, and whenever you want to cook that meal, you just "call" the recipe.',
    explanation: 'Functions are reusable blocks of code. You can pass information to them (parameters) and they can give information back (return).',
    code: 'function greet(name) {\n    return "Hello, " + name + "!";\n}\n\nconsole.log(greet("Beginner"));',
    exercise: 'Write a function that adds two numbers.'
  },
  {
    id: 'js-conditions',
    title: 'Conditions (If/Else)',
    analogy: 'A condition is like a crossroad. "If the light is green, GO. Else, STOP."',
    explanation: 'Conditions let your code make decisions. It checks if something is true or false and acts accordingly.',
    code: 'let age = 15;\nif (age >= 18) {\n    console.log("You can vote!");\n} else {\n    console.log("Too young to vote.");\n}',
    exercise: 'Write an if-statement that checks if a number is positive.'
  },
  {
    id: 'js-loops',
    title: 'Loops',
    analogy: 'Imagine you have to write "I will not talk in class" 100 times. A loop does this boring work for you in a split second.',
    explanation: 'Loops repeat actions. The "for" loop is the most common way to repeat a task a specific number of times.',
    code: 'for (let i = 0; i < 5; i++) {\n    console.log("Counting: " + i);\n}',
    exercise: 'How many times will a loop run if it starts at 0 and goes while i < 10?'
  },
  {
    id: 'js-dom',
    title: 'DOM Manipulation',
    analogy: 'The DOM is like the controls of a video game. JavaScript uses it to change what is happening on the screen (the website).',
    explanation: 'DOM stands for Document Object Model. It represents the structure of your HTML, and JS can change its text, colors, and more.',
    code: '// Changing text on a website\ndocument.getElementById("myTitle").innerText = "New Title!";',
    exercise: 'What method is used to find an element by its ID?'
  },
  {
    id: 'js-events',
    title: 'Events',
    analogy: 'An event is like a doorbell. Nothing happens until someone "clicks" the button, and then a sound plays.',
    explanation: 'Events are things that happen in the browser, like a user clicking a button or typing in a box. JS "listens" for these.',
    code: 'const btn = document.querySelector("button");\nbtn.addEventListener("click", () => {\n    console.log("Button was clicked!");\n});',
    exercise: 'What is the name of the event when a user clicks something?'
  },
  {
    id: 'js-es6',
    title: 'ES6 Features',
    analogy: 'ES6 is like an "Upgrade Pack" for JavaScript. It adds newer, cooler, and shorter ways to write the same code.',
    explanation: 'Key features include Arrow Functions (=>) and Template Literals (using backticks `` to include variables in text).',
    code: '// Arrow Function\nconst add = (a, b) => a + b;\n\n// Template Literal\nlet user = "Archu";\nconsole.log(`Hello, ${user}!`);',
    exercise: 'Rewrite a normal function as an arrow function.'
  }
];

export const QUIZZES = {
  java: [
    {
      question: 'Which of these is the correct way to print to the console in Java?',
      options: ['print("Hello")', 'System.out.println("Hello")', 'console.log("Hello")', 'echo "Hello"'],
      answer: 1,
      explanation: 'In Java, we use System.out.println() to print a line of text to the console.'
    },
    {
      question: 'What is the "Write Once, Run Anywhere" language?',
      options: ['Python', 'C++', 'Java', 'HTML'],
      answer: 2,
      explanation: 'Java was designed to be platform-independent, meaning the same code can run on any device with a JVM.'
    },
    {
      question: 'Which data type is used for whole numbers like 10, 20, or 50?',
      options: ['double', 'String', 'char', 'int'],
      answer: 3,
      explanation: "The 'int' (integer) data type is used for storing whole numbers without decimals."
    },
    {
      question: 'What do we call the "blueprint" that objects are created from?',
      options: ['Method', 'Variable', 'Class', 'Array'],
      answer: 2,
      explanation: 'A Class is a template or blueprint that defines the properties and behaviors of objects.'
    }
  ],
  javascript: [
    {
      question: 'What tag do we use to put JavaScript inside an HTML file?',
      options: ['<js>', '<script>', '<javascript>', '<codebox>'],
      answer: 1,
      explanation: 'The <script> tag is used to embed or reference executable JavaScript code.'
    },
    {
      question: 'Which keyword is best for a variable that will NOT change its value?',
      options: ['let', 'var', 'const', 'fix'],
      answer: 2,
      explanation: "'const' stands for constant. It creates a variable that cannot be reassigned."
    },
    {
      question: 'What does DOM stand for?',
      options: ['Digital Object Mode', 'Data Oriented Mobile', 'Document Object Model', 'Desktop Output Main'],
      answer: 2,
      explanation: 'The Document Object Model (DOM) is a programming interface for web documents.'
    },
    {
      question: 'How do you write an arrow function that returns "Hi"?',
      options: ['() => "Hi"', 'function() { return "Hi" }', 'arrow("Hi")', '=> "Hi"'],
      answer: 0,
      explanation: 'Arrow functions provide a shorter syntax: () => "result".'
    }
  ]
};

export const CHALLENGES = [
  {
    id: 'ch-1',
    title: 'Hello World',
    language: 'JavaScript',
    difficulty: 'Easy',
    description: 'Use console.log to print the exact phrase "Hello World" to the output.',
    starterCode: '// Type your code below\n',
    test: (code) => code.includes('console.log("Hello World")') || code.includes("console.log('Hello World')")
  },
  {
    id: 'ch-2',
    title: 'Basic Addition',
    language: 'JavaScript',
    difficulty: 'Easy',
    description: 'Create a variable named "sum" that stores the result of 5 + 5.',
    starterCode: 'let sum = \nconsole.log(sum);',
    test: (code) => {
      try {
        const evalCode = code + '\nreturn sum;';
        const result = new Function(evalCode)();
        return result === 10;
      } catch(e) { return false; }
    }
  },
  {
    id: 'ch-3',
    title: 'Greeting Function',
    language: 'JavaScript',
    difficulty: 'Medium',
    description: 'Write a function named "greet" that takes a "name" parameter and returns "Hello, " + name.',
    starterCode: 'function greet(name) {\n  // Your code here\n}',
    test: (code) => {
      try {
        const evalCode = code + '\nreturn greet("Tester");';
        const result = new Function(evalCode)();
        return result === "Hello, Tester";
      } catch(e) { return false; }
    }
  }
];
