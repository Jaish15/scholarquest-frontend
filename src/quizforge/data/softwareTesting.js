/* QuizForge Question Bank — software_testing_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "Software Testing",
  "questions": [
    {
      "id": "st-beg-001",
      "difficulty": "Beginner",
      "question": "What is the primary goal of software testing?",
      "options": [
        "To write more code",
        "To identify defects and verify the software meets requirements",
        "To design the UI",
        "To deploy the application"
      ],
      "correctAnswer": "To identify defects and verify the software meets requirements"
    },
    {
      "id": "st-beg-002",
      "difficulty": "Beginner",
      "question": "What is unit testing?",
      "options": [
        "Testing the entire system at once",
        "Testing individual components or functions in isolation",
        "Testing only the user interface",
        "Testing deployment scripts"
      ],
      "correctAnswer": "Testing individual components or functions in isolation"
    },
    {
      "id": "st-beg-003",
      "difficulty": "Beginner",
      "question": "What does 'black box testing' mean?",
      "options": [
        "Testing with full knowledge of internal code",
        "Testing without knowledge of internal implementation, based on inputs/outputs",
        "Testing only error scenarios",
        "Testing hardware components"
      ],
      "correctAnswer": "Testing without knowledge of internal implementation, based on inputs/outputs"
    },
    {
      "id": "st-beg-004",
      "difficulty": "Beginner",
      "question": "What is a test case?",
      "options": [
        "A bug report",
        "A set of conditions and steps to verify a specific functionality",
        "A programming language feature",
        "A deployment configuration"
      ],
      "correctAnswer": "A set of conditions and steps to verify a specific functionality"
    },
    {
      "id": "st-beg-005",
      "difficulty": "Beginner",
      "question": "What is regression testing used for?",
      "options": [
        "Testing new features only",
        "Ensuring existing functionality still works after changes are made",
        "Testing database performance",
        "Testing only the login page"
      ],
      "correctAnswer": "Ensuring existing functionality still works after changes are made"
    },
    {
      "id": "st-beg-006",
      "difficulty": "Beginner",
      "question": "What is the difference between verification and validation?",
      "options": [
        "No difference",
        "Verification checks 'are we building the product right', validation checks 'are we building the right product'",
        "Validation happens before coding, verification after",
        "They both mean the same as debugging"
      ],
      "correctAnswer": "Verification checks 'are we building the product right', validation checks 'are we building the right product'"
    },
    {
      "id": "st-beg-007",
      "difficulty": "Beginner",
      "question": "What is a bug/defect in software testing terms?",
      "options": [
        "A feature request",
        "A deviation between expected and actual behavior",
        "A type of test case",
        "A deployment tool"
      ],
      "correctAnswer": "A deviation between expected and actual behavior"
    },
    {
      "id": "st-beg-008",
      "difficulty": "Beginner",
      "question": "What is smoke testing?",
      "options": [
        "Testing for hardware overheating",
        "A preliminary test to check if the basic/critical functions work before deeper testing",
        "Testing performance under heavy load",
        "Testing only the database"
      ],
      "correctAnswer": "A preliminary test to check if the basic/critical functions work before deeper testing"
    },
    {
      "id": "st-beg-009",
      "difficulty": "Beginner",
      "question": "What does 'white box testing' focus on?",
      "options": [
        "Only the user interface",
        "Internal structure, code paths, and logic of the application",
        "Only performance metrics",
        "Hardware compatibility"
      ],
      "correctAnswer": "Internal structure, code paths, and logic of the application"
    },
    {
      "id": "st-int-001",
      "difficulty": "Intermediate",
      "question": "What is the purpose of Test-Driven Development (TDD)?",
      "options": [
        "Writing tests after the entire application is built",
        "Writing tests before writing the implementation code",
        "Skipping testing to save time",
        "Testing only in production"
      ],
      "correctAnswer": "Writing tests before writing the implementation code"
    },
    {
      "id": "st-int-002",
      "difficulty": "Intermediate",
      "question": "What is a mock object used for in testing?",
      "options": [
        "To simulate the behavior of real dependencies in isolated tests",
        "To replace the entire test suite",
        "To generate random test data only",
        "To deploy code to production"
      ],
      "correctAnswer": "To simulate the behavior of real dependencies in isolated tests"
    },
    {
      "id": "st-int-003",
      "difficulty": "Intermediate",
      "question": "What does code coverage measure?",
      "options": [
        "How many bugs exist in the code",
        "The percentage of code executed during testing",
        "How fast the tests run",
        "The number of developers on a project"
      ],
      "correctAnswer": "The percentage of code executed during testing"
    },
    {
      "id": "st-int-004",
      "difficulty": "Intermediate",
      "question": "What is the difference between integration testing and system testing?",
      "options": [
        "No difference",
        "Integration testing checks interactions between combined modules; system testing validates the complete, integrated system",
        "System testing happens before integration testing",
        "Integration testing only applies to databases"
      ],
      "correctAnswer": "Integration testing checks interactions between combined modules; system testing validates the complete, integrated system"
    },
    {
      "id": "st-int-005",
      "difficulty": "Intermediate",
      "question": "What is boundary value analysis?",
      "options": [
        "Testing only the middle range of input values",
        "A technique focusing on testing values at the edges of valid input ranges",
        "Testing database boundaries only",
        "A UI design principle"
      ],
      "correctAnswer": "A technique focusing on testing values at the edges of valid input ranges"
    },
    {
      "id": "st-int-006",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a CI/CD pipeline in relation to testing?",
      "options": [
        "To eliminate the need for testing",
        "To automatically run tests as part of the build and deployment process",
        "To manually test each release",
        "To replace unit tests with manual tests"
      ],
      "correctAnswer": "To automatically run tests as part of the build and deployment process"
    },
    {
      "id": "st-int-007",
      "difficulty": "Intermediate",
      "question": "What does 'flaky test' mean?",
      "options": [
        "A test that always fails",
        "A test that passes and fails intermittently without code changes",
        "A test written in an unsupported language",
        "A test with too many assertions"
      ],
      "correctAnswer": "A test that passes and fails intermittently without code changes"
    },
    {
      "id": "st-adv-001",
      "difficulty": "Advanced",
      "question": "What is mutation testing used to evaluate?",
      "options": [
        "Database schema changes",
        "The effectiveness/quality of an existing test suite by introducing small code changes (mutants)",
        "Network latency",
        "UI responsiveness"
      ],
      "correctAnswer": "The effectiveness/quality of an existing test suite by introducing small code changes (mutants)"
    },
    {
      "id": "st-adv-002",
      "difficulty": "Advanced",
      "question": "What is the difference between stub and mock objects?",
      "options": [
        "No difference",
        "Stubs provide canned answers to calls; mocks additionally verify that specific interactions occurred",
        "Mocks are always faster than stubs",
        "Stubs can't be used in unit tests"
      ],
      "correctAnswer": "Stubs provide canned answers to calls; mocks additionally verify that specific interactions occurred"
    },
    {
      "id": "st-adv-003",
      "difficulty": "Advanced",
      "question": "What is property-based testing?",
      "options": [
        "Testing only UI properties/styles",
        "Generating a wide range of random inputs to verify general properties/invariants hold true",
        "Testing database table properties",
        "A deprecated testing method"
      ],
      "correctAnswer": "Generating a wide range of random inputs to verify general properties/invariants hold true"
    },
    {
      "id": "st-adv-004",
      "difficulty": "Advanced",
      "question": "What does the term 'test pyramid' recommend regarding test distribution?",
      "options": [
        "Equal numbers of unit, integration, and E2E tests",
        "Many unit tests, fewer integration tests, and even fewer end-to-end tests",
        "Mostly end-to-end tests with minimal unit tests",
        "Only manual testing at every layer"
      ],
      "correctAnswer": "Many unit tests, fewer integration tests, and even fewer end-to-end tests"
    },
    {
      "id": "st-adv-005",
      "difficulty": "Advanced",
      "question": "What is chaos engineering primarily used for?",
      "options": [
        "Randomly deleting production databases without a plan",
        "Deliberately injecting failures into a system to test its resilience under real-world conditions",
        "Writing chaotic, unstructured code",
        "A UI testing framework"
      ],
      "correctAnswer": "Deliberately injecting failures into a system to test its resilience under real-world conditions"
    },
    {
      "id": "st-beg-010",
      "difficulty": "Beginner",
      "question": "What is a test plan?",
      "options": [
        "A single test case",
        "A document describing scope, approach, resources, and schedule of testing activities",
        "A bug tracking tool",
        "The source code being tested"
      ],
      "correctAnswer": "A document describing scope, approach, resources, and schedule of testing activities"
    },
    {
      "id": "st-beg-011",
      "difficulty": "Beginner",
      "question": "What does 'severity' of a bug typically describe?",
      "options": [
        "How urgently it needs to be fixed",
        "The impact/seriousness of the defect on the system's functionality",
        "The programmer who caused it",
        "The date it was found"
      ],
      "correctAnswer": "The impact/seriousness of the defect on the system's functionality"
    },
    {
      "id": "st-beg-012",
      "difficulty": "Beginner",
      "question": "What is exploratory testing?",
      "options": [
        "Testing strictly following a predefined script",
        "Simultaneous learning, test design, and test execution without predefined scripts",
        "Testing only network exploration tools",
        "A type of automated regression suite"
      ],
      "correctAnswer": "Simultaneous learning, test design, and test execution without predefined scripts"
    },
    {
      "id": "st-beg-013",
      "difficulty": "Beginner",
      "question": "What is the purpose of a test environment?",
      "options": [
        "The developer's personal laptop only",
        "A setup of hardware/software configured for executing tests, ideally mirroring production",
        "A version control system",
        "A bug tracking dashboard"
      ],
      "correctAnswer": "A setup of hardware/software configured for executing tests, ideally mirroring production"
    },
    {
      "id": "st-beg-014",
      "difficulty": "Beginner",
      "question": "What does 'priority' of a bug typically describe?",
      "options": [
        "The order in which it should be fixed relative to other issues",
        "The exact line of code affected",
        "The tester's name",
        "The severity level only"
      ],
      "correctAnswer": "The order in which it should be fixed relative to other issues"
    },
    {
      "id": "st-beg-015",
      "difficulty": "Beginner",
      "question": "What is acceptance testing primarily used to verify?",
      "options": [
        "Internal code structure",
        "That the system meets business requirements and is ready for delivery",
        "Only database performance",
        "Compiler warnings"
      ],
      "correctAnswer": "That the system meets business requirements and is ready for delivery"
    },
    {
      "id": "st-beg-016",
      "difficulty": "Beginner",
      "question": "What does 'test data' refer to?",
      "options": [
        "The source code of the application",
        "Input values used to execute test cases and verify expected outcomes",
        "The final production database",
        "A type of bug report"
      ],
      "correctAnswer": "Input values used to execute test cases and verify expected outcomes"
    },
    {
      "id": "st-beg-017",
      "difficulty": "Beginner",
      "question": "What is a defect life cycle?",
      "options": [
        "The stages a bug goes through from being reported to being closed/resolved",
        "The lifespan of a software version",
        "A type of unit test",
        "The time it takes to write test cases"
      ],
      "correctAnswer": "The stages a bug goes through from being reported to being closed/resolved"
    },
    {
      "id": "st-beg-018",
      "difficulty": "Beginner",
      "question": "What does manual testing involve, as opposed to automated testing?",
      "options": [
        "Writing scripts to run tests automatically",
        "A human tester executing test cases without automation tools",
        "Testing only hardware",
        "Testing that requires no test cases"
      ],
      "correctAnswer": "A human tester executing test cases without automation tools"
    },
    {
      "id": "st-beg-019",
      "difficulty": "Beginner",
      "question": "What is the purpose of a bug tracking tool like Jira?",
      "options": [
        "Writing production code",
        "Logging, tracking, and managing the lifecycle of reported defects",
        "Compiling source code",
        "Designing UI mockups"
      ],
      "correctAnswer": "Logging, tracking, and managing the lifecycle of reported defects"
    },
    {
      "id": "st-beg-020",
      "difficulty": "Beginner",
      "question": "What does 'sanity testing' focus on?",
      "options": [
        "Testing the entire application in depth",
        "A quick check that a specific bug fix or feature works, without full regression",
        "Testing UI colors only",
        "Testing hardware sanity"
      ],
      "correctAnswer": "A quick check that a specific bug fix or feature works, without full regression"
    },
    {
      "id": "st-beg-021",
      "difficulty": "Beginner",
      "question": "What is usability testing concerned with?",
      "options": [
        "Database query speed",
        "How easy and intuitive the software is for real users to use",
        "Source code readability",
        "Server uptime"
      ],
      "correctAnswer": "How easy and intuitive the software is for real users to use"
    },
    {
      "id": "st-int-008",
      "difficulty": "Intermediate",
      "question": "What is equivalence partitioning?",
      "options": [
        "Splitting a team into testing partitions",
        "Dividing input data into groups expected to be processed similarly, testing one representative from each",
        "Partitioning a database for performance",
        "Splitting code into microservices"
      ],
      "correctAnswer": "Dividing input data into groups expected to be processed similarly, testing one representative from each"
    },
    {
      "id": "st-int-009",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a test harness?",
      "options": [
        "A physical safety device",
        "A collection of tools and test data configured to run tests against a system systematically",
        "A UI design framework",
        "A version control branch"
      ],
      "correctAnswer": "A collection of tools and test data configured to run tests against a system systematically"
    },
    {
      "id": "st-int-010",
      "difficulty": "Intermediate",
      "question": "What does 'shift-left testing' mean?",
      "options": [
        "Testing only left-aligned UI elements",
        "Moving testing activities earlier in the development lifecycle",
        "Testing only after deployment",
        "A deprecated testing methodology"
      ],
      "correctAnswer": "Moving testing activities earlier in the development lifecycle"
    },
    {
      "id": "st-int-011",
      "difficulty": "Intermediate",
      "question": "What is the difference between load testing and stress testing?",
      "options": [
        "No difference",
        "Load testing checks behavior under expected load; stress testing pushes beyond normal limits to find breaking points",
        "Stress testing only applies to databases",
        "Load testing is always manual"
      ],
      "correctAnswer": "Load testing checks behavior under expected load; stress testing pushes beyond normal limits to find breaking points"
    },
    {
      "id": "st-int-012",
      "difficulty": "Intermediate",
      "question": "What is a test stub used for?",
      "options": [
        "A fully functional replica of a component",
        "A simplified, minimal implementation used to simulate a dependency not yet developed",
        "A performance monitoring tool",
        "A UI design template"
      ],
      "correctAnswer": "A simplified, minimal implementation used to simulate a dependency not yet developed"
    },
    {
      "id": "st-int-013",
      "difficulty": "Intermediate",
      "question": "What does behavior-driven development (BDD) emphasize?",
      "options": [
        "Writing code before any planning",
        "Describing software behavior in a shared, readable language (e.g. Given-When-Then) understood by both technical and non-technical stakeholders",
        "Testing only backend APIs",
        "Skipping documentation entirely"
      ],
      "correctAnswer": "Describing software behavior in a shared, readable language (e.g. Given-When-Then) understood by both technical and non-technical stakeholders"
    },
    {
      "id": "st-int-014",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a traceability matrix?",
      "options": [
        "Tracking server locations",
        "Mapping requirements to test cases to ensure full coverage",
        "Tracking git commit history",
        "Managing database indexes"
      ],
      "correctAnswer": "Mapping requirements to test cases to ensure full coverage"
    },
    {
      "id": "st-int-015",
      "difficulty": "Intermediate",
      "question": "What does 'test isolation' mean in automated testing?",
      "options": [
        "Running all tests on a separate physical machine",
        "Ensuring each test runs independently without side effects from other tests",
        "Disconnecting from the internet during tests",
        "Testing only isolated microservices"
      ],
      "correctAnswer": "Ensuring each test runs independently without side effects from other tests"
    },
    {
      "id": "st-int-016",
      "difficulty": "Intermediate",
      "question": "What is A/B testing typically used for?",
      "options": [
        "Testing two versions of code for syntax errors",
        "Comparing two variants of a feature/UI to see which performs better with real users",
        "Testing alphabetically ordered data",
        "A database backup technique"
      ],
      "correctAnswer": "Comparing two variants of a feature/UI to see which performs better with real users"
    },
    {
      "id": "st-int-017",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a defect density metric?",
      "options": [
        "The number of testers on a project",
        "The number of confirmed defects relative to the size of the software (e.g. per KLOC)",
        "The speed of the test suite",
        "The number of test environments"
      ],
      "correctAnswer": "The number of confirmed defects relative to the size of the software (e.g. per KLOC)"
    },
    {
      "id": "st-int-018",
      "difficulty": "Intermediate",
      "question": "What does 'end-to-end testing' validate?",
      "options": [
        "Only the database layer",
        "The complete flow of an application from start to finish, mimicking real user scenarios",
        "Only unit-level logic",
        "Only the UI's visual appearance"
      ],
      "correctAnswer": "The complete flow of an application from start to finish, mimicking real user scenarios"
    },
    {
      "id": "st-int-019",
      "difficulty": "Intermediate",
      "question": "What is decision table testing used for?",
      "options": [
        "Scheduling test execution",
        "Systematically testing combinations of conditions and their resulting actions",
        "Designing database schemas",
        "Tracking bug severity levels"
      ],
      "correctAnswer": "Systematically testing combinations of conditions and their resulting actions"
    },
    {
      "id": "st-int-020",
      "difficulty": "Intermediate",
      "question": "What does 'test data management' involve?",
      "options": [
        "Writing production code",
        "Creating, maintaining, and provisioning realistic data needed for effective testing",
        "Designing UI wireframes",
        "Managing developer salaries"
      ],
      "correctAnswer": "Creating, maintaining, and provisioning realistic data needed for effective testing"
    },
    {
      "id": "st-adv-006",
      "difficulty": "Advanced",
      "question": "What is contract testing used for in microservices architectures?",
      "options": [
        "Legal agreements between companies",
        "Verifying that services communicating with each other adhere to a shared, agreed-upon API contract",
        "Testing UI contracts only",
        "A type of load testing"
      ],
      "correctAnswer": "Verifying that services communicating with each other adhere to a shared, agreed-upon API contract"
    },
    {
      "id": "st-adv-007",
      "difficulty": "Advanced",
      "question": "What is the purpose of code coverage tools measuring branch coverage specifically?",
      "options": [
        "Counting total lines of code only",
        "Verifying that every possible branch (true/false) of conditional logic has been exercised by tests",
        "Measuring server load",
        "Checking spelling in comments"
      ],
      "correctAnswer": "Verifying that every possible branch (true/false) of conditional logic has been exercised by tests"
    },
    {
      "id": "st-adv-008",
      "difficulty": "Advanced",
      "question": "What is the difference between white-box and gray-box testing?",
      "options": [
        "No difference",
        "Gray-box testing combines partial internal knowledge with external behavior testing, unlike full white-box access",
        "Gray-box testing never involves code",
        "White-box testing ignores internal logic entirely"
      ],
      "correctAnswer": "Gray-box testing combines partial internal knowledge with external behavior testing, unlike full white-box access"
    },
    {
      "id": "st-adv-009",
      "difficulty": "Advanced",
      "question": "What does 'test flakiness quarantine' refer to in CI pipelines?",
      "options": [
        "Deleting flaky tests permanently",
        "Isolating known unreliable tests from the main suite so they don't block builds while being fixed",
        "Running flaky tests more often",
        "A type of security vulnerability"
      ],
      "correctAnswer": "Isolating known unreliable tests from the main suite so they don't block builds while being fixed"
    },
    {
      "id": "st-adv-010",
      "difficulty": "Advanced",
      "question": "What is the purpose of fuzz testing?",
      "options": [
        "Testing only UI blur effects",
        "Feeding invalid, random, or unexpected data to a program to find crashes and vulnerabilities",
        "Testing color contrast",
        "A manual UI review process"
      ],
      "correctAnswer": "Feeding invalid, random, or unexpected data to a program to find crashes and vulnerabilities"
    },
    {
      "id": "st-beg-022",
      "difficulty": "Beginner",
      "question": "What is a test suite?",
      "options": [
        "A single test case",
        "A collection of test cases grouped together for execution",
        "A bug tracking dashboard",
        "A type of test environment"
      ],
      "correctAnswer": "A collection of test cases grouped together for execution"
    },
    {
      "id": "st-beg-023",
      "difficulty": "Beginner",
      "question": "What does 'expected result' mean in a test case?",
      "options": [
        "The actual output the system produced",
        "The outcome the tester predicts should occur if the software works correctly",
        "A random guess",
        "The bug severity level"
      ],
      "correctAnswer": "The outcome the tester predicts should occur if the software works correctly"
    },
    {
      "id": "st-beg-024",
      "difficulty": "Beginner",
      "question": "What is compatibility testing used to verify?",
      "options": [
        "Code readability",
        "That software works correctly across different browsers, devices, or operating systems",
        "Database schema correctness",
        "Team communication"
      ],
      "correctAnswer": "That software works correctly across different browsers, devices, or operating systems"
    },
    {
      "id": "st-beg-025",
      "difficulty": "Beginner",
      "question": "What does 'reproducibility' of a bug mean?",
      "options": [
        "The bug fixes itself over time",
        "The ability to consistently trigger the same defect by following the same steps",
        "The bug only happens once",
        "The bug is undocumented"
      ],
      "correctAnswer": "The ability to consistently trigger the same defect by following the same steps"
    },
    {
      "id": "st-adv-011",
      "difficulty": "Advanced",
      "question": "What is the purpose of test orchestration in a CI/CD pipeline?",
      "options": [
        "Writing test cases automatically",
        "Coordinating the execution order, parallelization, and environment setup of many automated tests",
        "Manually approving every test run",
        "Replacing the need for test cases"
      ],
      "correctAnswer": "Coordinating the execution order, parallelization, and environment setup of many automated tests"
    },
    {
      "id": "st-adv-012",
      "difficulty": "Advanced",
      "question": "What does 'observability' add to a testing/monitoring strategy beyond traditional logging?",
      "options": [
        "Nothing different",
        "The ability to infer internal system state from external outputs like traces, metrics, and logs combined",
        "Only visual UI testing",
        "A replacement for unit tests"
      ],
      "correctAnswer": "The ability to infer internal system state from external outputs like traces, metrics, and logs combined"
    },
    {
      "id": "st-adv-013",
      "difficulty": "Advanced",
      "question": "What is differential testing?",
      "options": [
        "Testing only mathematical differential equations",
        "Comparing outputs of multiple implementations/versions of a system on the same inputs to find discrepancies",
        "A UI color contrast test",
        "Testing database differences only"
      ],
      "correctAnswer": "Comparing outputs of multiple implementations/versions of a system on the same inputs to find discrepancies"
    },
    {
      "id": "st-adv-014",
      "difficulty": "Advanced",
      "question": "What is the purpose of canary testing/deployment?",
      "options": [
        "Testing bird-related hardware",
        "Releasing a change to a small subset of users/servers first to detect issues before full rollout",
        "A type of load testing tool",
        "A database migration technique only"
      ],
      "correctAnswer": "Releasing a change to a small subset of users/servers first to detect issues before full rollout"
    },
    {
      "id": "st-adv-015",
      "difficulty": "Advanced",
      "question": "What does 'test oracle problem' refer to?",
      "options": [
        "A lack of testers available",
        "The difficulty of determining the correct expected output for a given test input, especially in complex systems",
        "A database connectivity issue",
        "A scheduling conflict in test planning"
      ],
      "correctAnswer": "The difficulty of determining the correct expected output for a given test input, especially in complex systems"
    }
  ]
};
export const QUIZFORGE_SOFTWARE_TESTING_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
