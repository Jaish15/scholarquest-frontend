/* QuizForge Question Bank — cybersecurity_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "Cybersecurity",
  "questions": [
    {
      "id": "cy-beg-001",
      "difficulty": "Beginner",
      "question": "What does 'phishing' refer to in cybersecurity?",
      "options": [
        "A network speed test",
        "A social engineering attack that tricks users into revealing sensitive information",
        "A type of firewall",
        "A password encryption method"
      ],
      "correctAnswer": "A social engineering attack that tricks users into revealing sensitive information"
    },
    {
      "id": "cy-beg-002",
      "difficulty": "Beginner",
      "question": "What does HTTPS provide that HTTP does not?",
      "options": [
        "Faster page loading",
        "Encrypted communication between client and server",
        "Better SEO ranking only",
        "Unlimited bandwidth"
      ],
      "correctAnswer": "Encrypted communication between client and server"
    },
    {
      "id": "cy-beg-003",
      "difficulty": "Beginner",
      "question": "What is a firewall used for?",
      "options": [
        "Speeding up internet connections",
        "Monitoring and controlling incoming/outgoing network traffic based on security rules",
        "Storing passwords",
        "Compiling code"
      ],
      "correctAnswer": "Monitoring and controlling incoming/outgoing network traffic based on security rules"
    },
    {
      "id": "cy-beg-004",
      "difficulty": "Beginner",
      "question": "What is two-factor authentication (2FA)?",
      "options": [
        "Using two different passwords",
        "Requiring two different types of verification to confirm identity",
        "Logging in twice in a row",
        "A type of encryption algorithm"
      ],
      "correctAnswer": "Requiring two different types of verification to confirm identity"
    },
    {
      "id": "cy-beg-005",
      "difficulty": "Beginner",
      "question": "What is malware?",
      "options": [
        "A type of hardware failure",
        "Malicious software designed to damage, disrupt, or gain unauthorized access to systems",
        "A network protocol",
        "A programming language"
      ],
      "correctAnswer": "Malicious software designed to damage, disrupt, or gain unauthorized access to systems"
    },
    {
      "id": "cy-beg-006",
      "difficulty": "Beginner",
      "question": "What does a strong password policy typically require?",
      "options": [
        "Only lowercase letters",
        "A mix of length, uppercase/lowercase, numbers, and symbols",
        "The same password reused everywhere",
        "A password shorter than 4 characters"
      ],
      "correctAnswer": "A mix of length, uppercase/lowercase, numbers, and symbols"
    },
    {
      "id": "cy-beg-007",
      "difficulty": "Beginner",
      "question": "What is the purpose of encryption?",
      "options": [
        "To make files smaller",
        "To convert data into a coded form to prevent unauthorized access",
        "To speed up file transfer",
        "To delete sensitive data permanently"
      ],
      "correctAnswer": "To convert data into a coded form to prevent unauthorized access"
    },
    {
      "id": "cy-beg-008",
      "difficulty": "Beginner",
      "question": "What is a VPN primarily used for?",
      "options": [
        "Increasing download speed permanently",
        "Creating a secure, encrypted connection over a public network",
        "Removing viruses from a computer",
        "Compiling source code remotely"
      ],
      "correctAnswer": "Creating a secure, encrypted connection over a public network"
    },
    {
      "id": "cy-beg-009",
      "difficulty": "Beginner",
      "question": "What does 'DDoS' stand for?",
      "options": [
        "Direct Data over Server",
        "Distributed Denial of Service",
        "Dual Domain Security",
        "Data Distribution Standard"
      ],
      "correctAnswer": "Distributed Denial of Service"
    },
    {
      "id": "cy-int-001",
      "difficulty": "Intermediate",
      "question": "What is SQL injection?",
      "options": [
        "A database backup technique",
        "An attack that inserts malicious SQL code into input fields to manipulate a database",
        "A method to speed up SQL queries",
        "A type of firewall rule"
      ],
      "correctAnswer": "An attack that inserts malicious SQL code into input fields to manipulate a database"
    },
    {
      "id": "cy-int-002",
      "difficulty": "Intermediate",
      "question": "What is Cross-Site Scripting (XSS)?",
      "options": [
        "A CSS styling technique",
        "An attack that injects malicious scripts into webpages viewed by other users",
        "A method for compressing images",
        "A network routing protocol"
      ],
      "correctAnswer": "An attack that injects malicious scripts into webpages viewed by other users"
    },
    {
      "id": "cy-int-003",
      "difficulty": "Intermediate",
      "question": "What is the principle of 'least privilege'?",
      "options": [
        "Giving all users admin access by default",
        "Granting users only the minimum access necessary to perform their tasks",
        "Denying all access to everyone",
        "A password complexity rule"
      ],
      "correctAnswer": "Granting users only the minimum access necessary to perform their tasks"
    },
    {
      "id": "cy-int-004",
      "difficulty": "Intermediate",
      "question": "What is the difference between symmetric and asymmetric encryption?",
      "options": [
        "No difference",
        "Symmetric uses one shared key; asymmetric uses a public/private key pair",
        "Asymmetric is always faster",
        "Symmetric can't be broken"
      ],
      "correctAnswer": "Symmetric uses one shared key; asymmetric uses a public/private key pair"
    },
    {
      "id": "cy-int-005",
      "difficulty": "Intermediate",
      "question": "What is a CSRF (Cross-Site Request Forgery) attack?",
      "options": [
        "Stealing physical hardware",
        "Tricking an authenticated user's browser into performing unwanted actions on a trusted site",
        "A type of malware installer",
        "A brute force login attack"
      ],
      "correctAnswer": "Tricking an authenticated user's browser into performing unwanted actions on a trusted site"
    },
    {
      "id": "cy-int-006",
      "difficulty": "Intermediate",
      "question": "What does 'hashing' a password accomplish, unlike encryption?",
      "options": [
        "It can be reversed with the right key",
        "It's a one-way transformation, making it computationally infeasible to retrieve the original value",
        "It compresses the password to save space",
        "It has no security benefit"
      ],
      "correctAnswer": "It's a one-way transformation, making it computationally infeasible to retrieve the original value"
    },
    {
      "id": "cy-int-007",
      "difficulty": "Intermediate",
      "question": "What is penetration testing?",
      "options": [
        "Testing network cable durability",
        "Authorized simulated attacks on a system to identify security vulnerabilities",
        "A type of malware",
        "Testing UI responsiveness"
      ],
      "correctAnswer": "Authorized simulated attacks on a system to identify security vulnerabilities"
    },
    {
      "id": "cy-adv-001",
      "difficulty": "Advanced",
      "question": "What is a zero-day vulnerability?",
      "options": [
        "A vulnerability that has existed for zero days and is already patched",
        "A previously unknown vulnerability with no available patch at the time of discovery/exploitation",
        "A vulnerability only affecting outdated systems",
        "A vulnerability that takes zero effort to fix"
      ],
      "correctAnswer": "A previously unknown vulnerability with no available patch at the time of discovery/exploitation"
    },
    {
      "id": "cy-adv-002",
      "difficulty": "Advanced",
      "question": "What is the purpose of a Content Security Policy (CSP) header?",
      "options": [
        "Speeding up page rendering",
        "Restricting which sources of content (scripts, styles, etc.) a browser is allowed to load, mitigating XSS",
        "Encrypting cookies automatically",
        "Managing DNS records"
      ],
      "correctAnswer": "Restricting which sources of content (scripts, styles, etc.) a browser is allowed to load, mitigating XSS"
    },
    {
      "id": "cy-adv-003",
      "difficulty": "Advanced",
      "question": "What does 'salting' a password hash protect against?",
      "options": [
        "Network sniffing",
        "Precomputed rainbow table attacks by adding unique random data before hashing",
        "SQL injection",
        "DDoS attacks"
      ],
      "correctAnswer": "Precomputed rainbow table attacks by adding unique random data before hashing"
    },
    {
      "id": "cy-adv-004",
      "difficulty": "Advanced",
      "question": "What is the main goal of a man-in-the-middle (MITM) attack?",
      "options": [
        "Overloading a server with traffic",
        "Secretly intercepting and possibly altering communication between two parties",
        "Guessing passwords through brute force",
        "Deleting files from a remote server"
      ],
      "correctAnswer": "Secretly intercepting and possibly altering communication between two parties"
    },
    {
      "id": "cy-adv-005",
      "difficulty": "Advanced",
      "question": "What is the purpose of OAuth 2.0 in application security?",
      "options": [
        "Encrypting entire databases",
        "Allowing delegated, token-based access to resources without sharing the user's credentials directly",
        "Compiling secure code automatically",
        "Detecting malware signatures"
      ],
      "correctAnswer": "Allowing delegated, token-based access to resources without sharing the user's credentials directly"
    },
    {
      "id": "cy-beg-010",
      "difficulty": "Beginner",
      "question": "What is social engineering in a security context?",
      "options": [
        "Building secure software systems",
        "Manipulating people into divulging confidential information or performing actions",
        "A network encryption protocol",
        "A type of firewall configuration"
      ],
      "correctAnswer": "Manipulating people into divulging confidential information or performing actions"
    },
    {
      "id": "cy-beg-011",
      "difficulty": "Beginner",
      "question": "What is antivirus software primarily designed to do?",
      "options": [
        "Speed up your computer",
        "Detect, prevent, and remove malicious software",
        "Encrypt all files automatically",
        "Manage network bandwidth"
      ],
      "correctAnswer": "Detect, prevent, and remove malicious software"
    },
    {
      "id": "cy-beg-012",
      "difficulty": "Beginner",
      "question": "What does 'patching' software refer to?",
      "options": [
        "Deleting old software versions",
        "Applying updates to fix vulnerabilities or bugs",
        "Installing new hardware",
        "Backing up data"
      ],
      "correctAnswer": "Applying updates to fix vulnerabilities or bugs"
    },
    {
      "id": "cy-beg-013",
      "difficulty": "Beginner",
      "question": "What is ransomware?",
      "options": [
        "Software that speeds up file access",
        "Malware that encrypts a victim's files and demands payment for the decryption key",
        "A type of firewall",
        "A network monitoring tool"
      ],
      "correctAnswer": "Malware that encrypts a victim's files and demands payment for the decryption key"
    },
    {
      "id": "cy-beg-014",
      "difficulty": "Beginner",
      "question": "What does 'confidentiality' mean in the CIA triad of security?",
      "options": [
        "Data is always available",
        "Ensuring information is accessible only to authorized parties",
        "Data cannot be modified",
        "Systems never go offline"
      ],
      "correctAnswer": "Ensuring information is accessible only to authorized parties"
    },
    {
      "id": "cy-beg-015",
      "difficulty": "Beginner",
      "question": "What does 'integrity' mean in the CIA triad?",
      "options": [
        "Data remains accurate and unaltered by unauthorized parties",
        "Data is encrypted at rest",
        "Systems are always online",
        "Passwords are complex"
      ],
      "correctAnswer": "Data remains accurate and unaltered by unauthorized parties"
    },
    {
      "id": "cy-beg-016",
      "difficulty": "Beginner",
      "question": "What does 'availability' mean in the CIA triad?",
      "options": [
        "Data is kept secret",
        "Authorized users can access information and resources when needed",
        "Data cannot be changed",
        "Passwords expire regularly"
      ],
      "correctAnswer": "Authorized users can access information and resources when needed"
    },
    {
      "id": "cy-beg-017",
      "difficulty": "Beginner",
      "question": "What is a brute force attack?",
      "options": [
        "Exploiting a software bug",
        "Systematically trying many password combinations until the correct one is found",
        "Sending spam emails",
        "Physically damaging hardware"
      ],
      "correctAnswer": "Systematically trying many password combinations until the correct one is found"
    },
    {
      "id": "cy-beg-018",
      "difficulty": "Beginner",
      "question": "What does a 'security patch' typically address?",
      "options": [
        "UI design issues",
        "Known vulnerabilities in software that could be exploited by attackers",
        "Marketing content",
        "Database backup schedules"
      ],
      "correctAnswer": "Known vulnerabilities in software that could be exploited by attackers"
    },
    {
      "id": "cy-beg-019",
      "difficulty": "Beginner",
      "question": "What is spyware?",
      "options": [
        "Software that improves system performance",
        "Malicious software that secretly monitors and collects user information",
        "A type of firewall",
        "An encryption algorithm"
      ],
      "correctAnswer": "Malicious software that secretly monitors and collects user information"
    },
    {
      "id": "cy-beg-020",
      "difficulty": "Beginner",
      "question": "What does 'whitelisting' mean in access control?",
      "options": [
        "Blocking all known malicious IPs only",
        "Explicitly allowing only approved entities/applications while blocking everything else",
        "Deleting all user accounts",
        "Encrypting all traffic"
      ],
      "correctAnswer": "Explicitly allowing only approved entities/applications while blocking everything else"
    },
    {
      "id": "cy-beg-021",
      "difficulty": "Beginner",
      "question": "What is a security token used for?",
      "options": [
        "Speeding up website loading",
        "Providing an additional layer of authentication, often as part of 2FA",
        "Compressing files",
        "Managing DNS records"
      ],
      "correctAnswer": "Providing an additional layer of authentication, often as part of 2FA"
    },
    {
      "id": "cy-int-008",
      "difficulty": "Intermediate",
      "question": "What is privilege escalation?",
      "options": [
        "A legitimate promotion process",
        "Exploiting a vulnerability to gain elevated access beyond what was originally granted",
        "Increasing server bandwidth",
        "A type of encryption upgrade"
      ],
      "correctAnswer": "Exploiting a vulnerability to gain elevated access beyond what was originally granted"
    },
    {
      "id": "cy-int-009",
      "difficulty": "Intermediate",
      "question": "What does an Intrusion Detection System (IDS) do?",
      "options": [
        "Actively blocks all incoming traffic",
        "Monitors network or system activity for malicious actions or policy violations",
        "Encrypts stored data",
        "Manages user passwords"
      ],
      "correctAnswer": "Monitors network or system activity for malicious actions or policy violations"
    },
    {
      "id": "cy-int-010",
      "difficulty": "Intermediate",
      "question": "What is the difference between an IDS and an IPS?",
      "options": [
        "No difference",
        "An IDS detects and alerts on threats; an IPS actively blocks/prevents them in real time",
        "IPS is always software-only",
        "IDS only works on encrypted traffic"
      ],
      "correctAnswer": "An IDS detects and alerts on threats; an IPS actively blocks/prevents them in real time"
    },
    {
      "id": "cy-int-011",
      "difficulty": "Intermediate",
      "question": "What is a security audit?",
      "options": [
        "A marketing review",
        "A systematic evaluation of an organization's security posture and controls",
        "A type of malware",
        "A network speed test"
      ],
      "correctAnswer": "A systematic evaluation of an organization's security posture and controls"
    },
    {
      "id": "cy-int-012",
      "difficulty": "Intermediate",
      "question": "What does 'defense in depth' refer to as a security strategy?",
      "options": [
        "Relying on a single strong firewall",
        "Layering multiple security controls so that if one fails, others still provide protection",
        "Only training employees on security awareness",
        "Encrypting only the most sensitive files"
      ],
      "correctAnswer": "Layering multiple security controls so that if one fails, others still provide protection"
    },
    {
      "id": "cy-int-013",
      "difficulty": "Intermediate",
      "question": "What is a buffer overflow vulnerability?",
      "options": [
        "A database running out of storage",
        "Writing more data to a buffer than it can hold, potentially overwriting adjacent memory and enabling exploits",
        "A network congestion issue",
        "A type of phishing email"
      ],
      "correctAnswer": "Writing more data to a buffer than it can hold, potentially overwriting adjacent memory and enabling exploits"
    },
    {
      "id": "cy-int-014",
      "difficulty": "Intermediate",
      "question": "What does 'security through obscurity' refer to, and why is it considered weak?",
      "options": [
        "Strong encryption; it's considered the gold standard",
        "Relying on secrecy of design/implementation rather than sound mechanisms; it fails once details are discovered",
        "A type of firewall configuration",
        "A method of hiding servers physically"
      ],
      "correctAnswer": "Relying on secrecy of design/implementation rather than sound mechanisms; it fails once details are discovered"
    },
    {
      "id": "cy-int-015",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a Web Application Firewall (WAF)?",
      "options": [
        "Speeding up website rendering",
        "Filtering, monitoring, and blocking malicious HTTP traffic to and from a web application",
        "Managing DNS entries",
        "Compressing web assets"
      ],
      "correctAnswer": "Filtering, monitoring, and blocking malicious HTTP traffic to and from a web application"
    },
    {
      "id": "cy-int-016",
      "difficulty": "Intermediate",
      "question": "What does 'input validation' help prevent?",
      "options": [
        "Slow page load times",
        "Injection attacks like SQL injection and XSS by rejecting malformed or malicious input",
        "Password expiration",
        "Network latency issues"
      ],
      "correctAnswer": "Injection attacks like SQL injection and XSS by rejecting malformed or malicious input"
    },
    {
      "id": "cy-int-017",
      "difficulty": "Intermediate",
      "question": "What is a rootkit?",
      "options": [
        "A legitimate system administration tool",
        "Malicious software designed to gain and maintain hidden privileged access to a system",
        "A type of database index",
        "A password manager"
      ],
      "correctAnswer": "Malicious software designed to gain and maintain hidden privileged access to a system"
    },
    {
      "id": "cy-int-018",
      "difficulty": "Intermediate",
      "question": "What is the purpose of security information and event management (SIEM) systems?",
      "options": [
        "Compiling application code",
        "Aggregating and analyzing security event data across an organization for threat detection",
        "Managing employee schedules",
        "Designing UI layouts"
      ],
      "correctAnswer": "Aggregating and analyzing security event data across an organization for threat detection"
    },
    {
      "id": "cy-adv-006",
      "difficulty": "Advanced",
      "question": "What is a side-channel attack?",
      "options": [
        "An attack via a fake login page",
        "An attack that exploits indirect information (timing, power consumption, etc.) rather than direct vulnerabilities",
        "A type of DDoS attack",
        "A phishing technique"
      ],
      "correctAnswer": "An attack that exploits indirect information (timing, power consumption, etc.) rather than direct vulnerabilities"
    },
    {
      "id": "cy-adv-007",
      "difficulty": "Advanced",
      "question": "What is a supply chain attack?",
      "options": [
        "Attacking a company's physical shipping logistics",
        "Compromising software or hardware at some point in its production/distribution before it reaches the end user",
        "A brute force password attack",
        "A type of firewall misconfiguration"
      ],
      "correctAnswer": "Compromising software or hardware at some point in its production/distribution before it reaches the end user"
    },
    {
      "id": "cy-adv-008",
      "difficulty": "Advanced",
      "question": "What is the purpose of a Certificate Authority (CA) in PKI (Public Key Infrastructure)?",
      "options": [
        "Storing user passwords",
        "Issuing and verifying digital certificates that bind public keys to identities",
        "Encrypting all network traffic directly",
        "Managing DNS resolution"
      ],
      "correctAnswer": "Issuing and verifying digital certificates that bind public keys to identities"
    },
    {
      "id": "cy-adv-009",
      "difficulty": "Advanced",
      "question": "What does 'perfect forward secrecy' provide in a communication protocol?",
      "options": [
        "Guaranteed message delivery",
        "Ensures past session keys can't be compromised even if a long-term private key is later exposed",
        "Faster encryption speeds",
        "Unlimited key reuse safely"
      ],
      "correctAnswer": "Ensures past session keys can't be compromised even if a long-term private key is later exposed"
    },
    {
      "id": "cy-adv-010",
      "difficulty": "Advanced",
      "question": "What is the purpose of a honeypot in security?",
      "options": [
        "Storing production data safely",
        "A decoy system designed to attract and analyze attacker behavior",
        "Speeding up legitimate traffic",
        "A type of password hashing algorithm"
      ],
      "correctAnswer": "A decoy system designed to attract and analyze attacker behavior"
    },
    {
      "id": "cy-beg-022",
      "difficulty": "Beginner",
      "question": "What is a keylogger?",
      "options": [
        "A tool to manage passwords securely",
        "Malicious software or hardware that records keystrokes to steal information",
        "A firewall configuration tool",
        "An encryption algorithm"
      ],
      "correctAnswer": "Malicious software or hardware that records keystrokes to steal information"
    },
    {
      "id": "cy-beg-023",
      "difficulty": "Beginner",
      "question": "What does 'authentication' verify?",
      "options": [
        "What actions a user is allowed to perform",
        "That a user or system is who they claim to be",
        "The speed of a network connection",
        "The integrity of a file"
      ],
      "correctAnswer": "That a user or system is who they claim to be"
    },
    {
      "id": "cy-beg-024",
      "difficulty": "Beginner",
      "question": "What does 'authorization' determine, as distinct from authentication?",
      "options": [
        "A user's identity",
        "What actions or resources an already-authenticated user is permitted to access",
        "The strength of a password",
        "The encryption algorithm used"
      ],
      "correctAnswer": "What actions or resources an already-authenticated user is permitted to access"
    },
    {
      "id": "cy-beg-025",
      "difficulty": "Beginner",
      "question": "What is a botnet?",
      "options": [
        "A network of legitimate customer service bots",
        "A network of compromised devices controlled remotely, often used for attacks like DDoS",
        "A type of firewall",
        "A password management tool"
      ],
      "correctAnswer": "A network of compromised devices controlled remotely, often used for attacks like DDoS"
    },
    {
      "id": "cy-int-019",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a security awareness training program for employees?",
      "options": [
        "Teaching employees to write secure code only",
        "Reducing human-related security risks like falling for phishing by educating staff on threats and best practices",
        "Replacing the need for firewalls",
        "Managing IT hardware inventory"
      ],
      "correctAnswer": "Reducing human-related security risks like falling for phishing by educating staff on threats and best practices"
    },
    {
      "id": "cy-int-020",
      "difficulty": "Intermediate",
      "question": "What does 'least common mechanism' mean as a security design principle?",
      "options": [
        "Using the most popular security tool available",
        "Minimizing shared mechanisms between users/processes to reduce the risk of information leaking across them",
        "Using only open-source software",
        "Avoiding encryption to simplify systems"
      ],
      "correctAnswer": "Minimizing shared mechanisms between users/processes to reduce the risk of information leaking across them"
    },
    {
      "id": "cy-adv-011",
      "difficulty": "Advanced",
      "question": "What is a Sybil attack in the context of distributed/peer-to-peer systems?",
      "options": [
        "A single powerful server attack",
        "An attacker creating many fake identities to gain disproportionate influence over a network",
        "A type of SQL injection",
        "A firewall misconfiguration"
      ],
      "correctAnswer": "An attacker creating many fake identities to gain disproportionate influence over a network"
    },
    {
      "id": "cy-adv-012",
      "difficulty": "Advanced",
      "question": "What does homomorphic encryption enable?",
      "options": [
        "Faster decryption only",
        "Performing computations directly on encrypted data without needing to decrypt it first",
        "Compressing encrypted files",
        "Automatically rotating encryption keys"
      ],
      "correctAnswer": "Performing computations directly on encrypted data without needing to decrypt it first"
    },
    {
      "id": "cy-adv-013",
      "difficulty": "Advanced",
      "question": "What is the purpose of a zero-trust security architecture?",
      "options": [
        "Trusting all devices inside the corporate network by default",
        "Never automatically trusting any user or device, verifying every access request regardless of network location",
        "Eliminating the need for authentication",
        "Relying solely on perimeter firewalls"
      ],
      "correctAnswer": "Never automatically trusting any user or device, verifying every access request regardless of network location"
    },
    {
      "id": "cy-adv-014",
      "difficulty": "Advanced",
      "question": "What is a Time-of-Check to Time-of-Use (TOCTOU) vulnerability?",
      "options": [
        "A password expiration bug",
        "A race condition where a resource's state changes between when it's checked and when it's used",
        "A DNS misconfiguration",
        "A weak encryption cipher"
      ],
      "correctAnswer": "A race condition where a resource's state changes between when it's checked and when it's used"
    },
    {
      "id": "cy-adv-015",
      "difficulty": "Advanced",
      "question": "What does 'attack surface reduction' aim to achieve?",
      "options": [
        "Increasing the number of exposed services for flexibility",
        "Minimizing the number of potential entry points an attacker could exploit",
        "Speeding up network throughput",
        "Simplifying the user interface"
      ],
      "correctAnswer": "Minimizing the number of potential entry points an attacker could exploit"
    }
  ]
};
export const QUIZFORGE_CYBERSECURITY_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
