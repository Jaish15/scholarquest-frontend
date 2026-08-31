/* QuizForge Question Bank — java_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "Advanced Java",
  "questions": [
    {
      "id": "jv-beg-001",
      "difficulty": "Beginner",
      "question": "Which keyword is used to create an object in Java?",
      "options": [
        "new",
        "create",
        "make",
        "object"
      ],
      "correctAnswer": "new"
    },
    {
      "id": "jv-beg-002",
      "difficulty": "Beginner",
      "question": "What is the entry point method of a Java application?",
      "options": [
        "start()",
        "main()",
        "run()",
        "init()"
      ],
      "correctAnswer": "main()"
    },
    {
      "id": "jv-beg-003",
      "difficulty": "Beginner",
      "question": "Which data type is used to store true/false values in Java?",
      "options": [
        "bit",
        "boolean",
        "bool",
        "flag"
      ],
      "correctAnswer": "boolean"
    },
    {
      "id": "jv-beg-004",
      "difficulty": "Beginner",
      "question": "What does the 'public' access modifier mean?",
      "options": [
        "Accessible only within the same class",
        "Accessible from any other class",
        "Accessible only in the same package",
        "Accessible only by subclasses"
      ],
      "correctAnswer": "Accessible from any other class"
    },
    {
      "id": "jv-beg-005",
      "difficulty": "Beginner",
      "question": "Which of these is used to define a class in Java?",
      "options": [
        "class MyClass {}",
        "define MyClass {}",
        "new class MyClass {}",
        "struct MyClass {}"
      ],
      "correctAnswer": "class MyClass {}"
    },
    {
      "id": "jv-beg-006",
      "difficulty": "Beginner",
      "question": "What is the file extension for compiled Java bytecode?",
      "options": [
        ".java",
        ".class",
        ".jar",
        ".exe"
      ],
      "correctAnswer": ".class"
    },
    {
      "id": "jv-beg-007",
      "difficulty": "Beginner",
      "question": "Which loop structure checks its condition before executing the loop body?",
      "options": [
        "do-while",
        "while",
        "for-each only",
        "None"
      ],
      "correctAnswer": "while"
    },
    {
      "id": "jv-beg-008",
      "difficulty": "Beginner",
      "question": "What does the 'static' keyword mean when applied to a method?",
      "options": [
        "The method belongs to the class rather than any instance",
        "The method cannot be called",
        "The method runs only once ever",
        "The method is private"
      ],
      "correctAnswer": "The method belongs to the class rather than any instance"
    },
    {
      "id": "jv-beg-009",
      "difficulty": "Beginner",
      "question": "Which collection type does not allow duplicate elements?",
      "options": [
        "List",
        "Set",
        "Map",
        "Array"
      ],
      "correctAnswer": "Set"
    },
    {
      "id": "jv-beg-010",
      "difficulty": "Beginner",
      "question": "What is the correct way to declare an integer array in Java?",
      "options": [
        "int[] arr = new int[5];",
        "array int arr[5];",
        "int arr = new array(5);",
        "arr int[5];"
      ],
      "correctAnswer": "int[] arr = new int[5];"
    },
    {
      "id": "jv-beg-011",
      "difficulty": "Beginner",
      "question": "What does the 'this' keyword refer to in Java?",
      "options": [
        "The parent class",
        "The current instance of the class",
        "A static variable",
        "The main method"
      ],
      "correctAnswer": "The current instance of the class"
    },
    {
      "id": "jv-int-001",
      "difficulty": "Intermediate",
      "question": "What is the difference between an interface and an abstract class in Java?",
      "options": [
        "No difference",
        "A class can implement multiple interfaces but extend only one abstract class",
        "Interfaces can have constructors, abstract classes cannot",
        "Abstract classes cannot have any methods"
      ],
      "correctAnswer": "A class can implement multiple interfaces but extend only one abstract class"
    },
    {
      "id": "jv-int-002",
      "difficulty": "Intermediate",
      "question": "What does the 'final' keyword do when applied to a variable?",
      "options": [
        "Makes it accessible everywhere",
        "Prevents reassignment after initialization",
        "Deletes it after use",
        "Makes it static automatically"
      ],
      "correctAnswer": "Prevents reassignment after initialization"
    },
    {
      "id": "jv-int-003",
      "difficulty": "Intermediate",
      "question": "What is method overloading?",
      "options": [
        "Redefining a method in a subclass",
        "Defining multiple methods with the same name but different parameters in the same class",
        "Calling a method recursively",
        "Making a method static"
      ],
      "correctAnswer": "Defining multiple methods with the same name but different parameters in the same class"
    },
    {
      "id": "jv-int-004",
      "difficulty": "Intermediate",
      "question": "What exception is thrown when dividing an integer by zero in Java?",
      "options": [
        "NullPointerException",
        "ArithmeticException",
        "ArrayIndexOutOfBoundsException",
        "ClassCastException"
      ],
      "correctAnswer": "ArithmeticException"
    },
    {
      "id": "jv-int-005",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a try-with-resources statement?",
      "options": [
        "To catch all exceptions silently",
        "To automatically close resources like streams when done",
        "To retry a failed operation",
        "To define static resources"
      ],
      "correctAnswer": "To automatically close resources like streams when done"
    },
    {
      "id": "jv-int-006",
      "difficulty": "Intermediate",
      "question": "What does the equals() method compare by default in Object class?",
      "options": [
        "Field values",
        "Reference/memory address",
        "Hash codes only",
        "Class names only"
      ],
      "correctAnswer": "Reference/memory address"
    },
    {
      "id": "jv-int-007",
      "difficulty": "Intermediate",
      "question": "What is the difference between ArrayList and LinkedList?",
      "options": [
        "No difference",
        "ArrayList has faster random access; LinkedList has faster insertions/deletions in the middle",
        "LinkedList cannot store objects",
        "ArrayList is thread-safe by default"
      ],
      "correctAnswer": "ArrayList has faster random access; LinkedList has faster insertions/deletions in the middle"
    },
    {
      "id": "jv-int-008",
      "difficulty": "Intermediate",
      "question": "What does the @Override annotation do?",
      "options": [
        "Forces a method to run first",
        "Indicates a method is overriding a superclass/interface method, enabling compiler checks",
        "Makes a method private",
        "Creates a new method dynamically"
      ],
      "correctAnswer": "Indicates a method is overriding a superclass/interface method, enabling compiler checks"
    },
    {
      "id": "jv-adv-001",
      "difficulty": "Advanced",
      "question": "What is the purpose of the volatile keyword in Java?",
      "options": [
        "Makes a variable constant",
        "Ensures visibility of changes to a variable across threads",
        "Makes a variable private",
        "Speeds up variable access"
      ],
      "correctAnswer": "Ensures visibility of changes to a variable across threads"
    },
    {
      "id": "jv-adv-002",
      "difficulty": "Advanced",
      "question": "What does the Java Memory Model guarantee with synchronized blocks?",
      "options": [
        "Faster execution always",
        "Mutual exclusion and visibility of changes between threads",
        "Automatic garbage collection",
        "Prevention of all exceptions"
      ],
      "correctAnswer": "Mutual exclusion and visibility of changes between threads"
    },
    {
      "id": "jv-adv-003",
      "difficulty": "Advanced",
      "question": "What is type erasure in Java generics?",
      "options": [
        "Generic type information is removed at compile time, replaced with raw types/casts at bytecode level",
        "Generics are deleted from the source code",
        "A runtime exception related to generics",
        "A way to erase variables from memory"
      ],
      "correctAnswer": "Generic type information is removed at compile time, replaced with raw types/casts at bytecode level"
    },
    {
      "id": "jv-adv-004",
      "difficulty": "Advanced",
      "question": "What is the difference between HashMap and ConcurrentHashMap?",
      "options": [
        "No difference",
        "ConcurrentHashMap is designed for safe concurrent access without locking the entire map",
        "HashMap is faster in all cases",
        "ConcurrentHashMap doesn't allow null keys or values only"
      ],
      "correctAnswer": "ConcurrentHashMap is designed for safe concurrent access without locking the entire map"
    },
    {
      "id": "jv-adv-005",
      "difficulty": "Advanced",
      "question": "What does the JVM's garbage collector primarily manage?",
      "options": [
        "CPU thread scheduling",
        "Automatic reclamation of memory occupied by unreachable objects",
        "Compiling Java to bytecode",
        "Network socket connections"
      ],
      "correctAnswer": "Automatic reclamation of memory occupied by unreachable objects"
    },
    {
      "id": "jv-adv-006",
      "difficulty": "Advanced",
      "question": "What is a functional interface in Java?",
      "options": [
        "An interface with any number of methods",
        "An interface with exactly one abstract method, usable with lambda expressions",
        "A deprecated interface type",
        "An interface that only contains static methods"
      ],
      "correctAnswer": "An interface with exactly one abstract method, usable with lambda expressions"
    },
    {
      "id": "jv-adv-007",
      "difficulty": "Advanced",
      "question": "What is the purpose of the CompletableFuture class?",
      "options": [
        "Synchronous file I/O",
        "Composing and combining asynchronous computations",
        "Declaring final variables",
        "Managing static class members"
      ],
      "correctAnswer": "Composing and combining asynchronous computations"
    },
    {
      "id": "jv-beg-012",
      "difficulty": "Beginner",
      "question": "Which keyword is used to inherit a class in Java?",
      "options": [
        "implements",
        "extends",
        "inherits",
        "super"
      ],
      "correctAnswer": "extends"
    },
    {
      "id": "jv-beg-013",
      "difficulty": "Beginner",
      "question": "What is the default value of a boolean instance variable in Java?",
      "options": [
        "true",
        "false",
        "null",
        "0"
      ],
      "correctAnswer": "false"
    },
    {
      "id": "jv-beg-014",
      "difficulty": "Beginner",
      "question": "Which operator is used to compare two primitive values for equality?",
      "options": [
        "=",
        "==",
        "equals()",
        "==="
      ],
      "correctAnswer": "=="
    },
    {
      "id": "jv-beg-015",
      "difficulty": "Beginner",
      "question": "What does the 'private' access modifier restrict?",
      "options": [
        "Access from any class",
        "Access to only within the declaring class",
        "Access within the package only",
        "Nothing, it's the same as public"
      ],
      "correctAnswer": "Access to only within the declaring class"
    },
    {
      "id": "jv-beg-016",
      "difficulty": "Beginner",
      "question": "Which of these correctly declares a constant in Java?",
      "options": [
        "const int X = 5;",
        "final int X = 5;",
        "static int X = 5;",
        "constant int X = 5;"
      ],
      "correctAnswer": "final int X = 5;"
    },
    {
      "id": "jv-beg-017",
      "difficulty": "Beginner",
      "question": "What does the String class's equals() method compare?",
      "options": [
        "Memory addresses",
        "The actual character content of the strings",
        "String length only",
        "Hash codes only"
      ],
      "correctAnswer": "The actual character content of the strings"
    },
    {
      "id": "jv-beg-018",
      "difficulty": "Beginner",
      "question": "Which loop is best used when the number of iterations is known beforehand?",
      "options": [
        "while",
        "do-while",
        "for",
        "if"
      ],
      "correctAnswer": "for"
    },
    {
      "id": "jv-beg-019",
      "difficulty": "Beginner",
      "question": "What is the superclass of every class in Java?",
      "options": [
        "Main",
        "Object",
        "Class",
        "System"
      ],
      "correctAnswer": "Object"
    },
    {
      "id": "jv-beg-020",
      "difficulty": "Beginner",
      "question": "What does the 'void' keyword indicate for a method?",
      "options": [
        "The method returns no value",
        "The method is private",
        "The method is abstract",
        "The method is static"
      ],
      "correctAnswer": "The method returns no value"
    },
    {
      "id": "jv-beg-021",
      "difficulty": "Beginner",
      "question": "Which collection interface maintains key-value pairs?",
      "options": [
        "List",
        "Set",
        "Map",
        "Queue"
      ],
      "correctAnswer": "Map"
    },
    {
      "id": "jv-beg-022",
      "difficulty": "Beginner",
      "question": "What does the 'import' statement do?",
      "options": [
        "Deletes a class",
        "Brings classes from other packages into scope",
        "Compiles the program",
        "Runs the main method"
      ],
      "correctAnswer": "Brings classes from other packages into scope"
    },
    {
      "id": "jv-beg-023",
      "difficulty": "Beginner",
      "question": "Which keyword throws an exception explicitly in Java?",
      "options": [
        "throw",
        "throws",
        "catch",
        "raise"
      ],
      "correctAnswer": "throw"
    },
    {
      "id": "jv-beg-024",
      "difficulty": "Beginner",
      "question": "What does an array's .length property (not method) return?",
      "options": [
        "The last index",
        "The number of elements it can hold",
        "The data type",
        "The memory address"
      ],
      "correctAnswer": "The number of elements it can hold"
    },
    {
      "id": "jv-beg-025",
      "difficulty": "Beginner",
      "question": "Which of the following is a valid way to create a String object?",
      "options": [
        "String s = new String(\"hi\");",
        "String s = String(\"hi\");",
        "s = new String;",
        "String s := \"hi\";"
      ],
      "correctAnswer": "String s = new String(\"hi\");"
    },
    {
      "id": "jv-int-009",
      "difficulty": "Intermediate",
      "question": "What is polymorphism in the context of Java?",
      "options": [
        "Having multiple classes with the same name",
        "The ability of an object to take many forms, e.g. via method overriding",
        "Declaring multiple variables at once",
        "Using multiple threads"
      ],
      "correctAnswer": "The ability of an object to take many forms, e.g. via method overriding"
    },
    {
      "id": "jv-int-010",
      "difficulty": "Intermediate",
      "question": "What does the 'super' keyword refer to?",
      "options": [
        "The current object",
        "The parent class of the current object",
        "A static method",
        "The main class"
      ],
      "correctAnswer": "The parent class of the current object"
    },
    {
      "id": "jv-int-011",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a constructor in Java?",
      "options": [
        "To destroy an object",
        "To initialize a newly created object",
        "To compile the class",
        "To define static methods only"
      ],
      "correctAnswer": "To initialize a newly created object"
    },
    {
      "id": "jv-int-012",
      "difficulty": "Intermediate",
      "question": "What does the 'implements' keyword do?",
      "options": [
        "Inherits from a parent class",
        "Allows a class to fulfill the contract of an interface",
        "Declares a variable",
        "Imports a package"
      ],
      "correctAnswer": "Allows a class to fulfill the contract of an interface"
    },
    {
      "id": "jv-int-013",
      "difficulty": "Intermediate",
      "question": "What is the difference between checked and unchecked exceptions?",
      "options": [
        "No difference",
        "Checked exceptions must be declared or handled at compile time; unchecked exceptions do not",
        "Unchecked exceptions can't be caught",
        "Checked exceptions only occur at runtime"
      ],
      "correctAnswer": "Checked exceptions must be declared or handled at compile time; unchecked exceptions do not"
    },
    {
      "id": "jv-int-014",
      "difficulty": "Intermediate",
      "question": "What does the Comparable interface's compareTo() method enable?",
      "options": [
        "String concatenation",
        "Defining a natural ordering for objects of a class",
        "Converting objects to JSON",
        "Cloning objects"
      ],
      "correctAnswer": "Defining a natural ordering for objects of a class"
    },
    {
      "id": "jv-int-015",
      "difficulty": "Intermediate",
      "question": "What is autoboxing in Java?",
      "options": [
        "Automatic memory deallocation",
        "Automatic conversion between primitive types and their wrapper classes",
        "Automatic exception handling",
        "Automatic thread creation"
      ],
      "correctAnswer": "Automatic conversion between primitive types and their wrapper classes"
    },
    {
      "id": "jv-int-016",
      "difficulty": "Intermediate",
      "question": "What does the hashCode() method's contract require in relation to equals()?",
      "options": [
        "They are unrelated",
        "Equal objects must have equal hash codes",
        "Hash codes must always be unique",
        "hashCode() must return 0 for all objects"
      ],
      "correctAnswer": "Equal objects must have equal hash codes"
    },
    {
      "id": "jv-int-017",
      "difficulty": "Intermediate",
      "question": "What is the purpose of Java's Optional class?",
      "options": [
        "Replacing all null checks with exceptions",
        "Representing a value that may or may not be present, avoiding explicit null checks",
        "Making variables optional to declare",
        "Speeding up compilation"
      ],
      "correctAnswer": "Representing a value that may or may not be present, avoiding explicit null checks"
    },
    {
      "id": "jv-int-018",
      "difficulty": "Intermediate",
      "question": "What does the Stream API's filter() method do?",
      "options": [
        "Sorts the stream",
        "Selects elements matching a given predicate",
        "Converts the stream to a list only",
        "Terminates the stream immediately"
      ],
      "correctAnswer": "Selects elements matching a given predicate"
    },
    {
      "id": "jv-int-019",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the transient keyword?",
      "options": [
        "Marks a field to be excluded from default serialization",
        "Makes a variable thread-safe",
        "Declares a temporary local variable",
        "Marks a method as deprecated"
      ],
      "correctAnswer": "Marks a field to be excluded from default serialization"
    },
    {
      "id": "jv-int-020",
      "difficulty": "Intermediate",
      "question": "What does method overriding require regarding access modifiers?",
      "options": [
        "The overriding method can have a more restrictive modifier",
        "The overriding method cannot have a more restrictive access modifier than the overridden one",
        "Access modifiers are irrelevant to overriding",
        "Overriding methods must always be public"
      ],
      "correctAnswer": "The overriding method cannot have a more restrictive access modifier than the overridden one"
    },
    {
      "id": "jv-adv-008",
      "difficulty": "Advanced",
      "question": "What is the purpose of the ExecutorService framework?",
      "options": [
        "Managing a pool of threads for asynchronous task execution",
        "Compiling Java bytecode",
        "Handling file I/O exclusively",
        "Managing database transactions"
      ],
      "correctAnswer": "Managing a pool of threads for asynchronous task execution"
    },
    {
      "id": "jv-adv-009",
      "difficulty": "Advanced",
      "question": "What does the Fork/Join framework optimize for?",
      "options": [
        "Network I/O",
        "Recursively splitting tasks into smaller subtasks executed in parallel and combining results",
        "Database indexing",
        "String formatting"
      ],
      "correctAnswer": "Recursively splitting tasks into smaller subtasks executed in parallel and combining results"
    },
    {
      "id": "jv-adv-010",
      "difficulty": "Advanced",
      "question": "What is a weak reference used for in Java's memory model?",
      "options": [
        "Preventing garbage collection entirely",
        "Allowing an object to be garbage collected even if referenced, useful for caches",
        "Making a variable final",
        "Speeding up compilation"
      ],
      "correctAnswer": "Allowing an object to be garbage collected even if referenced, useful for caches"
    },
    {
      "id": "jv-adv-011",
      "difficulty": "Advanced",
      "question": "What does the Java Reflection API allow?",
      "options": [
        "Only reading source code comments",
        "Inspecting and manipulating classes, methods, and fields at runtime",
        "Compiling code faster",
        "Creating GUI components automatically"
      ],
      "correctAnswer": "Inspecting and manipulating classes, methods, and fields at runtime"
    },
    {
      "id": "jv-adv-012",
      "difficulty": "Advanced",
      "question": "What is the purpose of the synchronized keyword on a method?",
      "options": [
        "Makes the method static",
        "Ensures only one thread can execute that method on a given object at a time",
        "Speeds up method execution",
        "Marks the method as deprecated"
      ],
      "correctAnswer": "Ensures only one thread can execute that method on a given object at a time"
    },
    {
      "id": "jv-adv-013",
      "difficulty": "Advanced",
      "question": "What does the CompletableFuture.thenApply() method do?",
      "options": [
        "Cancels the future",
        "Applies a transformation function to the result once the future completes",
        "Blocks the thread until completion",
        "Starts a new thread pool"
      ],
      "correctAnswer": "Applies a transformation function to the result once the future completes"
    },
    {
      "id": "jv-adv-014",
      "difficulty": "Advanced",
      "question": "What is a PhantomReference used for in Java?",
      "options": [
        "Speeding up garbage collection",
        "Tracking when an object has been finalized and is about to be reclaimed, for cleanup actions",
        "Creating anonymous classes",
        "Defining interfaces dynamically"
      ],
      "correctAnswer": "Tracking when an object has been finalized and is about to be reclaimed, for cleanup actions"
    },
    {
      "id": "jv-adv-015",
      "difficulty": "Advanced",
      "question": "What does the Java Module System (introduced in Java 9) primarily provide?",
      "options": [
        "Faster string concatenation",
        "Strong encapsulation and explicit dependencies between groups of packages",
        "Automatic garbage collection tuning",
        "Built-in unit testing"
      ],
      "correctAnswer": "Strong encapsulation and explicit dependencies between groups of packages"
    }
  ]
};
export const QUIZFORGE_JAVA_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
