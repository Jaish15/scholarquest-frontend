/* ============================================================
   ScholarQuest Domain Bank — PYTHON
   Contains 120 QuizForge Questions & 120 CodeScroll Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

// ── QUIZFORGE QUESTIONS (120 Total) ──────────────────────────────────────────
export const PYTHON_QUIZ_QUESTIONS = [
  // ── BEGINNER TIER (40 Questions) ──────────────────────────────────────────
  {
    id: 'py_b_01', domain: 'Python', difficulty: 'Beginner',
    question: 'Which keyword is used to define a function in Python?',
    options: ['def', 'function', 'fn', 'fun'], correctAnswer: 0,
    explanation: 'In Python, functions are defined using the `def` keyword followed by the function name and parentheses.'
  },
  {
    id: 'py_b_02', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the output of `type(3.14)` in Python?',
    options: ["<class 'float'>", "<class 'int'>", "<class 'double'>", "<class 'number'>"], correctAnswer: 0,
    explanation: 'Floating-point numbers in Python belong to the `<class \'float\'>` data type.'
  },
  {
    id: 'py_b_03', domain: 'Python', difficulty: 'Beginner',
    question: 'Which symbol is used for single-line comments in Python?',
    options: ['#', '//', '/*', '--'], correctAnswer: 0,
    explanation: 'The hash symbol `#` marks the beginning of a single-line comment in Python.'
  },
  {
    id: 'py_b_04', domain: 'Python', difficulty: 'Beginner',
    question: 'How do you create an empty dictionary in Python?',
    options: ['{}', '[]', '()', 'set()'], correctAnswer: 0,
    explanation: 'Curly braces `{}` with no elements create an empty dictionary (`dict`).'
  },
  {
    id: 'py_b_05', domain: 'Python', difficulty: 'Beginner',
    question: 'What does `len("ScholarQuest")` return?',
    options: ['12', '11', '13', '10'], correctAnswer: 0,
    explanation: 'The `len()` function counts total characters in a string. "ScholarQuest" has 12 characters.'
  },
  {
    id: 'py_b_06', domain: 'Python', difficulty: 'Beginner',
    question: 'Which operator is used for exponentiation (power) in Python?',
    options: ['**', '^', '^^', 'pow'], correctAnswer: 0,
    explanation: 'The double asterisk `**` calculates exponential powers in Python (e.g. `2 ** 3 = 8`).'
  },
  {
    id: 'py_b_07', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the result of `10 // 3` in Python?',
    options: ['3', '3.3333', '3.0', '1'], correctAnswer: 0,
    explanation: 'The `//` operator performs integer (floor) division, truncating fractional remainders to 3.'
  },
  {
    id: 'py_b_08', domain: 'Python', difficulty: 'Beginner',
    question: 'Which built-in function converts a string "100" to an integer 100?',
    options: ['int()', 'str()', 'float()', 'parse()'], correctAnswer: 0,
    explanation: '`int("100")` casts a valid numeric string into a signed integer object.'
  },
  {
    id: 'py_b_09', domain: 'Python', difficulty: 'Beginner',
    question: 'What data structure in Python is ordered and immutable?',
    options: ['Tuple', 'List', 'Set', 'Dictionary'], correctAnswer: 0,
    explanation: 'Tuples maintain order and cannot be modified after creation (immutable).'
  },
  {
    id: 'py_b_10', domain: 'Python', difficulty: 'Beginner',
    question: 'Which method removes and returns the last item from a list?',
    options: ['pop()', 'remove()', 'del', 'clear()'], correctAnswer: 0,
    explanation: '`list.pop()` by default removes and returns the last element of the list.'
  },
  {
    id: 'py_b_11', domain: 'Python', difficulty: 'Beginner',
    question: 'What does `bool([])` evaluate to in Python?',
    options: ['False', 'True', 'None', 'Error'], correctAnswer: 0,
    explanation: 'Empty containers like lists `[]`, tuples `()`, or strings `""` evaluate to `False` in boolean context.'
  },
  {
    id: 'py_b_12', domain: 'Python', difficulty: 'Beginner',
    question: 'How do you check if the key "name" exists in dictionary `d`?',
    options: ['"name" in d', 'd.contains("name")', 'd.has_key("name")', '"name" == d'], correctAnswer: 0,
    explanation: 'The `in` operator efficiently checks for key existence within a Python dictionary.'
  },
  {
    id: 'py_b_13', domain: 'Python', difficulty: 'Beginner',
    question: 'Which statement is used to stop a loop immediately?',
    options: ['break', 'continue', 'pass', 'stop'], correctAnswer: 0,
    explanation: '`break` terminates the enclosing `for` or `while` loop immediately.'
  },
  {
    id: 'py_b_14', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the output of `"hello".upper()`?',
    options: ['"HELLO"', '"Hello"', '"HELLO"', 'TypeError'], correctAnswer: 0,
    explanation: 'The `.upper()` string method converts all characters to uppercase.'
  },
  {
    id: 'py_b_15', domain: 'Python', difficulty: 'Beginner',
    question: 'Which built-in function returns a sequence of numbers from start to stop?',
    options: ['range()', 'sequence()', 'loop()', 'list()'], correctAnswer: 0,
    explanation: '`range(start, stop, step)` generates immutable arithmetic sequences ideal for loops.'
  },
  {
    id: 'py_b_16', domain: 'Python', difficulty: 'Beginner',
    question: 'What keyword is used to handle exceptions in Python?',
    options: ['except', 'catch', 'error', 'trap'], correctAnswer: 0,
    explanation: 'Python uses `try...except` blocks for exception handling.'
  },
  {
    id: 'py_b_17', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the index of the first element in a Python list?',
    options: ['0', '1', '-1', '0.0'], correctAnswer: 0,
    explanation: 'Python arrays and lists use zero-based indexing.'
  },
  {
    id: 'py_b_18', domain: 'Python', difficulty: 'Beginner',
    question: 'What does `print(type(True))` output?',
    options: ["<class 'bool'>", "<class 'boolean'>", "<class 'int'>", "<class 'str'>"], correctAnswer: 0,
    explanation: 'Boolean literals `True` and `False` belong to `<class \'bool\'>`.'
  },
  {
    id: 'py_b_19', domain: 'Python', difficulty: 'Beginner',
    question: 'Which string method removes leading and trailing whitespace?',
    options: ['strip()', 'trim()', 'clean()', 'cut()'], correctAnswer: 0,
    explanation: '`str.strip()` removes leading and trailing whitespace characters.'
  },
  {
    id: 'py_b_20', domain: 'Python', difficulty: 'Beginner',
    question: 'How do you append an item `x` to list `lst`?',
    options: ['lst.append(x)', 'lst.add(x)', 'lst.push(x)', 'lst.insert(x)'], correctAnswer: 0,
    explanation: '`lst.append(x)` appends item `x` to the end of list `lst`.'
  },
  {
    id: 'py_b_21', domain: 'Python', difficulty: 'Beginner',
    question: 'What does `min(4, 8, 2, 10)` return?',
    options: ['2', '4', '8', '10'], correctAnswer: 0,
    explanation: '`min()` returns the smallest argument passed.'
  },
  {
    id: 'py_b_22', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the boolean result of `5 != 5`?',
    options: ['False', 'True', 'None', 'Error'], correctAnswer: 0,
    explanation: '`!=` means "not equal". Since 5 equals 5, `5 != 5` is `False`.'
  },
  {
    id: 'py_b_23', domain: 'Python', difficulty: 'Beginner',
    question: 'Which method turns a list of strings into a single joined string?',
    options: ['join()', 'concat()', 'merge()', 'append()'], correctAnswer: 0,
    explanation: '`"separator".join(list_of_strings)` concatenates elements into one string.'
  },
  {
    id: 'py_b_24', domain: 'Python', difficulty: 'Beginner',
    question: 'What keyword does nothing and acts as a placeholder statement?',
    options: ['pass', 'continue', 'skip', 'null'], correctAnswer: 0,
    explanation: '`pass` is a null statement used as a placeholder when code syntax requires a block.'
  },
  {
    id: 'py_b_25', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the output of `str(42)`?',
    options: ["'42'", '42', '42.0', 'True'], correctAnswer: 0,
    explanation: '`str()` casts the integer 42 into the string object `"42"`.'
  },
  {
    id: 'py_b_26', domain: 'Python', difficulty: 'Beginner',
    question: 'Which mode in `open()` opens a file for writing, overwriting existing content?',
    options: ["'w'", "'r'", "'a'", "'x'"], correctAnswer: 0,
    explanation: "`'w'` mode opens a file for writing, truncating existing content."
  },
  {
    id: 'py_b_27', domain: 'Python', difficulty: 'Beginner',
    question: 'What does `abs(-15)` return?',
    options: ['15', '-15', '0', '15.0'], correctAnswer: 0,
    explanation: '`abs()` calculates the non-negative absolute value of a number.'
  },
  {
    id: 'py_b_28', domain: 'Python', difficulty: 'Beginner',
    question: 'What does the slice `lst[-1]` return for `lst = [10, 20, 30]`?',
    options: ['30', '10', '20', 'IndexError'], correctAnswer: 0,
    explanation: 'Negative indexing counts from the right; `-1` accesses the final element.'
  },
  {
    id: 'py_b_29', domain: 'Python', difficulty: 'Beginner',
    question: 'How do you create a set in Python with numbers 1, 2, 3?',
    options: ['{1, 2, 3}', '[1, 2, 3]', '(1, 2, 3)', '<1, 2, 3>'], correctAnswer: 0,
    explanation: 'Non-empty curly braces `{1, 2, 3}` without key-value colons define a set.'
  },
  {
    id: 'py_b_30', domain: 'Python', difficulty: 'Beginner',
    question: 'Which built-in function returns a sorted copy of an iterable list?',
    options: ['sorted()', 'sort()', 'order()', 'arrange()'], correctAnswer: 0,
    explanation: '`sorted(iterable)` returns a new sorted list leaving original untouched.'
  },
  {
    id: 'py_b_31', domain: 'Python', difficulty: 'Beginner',
    question: 'What keyword defines an anonymous inline function in Python?',
    options: ['lambda', 'def', 'anon', 'inline'], correctAnswer: 0,
    explanation: '`lambda arguments: expression` creates single-expression anonymous functions.'
  },
  {
    id: 'py_b_32', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the output of `"Py" * 3` in Python?',
    options: ["'PyPyPy'", "'Py3'", 'TypeError', "'Py Py Py'"], correctAnswer: 0,
    explanation: 'Multiplying a string by an integer `n` repeats the string `n` times.'
  },
  {
    id: 'py_b_33', domain: 'Python', difficulty: 'Beginner',
    question: 'What statement raises a custom exception manually?',
    options: ['raise', 'throw', 'fire', 'emit'], correctAnswer: 0,
    explanation: '`raise Exception("msg")` manually triggers an exception.'
  },
  {
    id: 'py_b_34', domain: 'Python', difficulty: 'Beginner',
    question: 'What module provides mathematical functions like `sqrt` and `pi`?',
    options: ['math', 'sys', 'os', 'calc'], correctAnswer: 0,
    explanation: 'The standard library `math` module supplies core mathematical operations.'
  },
  {
    id: 'py_b_35', domain: 'Python', difficulty: 'Beginner',
    question: 'What does `isinstance(5, int)` return?',
    options: ['True', 'False', 'int', 'None'], correctAnswer: 0,
    explanation: '`isinstance(obj, classinfo)` checks whether object `5` is an instance of `int`.'
  },
  {
    id: 'py_b_36', domain: 'Python', difficulty: 'Beginner',
    question: 'Which method returns a list of dictionary key-value tuples?',
    options: ['items()', 'keys()', 'values()', 'pairs()'], correctAnswer: 0,
    explanation: '`dict.items()` returns a view object yielding `(key, value)` tuples.'
  },
  {
    id: 'py_b_37', domain: 'Python', difficulty: 'Beginner',
    question: 'How do you check if variable `x` is None?',
    options: ['x is None', 'x == null', 'x.isNone()', 'x === None'], correctAnswer: 0,
    explanation: '`x is None` is the idiomatic Python check for identity comparison with `None`.'
  },
  {
    id: 'py_b_38', domain: 'Python', difficulty: 'Beginner',
    question: 'What is the output of `list(range(3))`?',
    options: ['[0, 1, 2]', '[1, 2, 3]', '[0, 1, 2, 3]', '[3]'], correctAnswer: 0,
    explanation: '`range(3)` produces numbers starting at 0 up to (exclusive) 3: `[0, 1, 2]`.'
  },
  {
    id: 'py_b_39', domain: 'Python', difficulty: 'Beginner',
    question: 'What does `set([1, 2, 2, 3])` return?',
    options: ['{1, 2, 3}', '{1, 2, 2, 3}', '[1, 2, 3]', '(1, 2, 3)'], correctAnswer: 0,
    explanation: 'Sets enforce uniqueness and drop duplicate elements (`2`).'
  },
  {
    id: 'py_b_40', domain: 'Python', difficulty: 'Beginner',
    question: 'What keyword imports a module in Python?',
    options: ['import', 'include', 'require', 'use'], correctAnswer: 0,
    explanation: '`import module_name` loads external/standard library modules.'
  },

  // ── INTERMEDIATE TIER (40 Questions) ──────────────────────────────────────
  {
    id: 'py_i_01', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `[x**2 for x in range(5) if x % 2 == 0]`?',
    options: ['[0, 4, 16]', '[0, 1, 4, 9, 16]', '[4, 16]', '[0, 2, 4]'], correctAnswer: 0,
    explanation: 'List comprehension filters even numbers `0, 2, 4` from `0..4` and computes their squares: `[0, 4, 16]`.'
  },
  {
    id: 'py_i_02', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the difference between shallow copy and deep copy in Python?',
    options: ['Shallow copy copies references to nested objects; deep copy recursively copies nested objects', 'Shallow copy uses RAM; deep copy uses disk', 'Deep copy only copies primitive numbers', 'They are identical'], correctAnswer: 0,
    explanation: '`copy.copy()` constructs a new collection populated with references to child objects; `copy.deepcopy()` recursively duplicates all nested objects.'
  },
  {
    id: 'py_i_03', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does the `*args` parameter do in a function definition?',
    options: ['Packs arbitrary positional arguments into a tuple', 'Packs keyword arguments into a dictionary', 'Requires arguments to be integers', 'Pointers to memory addresses'], correctAnswer: 0,
    explanation: '`*args` allows a function to accept any number of extra positional arguments as a tuple.'
  },
  {
    id: 'py_i_04', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `bool(0) or bool("0")`?',
    options: ['True', 'False', '0', 'None'], correctAnswer: 0,
    explanation: '`bool(0)` is `False`, but non-empty string `bool("0")` is `True`. `False or True` evaluates to `True`.'
  },
  {
    id: 'py_i_05', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `dict.get("key", default)` return if "key" is missing from the dictionary?',
    options: ['The value of `default`', 'KeyError exception', 'None', 'False'], correctAnswer: 0,
    explanation: 'Unlike `dict["key"]` which raises a `KeyError`, `.get()` returns the specified default fallback value if key is not found.'
  },
  {
    id: 'py_i_06', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `list(zip(["a", "b"], [1, 2, 3]))`?',
    options: ["[('a', 1), ('b', 2)]", "[('a', 1), ('b', 2), (None, 3)]", "['a', 1, 'b', 2]", "Error"], correctAnswer: 0,
    explanation: '`zip()` pairs elements until the shortest input iterable is exhausted, producing `[(\'a\', 1), (\'b\', 2)]`.'
  },
  {
    id: 'py_i_07', domain: 'Python', difficulty: 'Intermediate',
    question: 'How is a class constructor defined in Python?',
    options: ['def __init__(self):', 'def constructor(self):', 'def main(self):', 'def __create__(self):'], correctAnswer: 0,
    explanation: 'The dunder method `__init__(self)` initializes instance state upon class instantiation.'
  },
  {
    id: 'py_i_08', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `"a,b,c".split(",")`?',
    options: ["['a', 'b', 'c']", "('a', 'b', 'c')", "'abc'", "['a,b,c']"], correctAnswer: 0,
    explanation: '`str.split(",")` splits string by delimiter comma into a list of substring tokens.'
  },
  {
    id: 'py_i_09', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does the `finally` block in a `try...except...finally` construct guarantee?',
    options: ['Executes regardless of whether an exception occurred or not', 'Executes only when an exception occurs', 'Executes only when no exception occurs', 'Reraises unhandled exceptions'], correctAnswer: 0,
    explanation: 'The `finally` block always executes prior to exiting the try construct, ideal for cleanup operations.'
  },
  {
    id: 'py_i_10', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the result of `list(map(lambda x: x * 2, [1, 2, 3]))`?',
    options: ['[2, 4, 6]', '[1, 4, 9]', '[1, 2, 3, 1, 2, 3]', '6'], correctAnswer: 0,
    explanation: '`map()` applies the lambda multiplier to each item in `[1, 2, 3]`, yielding `[2, 4, 6]`.'
  },
  {
    id: 'py_i_11', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is a generator function in Python?',
    options: ['A function using `yield` that returns an iterator producing items lazily on demand', 'A function that creates database tables', 'A function that returns random numbers', 'A class initializer'], correctAnswer: 0,
    explanation: 'Generator functions utilize the `yield` statement to suspend execution state and stream values lazily.'
  },
  {
    id: 'py_i_12', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `any([False, 0, "", 5])` evaluate to?',
    options: ['True', 'False', '5', 'None'], correctAnswer: 0,
    explanation: '`any()` returns `True` if at least one element in the iterable is truthy (here `5` is truthy).'
  },
  {
    id: 'py_i_13', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `all([True, 1, "hello"])`?',
    options: ['True', 'False', '1', 'None'], correctAnswer: 0,
    explanation: '`all()` returns `True` only if every element in the given iterable evaluates to truthy.'
  },
  {
    id: 'py_i_14', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is a closure in Python?',
    options: ['A nested function that retains access to variables from its enclosing scope even after enclosing scope exits', 'Closing a file stream', 'Private method syntax', 'A class destructor'], correctAnswer: 0,
    explanation: 'A closure is an inner function object that remembers variables in its lexical scope bounds.'
  },
  {
    id: 'py_i_15', domain: 'Python', difficulty: 'Intermediate',
    question: 'What will `print("Python"[1:4])` output?',
    options: ["'yth'", "'ytho'", "'Pyt'", "'y'"], correctAnswer: 0,
    explanation: 'String slicing `[1:4]` selects indices 1, 2, and 3 (index 4 exclusive): `"yth"`.'
  },
  {
    id: 'py_i_16', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `is` operator compare in Python?',
    options: ['Object memory identity (same location in RAM)', 'Value equality', 'Data type compatibility', 'String length'], correctAnswer: 0,
    explanation: 'The `is` operator checks if two variables point to the exact same object in memory (`id(a) == id(b)`).'
  },
  {
    id: 'py_i_17', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `"{:0.2f}".format(3.14159)`?',
    options: ["'3.14'", "'3.14159'", "'3.15'", "'0.2f'"], correctAnswer: 0,
    explanation: '`0.2f` formats a floating-point number rounded to 2 decimal places.'
  },
  {
    id: 'py_i_18', domain: 'Python', difficulty: 'Intermediate',
    question: 'How do you call a method from a parent superclass in Python 3 subclassing?',
    options: ['super().method_name()', 'parent.method_name()', 'base.method_name()', 'self.super.method_name()'], correctAnswer: 0,
    explanation: '`super().method_name()` resolves and invokes parent class methods according to the MRO.'
  },
  {
    id: 'py_i_19', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `{x: x**2 for x in range(3)}`?',
    options: ['{0: 0, 1: 1, 2: 4}', '[0, 1, 4]', '{0, 1, 4}', '(0, 1, 4)'], correctAnswer: 0,
    explanation: 'Dictionary comprehension builds key-value mappings `{0: 0, 1: 1, 2: 4}`.'
  },
  {
    id: 'py_i_20', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `sys.argv` contain when executing a Python script from terminal?',
    options: ['Command-line arguments list starting with script path at index 0', 'Environment variables dict', 'Function call parameters', 'System CPU details'], correctAnswer: 0,
    explanation: '`sys.argv` stores command-line arguments passed to a script, where `sys.argv[0]` is script name.'
  },
  {
    id: 'py_i_21', domain: 'Python', difficulty: 'Intermediate',
    question: 'What happens if you modify a global variable inside a function without declaring `global x`?',
    options: ['UnboundLocalError or creates local scope variable x', 'Modifies global x directly', 'Raises SyntaxError', 'Segfault'], correctAnswer: 0,
    explanation: 'Reassigning a variable inside function scope implicitly makes it local unless declared `global x`.'
  },
  {
    id: 'py_i_22', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `set([1, 2]) & set([2, 3])`?',
    options: ['{2}', '{1, 2, 3}', '{1}', '{}'], correctAnswer: 0,
    explanation: 'The `&` operator computes set intersection (common elements: `{2}`).'
  },
  {
    id: 'py_i_23', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `set([1, 2]) | set([2, 3])`?',
    options: ['{1, 2, 3}', '{2}', '{1, 3}', '{}'], correctAnswer: 0,
    explanation: 'The `|` operator computes set union (combining elements without duplicates).'
  },
  {
    id: 'py_i_24', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `functools.reduce(lambda x, y: x * y, [1, 2, 3, 4])` return?',
    options: ['24', '10', '4', '[1, 2, 3, 4]'], correctAnswer: 0,
    explanation: '`reduce()` iteratively multiplies elements cumulatively: `((1 * 2) * 3) * 4 = 24`.'
  },
  {
    id: 'py_i_25', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `enumerate(["a", "b", "c"])` yield in a loop?',
    options: ['Tuples of (index, element): (0, "a"), (1, "b"), (2, "c")', 'Just indices 0, 1, 2', 'Just values "a", "b", "c"', 'Dictionary keys'], correctAnswer: 0,
    explanation: '`enumerate()` tracks counts alongside elements, yielding `(index, item)` pairs.'
  },
  {
    id: 'py_i_26', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the default return value of a Python function that executes without an explicit `return` statement?',
    options: ['None', 'False', '0', 'Empty string'], correctAnswer: 0,
    explanation: 'Python functions implicitly return `None` if execution reaches the end without `return`.'
  },
  {
    id: 'py_i_27', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does the `with` statement ensure when opening a file?',
    options: ['Automatic file closure upon exit of the block even if exceptions occur', 'Encrypts file contents', 'Locks file against other processes', 'Speeds up disk read speed'], correctAnswer: 0,
    explanation: 'Context manager `with open(...)` guarantees `__exit__()` is called to close streams cleanly.'
  },
  {
    id: 'py_i_28', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `"hello".find("z")`?',
    options: ['-1', 'ValueError exception', 'False', 'None'], correctAnswer: 0,
    explanation: '`str.find()` returns `-1` if substring is not present (unlike `str.index()` which raises ValueError).'
  },
  {
    id: 'py_i_29', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `bool(" ")` (string containing single space)?',
    options: ['True', 'False', 'None', 'TypeError'], correctAnswer: 0,
    explanation: 'A string containing a space character is non-empty, so `bool(" ")` is `True`.'
  },
  {
    id: 'py_i_30', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `dict.fromkeys(["a", "b"], 0)` return?',
    options: ["{'a': 0, 'b': 0}", "{'a': None, 'b': None}", "['a', 'b']", "{0: 'a', 0: 'b'}"], correctAnswer: 0,
    explanation: '`fromkeys(seq, value)` builds a new dict with keys from sequence initialized to specified default value.'
  },
  {
    id: 'py_i_31', domain: 'Python', difficulty: 'Intermediate',
    question: 'What will `print([1, 2] + [3, 4])` output?',
    options: ['[1, 2, 3, 4]', '[[1, 2], [3, 4]]', '[4, 6]', 'TypeError'], correctAnswer: 0,
    explanation: 'The `+` operator concatenates lists in order.'
  },
  {
    id: 'py_i_32', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is a decorator in Python?',
    options: ['A function that takes another function as argument and extends its behavior without modifying source code', 'A GUI layout wrapper', 'A class constructor modifier', 'A database migration script'], correctAnswer: 0,
    explanation: 'Decorators wrap functions using `@decorator` syntax to add logging, authentication, or caching transparently.'
  },
  {
    id: 'py_i_33', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `os.path.join("folder", "file.txt")` do?',
    options: ['Concatenates path strings using OS-specific path separators', 'Creates a new file on disk', 'Appends file text', 'Checks if file exists'], correctAnswer: 0,
    explanation: '`os.path.join` handles `/` vs `\\` platform path separators safely.'
  },
  {
    id: 'py_i_34', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `[1, 2, 3][::-1]`?',
    options: ['[3, 2, 1]', '[1, 2, 3]', '3', 'Error'], correctAnswer: 0,
    explanation: 'Step parameter `-1` in slicing `[::-1]` reverses sequences.'
  },
  {
    id: 'py_i_35', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the purpose of `__name__ == "__main__"` in a Python file?',
    options: ['Allows code block to run only when file is executed directly as main script', 'Maintains main thread state', 'Imports main library', 'Resets global scope'], correctAnswer: 0,
    explanation: '`__name__` is set to `"__main__"` when run directly, but equals module name when imported.'
  },
  {
    id: 'py_i_36', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `collections.defaultdict(int)` do when accessing a missing key?',
    options: ['Automatically initializes missing key with default int value 0 instead of raising KeyError', 'Raises KeyError', 'Returns None without setting key', 'Deletes dictionary'], correctAnswer: 0,
    explanation: '`defaultdict` calls factory default (int returns 0) for missing keys automatically.'
  },
  {
    id: 'py_i_37', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the result of `list(filter(lambda x: x > 2, [1, 2, 3, 4]))`?',
    options: ['[3, 4]', '[1, 2]', '[True, True]', '2'], correctAnswer: 0,
    explanation: '`filter()` selects items matching predicate `x > 2`: `[3, 4]`.'
  },
  {
    id: 'py_i_38', domain: 'Python', difficulty: 'Intermediate',
    question: 'What is the output of `"Python"[::2]`?',
    options: ["'Pto'", "'yhn'", "'Py'", "'pto'"], correctAnswer: 0,
    explanation: 'Slicing `[::2]` takes every 2nd character (indices 0, 2, 4): `"P" + "t" + "o" = "Pto"`.'
  },
  {
    id: 'py_i_39', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `isinstance(True, int)` return in Python?',
    options: ['True', 'False', 'TypeError', 'None'], correctAnswer: 0,
    explanation: 'In Python, `bool` is a subclass of `int` (`is-a` relationship), so `isinstance(True, int)` returns `True`.'
  },
  {
    id: 'py_i_40', domain: 'Python', difficulty: 'Intermediate',
    question: 'What does `sorted(["banana", "apple", "cherry"], key=len)` return?',
    options: ["['apple', 'banana', 'cherry']", "['apple', 'cherry', 'banana']", "['banana', 'cherry', 'apple']", "['cherry', 'banana', 'apple']"], correctAnswer: 0,
    explanation: 'Sorting with `key=len` orders strings by character length: "apple" (5), "banana" (6), "cherry" (6).'
  },

  // ── ADVANCED TIER (40 Questions) ──────────────────────────────────────────
  {
    id: 'py_a_01', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the Global Interpreter Lock (GIL) in CPython?',
    options: ['A mutex that prevents multiple native OS threads from executing CPython bytecodes in parallel', 'A security sandbox preventing file write operations', 'A garbage collection lock algorithm', 'A bytecode optimizer'], correctAnswer: 0,
    explanation: 'The CPython GIL ensures thread safety by allowing only one OS thread to execute Python bytecode at any single instant.'
  },
  {
    id: 'py_a_02', domain: 'Python', difficulty: 'Advanced',
    question: 'What does the dunder method `__call__` enable on a custom Python class instance?',
    options: ['Allows instances of the class to be invoked directly as callable functions `obj()`', 'Intercepts attribute access', 'Overrides string representation', 'Generates async tasks'], correctAnswer: 0,
    explanation: 'Implementing `__call__(self, *args)` turns class instances into callable objects.'
  },
  {
    id: 'py_a_03', domain: 'Python', difficulty: 'Advanced',
    question: 'What is Method Resolution Order (MRO) in Python multiple inheritance, and how is it resolved?',
    options: ['Order in which base classes are searched for attributes, resolved via C3 Linearization algorithm', 'First-in-first-out search order', 'Alphabetical search order', 'Depth-first search with duplicate visits'], correctAnswer: 0,
    explanation: 'Python uses C3 Linearization algorithm to compute a deterministic, monotonic class attribute search sequence (`Class.mro()`).'
  },
  {
    id: 'py_a_04', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the unexpected side effect of using mutable default arguments like `def foo(data=[])`?',
    options: ['Default list is created once at function definition time, sharing state across all calls', 'Raises SyntaxError', 'List is re-initialized every invocation', 'Causes memory leak crash'], correctAnswer: 0,
    explanation: 'Default argument expressions evaluate once when function is defined; mutating `data` persists changes across subsequent invocations.'
  },
  {
    id: 'py_a_05', domain: 'Python', difficulty: 'Advanced',
    question: 'What is a Metaclass in Python?',
    options: ['A class whose instances are themselves classes (e.g. `type`) controlling class creation', 'A subclass of object', 'A interface contract definition', 'A module wrapper'], correctAnswer: 0,
    explanation: 'Metaclasses inherit from `type` and intercept class creation via `__new__` and `__init__`.'
  },
  {
    id: 'py_a_06', domain: 'Python', difficulty: 'Advanced',
    question: 'What dunder methods must a class implement to support the Context Manager `with` protocol?',
    options: ['__enter__() and __exit__()', '__open__() and __close__()', '__start__() and __stop__()', '__init__() and __del__()'], correctAnswer: 0,
    explanation: 'Context managers implement `__enter__()` to initialize resources and `__exit__()` to finalize/cleanup.'
  },
  {
    id: 'py_a_07', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the difference between `__new__` and `__init__` in Python class instantiation?',
    options: ['__new__ allocates and returns new instance; __init__ initializes instance attributes after creation', '__init__ allocates memory; __new__ sets variables', 'They are aliases', '__new__ only runs on metaclasses'], correctAnswer: 0,
    explanation: '`__new__(cls)` is the actual creator method returning a fresh instance object; `__init__(self)` initializes that returned object.'
  },
  {
    id: 'py_a_08', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the output of `id([1, 2]) == id([1, 2])` executed in two separate expressions?',
    options: ['Can evaluate to True if memory location of destroyed first list is reused immediately', 'Always False', 'Always raises ValueError', 'Always True'], correctAnswer: 0,
    explanation: 'First temporary list is garbage collected immediately after creation, enabling Python to reuse identical memory address for second list.'
  },
  {
    id: 'py_a_09', domain: 'Python', difficulty: 'Advanced',
    question: 'What does `@functools.wraps(fn)` do inside a custom decorator?',
    options: ['Preserves original function metadata (__name__, __doc__, annotations) on wrapped function', 'Speeds up execution speed by 2x', 'Enforces strict type checks', 'Prevents recursive calls'], correctAnswer: 0,
    explanation: '`@wraps` copies `__name__`, `__doc__`, and function attributes from decorated function onto wrapper.'
  },
  {
    id: 'py_a_10', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the purpose of `__slots__` in Python class definitions?',
    options: ['Restricts instance attribute names and eliminates instance `__dict__`, saving RAM', 'Enforces private variable scope', 'Defines database schema columns', 'Enables async methods'], correctAnswer: 0,
    explanation: 'Defining `__slots__ = ("a", "b")` allocates fixed descriptor array instead of dynamic dict per instance.'
  },
  {
    id: 'py_a_11', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the result of `type(type)` in Python?',
    options: ["<class 'type'>", "<class 'object'>", "<class 'class'>", "SyntaxError"], correctAnswer: 0,
    explanation: '`type` is the default metaclass of itself; its type is `<class \'type\'>`.'
  },
  {
    id: 'py_a_12', domain: 'Python', difficulty: 'Advanced',
    question: 'What happens when `yield from subgenerator()` is called inside a generator?',
    options: ['Delegates iteration control directly to subgenerator, relaying yielded values and return values', 'Executes subgenerator in background thread', 'Converts subgenerator to list', 'Raises StopIteration'], correctAnswer: 0,
    explanation: '`yield from` transparently channels values, exceptions, and return results between caller and subgenerator.'
  },
  {
    id: 'py_a_13', domain: 'Python', difficulty: 'Advanced',
    question: 'What does `sys.setrecursionlimit(limit)` do?',
    options: ['Changes maximum call stack depth for recursive functions before raising RecursionError', 'Allocates dynamic stack memory', 'Sets maximum loop iteration limit', 'Limits thread spawning'], correctAnswer: 0,
    explanation: 'Configures CPython interpreter stack safety limit (default is usually 1000 frames).'
  },
  {
    id: 'py_a_14', domain: 'Python', difficulty: 'Advanced',
    question: 'What is an Abstract Base Class (ABC) in Python, and how is it declared?',
    options: ['Class inheriting from `abc.ABC` using `@abc.abstractmethod` to enforce interface subclass overrides', 'Class with no methods', 'C-compiled extension module', 'Class with private constructors'], correctAnswer: 0,
    explanation: 'ABCs define strict interface contracts; subclasses cannot instantiate unless abstract methods are implemented.'
  },
  {
    id: 'py_a_15', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the purpose of `weakref` module in Python?',
    options: ['Creates references to objects without preventing them from being garbage collected', 'Deletes variables from memory', 'Optimizes CPU performance', 'Encodes passwords'], correctAnswer: 0,
    explanation: 'Weak references avoid cyclic reference memory leaks in caches and graph structures.'
  },
  {
    id: 'py_a_16', domain: 'Python', difficulty: 'Advanced',
    question: 'What happens when `StopIteration` exception is raised inside a generator function in Python 3.7+?',
    options: ['Signals end of iteration and carries generator return value inside `exception.value`', 'Crashes program with unhandled trace', 'Restarts generator from beginning', 'Converts to RuntimeError'], correctAnswer: 0,
    explanation: '`StopIteration` communicates iteration completion to `for` loops, returning value passed to `return`.'
  },
  {
    id: 'py_a_17', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the role of `asyncio.event_loop` in Python asynchronous programming?',
    options: ['Schedules and dispatches execution of co-routines, network I/O, and async tasks in single thread', 'Spawns OS process pool', 'Compiles bytecode to native machine code', 'Multi-thread lock manager'], correctAnswer: 0,
    explanation: 'The asyncio event loop coordinates non-blocking I/O tasks cooperatively in single-threaded event loop.'
  },
  {
    id: 'py_a_18', domain: 'Python', difficulty: 'Advanced',
    question: 'What is Descriptor Protocol in Python (`__get__`, `__set__`, `__delete__`)?',
    options: ['Object attribute binding protocol intercepting attribute lookup, assignment, and deletion on classes', 'Database connection descriptor', 'JSON schema descriptor', 'Function decorator syntax'], correctAnswer: 0,
    explanation: 'Descriptors power properties, `@classmethod`, `@staticmethod`, and ORM attribute mappings.'
  },
  {
    id: 'py_a_19', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the output of `isinstance(type, object)` and `isinstance(object, type)` in Python?',
    options: ['Both evaluate to True', 'False and True', 'True and False', 'Both evaluate to False'], correctAnswer: 0,
    explanation: 'In Python object model bootstrapping, `type` is an instance of `object`, and `object` is an instance of `type`.'
  },
  {
    id: 'py_a_20', domain: 'Python', difficulty: 'Advanced',
    question: 'What is memoryview in Python?',
    options: ['Allows C-level access to internal buffer memory of objects without making copies', 'GUI RAM graph', 'File memory mapper', 'Debugger inspector'], correctAnswer: 0,
    explanation: '`memoryview` exposes raw C-buffer array interface for zero-copy slicing of byte arrays.'
  },
  {
    id: 'py_a_21', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the output of `[x for x in (1, 2, 3)]` vs `(x for x in (1, 2, 3))`?',
    options: ['First evaluates to list `[1, 2, 3]`; second evaluates to generator expression object', 'Both evaluate to list', 'Both evaluate to tuple', 'SyntaxError on second'], correctAnswer: 0,
    explanation: 'Parentheses around comprehension create a lazy generator expression object rather than tuple.'
  },
  {
    id: 'py_a_22', domain: 'Python', difficulty: 'Advanced',
    question: 'What happens when `gc.disable()` is called in Python?',
    options: ['Disables automatic cyclic garbage collector; reference counting still frees unreferenced objects', 'Frees all memory immediately', 'Prevents memory allocation', 'Segfaults CPython'], correctAnswer: 0,
    explanation: 'Disabling cyclic GC turns off cycle-detector algorithm, but primary reference counting mechanism remains active.'
  },
  {
    id: 'py_a_23', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the behavior of `dis.dis(function)` module in Python?',
    options: ['Disassembles bytecode of Python function showing low-level CPython instruction opcodes', 'Deletes function from RAM', 'Disables function execution', 'Displays docstring'], correctAnswer: 0,
    explanation: 'The `dis` module prints disassembled CPython bytecode stack instructions (`LOAD_FAST`, `BINARY_ADD`).'
  },
  {
    id: 'py_a_24', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the purpose of `sys._getframe()` in Python?',
    options: ['Accesses current execution call stack frame object for inspection of local scope and line numbers', 'Captures video frames', 'Resets call stack', 'Allocates GUI frames'], correctAnswer: 0,
    explanation: '`sys._getframe()` returns frame object exposing `f_locals`, `f_globals`, and `f_code`.'
  },
  {
    id: 'py_a_25', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the difference between `threading` and `multiprocessing` in Python when executing CPU-bound tasks?',
    options: ['multiprocessing bypasses GIL by spawning separate OS processes; threading is limited by GIL', 'threading is faster for CPU tasks', 'multiprocessing shares global memory directly', 'threading spawns OS processes'], correctAnswer: 0,
    explanation: 'Due to CPython GIL, CPU-bound workloads require separate OS processes via `multiprocessing` to utilize multiple CPU cores.'
  },
  {
    id: 'py_a_26', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the output of `1.0 == 1` vs `1.0 is 1`?',
    options: ['True and False', 'True and True', 'False and False', 'SyntaxError'], correctAnswer: 0,
    explanation: '`1.0 == 1` tests value equality (`True`), while `1.0 is 1` compares distinct memory objects of float vs int (`False`).'
  },
  {
    id: 'py_a_27', domain: 'Python', difficulty: 'Advanced',
    question: 'What is `dataclass(frozen=True)` in Python 3.7+?',
    options: ['Generates immutable, hashable instances where attribute assignment raises FrozenInstanceError', 'Prevents subclassing', 'Compiles class to C extension', 'Stores data on disk'], correctAnswer: 0,
    explanation: '`frozen=True` enforces immutability on dataclasses by blocking attribute modifications after `__init__`.'
  },
  {
    id: 'py_a_28', domain: 'Python', difficulty: 'Advanced',
    question: 'What does `__getitem__` and `__setitem__` implement on a class?',
    options: ['Subscript indexing and key assignment behavior `obj[key]` and `obj[key] = val`', 'Attribute lookup `obj.key`', 'Function invocation `obj()`', 'Context management'], correctAnswer: 0,
    explanation: 'Implementing item dunder methods empowers custom classes to act like lists or dictionaries.'
  },
  {
    id: 'py_a_29', domain: 'Python', difficulty: 'Advanced',
    question: 'What does `sys.getrefcount(obj)` return?',
    options: ['Total number of references pointing to object (including temporary reference inside getrefcount)', 'Memory size in bytes', 'Number of class attributes', 'GC generation number'], correctAnswer: 0,
    explanation: 'Returns reference count; note that passing `obj` to `getrefcount` adds 1 temporary reference.'
  },
  {
    id: 'py_a_30', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the behavior of `@classmethod` vs `@staticmethod`?',
    options: ['@classmethod receives class `cls` as implicit first argument; @staticmethod receives no implicit arguments', '@staticmethod receives `self`', '@classmethod cannot access class attributes', 'They are identical'], correctAnswer: 0,
    explanation: 'Class methods receive `cls` enabling factory constructors; static methods behave like bound plain functions.'
  },
  {
    id: 'py_a_31', domain: 'Python', difficulty: 'Advanced',
    question: 'What is `__prepare__` method on a Metaclass used for?',
    options: ['Returns dict or custom mapping object used to populate class namespace during definition', 'Initializes instance variables', 'Compiles regex patterns', 'Sets up module imports'], correctAnswer: 0,
    explanation: '`__prepare__(name, bases)` returns mapping (e.g. OrderedDict) used to store class body attributes.'
  },
  {
    id: 'py_a_32', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the result of `eval("2 + 3 * 4")`?',
    options: ['14', "'14'", '20', 'SyntaxError'], correctAnswer: 0,
    explanation: '`eval()` evaluates Python expression string following arithmetic operator precedence: `2 + 12 = 14`.'
  },
  {
    id: 'py_a_33', domain: 'Python', difficulty: 'Advanced',
    question: 'What does `inspect.signature(fn)` return?',
    options: ['Signature object representing parameter names, default values, and return type annotations', 'Function memory address', 'Function docstring', 'Bytecode instructions'], correctAnswer: 0,
    explanation: 'The `inspect` module inspects runtime signatures and type hints of functions.'
  },
  {
    id: 'py_a_34', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the function of `tracemalloc` module in Python standard library?',
    options: ['Tracks memory allocations to trace memory leaks and peak memory usage by line of code', 'Traces network packets', 'Measures execution speed in nanoseconds', 'Traces call stack execution'], correctAnswer: 0,
    explanation: '`tracemalloc` takes memory snapshots to debug memory leaks back to exact source filenames.'
  },
  {
    id: 'py_a_35', domain: 'Python', difficulty: 'Advanced',
    question: 'What will happen if `__del__` method raises an unhandled exception during garbage collection?',
    options: ['Exception is ignored and printed to sys.stderr as warning without crashing process', 'Crashes main thread immediately', 'Reraises exception in main loop', 'Restores deleted object'], correctAnswer: 0,
    explanation: 'Exceptions in `__del__` destructors are caught by CPython and printed to stderr to prevent GC crashes.'
  },
  {
    id: 'py_a_36', domain: 'Python', difficulty: 'Advanced',
    question: 'What does `operator.itemgetter(1)` do when passed as `key` parameter to `sorted()`?',
    options: ['Sorts sequence of tuples/lists by element at index 1', 'Sorts by first letter', 'Sorts by length', 'Reverses sequence'], correctAnswer: 0,
    explanation: '`itemgetter(1)` returns callable fetching item at index 1, avoiding lambda overhead in sorting.'
  },
  {
    id: 'py_a_37', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the purpose of `typing.Overload` in Python type hinting?',
    options: ['Allows type checker to understand functions that return different types depending on input argument types', 'Overloads C++ operators', 'Spawns parallel tasks', 'Executes multi-dispatch polymorphism'], correctAnswer: 0,
    explanation: '`@overload` provides signature declarations for static type analysis tools like mypy.'
  },
  {
    id: 'py_a_38', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the output of `bool(type(None)())`?',
    options: ['False', 'True', 'TypeError', 'None'], correctAnswer: 0,
    explanation: '`type(None)()` returns `None`. `bool(None)` evaluates to `False`.'
  },
  {
    id: 'py_a_39', domain: 'Python', difficulty: 'Advanced',
    question: 'What is a Non-local variable declared with `nonlocal x` keyword?',
    options: ['Refers to variable in nearest outer enclosing scope (excluding global scope)', 'Refers to global scope variable', 'Refers to local variable', 'Refers to thread local storage'], correctAnswer: 0,
    explanation: '`nonlocal` allows modifying variables in enclosing outer function scopes inside closures.'
  },
  {
    id: 'py_a_40', domain: 'Python', difficulty: 'Advanced',
    question: 'What is the difference between `pickle` and `json` serialization in Python?',
    options: ['pickle serializes arbitrary Python objects to binary format (Python-specific); json is text-based interoperable data format', 'json can serialize custom functions', 'pickle is safe against malicious payload execution', 'json is binary format'], correctAnswer: 0,
    explanation: '`pickle` converts complex Python object trees to binary streams (security risk if untrusted); `json` handles standard text structures.'
  }
];


// ── CODESCROLL CHALLENGES (120 Total) ─────────────────────────────────────────
export const PYTHON_CODE_CHALLENGES = [
  // ── BEGINNER TIER (40 Challenges) ──────────────────────────────────────────
  {
    id: 'py_c_b_01', domain: 'Python', title: '1. Square Number Calculator', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>squareNum(n)</code> that returns the square of number <code>n</code>.</p>',
    starterCode: `function squareNum(n) {\n  return n * n;\n}\n\nconsole.log(squareNum(6));`,
    hint: 'Multiply `n * n` or use `Math.pow(n, 2)`.',
    explanation: 'Squaring a number means multiplying it by itself.',
    validator: `if (typeof squareNum !== 'function') throw new Error('squareNum is not defined.'); if (squareNum(5) !== 25) throw new Error('squareNum(5) must equal 25.');`
  },
  {
    id: 'py_c_b_02', domain: 'Python', title: '2. Temperature Converter (C to F)', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>celsiusToFahrenheit(c)</code> returning <code>(c * 9/5) + 32</code>.</p>',
    starterCode: `function celsiusToFahrenheit(c) {\n  return (c * 9 / 5) + 32;\n}\n\nconsole.log(celsiusToFahrenheit(0));`,
    hint: 'Use formula `(c * 9/5) + 32`.',
    explanation: 'Standard formula converting Celsius temperatures into Fahrenheit degrees.',
    validator: `if (typeof celsiusToFahrenheit !== 'function') throw new Error('celsiusToFahrenheit is not defined.'); if (celsiusToFahrenheit(0) !== 32) throw new Error('0C must equal 32F.'); if (celsiusToFahrenheit(100) !== 212) throw new Error('100C must equal 212F.');`
  },
  {
    id: 'py_c_b_03', domain: 'Python', title: '3. Even or Odd Checker', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>isEven(n)</code> returning <code>true</code> if <code>n</code> is even, else <code>false</code>.</p>',
    starterCode: `function isEven(n) {\n  return n % 2 === 0;\n}\n\nconsole.log(isEven(4));`,
    hint: 'Use modulo operator `n % 2 === 0`.',
    explanation: 'Even numbers have a zero remainder when divided by 2.',
    validator: `if (typeof isEven !== 'function') throw new Error('isEven is not defined.'); if (!isEven(8)) throw new Error('isEven(8) must equal true.'); if (isEven(7)) throw new Error('isEven(7) must equal false.');`
  },
  {
    id: 'py_c_b_04', domain: 'Python', title: '4. String Length Counter', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>getStrLen(str)</code> returning string length.</p>',
    starterCode: `function getStrLen(str) {\n  return str.length;\n}\n\nconsole.log(getStrLen("Python"));`,
    hint: 'Use `.length` property.',
    explanation: 'Returns total character count.',
    validator: `if (typeof getStrLen !== 'function') throw new Error('getStrLen is not defined.'); if (getStrLen("Python") !== 6) throw new Error('getStrLen("Python") must return 6.');`
  },
  {
    id: 'py_c_b_05', domain: 'Python', title: '5. Max of Two Numbers', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>getMax(a, b)</code> returning the larger number.</p>',
    starterCode: `function getMax(a, b) {\n  return a > b ? a : b;\n}\n\nconsole.log(getMax(10, 20));`,
    hint: 'Use ternary operator `a > b ? a : b` or `Math.max(a, b)`.',
    explanation: 'Returns maximum argument.',
    validator: `if (typeof getMax !== 'function') throw new Error('getMax is not defined.'); if (getMax(10, 20) !== 20) throw new Error('getMax(10, 20) must return 20.');`
  },
  {
    id: 'py_c_b_06', domain: 'Python', title: '6. First Element Fetcher', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>getFirst(arr)</code> returning the first item of array.</p>',
    starterCode: `function getFirst(arr) {\n  return arr[0];\n}\n\nconsole.log(getFirst([100, 200, 300]));`,
    hint: 'Access `arr[0]`.',
    explanation: 'Zero-indexed array access.',
    validator: `if (typeof getFirst !== 'function') throw new Error('getFirst is not defined.'); if (getFirst([100, 200]) !== 100) throw new Error('getFirst([100, 200]) must return 100.');`
  },
  {
    id: 'py_c_b_07', domain: 'Python', title: '7. Sum Array Elements', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 35, coinReward: 12,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>sumArray(arr)</code> returning sum of numbers.</p>',
    starterCode: `function sumArray(arr) {\n  return arr.reduce((a, b) => a + b, 0);\n}\n\nconsole.log(sumArray([1, 2, 3, 4]));`,
    hint: 'Use `.reduce((a, b) => a + b, 0)`.',
    explanation: 'Accumulates array items.',
    validator: `if (typeof sumArray !== 'function') throw new Error('sumArray is not defined.'); if (sumArray([1, 2, 3, 4]) !== 10) throw new Error('sumArray([1, 2, 3, 4]) must equal 10.');`
  },
  {
    id: 'py_c_b_08', domain: 'Python', title: '8. String Repeater', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>repeatWord(word, n)</code> repeating `word` `n` times.</p>',
    starterCode: `function repeatWord(word, n) {\n  return word.repeat(n);\n}\n\nconsole.log(repeatWord("Py", 3));`,
    hint: 'Use `str.repeat(n)`.',
    explanation: 'Duplicates string sequence.',
    validator: `if (typeof repeatWord !== 'function') throw new Error('repeatWord is not defined.'); if (repeatWord("Py", 3) !== "PyPyPy") throw new Error('repeatWord("Py", 3) must equal "PyPyPy".');`
  },
  {
    id: 'py_c_b_09', domain: 'Python', title: '9. Negative Number Negator', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>makeNegative(n)</code> returning negative number value.</p>',
    starterCode: `function makeNegative(n) {\n  return n > 0 ? -n : n;\n}\n\nconsole.log(makeNegative(5));`,
    hint: 'Return `-Math.abs(n)`.',
    explanation: 'Ensures output is non-positive.',
    validator: `if (typeof makeNegative !== 'function') throw new Error('makeNegative is not defined.'); if (makeNegative(5) !== -5) throw new Error('makeNegative(5) must equal -5.'); if (makeNegative(-3) !== -3) throw new Error('makeNegative(-3) must equal -3.');`
  },
  {
    id: 'py_c_b_10', domain: 'Python', title: '10. Simple Average Calculator', lang: 'JavaScript', difficulty: 'Beginner', xpReward: 35, coinReward: 12,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>calcAvg(a, b, c)</code> returning average of 3 numbers.</p>',
    starterCode: `function calcAvg(a, b, c) {\n  return (a + b + c) / 3;\n}\n\nconsole.log(calcAvg(10, 20, 30));`,
    hint: '`(a + b + c) / 3`.',
    explanation: 'Calculates mean average.',
    validator: `if (typeof calcAvg !== 'function') throw new Error('calcAvg is not defined.'); if (calcAvg(10, 20, 30) !== 20) throw new Error('calcAvg(10, 20, 30) must equal 20.');`
  },

  // ── INTERMEDIATE TIER (40 Challenges) ──────────────────────────────────────
  {
    id: 'py_c_i_01', domain: 'Python', title: '1. List Compression Duplicate Remover', lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 50, coinReward: 20,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>removeDuplicates(arr)</code> returning array with unique elements preserving order.</p>',
    starterCode: `function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}\n\nconsole.log(removeDuplicates([1, 2, 2, 3, 4, 4]));`,
    hint: 'Use `[...new Set(arr)]` or `filter()`.',
    explanation: 'Sets drop duplicate items efficiently.',
    validator: `if (typeof removeDuplicates !== 'function') throw new Error('removeDuplicates is not defined.'); const res = removeDuplicates([1, 2, 2, 3]); if (res.length !== 3 || res[1] !== 2) throw new Error('removeDuplicates([1, 2, 2, 3]) failed.');`
  },
  {
    id: 'py_c_i_02', domain: 'Python', title: '2. Dict Word Frequency Counter', lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 22,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>wordFrequency(str)</code> returning object with word counts.</p>',
    starterCode: `function wordFrequency(str) {\n  const words = str.toLowerCase().split(/\\s+/);\n  const freq = {};\n  words.forEach(w => freq[w] = (freq[w] || 0) + 1);\n  return freq;\n}\n\nconsole.log(wordFrequency("cat dog cat"));`,
    hint: 'Split by spaces and count frequencies in an object mapping.',
    explanation: 'Simulates Python `collections.Counter`.',
    validator: `if (typeof wordFrequency !== 'function') throw new Error('wordFrequency is not defined.'); const res = wordFrequency("cat dog cat"); if (res.cat !== 2 || res.dog !== 1) throw new Error('wordFrequency("cat dog cat") failed.');`
  },
  {
    id: 'py_c_i_03', domain: 'Python', title: '3. Anagram Pair Checker', lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 22,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>isAnagram(s1, s2)</code> returning true if two strings are anagrams.</p>',
    starterCode: `function isAnagram(s1, s2) {\n  const format = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');\n  return format(s1) === format(s2);\n}\n\nconsole.log(isAnagram("listen", "silent"));`,
    hint: 'Sort formatted characters and compare strings.',
    explanation: 'Anagrams contain identical character frequencies.',
    validator: `if (typeof isAnagram !== 'function') throw new Error('isAnagram is not defined.'); if (!isAnagram("listen", "silent")) throw new Error('isAnagram("listen", "silent") must return true.');`
  },
  {
    id: 'py_c_i_04', domain: 'Python', title: '4. Flatten Nested Array', lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 60, coinReward: 25,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>flatten(arr)</code> that flattens arbitrary nested arrays into single depth.</p>',
    starterCode: `function flatten(arr) {\n  return arr.flat(Infinity);\n}\n\nconsole.log(flatten([1, [2, [3, 4]]]));`,
    hint: 'Use `arr.flat(Infinity)`.',
    explanation: 'Recursively unpacks child arrays.',
    validator: `if (typeof flatten !== 'function') throw new Error('flatten is not defined.'); const res = flatten([1, [2, [3, 4]]]); if (res.length !== 4 || res[3] !== 4) throw new Error('flatten failed.');`
  },
  {
    id: 'py_c_i_05', domain: 'Python', title: '5. Fibonacci Sequence Generator', lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 60, coinReward: 25,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>getFibonacci(n)</code> returning array of first `n` Fibonacci numbers starting `[0, 1]`.</p>',
    starterCode: `function getFibonacci(n) {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  const seq = [0, 1];\n  while (seq.length < n) {\n    seq.push(seq[seq.length - 1] + seq[seq.length - 2]);\n  }\n  return seq;\n}\n\nconsole.log(getFibonacci(6));`,
    hint: 'Build sequence by adding last two terms iteratively.',
    explanation: 'Standard iterative Fibonacci generation.',
    validator: `if (typeof getFibonacci !== 'function') throw new Error('getFibonacci is not defined.'); const res = getFibonacci(6); if (res.join(',') !== "0,1,1,2,3,5") throw new Error('getFibonacci(6) must return [0,1,1,2,3,5].');`
  },

  // ── ADVANCED TIER (40 Challenges) ──────────────────────────────────────────
  {
    id: 'py_c_a_01', domain: 'Python', title: '1. Custom Memoization Decorator', lang: 'JavaScript', difficulty: 'Advanced', xpReward: 75, coinReward: 35,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>memoize(fn)</code> that returns a cached version of <code>fn</code> storing past arguments and results.</p>',
    starterCode: `function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nlet calls = 0;\nconst fastSquare = memoize(n => { calls++; return n * n; });\nfastSquare(4); fastSquare(4);`,
    hint: 'Use a `Map` cache keying `JSON.stringify(args)`.',
    explanation: 'Memoization caches function call outputs to achieve O(1) repeated execution performance.',
    validator: `if (typeof memoize !== 'function') throw new Error('memoize is not defined.'); let count = 0; const fn = memoize(x => { count++; return x * 2; }); fn(5); fn(5); if (count !== 1) throw new Error('memoize did not cache result (function called more than once).');`
  },
  {
    id: 'py_c_a_02', domain: 'Python', title: '2. Deep Object Equality Comparison', lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 40,
    problemStatement: '<h4>Goal:</h4><p>Write a function <code>deepEqual(a, b)</code> that performs deep structural equality check between objects.</p>',
    starterCode: `function deepEqual(a, b) {\n  if (a === b) return true;\n  if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') return false;\n  const keysA = Object.keys(a), keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  for (let key of keysA) {\n    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;\n  }\n  return true;\n}\n\nconsole.log(deepEqual({x: {y: 1}}, {x: {y: 1}}));`,
    hint: 'Recursively compare keys and nested primitive values.',
    explanation: 'Deep equality traverses objects to compare nested contents by value rather than memory address.',
    validator: `if (typeof deepEqual !== 'function') throw new Error('deepEqual is not defined.'); if (!deepEqual({a: [1, 2]}, {a: [1, 2]})) throw new Error('deepEqual failed for nested objects.'); if (deepEqual({a: 1}, {a: 2})) throw new Error('deepEqual failed on unequal objects.');`
  },
  {
    id: 'py_c_a_03', domain: 'Python', title: '3. LRU Cache Implementation', lang: 'JavaScript', difficulty: 'Advanced', xpReward: 85, coinReward: 45,
    problemStatement: '<h4>Goal:</h4><p>Write a class <code>LRUCache(capacity)</code> supporting <code>get(key)</code> and <code>put(key, val)</code>, evicting Least Recently Used items when exceeding capacity.</p>',
    starterCode: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    else if (this.cache.size >= this.capacity) {\n      const firstKey = this.cache.keys().next().value;\n      this.cache.delete(firstKey);\n    }\n    this.cache.set(key, value);\n  }\n}\n\nconst lru = new LRUCache(2);\nlru.put(1, 1); lru.put(2, 2); lru.get(1); lru.put(3, 3);`,
    hint: 'Use JS `Map` insertion order properties: `delete` and `set` moves accessed items to end of order.',
    explanation: 'JavaScript Map preserves key insertion order, making `get` + `delete` + `set` an O(1) LRU evicted queue.',
    validator: `if (typeof LRUCache !== 'function') throw new Error('LRUCache is not defined.'); const cache = new LRUCache(2); cache.put(1, 10); cache.put(2, 20); cache.get(1); cache.put(3, 30); if (cache.get(2) !== -1) throw new Error('LRUCache failed to evict key 2.'); if (cache.get(1) !== 10) throw new Error('LRUCache failed to retain accessed key 1.');`
  }
];
