/* QuizForge Question Bank — ruby_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "Ruby",
  "questions": [
    {
      "id": "rb-beg-001",
      "difficulty": "Beginner",
      "question": "Which symbol is used to define a method in Ruby?",
      "options": [
        "func",
        "def",
        "method",
        "define"
      ],
      "correctAnswer": "def"
    },
    {
      "id": "rb-beg-002",
      "difficulty": "Beginner",
      "question": "How do you print output to the console in Ruby?",
      "options": [
        "print()",
        "console.log()",
        "puts",
        "echo"
      ],
      "correctAnswer": "puts"
    },
    {
      "id": "rb-beg-003",
      "difficulty": "Beginner",
      "question": "What symbol denotes a Ruby symbol (like :name)?",
      "options": [
        "#",
        "$",
        ":",
        "@"
      ],
      "correctAnswer": ":"
    },
    {
      "id": "rb-beg-004",
      "difficulty": "Beginner",
      "question": "Which keyword ends a method or block definition in Ruby?",
      "options": [
        "endif",
        "end",
        "}",
        "close"
      ],
      "correctAnswer": "end"
    },
    {
      "id": "rb-beg-005",
      "difficulty": "Beginner",
      "question": "What does the .each method do on an array?",
      "options": [
        "Sorts the array",
        "Iterates over each element",
        "Deletes each element",
        "Reverses the array"
      ],
      "correctAnswer": "Iterates over each element"
    },
    {
      "id": "rb-beg-006",
      "difficulty": "Beginner",
      "question": "How do you create a comment in Ruby?",
      "options": [
        "// comment",
        "# comment",
        "<!-- comment -->",
        "/* comment */"
      ],
      "correctAnswer": "# comment"
    },
    {
      "id": "rb-beg-007",
      "difficulty": "Beginner",
      "question": "What is the correct way to create a hash in Ruby?",
      "options": [
        "{} or Hash.new",
        "[]",
        "()",
        "Hash[]"
      ],
      "correctAnswer": "{} or Hash.new"
    },
    {
      "id": "rb-beg-008",
      "difficulty": "Beginner",
      "question": "Which of these is a valid Ruby string interpolation?",
      "options": [
        "'Hello ' + name",
        "\"Hello #{name}\"",
        "'Hello ' . name",
        "\"Hello \" & name"
      ],
      "correctAnswer": "\"Hello #{name}\""
    },
    {
      "id": "rb-beg-009",
      "difficulty": "Beginner",
      "question": "What does nil represent in Ruby?",
      "options": [
        "Zero",
        "An empty string",
        "The absence of a value",
        "False"
      ],
      "correctAnswer": "The absence of a value"
    },
    {
      "id": "rb-beg-010",
      "difficulty": "Beginner",
      "question": "Which method returns the number of elements in an array?",
      "options": [
        "size or length",
        "count only",
        "total",
        "elements"
      ],
      "correctAnswer": "size or length"
    },
    {
      "id": "rb-beg-011",
      "difficulty": "Beginner",
      "question": "What file extension is used for Ruby scripts?",
      "options": [
        ".rb",
        ".ru",
        ".ryb",
        ".rby"
      ],
      "correctAnswer": ".rb"
    },
    {
      "id": "rb-beg-012",
      "difficulty": "Beginner",
      "question": "How do you define a class in Ruby?",
      "options": [
        "class MyClass end",
        "class MyClass ... end",
        "define class MyClass",
        "new class MyClass"
      ],
      "correctAnswer": "class MyClass ... end"
    },
    {
      "id": "rb-int-001",
      "difficulty": "Intermediate",
      "question": "What is a Ruby block?",
      "options": [
        "A syntax error",
        "A chunk of code passed to a method, often using do...end or {}",
        "A class definition",
        "A comment section"
      ],
      "correctAnswer": "A chunk of code passed to a method, often using do...end or {}"
    },
    {
      "id": "rb-int-002",
      "difficulty": "Intermediate",
      "question": "What does attr_accessor do in a class?",
      "options": [
        "Creates a private method",
        "Automatically generates getter and setter methods for an instance variable",
        "Deletes an attribute",
        "Freezes an object"
      ],
      "correctAnswer": "Automatically generates getter and setter methods for an instance variable"
    },
    {
      "id": "rb-int-003",
      "difficulty": "Intermediate",
      "question": "What is the difference between a Proc and a lambda in Ruby?",
      "options": [
        "No difference",
        "Lambdas check argument count strictly and return only from themselves; Procs don't",
        "Procs are faster",
        "Lambdas can't be stored in variables"
      ],
      "correctAnswer": "Lambdas check argument count strictly and return only from themselves; Procs don't"
    },
    {
      "id": "rb-int-004",
      "difficulty": "Intermediate",
      "question": "What does the module keyword primarily provide in Ruby?",
      "options": [
        "A way to define constants only",
        "A namespace and a way to share methods via mixins (include)",
        "A replacement for classes",
        "A type of loop"
      ],
      "correctAnswer": "A namespace and a way to share methods via mixins (include)"
    },
    {
      "id": "rb-int-005",
      "difficulty": "Intermediate",
      "question": "What does the <=> (spaceship) operator do?",
      "options": [
        "Assigns a value",
        "Compares two values and returns -1, 0, or 1",
        "Concatenates strings",
        "Checks for nil"
      ],
      "correctAnswer": "Compares two values and returns -1, 0, or 1"
    },
    {
      "id": "rb-int-006",
      "difficulty": "Intermediate",
      "question": "What does yield do inside a Ruby method?",
      "options": [
        "Stops the method permanently",
        "Passes control to the block associated with the method call",
        "Returns nil always",
        "Declares a new variable"
      ],
      "correctAnswer": "Passes control to the block associated with the method call"
    },
    {
      "id": "rb-int-007",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the initialize method in a Ruby class?",
      "options": [
        "It's the constructor, run automatically when .new is called",
        "It destroys an object",
        "It's a class-level method only",
        "It's optional and rarely used"
      ],
      "correctAnswer": "It's the constructor, run automatically when .new is called"
    },
    {
      "id": "rb-int-008",
      "difficulty": "Intermediate",
      "question": "What does Array#map return compared to Array#each?",
      "options": [
        "Same thing",
        "map returns a new array of transformed values; each returns the original array",
        "map modifies in place; each does not",
        "each is faster"
      ],
      "correctAnswer": "map returns a new array of transformed values; each returns the original array"
    },
    {
      "id": "rb-adv-001",
      "difficulty": "Advanced",
      "question": "What is method_missing used for in Ruby?",
      "options": [
        "Debugging syntax errors",
        "Intercepting calls to undefined methods for dynamic behavior",
        "Defining private methods",
        "Speeding up method calls"
      ],
      "correctAnswer": "Intercepting calls to undefined methods for dynamic behavior"
    },
    {
      "id": "rb-adv-002",
      "difficulty": "Advanced",
      "question": "What is the main difference between include and extend in a module?",
      "options": [
        "No difference",
        "include adds instance methods; extend adds class (singleton) methods",
        "extend is deprecated",
        "include only works with classes, not modules"
      ],
      "correctAnswer": "include adds instance methods; extend adds class (singleton) methods"
    },
    {
      "id": "rb-adv-003",
      "difficulty": "Advanced",
      "question": "What does Ruby's Global Interpreter Lock (GIL) in MRI restrict?",
      "options": [
        "Only one thread executes Ruby code at a time in MRI",
        "Only one process can run at all",
        "Only global variables are accessible",
        "Nothing, MRI has no GIL"
      ],
      "correctAnswer": "Only one thread executes Ruby code at a time in MRI"
    },
    {
      "id": "rb-adv-004",
      "difficulty": "Advanced",
      "question": "What is a Ruby metaclass (singleton class)?",
      "options": [
        "A class with no instances",
        "A hidden class specific to a single object that stores its singleton methods",
        "A deprecated Ruby feature",
        "A synonym for module"
      ],
      "correctAnswer": "A hidden class specific to a single object that stores its singleton methods"
    },
    {
      "id": "rb-adv-005",
      "difficulty": "Advanced",
      "question": "What does define_method allow you to do?",
      "options": [
        "Only define private methods",
        "Dynamically define a method at runtime using a block",
        "Delete an existing method",
        "Convert a method into a variable"
      ],
      "correctAnswer": "Dynamically define a method at runtime using a block"
    },
    {
      "id": "rb-adv-006",
      "difficulty": "Advanced",
      "question": "What is the purpose of Comparable module when included in a class?",
      "options": [
        "It adds database access",
        "It provides comparison methods (<, >, ==, etc.) once <=> is defined",
        "It makes a class immutable",
        "It adds thread safety"
      ],
      "correctAnswer": "It provides comparison methods (<, >, ==, etc.) once <=> is defined"
    },
    {
      "id": "rb-beg-013",
      "difficulty": "Beginner",
      "question": "How do you write an if-else statement in Ruby?",
      "options": [
        "if...else...end",
        "if...else...endif",
        "if {...} else {...}",
        "if...then...fi"
      ],
      "correctAnswer": "if...else...end"
    },
    {
      "id": "rb-beg-014",
      "difficulty": "Beginner",
      "question": "What does the .upcase method do to a string?",
      "options": [
        "Reverses it",
        "Converts it to uppercase",
        "Removes whitespace",
        "Splits it into words"
      ],
      "correctAnswer": "Converts it to uppercase"
    },
    {
      "id": "rb-beg-015",
      "difficulty": "Beginner",
      "question": "Which of these creates a range in Ruby?",
      "options": [
        "1..5",
        "1:5",
        "range(1,5)",
        "[1 to 5]"
      ],
      "correctAnswer": "1..5"
    },
    {
      "id": "rb-beg-016",
      "difficulty": "Beginner",
      "question": "What does '||' represent in Ruby?",
      "options": [
        "Bitwise AND",
        "Logical OR",
        "String concatenation",
        "Assignment"
      ],
      "correctAnswer": "Logical OR"
    },
    {
      "id": "rb-beg-017",
      "difficulty": "Beginner",
      "question": "How do you define an array literal in Ruby?",
      "options": [
        "{1, 2, 3}",
        "(1, 2, 3)",
        "[1, 2, 3]",
        "<1, 2, 3>"
      ],
      "correctAnswer": "[1, 2, 3]"
    },
    {
      "id": "rb-beg-018",
      "difficulty": "Beginner",
      "question": "What does require do in Ruby?",
      "options": [
        "Deletes a file",
        "Loads external libraries or files",
        "Defines a class",
        "Ends the program"
      ],
      "correctAnswer": "Loads external libraries or files"
    },
    {
      "id": "rb-beg-019",
      "difficulty": "Beginner",
      "question": "What is the result of 5.times printing?",
      "options": [
        "Runs a block 5 times",
        "Prints the number 5",
        "Multiplies 5 by itself",
        "Throws an error"
      ],
      "correctAnswer": "Runs a block 5 times"
    },
    {
      "id": "rb-beg-020",
      "difficulty": "Beginner",
      "question": "How do you check if two values are equal in Ruby?",
      "options": [
        "=",
        "==",
        ":=",
        "eql"
      ],
      "correctAnswer": "=="
    },
    {
      "id": "rb-beg-021",
      "difficulty": "Beginner",
      "question": "What does '@' prefix denote in Ruby?",
      "options": [
        "A local variable",
        "An instance variable",
        "A global variable",
        "A constant"
      ],
      "correctAnswer": "An instance variable"
    },
    {
      "id": "rb-beg-022",
      "difficulty": "Beginner",
      "question": "What does the .to_s method do?",
      "options": [
        "Converts an object to a string",
        "Converts a string to a symbol",
        "Sorts an array",
        "Deletes an object"
      ],
      "correctAnswer": "Converts an object to a string"
    },
    {
      "id": "rb-beg-023",
      "difficulty": "Beginner",
      "question": "Which keyword is used for exception handling in Ruby?",
      "options": [
        "try/catch",
        "begin/rescue",
        "catch/throw only",
        "handle/error"
      ],
      "correctAnswer": "begin/rescue"
    },
    {
      "id": "rb-beg-024",
      "difficulty": "Beginner",
      "question": "What does '@@' prefix denote in Ruby?",
      "options": [
        "A class variable",
        "An instance variable",
        "A local variable",
        "A global variable"
      ],
      "correctAnswer": "A class variable"
    },
    {
      "id": "rb-beg-025",
      "difficulty": "Beginner",
      "question": "What does unless do in Ruby?",
      "options": [
        "Same as if",
        "Executes code if the condition is false",
        "Ends a loop",
        "Defines a method"
      ],
      "correctAnswer": "Executes code if the condition is false"
    },
    {
      "id": "rb-int-009",
      "difficulty": "Intermediate",
      "question": "What does the freeze method do to an object?",
      "options": [
        "Deletes it",
        "Prevents further modification of the object",
        "Converts it to a string",
        "Pauses execution"
      ],
      "correctAnswer": "Prevents further modification of the object"
    },
    {
      "id": "rb-int-010",
      "difficulty": "Intermediate",
      "question": "What is duck typing in Ruby?",
      "options": [
        "A strict type-checking system",
        "An object's suitability is determined by the methods it responds to, not its class",
        "A naming convention",
        "A testing framework"
      ],
      "correctAnswer": "An object's suitability is determined by the methods it responds to, not its class"
    },
    {
      "id": "rb-int-011",
      "difficulty": "Intermediate",
      "question": "What does respond_to? check?",
      "options": [
        "If a method exists on an object",
        "If a class has subclasses",
        "If a variable is nil",
        "If a block was given"
      ],
      "correctAnswer": "If a method exists on an object"
    },
    {
      "id": "rb-int-012",
      "difficulty": "Intermediate",
      "question": "What is the purpose of Enumerable module?",
      "options": [
        "Provides traversal, search, and sorting methods when a class defines each",
        "Handles file I/O",
        "Manages threads",
        "Defines constants only"
      ],
      "correctAnswer": "Provides traversal, search, and sorting methods when a class defines each"
    },
    {
      "id": "rb-int-013",
      "difficulty": "Intermediate",
      "question": "What does send allow you to do in Ruby?",
      "options": [
        "Send network requests",
        "Call a method dynamically by name, including private ones",
        "Send email",
        "Pass a block explicitly"
      ],
      "correctAnswer": "Call a method dynamically by name, including private ones"
    },
    {
      "id": "rb-int-014",
      "difficulty": "Intermediate",
      "question": "What is the difference between puts and print?",
      "options": [
        "No difference",
        "puts adds a newline after output; print does not",
        "print is faster",
        "puts only works with strings"
      ],
      "correctAnswer": "puts adds a newline after output; print does not"
    },
    {
      "id": "rb-int-015",
      "difficulty": "Intermediate",
      "question": "What does the each_with_index method provide?",
      "options": [
        "Only the index",
        "Both the element and its index during iteration",
        "A reversed array",
        "A sorted array"
      ],
      "correctAnswer": "Both the element and its index during iteration"
    },
    {
      "id": "rb-int-016",
      "difficulty": "Intermediate",
      "question": "What does the tap method do in a method chain?",
      "options": [
        "Ends the chain immediately",
        "Yields the object to a block and returns the object itself, useful for debugging",
        "Converts the object to a string",
        "Duplicates the object"
      ],
      "correctAnswer": "Yields the object to a block and returns the object itself, useful for debugging"
    },
    {
      "id": "rb-int-017",
      "difficulty": "Intermediate",
      "question": "What does Struct.new create in Ruby?",
      "options": [
        "A hash with default values",
        "A simple class with accessor methods for named attributes",
        "An array subclass",
        "A new module"
      ],
      "correctAnswer": "A simple class with accessor methods for named attributes"
    },
    {
      "id": "rb-int-018",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the protected keyword for a method?",
      "options": [
        "Makes the method fully private",
        "Allows the method to be called by other instances of the same class or subclasses",
        "Prevents the method from being overridden",
        "Makes the method static"
      ],
      "correctAnswer": "Allows the method to be called by other instances of the same class or subclasses"
    },
    {
      "id": "rb-int-019",
      "difficulty": "Intermediate",
      "question": "What does Kernel#loop do?",
      "options": [
        "Runs a block once",
        "Repeatedly executes a block until it's explicitly broken out of",
        "Sorts an array in a loop",
        "Defines a new class"
      ],
      "correctAnswer": "Repeatedly executes a block until it's explicitly broken out of"
    },
    {
      "id": "rb-int-020",
      "difficulty": "Intermediate",
      "question": "What does the inject (reduce) method do?",
      "options": [
        "Removes elements matching a condition",
        "Combines all elements of a collection into a single value using a block",
        "Sorts elements in place",
        "Duplicates the collection"
      ],
      "correctAnswer": "Combines all elements of a collection into a single value using a block"
    },
    {
      "id": "rb-adv-007",
      "difficulty": "Advanced",
      "question": "What does Ruby's refinements feature allow?",
      "options": [
        "Global monkey patching",
        "Scoped modification of a class's behavior limited to specific files/contexts",
        "Faster garbage collection",
        "Type checking at compile time"
      ],
      "correctAnswer": "Scoped modification of a class's behavior limited to specific files/contexts"
    },
    {
      "id": "rb-adv-008",
      "difficulty": "Advanced",
      "question": "What is the purpose of instance_variable_get/set?",
      "options": [
        "Reading/writing instance variables dynamically by name at runtime",
        "Deleting instance variables permanently",
        "Comparing two objects",
        "Creating class variables"
      ],
      "correctAnswer": "Reading/writing instance variables dynamically by name at runtime"
    },
    {
      "id": "rb-adv-009",
      "difficulty": "Advanced",
      "question": "What does Ruby's Fiber class provide?",
      "options": [
        "Automatic multithreading",
        "Lightweight cooperative concurrency with manual control over execution switching",
        "A string formatting utility",
        "A database connection pool"
      ],
      "correctAnswer": "Lightweight cooperative concurrency with manual control over execution switching"
    },
    {
      "id": "rb-adv-010",
      "difficulty": "Advanced",
      "question": "What does ObjectSpace allow you to do?",
      "options": [
        "Create 3D visualizations",
        "Introspect and interact with all live objects in the Ruby heap",
        "Manage network sockets",
        "Compile Ruby to C"
      ],
      "correctAnswer": "Introspect and interact with all live objects in the Ruby heap"
    },
    {
      "id": "rb-adv-011",
      "difficulty": "Advanced",
      "question": "What is the purpose of Ruby's BasicObject class?",
      "options": [
        "The default superclass for all objects with full Object methods",
        "A minimal class with almost no inherited methods, used as a blank-slate base for proxies/DSLs",
        "A deprecated legacy class",
        "A module for math operations"
      ],
      "correctAnswer": "A minimal class with almost no inherited methods, used as a blank-slate base for proxies/DSLs"
    },
    {
      "id": "rb-adv-012",
      "difficulty": "Advanced",
      "question": "What does the ===  operator do in a case/when statement?",
      "options": [
        "Checks strict object identity only",
        "Tests whether the case value matches the when value, using each object's own === definition",
        "Performs numeric addition",
        "Always behaves identically to =="
      ],
      "correctAnswer": "Tests whether the case value matches the when value, using each object's own === definition"
    },
    {
      "id": "rb-adv-013",
      "difficulty": "Advanced",
      "question": "What does Ruby's method_defined? check?",
      "options": [
        "If a variable exists",
        "If a given method is defined for a class or its ancestors",
        "If a file exists on disk",
        "If a block was passed to a method"
      ],
      "correctAnswer": "If a given method is defined for a class or its ancestors"
    },
    {
      "id": "rb-adv-014",
      "difficulty": "Advanced",
      "question": "What is the purpose of Ruby's Comparable#clamp method?",
      "options": [
        "Deletes a range",
        "Restricts a value to lie within a given minimum and maximum range",
        "Compares two strings",
        "Converts a range to an array"
      ],
      "correctAnswer": "Restricts a value to lie within a given minimum and maximum range"
    },
    {
      "id": "rb-adv-015",
      "difficulty": "Advanced",
      "question": "What does prepend do differently from include in Ruby modules?",
      "options": [
        "No difference",
        "prepend inserts the module ahead of the class in the method lookup chain, allowing it to override the class's own methods",
        "prepend only works with core classes",
        "include always overrides class methods"
      ],
      "correctAnswer": "prepend inserts the module ahead of the class in the method lookup chain, allowing it to override the class's own methods"
    }
  ]
};
export const QUIZFORGE_RUBY_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
