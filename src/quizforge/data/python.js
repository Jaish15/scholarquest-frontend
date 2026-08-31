/* QuizForge Question Bank — python_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "Python",
  "questions": [
    {
      "id": "py-beg-001",
      "difficulty": "Beginner",
      "question": "Which keyword is used to define a function in Python?",
      "options": [
        "func",
        "def",
        "function",
        "define"
      ],
      "correctAnswer": "def"
    },
    {
      "id": "py-beg-002",
      "difficulty": "Beginner",
      "question": "What data type is the result of 7 / 2 in Python 3?",
      "options": [
        "int",
        "float",
        "str",
        "bool"
      ],
      "correctAnswer": "float"
    },
    {
      "id": "py-beg-003",
      "difficulty": "Beginner",
      "question": "Which of these is used to create a comment in Python?",
      "options": [
        "//",
        "<!-- -->",
        "#",
        "/* */"
      ],
      "correctAnswer": "#"
    },
    {
      "id": "py-beg-004",
      "difficulty": "Beginner",
      "question": "What will len(\"Hello\") return?",
      "options": [
        "4",
        "5",
        "6",
        "Error"
      ],
      "correctAnswer": "5"
    },
    {
      "id": "py-beg-005",
      "difficulty": "Beginner",
      "question": "Which method adds an item to the end of a list?",
      "options": [
        "insert()",
        "append()",
        "add()",
        "extend()"
      ],
      "correctAnswer": "append()"
    },
    {
      "id": "py-beg-006",
      "difficulty": "Beginner",
      "question": "What is the output of print(type(5))?",
      "options": [
        "<class 'int'>",
        "<class 'float'>",
        "<class 'number'>",
        "int"
      ],
      "correctAnswer": "<class 'int'>"
    },
    {
      "id": "py-beg-007",
      "difficulty": "Beginner",
      "question": "Which loop is guaranteed to execute at least once in Python?",
      "options": [
        "for",
        "while",
        "do-while",
        "None \u2014 Python has no such loop"
      ],
      "correctAnswer": "None \u2014 Python has no such loop"
    },
    {
      "id": "py-beg-008",
      "difficulty": "Beginner",
      "question": "How do you create an empty dictionary in Python?",
      "options": [
        "{}",
        "[]",
        "()",
        "dict[]"
      ],
      "correctAnswer": "{}"
    },
    {
      "id": "py-beg-009",
      "difficulty": "Beginner",
      "question": "What does the 'in' keyword check for in an if statement with a list?",
      "options": [
        "Data type",
        "Membership",
        "Index position",
        "Length"
      ],
      "correctAnswer": "Membership"
    },
    {
      "id": "py-beg-010",
      "difficulty": "Beginner",
      "question": "Which of the following is a mutable data type in Python?",
      "options": [
        "tuple",
        "string",
        "list",
        "int"
      ],
      "correctAnswer": "list"
    },
    {
      "id": "py-beg-011",
      "difficulty": "Beginner",
      "question": "What symbol is used for exponentiation in Python?",
      "options": [
        "^",
        "**",
        "exp()",
        "pow"
      ],
      "correctAnswer": "**"
    },
    {
      "id": "py-beg-012",
      "difficulty": "Beginner",
      "question": "Which function converts a string to an integer?",
      "options": [
        "str()",
        "int()",
        "float()",
        "num()"
      ],
      "correctAnswer": "int()"
    },
    {
      "id": "py-beg-013",
      "difficulty": "Beginner",
      "question": "What is the correct file extension for Python files?",
      "options": [
        ".pt",
        ".py",
        ".pyt",
        ".pyth"
      ],
      "correctAnswer": ".py"
    },
    {
      "id": "py-beg-014",
      "difficulty": "Beginner",
      "question": "Which operator is used for floor division in Python?",
      "options": [
        "/",
        "//",
        "%",
        "div"
      ],
      "correctAnswer": "//"
    },
    {
      "id": "py-beg-015",
      "difficulty": "Beginner",
      "question": "What does the range(5) function generate?",
      "options": [
        "1 to 5",
        "0 to 4",
        "0 to 5",
        "1 to 4"
      ],
      "correctAnswer": "0 to 4"
    },
    {
      "id": "py-int-001",
      "difficulty": "Intermediate",
      "question": "What is the output of [x**2 for x in range(3)]?",
      "options": [
        "[0, 1, 4]",
        "[1, 4, 9]",
        "[0, 2, 4]",
        "Error"
      ],
      "correctAnswer": "[0, 1, 4]"
    },
    {
      "id": "py-int-002",
      "difficulty": "Intermediate",
      "question": "Which statement correctly opens a file for reading and automatically closes it?",
      "options": [
        "open('file.txt', 'r')",
        "with open('file.txt', 'r') as f:",
        "file.read('file.txt')",
        "read('file.txt')"
      ],
      "correctAnswer": "with open('file.txt', 'r') as f:"
    },
    {
      "id": "py-int-003",
      "difficulty": "Intermediate",
      "question": "What does the @staticmethod decorator do?",
      "options": [
        "Marks a method that can't be overridden",
        "Marks a method that doesn't access instance or class state",
        "Marks a method as private",
        "Marks a method that runs automatically at import time"
      ],
      "correctAnswer": "Marks a method that doesn't access instance or class state"
    },
    {
      "id": "py-int-004",
      "difficulty": "Intermediate",
      "question": "Which exception is raised when dividing by zero?",
      "options": [
        "ValueError",
        "ZeroDivisionError",
        "ArithmeticError",
        "TypeError"
      ],
      "correctAnswer": "ZeroDivisionError"
    },
    {
      "id": "py-int-005",
      "difficulty": "Intermediate",
      "question": "What does super() do in a class definition?",
      "options": [
        "Creates a new object",
        "Calls a method from the parent class",
        "Deletes the current instance",
        "Declares a static variable"
      ],
      "correctAnswer": "Calls a method from the parent class"
    },
    {
      "id": "py-int-006",
      "difficulty": "Intermediate",
      "question": "What is the difference between a list and a tuple?",
      "options": [
        "Lists are faster than tuples",
        "Tuples are mutable, lists are not",
        "Lists are mutable, tuples are not",
        "There is no difference"
      ],
      "correctAnswer": "Lists are mutable, tuples are not"
    },
    {
      "id": "py-int-007",
      "difficulty": "Intermediate",
      "question": "What does try/except/finally guarantee?",
      "options": [
        "The except block always runs",
        "The finally block always runs, regardless of an exception",
        "The try block runs twice on error",
        "Nothing \u2014 finally is optional and unreliable"
      ],
      "correctAnswer": "The finally block always runs, regardless of an exception"
    },
    {
      "id": "py-int-008",
      "difficulty": "Intermediate",
      "question": "What will {1, 2, 2, 3}.union({3, 4}) return?",
      "options": [
        "{1, 2, 3, 4}",
        "{1, 2, 2, 3, 3, 4}",
        "{3}",
        "Error"
      ],
      "correctAnswer": "{1, 2, 3, 4}"
    },
    {
      "id": "py-int-009",
      "difficulty": "Intermediate",
      "question": "Which of the following correctly defines a lambda function that squares a number?",
      "options": [
        "lambda x: x**2",
        "def lambda(x): x**2",
        "lambda(x) => x**2",
        "function(x): x**2"
      ],
      "correctAnswer": "lambda x: x**2"
    },
    {
      "id": "py-int-010",
      "difficulty": "Intermediate",
      "question": "What is the purpose of __init__ in a Python class?",
      "options": [
        "It's the constructor, called when an object is created",
        "It destroys the object",
        "It's a static method",
        "It defines class-level constants only"
      ],
      "correctAnswer": "It's the constructor, called when an object is created"
    },
    {
      "id": "py-int-011",
      "difficulty": "Intermediate",
      "question": "What does *args allow a function to accept?",
      "options": [
        "A fixed number of keyword arguments",
        "A variable number of positional arguments",
        "Only string arguments",
        "A single dictionary argument"
      ],
      "correctAnswer": "A variable number of positional arguments"
    },
    {
      "id": "py-int-012",
      "difficulty": "Intermediate",
      "question": "What is the output of sorted([3, 1, 2], reverse=True)?",
      "options": [
        "[1, 2, 3]",
        "[3, 2, 1]",
        "[3, 1, 2]",
        "Error"
      ],
      "correctAnswer": "[3, 2, 1]"
    },
    {
      "id": "py-adv-001",
      "difficulty": "Advanced",
      "question": "What is a Python generator used for?",
      "options": [
        "Generating random numbers only",
        "Producing a sequence of values lazily using yield",
        "Creating new classes dynamically",
        "Compiling Python to bytecode faster"
      ],
      "correctAnswer": "Producing a sequence of values lazily using yield"
    },
    {
      "id": "py-adv-002",
      "difficulty": "Advanced",
      "question": "What does the Global Interpreter Lock (GIL) restrict in CPython?",
      "options": [
        "Only one thread can execute Python bytecode at a time",
        "Only one process can run per machine",
        "Only one module can be imported at a time",
        "Only one variable can be global per file"
      ],
      "correctAnswer": "Only one thread can execute Python bytecode at a time"
    },
    {
      "id": "py-adv-003",
      "difficulty": "Advanced",
      "question": "What is a metaclass in Python?",
      "options": [
        "A class that inherits from multiple parents",
        "A class whose instances are themselves classes",
        "A private class accessible only within a module",
        "A class with no methods"
      ],
      "correctAnswer": "A class whose instances are themselves classes"
    },
    {
      "id": "py-adv-004",
      "difficulty": "Advanced",
      "question": "What does functools.lru_cache primarily help with?",
      "options": [
        "Formatting output strings",
        "Caching function results to avoid recomputation",
        "Locking threads for safety",
        "Reducing memory usage of lists"
      ],
      "correctAnswer": "Caching function results to avoid recomputation"
    },
    {
      "id": "py-adv-005",
      "difficulty": "Advanced",
      "question": "What is the key difference between deepcopy and copy in the copy module?",
      "options": [
        "deepcopy copies nested objects recursively; copy only copies the top level",
        "copy is faster but deepcopy is deprecated",
        "There is no difference",
        "deepcopy only works on dictionaries"
      ],
      "correctAnswer": "deepcopy copies nested objects recursively; copy only copies the top level"
    },
    {
      "id": "py-adv-006",
      "difficulty": "Advanced",
      "question": "What does the __slots__ attribute do in a class?",
      "options": [
        "Restricts the attributes an instance can have, saving memory",
        "Defines abstract methods",
        "Enables multiple inheritance",
        "Automatically generates getters and setters"
      ],
      "correctAnswer": "Restricts the attributes an instance can have, saving memory"
    },
    {
      "id": "py-adv-007",
      "difficulty": "Advanced",
      "question": "What is the purpose of Python's asyncio library?",
      "options": [
        "Writing concurrent code using async/await syntax",
        "Compiling Python to C",
        "Managing package dependencies",
        "Handling only file I/O operations"
      ],
      "correctAnswer": "Writing concurrent code using async/await syntax"
    },
    {
      "id": "py-adv-008",
      "difficulty": "Advanced",
      "question": "What does a decorator with arguments require, structurally?",
      "options": [
        "A single function definition",
        "A function that returns a decorator function",
        "A class with only static methods",
        "It's not possible in Python"
      ],
      "correctAnswer": "A function that returns a decorator function"
    },
    {
      "id": "py-adv-009",
      "difficulty": "Advanced",
      "question": "What is method resolution order (MRO) used for?",
      "options": [
        "Determining the order Python searches classes in multiple inheritance",
        "Sorting dictionary keys",
        "Ordering imports in a file",
        "Resolving variable scope in loops"
      ],
      "correctAnswer": "Determining the order Python searches classes in multiple inheritance"
    },
    {
      "id": "py-adv-010",
      "difficulty": "Advanced",
      "question": "What does the walrus operator (:=) do?",
      "options": [
        "Assigns a value as part of an expression",
        "Compares two values for equality",
        "Performs floor division",
        "Declares a constant"
      ],
      "correctAnswer": "Assigns a value as part of an expression"
    },
    {
      "id": "py-beg-016",
      "difficulty": "Beginner",
      "question": "Which method removes and returns the last item of a list?",
      "options": [
        "remove()",
        "pop()",
        "delete()",
        "discard()"
      ],
      "correctAnswer": "pop()"
    },
    {
      "id": "py-beg-017",
      "difficulty": "Beginner",
      "question": "What does the 'not' operator do in a boolean expression?",
      "options": [
        "Reverses the truth value",
        "Compares two values",
        "Adds numbers",
        "Concatenates strings"
      ],
      "correctAnswer": "Reverses the truth value"
    },
    {
      "id": "py-beg-018",
      "difficulty": "Beginner",
      "question": "Which of these correctly checks if a variable equals 5?",
      "options": [
        "x = 5",
        "x == 5",
        "x := 5",
        "x eq 5"
      ],
      "correctAnswer": "x == 5"
    },
    {
      "id": "py-beg-019",
      "difficulty": "Beginner",
      "question": "What is the correct way to import the math module?",
      "options": [
        "include math",
        "import math",
        "using math",
        "require math"
      ],
      "correctAnswer": "import math"
    },
    {
      "id": "py-beg-020",
      "difficulty": "Beginner",
      "question": "What does str.strip() do?",
      "options": [
        "Removes whitespace from both ends of a string",
        "Converts to uppercase",
        "Splits the string into a list",
        "Reverses the string"
      ],
      "correctAnswer": "Removes whitespace from both ends of a string"
    },
    {
      "id": "py-beg-021",
      "difficulty": "Beginner",
      "question": "Which of these is a valid variable name in Python?",
      "options": [
        "2var",
        "_var",
        "var-name",
        "class"
      ],
      "correctAnswer": "_var"
    },
    {
      "id": "py-beg-022",
      "difficulty": "Beginner",
      "question": "What does the elif keyword do?",
      "options": [
        "Ends a loop",
        "Provides an additional condition after an if",
        "Defines a function",
        "Imports a module"
      ],
      "correctAnswer": "Provides an additional condition after an if"
    },
    {
      "id": "py-beg-023",
      "difficulty": "Beginner",
      "question": "What is the output of bool(0)?",
      "options": [
        "True",
        "False",
        "0",
        "Error"
      ],
      "correctAnswer": "False"
    },
    {
      "id": "py-beg-024",
      "difficulty": "Beginner",
      "question": "Which method joins elements of a list into a string?",
      "options": [
        "'-'.join(list)",
        "list.join('-')",
        "concat(list)",
        "merge(list)"
      ],
      "correctAnswer": "'-'.join(list)"
    },
    {
      "id": "py-beg-025",
      "difficulty": "Beginner",
      "question": "What does input() return by default?",
      "options": [
        "An integer",
        "A string",
        "A boolean",
        "A list"
      ],
      "correctAnswer": "A string"
    },
    {
      "id": "py-int-013",
      "difficulty": "Intermediate",
      "question": "What does the with statement help manage?",
      "options": [
        "Loop iterations",
        "Resource setup and cleanup (context managers)",
        "Variable scope only",
        "Class inheritance"
      ],
      "correctAnswer": "Resource setup and cleanup (context managers)"
    },
    {
      "id": "py-int-014",
      "difficulty": "Intermediate",
      "question": "What is a Python dictionary comprehension used for?",
      "options": [
        "Creating a dictionary using a concise expression",
        "Sorting a dictionary",
        "Deleting dictionary keys",
        "Merging two lists"
      ],
      "correctAnswer": "Creating a dictionary using a concise expression"
    },
    {
      "id": "py-int-015",
      "difficulty": "Intermediate",
      "question": "What does isinstance() check?",
      "options": [
        "If a variable is defined",
        "If an object is an instance of a specified class or type",
        "If a list is empty",
        "If a function returns None"
      ],
      "correctAnswer": "If an object is an instance of a specified class or type"
    },
    {
      "id": "py-int-016",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the __str__ method in a class?",
      "options": [
        "Defines the string representation returned by str() and print()",
        "Converts a class to a list",
        "Deletes an object",
        "Compares two objects"
      ],
      "correctAnswer": "Defines the string representation returned by str() and print()"
    },
    {
      "id": "py-int-017",
      "difficulty": "Intermediate",
      "question": "What does the zip() function do?",
      "options": [
        "Compresses files",
        "Combines multiple iterables element-wise into tuples",
        "Deletes duplicate values",
        "Sorts a list"
      ],
      "correctAnswer": "Combines multiple iterables element-wise into tuples"
    },
    {
      "id": "py-int-018",
      "difficulty": "Intermediate",
      "question": "What is the difference between append() and extend() on a list?",
      "options": [
        "No difference",
        "append() adds a single element; extend() adds elements from an iterable",
        "extend() only works on strings",
        "append() removes elements"
      ],
      "correctAnswer": "append() adds a single element; extend() adds elements from an iterable"
    },
    {
      "id": "py-int-019",
      "difficulty": "Intermediate",
      "question": "What does **kwargs allow a function to accept?",
      "options": [
        "A fixed number of arguments",
        "A variable number of keyword arguments as a dictionary",
        "Only positional arguments",
        "A single tuple"
      ],
      "correctAnswer": "A variable number of keyword arguments as a dictionary"
    },
    {
      "id": "py-adv-011",
      "difficulty": "Advanced",
      "question": "What does the yield from statement do inside a generator?",
      "options": [
        "Ends the generator immediately",
        "Delegates part of a generator's operations to another generator/iterable",
        "Raises an exception",
        "Converts a generator to a list"
      ],
      "correctAnswer": "Delegates part of a generator's operations to another generator/iterable"
    },
    {
      "id": "py-adv-012",
      "difficulty": "Advanced",
      "question": "What is the purpose of Python's context variable (contextvars) module?",
      "options": [
        "Managing state that is local to a context, useful in async code",
        "Declaring global constants",
        "Formatting strings",
        "Managing file paths"
      ],
      "correctAnswer": "Managing state that is local to a context, useful in async code"
    },
    {
      "id": "py-adv-013",
      "difficulty": "Advanced",
      "question": "What does the descriptor protocol (__get__, __set__) enable?",
      "options": [
        "Custom attribute access behavior on classes",
        "Faster list sorting",
        "Automatic type conversion",
        "Multiple inheritance resolution only"
      ],
      "correctAnswer": "Custom attribute access behavior on classes"
    },
    {
      "id": "py-adv-014",
      "difficulty": "Advanced",
      "question": "What is monkey patching in Python?",
      "options": [
        "A debugging tool built into Python",
        "Dynamically modifying a class or module at runtime",
        "A type of unit test",
        "A memory optimization technique"
      ],
      "correctAnswer": "Dynamically modifying a class or module at runtime"
    },
    {
      "id": "py-adv-015",
      "difficulty": "Advanced",
      "question": "What does the __call__ method allow an object to do?",
      "options": [
        "Be deleted automatically",
        "Be invoked like a function",
        "Be compared with ==",
        "Be iterated over"
      ],
      "correctAnswer": "Be invoked like a function"
    },
    {
      "id": "py-int-020",
      "difficulty": "Intermediate",
      "question": "What does the collections.Counter class do?",
      "options": [
        "Sorts a list",
        "Counts hashable objects and returns a dict-like object of counts",
        "Encrypts data",
        "Times function execution"
      ],
      "correctAnswer": "Counts hashable objects and returns a dict-like object of counts"
    }
  ]
};
export const QUIZFORGE_PYTHON_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
