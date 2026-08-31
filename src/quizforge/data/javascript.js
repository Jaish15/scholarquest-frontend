/* QuizForge Question Bank — javascript_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "JavaScript",
  "questions": [
    {
      "id": "js-beg-001",
      "difficulty": "Beginner",
      "question": "Which keyword declares a variable that cannot be reassigned?",
      "options": [
        "let",
        "var",
        "const",
        "static"
      ],
      "correctAnswer": "const"
    },
    {
      "id": "js-beg-002",
      "difficulty": "Beginner",
      "question": "What does typeof null return?",
      "options": [
        "'null'",
        "'undefined'",
        "'object'",
        "'boolean'"
      ],
      "correctAnswer": "'object'"
    },
    {
      "id": "js-beg-003",
      "difficulty": "Beginner",
      "question": "Which method adds an element to the end of an array?",
      "options": [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      "correctAnswer": "push()"
    },
    {
      "id": "js-beg-004",
      "difficulty": "Beginner",
      "question": "What does === check that == does not?",
      "options": [
        "Only value",
        "Only type",
        "Both value and type",
        "Nothing, they're identical"
      ],
      "correctAnswer": "Both value and type"
    },
    {
      "id": "js-beg-005",
      "difficulty": "Beginner",
      "question": "Which of these correctly writes a function expression?",
      "options": [
        "function = myFunc() {}",
        "const myFunc = function() {}",
        "function const myFunc() {}",
        "def myFunc() {}"
      ],
      "correctAnswer": "const myFunc = function() {}"
    },
    {
      "id": "js-beg-006",
      "difficulty": "Beginner",
      "question": "What is the output of console.log(2 + '2')?",
      "options": [
        "4",
        "'22'",
        "NaN",
        "Error"
      ],
      "correctAnswer": "'22'"
    },
    {
      "id": "js-beg-007",
      "difficulty": "Beginner",
      "question": "Which array method creates a new array with results of calling a function on every element?",
      "options": [
        "forEach()",
        "map()",
        "filter()",
        "reduce()"
      ],
      "correctAnswer": "map()"
    },
    {
      "id": "js-beg-008",
      "difficulty": "Beginner",
      "question": "How do you write a single-line comment in JavaScript?",
      "options": [
        "<!-- -->",
        "# comment",
        "// comment",
        "/* comment"
      ],
      "correctAnswer": "// comment"
    },
    {
      "id": "js-beg-009",
      "difficulty": "Beginner",
      "question": "What does JSON.stringify() do?",
      "options": [
        "Parses a JSON string into an object",
        "Converts a JavaScript object into a JSON string",
        "Validates JSON syntax",
        "Deletes a JSON object"
      ],
      "correctAnswer": "Converts a JavaScript object into a JSON string"
    },
    {
      "id": "js-beg-010",
      "difficulty": "Beginner",
      "question": "Which of these is NOT a JavaScript data type?",
      "options": [
        "undefined",
        "boolean",
        "float",
        "symbol"
      ],
      "correctAnswer": "float"
    },
    {
      "id": "js-beg-011",
      "difficulty": "Beginner",
      "question": "What does the length property return for an array?",
      "options": [
        "The first index",
        "The number of elements",
        "The last element",
        "The data type"
      ],
      "correctAnswer": "The number of elements"
    },
    {
      "id": "js-beg-012",
      "difficulty": "Beginner",
      "question": "Which method converts a string to all lowercase?",
      "options": [
        "toLower()",
        "toLowerCase()",
        "lower()",
        "lowerCase()"
      ],
      "correctAnswer": "toLowerCase()"
    },
    {
      "id": "js-int-001",
      "difficulty": "Intermediate",
      "question": "What does the 'this' keyword refer to inside a regular function called as a method?",
      "options": [
        "The global object always",
        "The object the method was called on",
        "The function itself",
        "undefined always"
      ],
      "correctAnswer": "The object the method was called on"
    },
    {
      "id": "js-int-002",
      "difficulty": "Intermediate",
      "question": "What is a closure in JavaScript?",
      "options": [
        "A function that has no parameters",
        "A function that remembers variables from its enclosing scope",
        "A loop that never ends",
        "A way to close a browser tab"
      ],
      "correctAnswer": "A function that remembers variables from its enclosing scope"
    },
    {
      "id": "js-int-003",
      "difficulty": "Intermediate",
      "question": "What does Array.prototype.reduce() do?",
      "options": [
        "Removes duplicate elements",
        "Reduces array length by one",
        "Executes a reducer function to produce a single output value",
        "Reverses the array"
      ],
      "correctAnswer": "Executes a reducer function to produce a single output value"
    },
    {
      "id": "js-int-004",
      "difficulty": "Intermediate",
      "question": "What is the difference between let and var in terms of scope?",
      "options": [
        "No difference",
        "let is function-scoped, var is block-scoped",
        "let is block-scoped, var is function-scoped",
        "Both are global-scoped"
      ],
      "correctAnswer": "let is block-scoped, var is function-scoped"
    },
    {
      "id": "js-int-005",
      "difficulty": "Intermediate",
      "question": "What does a Promise represent in JavaScript?",
      "options": [
        "A synchronous function call",
        "An eventual completion (or failure) of an asynchronous operation",
        "A type of loop",
        "A variable declaration"
      ],
      "correctAnswer": "An eventual completion (or failure) of an asynchronous operation"
    },
    {
      "id": "js-int-006",
      "difficulty": "Intermediate",
      "question": "What does the spread operator (...) do when used on an array?",
      "options": [
        "Combines arrays into a string",
        "Expands array elements individually",
        "Sorts the array",
        "Removes duplicates"
      ],
      "correctAnswer": "Expands array elements individually"
    },
    {
      "id": "js-int-007",
      "difficulty": "Intermediate",
      "question": "What is event bubbling in the DOM?",
      "options": [
        "Events execute in random order",
        "An event triggers on the deepest element first, then propagates up to ancestors",
        "An event only fires once",
        "Events are queued and never fire"
      ],
      "correctAnswer": "An event triggers on the deepest element first, then propagates up to ancestors"
    },
    {
      "id": "js-int-008",
      "difficulty": "Intermediate",
      "question": "What does Object.freeze() do?",
      "options": [
        "Deletes an object",
        "Prevents new properties from being added and existing ones from being modified",
        "Converts object to JSON",
        "Pauses object execution"
      ],
      "correctAnswer": "Prevents new properties from being added and existing ones from being modified"
    },
    {
      "id": "js-int-009",
      "difficulty": "Intermediate",
      "question": "What is hoisting in JavaScript?",
      "options": [
        "Moving code to a separate file",
        "Variable and function declarations being moved to the top of their scope during compilation",
        "Compressing code for production",
        "A CSS positioning technique"
      ],
      "correctAnswer": "Variable and function declarations being moved to the top of their scope during compilation"
    },
    {
      "id": "js-int-010",
      "difficulty": "Intermediate",
      "question": "What does async/await primarily simplify?",
      "options": [
        "CSS animations",
        "Working with Promises using synchronous-looking syntax",
        "DOM manipulation",
        "Variable declarations"
      ],
      "correctAnswer": "Working with Promises using synchronous-looking syntax"
    },
    {
      "id": "js-adv-001",
      "difficulty": "Advanced",
      "question": "What is the event loop responsible for in JavaScript?",
      "options": [
        "Compiling JavaScript to machine code",
        "Managing execution of the call stack, callback queue, and microtask queue",
        "Rendering the DOM",
        "Handling CSS transitions"
      ],
      "correctAnswer": "Managing execution of the call stack, callback queue, and microtask queue"
    },
    {
      "id": "js-adv-002",
      "difficulty": "Advanced",
      "question": "What is the difference between a microtask and a macrotask queue?",
      "options": [
        "No difference",
        "Microtasks (e.g. Promises) run before macrotasks (e.g. setTimeout) after each call stack cleared",
        "Macrotasks always run first",
        "Microtasks only run in Node.js"
      ],
      "correctAnswer": "Microtasks (e.g. Promises) run before macrotasks (e.g. setTimeout) after each call stack cleared"
    },
    {
      "id": "js-adv-003",
      "difficulty": "Advanced",
      "question": "What does a WeakMap allow that a regular Map does not?",
      "options": [
        "String-only keys",
        "Garbage collection of keys when no other references exist",
        "Faster iteration",
        "Storing functions as values"
      ],
      "correctAnswer": "Garbage collection of keys when no other references exist"
    },
    {
      "id": "js-adv-004",
      "difficulty": "Advanced",
      "question": "What is a JavaScript Proxy used for?",
      "options": [
        "Making network requests",
        "Intercepting and customizing operations on an object (get, set, etc.)",
        "Creating private variables only",
        "Compiling TypeScript"
      ],
      "correctAnswer": "Intercepting and customizing operations on an object (get, set, etc.)"
    },
    {
      "id": "js-adv-005",
      "difficulty": "Advanced",
      "question": "What does the prototype chain enable in JavaScript?",
      "options": [
        "Multiple inheritance like Python",
        "Objects inheriting properties/methods from other objects",
        "Faster string concatenation",
        "Synchronous network calls"
      ],
      "correctAnswer": "Objects inheriting properties/methods from other objects"
    },
    {
      "id": "js-adv-006",
      "difficulty": "Advanced",
      "question": "What is memoization typically used to optimize?",
      "options": [
        "DOM rendering speed",
        "Repeated expensive function calls by caching results",
        "Network latency",
        "CSS specificity"
      ],
      "correctAnswer": "Repeated expensive function calls by caching results"
    },
    {
      "id": "js-adv-007",
      "difficulty": "Advanced",
      "question": "What problem do generators (function*) solve?",
      "options": [
        "They allow functions to pause and resume execution, yielding multiple values over time",
        "They make functions run faster",
        "They replace classes entirely",
        "They handle CSS animations"
      ],
      "correctAnswer": "They allow functions to pause and resume execution, yielding multiple values over time"
    },
    {
      "id": "js-adv-008",
      "difficulty": "Advanced",
      "question": "What does 'tree shaking' refer to in modern JavaScript bundlers?",
      "options": [
        "Randomizing module load order",
        "Eliminating unused code from the final bundle",
        "Sorting DOM elements",
        "A debugging technique for recursive functions"
      ],
      "correctAnswer": "Eliminating unused code from the final bundle"
    },
    {
      "id": "js-beg-013",
      "difficulty": "Beginner",
      "question": "Which method removes the last element from an array?",
      "options": [
        "pop()",
        "push()",
        "shift()",
        "slice()"
      ],
      "correctAnswer": "pop()"
    },
    {
      "id": "js-beg-014",
      "difficulty": "Beginner",
      "question": "What does the '+' operator do when used between two strings?",
      "options": [
        "Subtracts them",
        "Concatenates them",
        "Compares them",
        "Throws an error"
      ],
      "correctAnswer": "Concatenates them"
    },
    {
      "id": "js-beg-015",
      "difficulty": "Beginner",
      "question": "Which keyword is used to declare a function?",
      "options": [
        "func",
        "function",
        "def",
        "method"
      ],
      "correctAnswer": "function"
    },
    {
      "id": "js-beg-016",
      "difficulty": "Beginner",
      "question": "What does Array.isArray() check?",
      "options": [
        "If a value is a number",
        "If a value is an array",
        "If an array is empty",
        "If a value is a string"
      ],
      "correctAnswer": "If a value is an array"
    },
    {
      "id": "js-beg-017",
      "difficulty": "Beginner",
      "question": "What is the correct way to write an arrow function that returns x+1?",
      "options": [
        "x => x+1",
        "function => x+1",
        "=> x+1",
        "arrow(x) x+1"
      ],
      "correctAnswer": "x => x+1"
    },
    {
      "id": "js-beg-018",
      "difficulty": "Beginner",
      "question": "What does the filter() method do?",
      "options": [
        "Creates a new array with elements that pass a test",
        "Sorts the array",
        "Removes all elements",
        "Combines two arrays"
      ],
      "correctAnswer": "Creates a new array with elements that pass a test"
    },
    {
      "id": "js-beg-019",
      "difficulty": "Beginner",
      "question": "How do you access an object's property using bracket notation?",
      "options": [
        "obj.property",
        "obj['property']",
        "obj->property",
        "obj::property"
      ],
      "correctAnswer": "obj['property']"
    },
    {
      "id": "js-beg-020",
      "difficulty": "Beginner",
      "question": "What does NaN stand for?",
      "options": [
        "Not a Node",
        "Not a Number",
        "New array Notation",
        "Null and Nothing"
      ],
      "correctAnswer": "Not a Number"
    },
    {
      "id": "js-beg-021",
      "difficulty": "Beginner",
      "question": "Which statement correctly checks for strict inequality?",
      "options": [
        "!=",
        "!==",
        "<>",
        "=/="
      ],
      "correctAnswer": "!=="
    },
    {
      "id": "js-beg-022",
      "difficulty": "Beginner",
      "question": "What does document.querySelector() do?",
      "options": [
        "Selects the first matching DOM element",
        "Creates a new element",
        "Deletes an element",
        "Sends a network request"
      ],
      "correctAnswer": "Selects the first matching DOM element"
    },
    {
      "id": "js-beg-023",
      "difficulty": "Beginner",
      "question": "What is the output of Boolean('')?",
      "options": [
        "true",
        "false",
        "undefined",
        "Error"
      ],
      "correctAnswer": "false"
    },
    {
      "id": "js-beg-024",
      "difficulty": "Beginner",
      "question": "Which loop is best suited for iterating over array elements directly?",
      "options": [
        "for...in",
        "for...of",
        "while only",
        "do-while only"
      ],
      "correctAnswer": "for...of"
    },
    {
      "id": "js-beg-025",
      "difficulty": "Beginner",
      "question": "What does undefined mean in JavaScript?",
      "options": [
        "A variable has been declared but not assigned a value",
        "A syntax error",
        "An empty array",
        "A deleted function"
      ],
      "correctAnswer": "A variable has been declared but not assigned a value"
    },
    {
      "id": "js-int-011",
      "difficulty": "Intermediate",
      "question": "What does Array.prototype.find() return?",
      "options": [
        "The index of a matching element",
        "The first element that satisfies a test function",
        "A boolean",
        "A new sorted array"
      ],
      "correctAnswer": "The first element that satisfies a test function"
    },
    {
      "id": "js-int-012",
      "difficulty": "Intermediate",
      "question": "What is destructuring assignment used for?",
      "options": [
        "Deleting object properties",
        "Extracting values from arrays or objects into variables concisely",
        "Compiling JavaScript",
        "Creating classes"
      ],
      "correctAnswer": "Extracting values from arrays or objects into variables concisely"
    },
    {
      "id": "js-int-013",
      "difficulty": "Intermediate",
      "question": "What does Object.keys() return?",
      "options": [
        "An array of the object's own enumerable property names",
        "The object's values",
        "A new object",
        "The object's prototype"
      ],
      "correctAnswer": "An array of the object's own enumerable property names"
    },
    {
      "id": "js-int-014",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the .catch() method on a Promise?",
      "options": [
        "To retry the promise",
        "To handle a rejected promise",
        "To cancel a promise",
        "To convert to synchronous code"
      ],
      "correctAnswer": "To handle a rejected promise"
    },
    {
      "id": "js-int-015",
      "difficulty": "Intermediate",
      "question": "What does the term 'callback hell' refer to?",
      "options": [
        "A performance optimization",
        "Deeply nested callbacks that make code hard to read and maintain",
        "A JavaScript syntax error",
        "A memory leak type"
      ],
      "correctAnswer": "Deeply nested callbacks that make code hard to read and maintain"
    },
    {
      "id": "js-int-016",
      "difficulty": "Intermediate",
      "question": "What does template literal syntax use for interpolation?",
      "options": [
        "${expression}",
        "#{expression}",
        "%{expression}",
        "{{expression}}"
      ],
      "correctAnswer": "${expression}"
    },
    {
      "id": "js-int-017",
      "difficulty": "Intermediate",
      "question": "What is the difference between null and undefined?",
      "options": [
        "No difference",
        "null is an intentional absence of value; undefined means a variable hasn't been assigned",
        "undefined is always an error",
        "null can't be compared with =="
      ],
      "correctAnswer": "null is an intentional absence of value; undefined means a variable hasn't been assigned"
    },
    {
      "id": "js-int-018",
      "difficulty": "Intermediate",
      "question": "What does Array.prototype.some() return?",
      "options": [
        "A new array",
        "true if at least one element passes a test, otherwise false",
        "The number of matching elements",
        "The first matching element"
      ],
      "correctAnswer": "true if at least one element passes a test, otherwise false"
    },
    {
      "id": "js-adv-009",
      "difficulty": "Advanced",
      "question": "What is a debounce function used for?",
      "options": [
        "Speeding up loops",
        "Limiting how often a function executes by delaying it until after a pause in calls",
        "Compiling code faster",
        "Reversing an array"
      ],
      "correctAnswer": "Limiting how often a function executes by delaying it until after a pause in calls"
    },
    {
      "id": "js-adv-010",
      "difficulty": "Advanced",
      "question": "What does Object.defineProperty() allow you to configure?",
      "options": [
        "Only the value of a property",
        "Property attributes like writable, enumerable, and configurable",
        "Only function names",
        "CSS styles on the object"
      ],
      "correctAnswer": "Property attributes like writable, enumerable, and configurable"
    },
    {
      "id": "js-adv-011",
      "difficulty": "Advanced",
      "question": "What is currying in JavaScript?",
      "options": [
        "A way to sort arrays",
        "Transforming a function with multiple arguments into a sequence of functions each taking one argument",
        "A CSS technique",
        "A type of error handling"
      ],
      "correctAnswer": "Transforming a function with multiple arguments into a sequence of functions each taking one argument"
    },
    {
      "id": "js-adv-012",
      "difficulty": "Advanced",
      "question": "What does Symbol.iterator define?",
      "options": [
        "A unique variable name",
        "The default iteration behavior of an object, used by for...of",
        "A way to create private fields",
        "A CSS selector"
      ],
      "correctAnswer": "The default iteration behavior of an object, used by for...of"
    },
    {
      "id": "js-adv-013",
      "difficulty": "Advanced",
      "question": "What is the purpose of the Reflect API?",
      "options": [
        "Rendering reflections in canvas",
        "Providing methods for interceptable JavaScript operations, often paired with Proxy",
        "Reversing strings",
        "Managing HTTP redirects"
      ],
      "correctAnswer": "Providing methods for interceptable JavaScript operations, often paired with Proxy"
    },
    {
      "id": "js-adv-014",
      "difficulty": "Advanced",
      "question": "What does structuredClone() do?",
      "options": [
        "Creates a shallow copy only",
        "Creates a deep copy of a value, including nested objects",
        "Clones a DOM element",
        "Compiles a module"
      ],
      "correctAnswer": "Creates a deep copy of a value, including nested objects"
    },
    {
      "id": "js-adv-015",
      "difficulty": "Advanced",
      "question": "What is the temporal dead zone in JavaScript?",
      "options": [
        "A deprecated feature",
        "The period between entering scope and a let/const variable's declaration where it can't be accessed",
        "A garbage collection phase",
        "An async execution delay"
      ],
      "correctAnswer": "The period between entering scope and a let/const variable's declaration where it can't be accessed"
    },
    {
      "id": "js-int-019",
      "difficulty": "Intermediate",
      "question": "What does Array.prototype.flat() do?",
      "options": [
        "Sorts array elements",
        "Flattens nested arrays up to a specified depth into a single array",
        "Removes duplicates",
        "Converts array to a string"
      ],
      "correctAnswer": "Flattens nested arrays up to a specified depth into a single array"
    },
    {
      "id": "js-int-020",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the Set object in JavaScript?",
      "options": [
        "Storing key-value pairs",
        "Storing unique values of any type, with no duplicates",
        "Storing ordered pairs of numbers",
        "Compiling regular expressions"
      ],
      "correctAnswer": "Storing unique values of any type, with no duplicates"
    }
  ]
};
export const QUIZFORGE_JAVASCRIPT_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
