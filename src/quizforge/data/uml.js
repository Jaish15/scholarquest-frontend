/* QuizForge Question Bank — uml_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "UML",
  "questions": [
    {
      "id": "uml-beg-001",
      "difficulty": "Beginner",
      "question": "What does UML stand for?",
      "options": [
        "Unified Modeling Language",
        "Universal Markup Language",
        "Unified Machine Language",
        "Unit Modeling Layout"
      ],
      "correctAnswer": "Unified Modeling Language"
    },
    {
      "id": "uml-beg-002",
      "difficulty": "Beginner",
      "question": "What does a Use Case diagram primarily show?",
      "options": [
        "Database schema",
        "Interactions between actors and a system's functionality",
        "Memory allocation",
        "Network topology"
      ],
      "correctAnswer": "Interactions between actors and a system's functionality"
    },
    {
      "id": "uml-beg-003",
      "difficulty": "Beginner",
      "question": "In a Class diagram, what symbol typically represents a private attribute?",
      "options": [
        "+",
        "-",
        "#",
        "~"
      ],
      "correctAnswer": "-"
    },
    {
      "id": "uml-beg-004",
      "difficulty": "Beginner",
      "question": "What does a stick figure represent in a Use Case diagram?",
      "options": [
        "A class",
        "An actor (user or external system)",
        "A database table",
        "A method"
      ],
      "correctAnswer": "An actor (user or external system)"
    },
    {
      "id": "uml-beg-005",
      "difficulty": "Beginner",
      "question": "What does '+' denote for a class member in UML?",
      "options": [
        "Private",
        "Protected",
        "Public",
        "Package"
      ],
      "correctAnswer": "Public"
    },
    {
      "id": "uml-beg-006",
      "difficulty": "Beginner",
      "question": "Which UML diagram shows the sequence of messages exchanged between objects over time?",
      "options": [
        "Class diagram",
        "Sequence diagram",
        "Deployment diagram",
        "Component diagram"
      ],
      "correctAnswer": "Sequence diagram"
    },
    {
      "id": "uml-beg-007",
      "difficulty": "Beginner",
      "question": "What shape represents a class in a Class diagram?",
      "options": [
        "Oval",
        "Rectangle divided into three sections (name, attributes, methods)",
        "Diamond",
        "Cloud"
      ],
      "correctAnswer": "Rectangle divided into three sections (name, attributes, methods)"
    },
    {
      "id": "uml-beg-008",
      "difficulty": "Beginner",
      "question": "What is an association in a UML class diagram?",
      "options": [
        "A syntax error indicator",
        "A relationship indicating two classes are connected/related",
        "A type of method",
        "A comment"
      ],
      "correctAnswer": "A relationship indicating two classes are connected/related"
    },
    {
      "id": "uml-beg-009",
      "difficulty": "Beginner",
      "question": "Which diagram type models the physical deployment of artifacts on hardware nodes?",
      "options": [
        "Deployment diagram",
        "Activity diagram",
        "Class diagram",
        "State diagram"
      ],
      "correctAnswer": "Deployment diagram"
    },
    {
      "id": "uml-beg-010",
      "difficulty": "Beginner",
      "question": "What does an oval shape typically represent in a Use Case diagram?",
      "options": [
        "An actor",
        "A use case (a piece of functionality)",
        "A class",
        "A database"
      ],
      "correctAnswer": "A use case (a piece of functionality)"
    },
    {
      "id": "uml-int-001",
      "difficulty": "Intermediate",
      "question": "What is the difference between aggregation and composition in UML?",
      "options": [
        "No difference",
        "Composition implies the part cannot exist independently of the whole; aggregation allows independent existence",
        "Aggregation is stronger than composition",
        "Composition is only used in Java"
      ],
      "correctAnswer": "Composition implies the part cannot exist independently of the whole; aggregation allows independent existence"
    },
    {
      "id": "uml-int-002",
      "difficulty": "Intermediate",
      "question": "In a Class diagram, what does a hollow triangle arrowhead pointing to a class indicate?",
      "options": [
        "Composition",
        "Aggregation",
        "Generalization (inheritance)",
        "Dependency"
      ],
      "correctAnswer": "Generalization (inheritance)"
    },
    {
      "id": "uml-int-003",
      "difficulty": "Intermediate",
      "question": "What does a dashed arrow typically represent in UML diagrams?",
      "options": [
        "A strong ownership relationship",
        "A dependency relationship",
        "Multiplicity",
        "An actor's role"
      ],
      "correctAnswer": "A dependency relationship"
    },
    {
      "id": "uml-int-004",
      "difficulty": "Intermediate",
      "question": "What does multiplicity like '1..*' next to an association mean?",
      "options": [
        "Exactly one instance",
        "Zero instances only",
        "One or more instances",
        "Exactly zero or one instance"
      ],
      "correctAnswer": "One or more instances"
    },
    {
      "id": "uml-int-005",
      "difficulty": "Intermediate",
      "question": "What is the purpose of an Activity diagram?",
      "options": [
        "Show class hierarchies",
        "Model workflows and the flow of control between activities",
        "Show hardware deployment",
        "Show database tables"
      ],
      "correctAnswer": "Model workflows and the flow of control between activities"
    },
    {
      "id": "uml-int-006",
      "difficulty": "Intermediate",
      "question": "What does <<include>> mean between two use cases?",
      "options": [
        "The base use case optionally uses the included one",
        "The base use case always incorporates the behavior of the included use case",
        "The two use cases are unrelated",
        "It denotes an actor relationship"
      ],
      "correctAnswer": "The base use case always incorporates the behavior of the included use case"
    },
    {
      "id": "uml-int-007",
      "difficulty": "Intermediate",
      "question": "What does a lifeline represent in a Sequence diagram?",
      "options": [
        "A database connection",
        "The existence of an object over time during the interaction",
        "A class inheritance path",
        "A deployment node"
      ],
      "correctAnswer": "The existence of an object over time during the interaction"
    },
    {
      "id": "uml-adv-001",
      "difficulty": "Advanced",
      "question": "What is the key difference between a State diagram and an Activity diagram?",
      "options": [
        "No real difference",
        "State diagrams focus on an object's states and transitions; activity diagrams focus on workflow/control flow across the system",
        "Activity diagrams can't show decisions",
        "State diagrams are used only for databases"
      ],
      "correctAnswer": "State diagrams focus on an object's states and transitions; activity diagrams focus on workflow/control flow across the system"
    },
    {
      "id": "uml-adv-002",
      "difficulty": "Advanced",
      "question": "In a Component diagram, what does a 'lollipop' notation typically represent?",
      "options": [
        "A required interface",
        "A provided interface",
        "A deployment artifact",
        "An actor"
      ],
      "correctAnswer": "A provided interface"
    },
    {
      "id": "uml-adv-003",
      "difficulty": "Advanced",
      "question": "What is the purpose of an interaction overview diagram?",
      "options": [
        "To replace class diagrams entirely",
        "To combine activity diagram control flow with sequence diagram elements for high-level interaction views",
        "To show only database schemas",
        "To document hardware specs"
      ],
      "correctAnswer": "To combine activity diagram control flow with sequence diagram elements for high-level interaction views"
    },
    {
      "id": "uml-adv-004",
      "difficulty": "Advanced",
      "question": "What does a guard condition in an Activity or State diagram represent?",
      "options": [
        "A syntax rule",
        "A boolean expression that must be true for a transition to occur",
        "A security permission",
        "A class attribute"
      ],
      "correctAnswer": "A boolean expression that must be true for a transition to occur"
    },
    {
      "id": "uml-adv-005",
      "difficulty": "Advanced",
      "question": "What is the difference between a synchronous and asynchronous message in a Sequence diagram?",
      "options": [
        "No visual difference exists",
        "Synchronous uses a solid arrowhead and waits for a response; asynchronous uses an open arrowhead and doesn't wait",
        "Asynchronous messages are always errors",
        "Synchronous messages can't return values"
      ],
      "correctAnswer": "Synchronous uses a solid arrowhead and waits for a response; asynchronous uses an open arrowhead and doesn't wait"
    },
    {
      "id": "uml-beg-011",
      "difficulty": "Beginner",
      "question": "What does a solid line with no arrowhead typically represent in a Class diagram?",
      "options": [
        "Inheritance",
        "A basic association between classes",
        "A dependency",
        "A comment"
      ],
      "correctAnswer": "A basic association between classes"
    },
    {
      "id": "uml-beg-012",
      "difficulty": "Beginner",
      "question": "In UML, what does '#' denote for a class member's visibility?",
      "options": [
        "Public",
        "Private",
        "Protected",
        "Package"
      ],
      "correctAnswer": "Protected"
    },
    {
      "id": "uml-beg-013",
      "difficulty": "Beginner",
      "question": "What is the purpose of a Component diagram?",
      "options": [
        "Show the organization and dependencies among software components",
        "Show database records",
        "Show user login screens",
        "Show network cables"
      ],
      "correctAnswer": "Show the organization and dependencies among software components"
    },
    {
      "id": "uml-beg-014",
      "difficulty": "Beginner",
      "question": "What does a rectangle with rounded corners typically represent in an Activity diagram?",
      "options": [
        "A decision point",
        "An action or activity",
        "The start of the diagram",
        "An actor"
      ],
      "correctAnswer": "An action or activity"
    },
    {
      "id": "uml-beg-015",
      "difficulty": "Beginner",
      "question": "What is the purpose of a system boundary box in a Use Case diagram?",
      "options": [
        "To decorate the diagram",
        "To define the scope of the system being modeled",
        "To represent a single actor",
        "To show database tables"
      ],
      "correctAnswer": "To define the scope of the system being modeled"
    },
    {
      "id": "uml-beg-016",
      "difficulty": "Beginner",
      "question": "In a Sequence diagram, what does a vertical dashed line beneath an object represent?",
      "options": [
        "A class attribute",
        "The object's lifeline",
        "A deleted object",
        "An external actor"
      ],
      "correctAnswer": "The object's lifeline"
    },
    {
      "id": "uml-beg-017",
      "difficulty": "Beginner",
      "question": "What does a diamond shape typically represent in an Activity diagram?",
      "options": [
        "A start point",
        "A decision/branch point",
        "An end point",
        "A swimlane"
      ],
      "correctAnswer": "A decision/branch point"
    },
    {
      "id": "uml-beg-018",
      "difficulty": "Beginner",
      "question": "Which UML diagram is best suited to show the states an object can be in over its lifetime?",
      "options": [
        "State diagram",
        "Class diagram",
        "Deployment diagram",
        "Component diagram"
      ],
      "correctAnswer": "State diagram"
    },
    {
      "id": "uml-beg-019",
      "difficulty": "Beginner",
      "question": "What does a filled black circle represent at the start of an Activity diagram?",
      "options": [
        "An error state",
        "The initial/starting node",
        "A decision point",
        "The final node"
      ],
      "correctAnswer": "The initial/starting node"
    },
    {
      "id": "uml-beg-020",
      "difficulty": "Beginner",
      "question": "What is the purpose of an Object diagram in UML?",
      "options": [
        "To show a snapshot of instances and their relationships at a specific point in time",
        "To show only class definitions",
        "To show network topology",
        "To show source code"
      ],
      "correctAnswer": "To show a snapshot of instances and their relationships at a specific point in time"
    },
    {
      "id": "uml-beg-021",
      "difficulty": "Beginner",
      "question": "What does a swimlane in an Activity diagram represent?",
      "options": [
        "A network connection",
        "A responsible actor or component for a set of activities",
        "A database column",
        "A class attribute"
      ],
      "correctAnswer": "A responsible actor or component for a set of activities"
    },
    {
      "id": "uml-beg-022",
      "difficulty": "Beginner",
      "question": "What symbol is used to show a package in UML?",
      "options": [
        "A folder-tab shaped rectangle",
        "A circle",
        "A diamond",
        "A stick figure"
      ],
      "correctAnswer": "A folder-tab shaped rectangle"
    },
    {
      "id": "uml-beg-023",
      "difficulty": "Beginner",
      "question": "What does a node represent in a Deployment diagram?",
      "options": [
        "A class",
        "A physical or virtual piece of hardware/computing resource",
        "A use case",
        "An attribute"
      ],
      "correctAnswer": "A physical or virtual piece of hardware/computing resource"
    },
    {
      "id": "uml-beg-024",
      "difficulty": "Beginner",
      "question": "What does an actor connected to a use case with a simple line represent?",
      "options": [
        "An error condition",
        "A communication/participation relationship between actor and use case",
        "Inheritance",
        "A dependency"
      ],
      "correctAnswer": "A communication/participation relationship between actor and use case"
    },
    {
      "id": "uml-beg-025",
      "difficulty": "Beginner",
      "question": "What is the purpose of a Timing diagram in UML?",
      "options": [
        "Show class hierarchies",
        "Show the behavior of objects over a specific time frame, focusing on timing constraints",
        "Show deployment nodes only",
        "Show database indexes"
      ],
      "correctAnswer": "Show the behavior of objects over a specific time frame, focusing on timing constraints"
    },
    {
      "id": "uml-int-008",
      "difficulty": "Intermediate",
      "question": "What does <<extend>> mean between two use cases?",
      "options": [
        "The base use case always includes the extending one",
        "The extending use case optionally adds behavior to the base use case under certain conditions",
        "It denotes inheritance between actors",
        "It represents a system boundary"
      ],
      "correctAnswer": "The extending use case optionally adds behavior to the base use case under certain conditions"
    },
    {
      "id": "uml-int-009",
      "difficulty": "Intermediate",
      "question": "What does a filled diamond represent in a Class diagram association?",
      "options": [
        "Generalization",
        "Composition (strong ownership)",
        "A simple dependency",
        "An interface realization"
      ],
      "correctAnswer": "Composition (strong ownership)"
    },
    {
      "id": "uml-int-010",
      "difficulty": "Intermediate",
      "question": "What does a hollow diamond represent in a Class diagram association?",
      "options": [
        "Composition",
        "Aggregation (weaker ownership)",
        "Inheritance",
        "Realization"
      ],
      "correctAnswer": "Aggregation (weaker ownership)"
    },
    {
      "id": "uml-int-011",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a Communication diagram (formerly Collaboration diagram)?",
      "options": [
        "Show only class attributes",
        "Show interactions between objects organized around their links/relationships, rather than time",
        "Show hardware nodes",
        "Show database schemas"
      ],
      "correctAnswer": "Show interactions between objects organized around their links/relationships, rather than time"
    },
    {
      "id": "uml-int-012",
      "difficulty": "Intermediate",
      "question": "What does a dashed arrow with a hollow triangle head represent in UML?",
      "options": [
        "Composition",
        "Realization (a class implementing an interface)",
        "A simple association",
        "Aggregation"
      ],
      "correctAnswer": "Realization (a class implementing an interface)"
    },
    {
      "id": "uml-int-013",
      "difficulty": "Intermediate",
      "question": "What does an abstract class look like in a UML Class diagram?",
      "options": [
        "A rectangle with a dashed border",
        "The class name is typically shown in italics",
        "A rectangle with double borders",
        "A hexagon shape"
      ],
      "correctAnswer": "The class name is typically shown in italics"
    },
    {
      "id": "uml-int-014",
      "difficulty": "Intermediate",
      "question": "What does a fork/join bar represent in an Activity diagram?",
      "options": [
        "A single sequential path",
        "Splitting into or merging concurrent/parallel flows",
        "The end of the diagram",
        "A class boundary"
      ],
      "correctAnswer": "Splitting into or merging concurrent/parallel flows"
    },
    {
      "id": "uml-int-015",
      "difficulty": "Intermediate",
      "question": "What is the role of a 'note' element in UML diagrams?",
      "options": [
        "To define a new class",
        "To attach explanatory comments to diagram elements without affecting semantics",
        "To represent an actor",
        "To show a database relationship"
      ],
      "correctAnswer": "To attach explanatory comments to diagram elements without affecting semantics"
    },
    {
      "id": "uml-int-016",
      "difficulty": "Intermediate",
      "question": "What does a self-message in a Sequence diagram represent?",
      "options": [
        "An error condition",
        "An object calling one of its own methods",
        "A message to an external actor",
        "The end of the interaction"
      ],
      "correctAnswer": "An object calling one of its own methods"
    },
    {
      "id": "uml-int-017",
      "difficulty": "Intermediate",
      "question": "What does an artifact represent in a Deployment diagram?",
      "options": [
        "A physical hardware node",
        "A concrete piece of information/data used or produced, like a file or executable",
        "An actor",
        "A use case"
      ],
      "correctAnswer": "A concrete piece of information/data used or produced, like a file or executable"
    },
    {
      "id": "uml-int-018",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a Composite Structure diagram?",
      "options": [
        "Show only inheritance hierarchies",
        "Show the internal structure of a class and its interaction points with other parts",
        "Show deployment across servers",
        "Show use cases"
      ],
      "correctAnswer": "Show the internal structure of a class and its interaction points with other parts"
    },
    {
      "id": "uml-int-019",
      "difficulty": "Intermediate",
      "question": "What does a combined fragment with 'alt' operator represent in a Sequence diagram?",
      "options": [
        "A loop",
        "Alternative/conditional interaction paths, similar to if-else",
        "Parallel execution",
        "A single fixed sequence"
      ],
      "correctAnswer": "Alternative/conditional interaction paths, similar to if-else"
    },
    {
      "id": "uml-int-020",
      "difficulty": "Intermediate",
      "question": "What does multiplicity '0..1' indicate in an association?",
      "options": [
        "Exactly one required instance",
        "Zero or one instance (optional)",
        "Unlimited instances",
        "Exactly zero instances always"
      ],
      "correctAnswer": "Zero or one instance (optional)"
    },
    {
      "id": "uml-adv-006",
      "difficulty": "Advanced",
      "question": "What is the purpose of a Profile diagram in UML?",
      "options": [
        "Show user profile pages in an app",
        "Extend UML with custom stereotypes, tagged values, and constraints for a specific domain",
        "Replace class diagrams entirely",
        "Show deployment topology"
      ],
      "correctAnswer": "Extend UML with custom stereotypes, tagged values, and constraints for a specific domain"
    },
    {
      "id": "uml-adv-007",
      "difficulty": "Advanced",
      "question": "What does a 'combined fragment' with a 'loop' operator represent in a Sequence diagram?",
      "options": [
        "A single message",
        "A repeated interaction sequence, similar to a for/while loop",
        "An alternative path",
        "A parallel execution block"
      ],
      "correctAnswer": "A repeated interaction sequence, similar to a for/while loop"
    },
    {
      "id": "uml-adv-008",
      "difficulty": "Advanced",
      "question": "What is the difference between a Class diagram's realization and generalization relationships?",
      "options": [
        "No difference",
        "Realization is implementing an interface's contract; generalization is inheriting from a superclass",
        "Generalization only applies to interfaces",
        "Realization is stronger than composition"
      ],
      "correctAnswer": "Realization is implementing an interface's contract; generalization is inheriting from a superclass"
    },
    {
      "id": "uml-adv-009",
      "difficulty": "Advanced",
      "question": "What is the purpose of an Interaction diagram's 'par' combined fragment operator?",
      "options": [
        "Represents strictly sequential operations",
        "Represents concurrent/parallel execution of operands",
        "Represents an error condition",
        "Represents a decision point only"
      ],
      "correctAnswer": "Represents concurrent/parallel execution of operands"
    },
    {
      "id": "uml-adv-010",
      "difficulty": "Advanced",
      "question": "What does OCL (Object Constraint Language) add to UML models?",
      "options": [
        "Animation capabilities",
        "A formal way to specify constraints and rules on model elements that diagrams alone can't express",
        "A new diagram type for networks",
        "A replacement for use case diagrams"
      ],
      "correctAnswer": "A formal way to specify constraints and rules on model elements that diagrams alone can't express"
    },
    {
      "id": "uml-adv-011",
      "difficulty": "Advanced",
      "question": "What does a 'break' combined fragment represent in a Sequence diagram?",
      "options": [
        "An error in the diagram",
        "An alternative path taken when a condition is met, breaking out of the enclosing interaction",
        "A parallel execution block",
        "A permanent end of the diagram"
      ],
      "correctAnswer": "An alternative path taken when a condition is met, breaking out of the enclosing interaction"
    },
    {
      "id": "uml-adv-012",
      "difficulty": "Advanced",
      "question": "What is the purpose of a Package diagram's dependency arrows?",
      "options": [
        "Showing hardware connections",
        "Indicating that one package relies on elements defined in another package",
        "Showing use case relationships",
        "Showing class attributes"
      ],
      "correctAnswer": "Indicating that one package relies on elements defined in another package"
    },
    {
      "id": "uml-adv-013",
      "difficulty": "Advanced",
      "question": "What does a 'derived' attribute (shown with a '/' prefix) indicate in a Class diagram?",
      "options": [
        "A private attribute",
        "An attribute whose value is computed from other attributes rather than stored directly",
        "A deprecated attribute",
        "A static class attribute"
      ],
      "correctAnswer": "An attribute whose value is computed from other attributes rather than stored directly"
    },
    {
      "id": "uml-adv-014",
      "difficulty": "Advanced",
      "question": "What is the purpose of an association class in UML?",
      "options": [
        "Replacing a normal class entirely",
        "Adding attributes/operations to an association itself when the relationship has its own properties",
        "Marking a class as abstract",
        "Defining a use case boundary"
      ],
      "correctAnswer": "Adding attributes/operations to an association itself when the relationship has its own properties"
    },
    {
      "id": "uml-adv-015",
      "difficulty": "Advanced",
      "question": "What does 'xor' constraint between two associations typically mean in a Class diagram?",
      "options": [
        "Both associations must always be active",
        "An object can participate in only one of the associations at a time, not both",
        "The associations are unrelated",
        "It denotes composition"
      ],
      "correctAnswer": "An object can participate in only one of the associations at a time, not both"
    }
  ]
};
export const QUIZFORGE_UML_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
