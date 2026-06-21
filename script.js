/**
 * System Design Masterclass — Modular JavaScript
 * Handles navigation, progress tracking, and dynamic quiz rendering.
 */

// ─── Course Navigation Config ───────────────────────────────────────────────
const COURSE_MODULES = [
  { id: 'section-1', number: 1, title: 'Prerequisites & Foundations', available: true },
  { id: 'section-2', number: 2, title: 'Introduction to System Design', available: true },
  { id: 'section-3', number: 3, title: 'Requirements Engineering & Constraints', available: true },
  { id: 'section-4', number: 4, title: 'High-Level Design (HLD) Architecture', available: true },
  { id: 'section-5', number: 5, title: 'API Design & Communication Patterns', available: true },
  { id: 'section-6', number: 6, title: 'Data Modeling & Database Selection', available: true },
  { id: 'section-7', number: 7, title: 'Caching Strategies', available: true },
  { id: 'section-8', number: 8, title: 'Load Balancing & Horizontal Scaling', available: true },
  { id: 'section-9', number: 9, title: 'Message Queues & Async Processing', available: true },
  { id: 'section-10', number: 10, title: 'Low-Level Design (LLD) Fundamentals', available: true },
  { id: 'section-11', number: 11, title: 'OOP Design Patterns for LLD', available: true },
  { id: 'section-12', number: 12, title: 'Concurrency & Thread Safety', available: true },
  { id: 'section-13', number: 13, title: 'Reliability, Fault Tolerance & CAP', available: true },
  { id: 'section-14', number: 14, title: 'Security in System Design', available: true },
  { id: 'section-15', number: 15, title: 'Observability & Monitoring', available: true },
  { id: 'section-16', number: 16, title: 'Case Study: URL Shortener', available: true },
  { id: 'section-17', number: 17, title: 'Case Study: Chat System', available: true },
  { id: 'section-18', number: 18, title: 'Case Study: News Feed', available: true },
  { id: 'section-19', number: 19, title: 'Interview Framework & Best Practices', available: true },
  { id: 'section-20', number: 20, title: 'Capstone Review & Next Steps', available: true }
];

// ─── Quiz Data (Sections 1–20 — Full Arrays) ──────────────────────────────────
const QUIZ_DATA = {
  'section-1': {
    title: 'Module 01 Assessment: Prerequisites & Foundations',
    questions: [
      {
        id: 's1-q1',
        question: 'In the island cartographer analogy, what do "network lanes" represent in a distributed system?',
        options: [
          { text: 'Physical undersea cables only', correct: false },
          { text: 'APIs, message queues, and database connections between services', correct: true },
          { text: 'The user interface navigation paths', correct: false },
          { text: 'Load balancer routing tables exclusively', correct: false }
        ],
        explanation: 'Network lanes represent the communication channels between software services — REST APIs, gRPC calls, message queues (Kafka, RabbitMQ), and database connections. Just as shipping lanes connect islands, these protocols connect distributed components.'
      },
      {
        id: 's1-q2',
        question: 'Which transport protocol would be MOST appropriate for a live video streaming application where occasional packet loss is acceptable?',
        options: [
          { text: 'TCP, because it guarantees ordered delivery', correct: false },
          { text: 'UDP, because low latency matters more than guaranteed delivery', correct: true },
          { text: 'HTTP/2, because it multiplexes streams', correct: false },
          { text: 'SMTP, because it handles large payloads', correct: false }
        ],
        explanation: 'UDP is fire-and-forget — it does not retransmit lost packets or guarantee ordering. For live video, a dropped frame is less disruptive than a delayed frame caused by TCP retransmission. Speed beats reliability here.'
      },
      {
        id: 's1-q3',
        question: 'What is the primary role of DNS in system design beyond name resolution?',
        options: [
          { text: 'Encrypting HTTP traffic via TLS', correct: false },
          { text: 'Load distribution through round-robin and geo-routing', correct: true },
          { text: 'Storing session data for web applications', correct: false },
          { text: 'Compiling source code for deployment', correct: false }
        ],
        explanation: 'DNS translates domain names to IP addresses, but it is also a first-layer load distribution mechanism. Round-robin DNS returns different IPs for the same domain, and geo-DNS routes users to the nearest data center — both critical in global system design.'
      },
      {
        id: 's1-q4',
        question: 'A system handles 5,000 requests per second. Which metric does this describe?',
        options: [
          { text: 'Latency', correct: false },
          { text: 'Bandwidth', correct: false },
          { text: 'Throughput', correct: true },
          { text: 'Propagation delay', correct: false }
        ],
        explanation: 'Throughput measures the number of completed operations per unit of time (RPS/QPS). Latency is how long a single request takes. Bandwidth is data pipe width (Mbps). Propagation delay is signal travel time across a physical medium.'
      },
      {
        id: 's1-q5',
        question: 'Which database characteristic makes SQL databases preferred for financial transaction systems?',
        options: [
          { text: 'Schema-less document storage', correct: false },
          { text: 'Horizontal sharding as the default scaling model', correct: false },
          { text: 'ACID transactions guaranteeing atomicity and consistency', correct: true },
          { text: 'Eventual consistency for higher availability', correct: false }
        ],
        explanation: 'ACID (Atomicity, Consistency, Isolation, Durability) ensures that financial transactions either complete fully or roll back entirely — no partial transfers. SQL databases like PostgreSQL provide strong ACID guarantees that NoSQL systems often relax.'
      },
      {
        id: 's1-q6',
        question: 'Why does the memory hierarchy explain why caching exists at every layer of a system?',
        options: [
          { text: 'All storage types have identical speed and cost', correct: false },
          { text: 'Faster storage is always larger than slower storage', correct: false },
          { text: 'Each level is significantly slower but larger — caching places hot data in faster tiers', correct: true },
          { text: 'CPU cache is slower than network disk access', correct: false }
        ],
        explanation: 'The memory hierarchy shows a speed-size trade-off: CPU cache (~ns) → RAM (~100ns) → SSD (~100μs) → Network (~ms). Caching stores frequently accessed data in faster tiers to avoid expensive trips to slower storage — this principle applies from CPU L1 cache to CDN edge servers.'
      },
      {
        id: 's1-q7',
        question: 'What does Big-O notation help system designers estimate?',
        options: [
          { text: 'The exact monthly cloud bill for a service', correct: false },
          { text: 'How algorithm or query cost grows as input size increases', correct: true },
          { text: 'The physical weight of server hardware', correct: false },
          { text: 'The number of developers needed on a team', correct: false }
        ],
        explanation: 'Big-O describes the growth rate of time or space complexity relative to input size. O(1) hash lookups vs O(n) linear scans directly inform whether a design will scale — a full table scan on 1 billion rows is a design failure, not an implementation detail.'
      },
      {
        id: 's1-q8',
        question: 'In the context of databases, what does creating an INDEX on a column primarily trade off?',
        options: [
          { text: 'Read speed for write speed', correct: false },
          { text: 'Write speed for read speed', correct: true },
          { text: 'Storage space for network bandwidth', correct: false },
          { text: 'Consistency for availability', correct: false }
        ],
        explanation: 'Indexes are like a book\'s table of contents — they accelerate reads (SELECT queries) but slow writes (INSERT/UPDATE) because the index structure must be updated alongside the table. This read-vs-write trade-off appears constantly in system design.'
      },
      {
        id: 's1-q9',
        question: 'Which tool is recommended in this course for creating hand-drawn-style architecture diagrams suitable for interviews?',
        options: [
          { text: 'Microsoft Word', correct: false },
          { text: 'Excalidraw', correct: true },
          { text: 'Git', correct: false },
          { text: 'Docker Compose', correct: false }
        ],
        explanation: 'Excalidraw produces clean, hand-drawn-style diagrams quickly — ideal for whiteboard-style system design interviews. draw.io is better for formal documentation, and Mermaid is diagram-as-code for Markdown.'
      },
      {
        id: 's1-q10',
        question: 'What is the recommended approach to studying this masterclass for maximum retention?',
        options: [
          { text: 'Skip directly to case studies and learn theory later', correct: false },
          { text: 'Read passively without taking notes or drawing diagrams', correct: false },
          { text: 'Read sequentially, redraw diagrams from memory, and complete every quiz', correct: true },
          { text: 'Memorize all quiz answers without reading explanations', correct: false }
        ],
        explanation: 'Active recall — redrawing diagrams, explaining concepts aloud, and testing with quizzes — produces dramatically better retention than passive reading. Sequential study ensures foundational concepts (networking, databases) are in place before advanced topics (CAP, sharding).'
      }
    ]
  },

  'section-2': {
    title: 'Module 02 Assessment: Introduction to System Design',
    questions: [
      {
        id: 's2-q1',
        question: 'What is the primary focus of system design as a discipline?',
        options: [
          { text: 'Choosing between React and Vue for the frontend', correct: false },
          { text: 'Writing unit tests for individual functions', correct: false },
          { text: 'Defining architecture, components, and data flows to satisfy requirements at scale', correct: true },
          { text: 'Optimizing CSS for faster page rendering', correct: false }
        ],
        explanation: 'System design operates at the architecture layer — deciding how services communicate, where state lives, how the system scales, and what fails gracefully. It is distinct from feature development, UI framework selection, or unit testing.'
      },
      {
        id: 's2-q2',
        question: 'In the resort island analogy, what does "designing the entire resort" represent?',
        options: [
          { text: 'Writing a single API endpoint', correct: false },
          { text: 'System design — planning infrastructure, data flow, and failure modes', correct: true },
          { text: 'Fixing a CSS bug on the homepage', correct: false },
          { text: 'Deploying a Docker container', correct: false }
        ],
        explanation: 'Building one bungalow = feature development. Designing the entire resort (power, water, transport between islands, hurricane preparedness) = system design. You are the master planner deciding how all components interact reliably at scale.'
      },
      {
        id: 's2-q3',
        question: 'Which statement BEST distinguishes High-Level Design (HLD) from Low-Level Design (LLD)?',
        options: [
          { text: 'HLD uses Java; LLD uses Python', correct: false },
          { text: 'HLD focuses on architecture and components; LLD focuses on classes, methods, and schemas', correct: true },
          { text: 'HLD is only for startups; LLD is only for enterprises', correct: false },
          { text: 'HLD happens after deployment; LLD happens before coding', correct: false }
        ],
        explanation: 'HLD is the bird\'s-eye view: services, APIs, databases, scaling strategy (boxes and arrows). LLD is the zoomed-in view: class diagrams, method signatures, database schemas, concurrency handling, and design patterns.'
      },
      {
        id: 's2-q4',
        question: 'Which of the following is a Non-Functional Requirement (NFR) for a URL shortener?',
        options: [
          { text: 'Users can create a short URL from a long URL', correct: false },
          { text: 'Users can set a custom alias', correct: false },
          { text: 'Redirect latency must be under 100ms at p99', correct: true },
          { text: 'Users can view click analytics', correct: false }
        ],
        explanation: 'NFRs describe HOW WELL the system performs — latency, availability, scalability, security. "Users can create a short URL" is a Functional Requirement (what the system does). "Redirect under 100ms p99" is an NFR (performance quality).'
      },
      {
        id: 's2-q5',
        question: 'In the 7-step system design framework, what should you do BEFORE drawing architecture boxes?',
        options: [
          { text: 'Write the database schema in SQL', correct: false },
          { text: 'Clarify functional and non-functional requirements', correct: true },
          { text: 'Choose a cloud provider and instance types', correct: false },
          { text: 'Implement the API endpoints', correct: false }
        ],
        explanation: 'Step 1 is always "Clarify Requirements." Without knowing scale (DAU, QPS), latency targets, and consistency needs, every subsequent decision is a guess. Requirements drive architecture — not the other way around.'
      },
      {
        id: 's2-q6',
        question: 'A URL shortener has 100M new URLs/month and a 100:1 read-to-write ratio. Approximately how many reads/sec should you plan for?',
        options: [
          { text: '40 reads/sec', correct: false },
          { text: '400 reads/sec', correct: false },
          { text: '4,000 reads/sec', correct: true },
          { text: '400,000 reads/sec', correct: false }
        ],
        explanation: 'Writes/sec ≈ 100M / (30 × 24 × 3600) ≈ 40/sec. With a 100:1 read:write ratio, reads/sec ≈ 40 × 100 = 4,000/sec. This back-of-the-envelope math immediately tells you reads dominate → caching is essential.'
      },
      {
        id: 's2-q7',
        question: 'When proposing a system design, which sentence structure demonstrates senior-level thinking?',
        options: [
          { text: '"I\'ll use microservices because they\'re modern."', correct: false },
          { text: '"I\'m choosing X because [requirement]. The trade-off is Y, mitigated by Z."', correct: true },
          { text: '"Let\'s use the most expensive solution to be safe."', correct: false },
          { text: '"There is one correct architecture for every problem."', correct: false }
        ],
        explanation: 'Senior engineers articulate decisions with context: the requirement driving the choice, the trade-off accepted, and the mitigation strategy. "Microservices because modern" shows no reasoning. Every design has trade-offs — naming them is the skill.'
      },
      {
        id: 's2-q8',
        question: 'In an HLD diagram for a URL shortener, which component would you expect to see but would NOT appear in an LLD class diagram?',
        options: [
          { text: 'UrlService.createShortUrl() method', correct: false },
          { text: 'Load Balancer distributing traffic to API servers', correct: true },
          { text: 'Database table schema for URLs', correct: false },
          { text: 'Base62 encoding algorithm', correct: false }
        ],
        explanation: 'Load balancers, CDN edges, and database clusters are HLD infrastructure components — they appear as boxes in architecture diagrams. Method names, class structures, and encoding algorithms are LLD implementation details.'
      },
      {
        id: 's2-q9',
        question: 'Which architectural style consists of a single deployable unit that is simple to develop but harder to scale individual components?',
        options: [
          { text: 'Microservices', correct: false },
          { text: 'Serverless', correct: false },
          { text: 'Monolith', correct: true },
          { text: 'Event-driven mesh', correct: false }
        ],
        explanation: 'A monolith packages all functionality into one deployable application. It is simpler to develop, debug, and deploy initially. The trade-off is that you cannot scale individual components independently — scaling the entire app even if only one feature is bottlenecked.'
      },
      {
        id: 's2-q10',
        question: 'On the Consistency vs Availability trade-off spectrum, what does choosing strong consistency typically sacrifice?',
        options: [
          { text: 'Storage durability', correct: false },
          { text: 'Availability during network partitions', correct: true },
          { text: 'API documentation quality', correct: false },
          { text: 'Frontend rendering speed', correct: false }
        ],
        explanation: 'Per the CAP theorem (covered deeply in Module 13), during a network partition you must choose between Consistency and Availability. Strong consistency may require rejecting requests until all nodes agree — reducing availability. This trade-off is fundamental to distributed system design.'
      },
      {
        id: 's2-q11',
        question: 'What is the primary purpose of Step 2 (Back-of-the-Envelope Estimation) in the design framework?',
        options: [
          { text: 'Calculate the exact AWS bill to the penny', correct: false },
          { text: 'Determine the right order of magnitude for scale to drive architectural decisions', correct: true },
          { text: 'Write the final production code', correct: false },
          { text: 'Choose the programming language for the project', correct: false }
        ],
        explanation: 'You don\'t need exact numbers — you need the right order of magnitude. Knowing reads are 4,000/sec vs 4/sec vs 4M/sec completely changes whether you need caching, sharding, or a single server. Estimation is the compass for all subsequent decisions.'
      },
      {
        id: 's2-q12',
        question: 'Which of the following is an example of a Functional Requirement?',
        options: [
          { text: 'The system must achieve 99.99% uptime', correct: false },
          { text: 'API response time must be under 200ms', correct: false },
          { text: 'Users can redirect to the original URL via the short link', correct: true },
          { text: 'The system must handle 10K concurrent connections', correct: false }
        ],
        explanation: 'Functional requirements describe WHAT the system does — features and behaviors. "Users can redirect via short link" is a feature. Uptime, latency, and concurrency limits are Non-Functional Requirements describing HOW WELL the system performs.'
      }
    ]
  },

  'section-3': {
    title: 'Module 03 Assessment: Requirements Engineering & Constraints',
    questions: [
      {
        id: 's3-q1',
        question: 'In the tide surveyor analogy, what does skipping the requirements survey equate to in system design?',
        options: [
          { text: 'Writing code without a compiler', correct: false },
          { text: 'Building architecture without understanding scale, consistency, and failure forces', correct: true },
          { text: 'Choosing the wrong programming language', correct: false },
          { text: 'Deploying without a README file', correct: false }
        ],
        explanation: 'Just as a pier built without measuring tides will flood or collapse, a system designed without requirements engineering will fail under real-world forces — unexpected scale, consistency demands, or regulatory constraints.'
      },
      {
        id: 's3-q2',
        question: 'Which is the BEST example of a testable functional requirement?',
        options: [
          { text: 'The system should be user-friendly', correct: false },
          { text: 'Users can generate a shareable link valid for 7 days', correct: true },
          { text: 'The system must be highly available', correct: false },
          { text: 'Performance should be excellent', correct: false }
        ],
        explanation: 'Testable functional requirements specify concrete behaviors with measurable criteria. "Shareable link valid for 7 days" can be verified with a test. "User-friendly" and "excellent performance" are vague NFRs, not testable FRs.'
      },
      {
        id: 's3-q3',
        question: 'What does "99.9% availability" translate to in maximum downtime per year?',
        options: [
          { text: 'About 8.7 hours', correct: true },
          { text: 'About 87 minutes', correct: false },
          { text: 'About 8.7 minutes', correct: false },
          { text: 'Zero downtime guaranteed', correct: false }
        ],
        explanation: '99.9% (three nines) = 0.1% downtime = 0.001 × 365 × 24 ≈ 8.76 hours per year. Each additional nine reduces downtime by 10×: 99.99% ≈ 52 minutes, 99.999% ≈ 5.2 minutes.'
      },
      {
        id: 's3-q4',
        question: 'Which category does GDPR data residency fall under?',
        options: [
          { text: 'Functional requirement', correct: false },
          { text: 'Non-functional requirement', correct: false },
          { text: 'Regulatory constraint', correct: true },
          { text: 'Optional nice-to-have', correct: false }
        ],
        explanation: 'GDPR mandates that EU citizen data be stored/processed according to specific rules — this is a hard regulatory constraint, not a performance target (NFR) or feature (FR). Ignoring it has legal consequences.'
      },
      {
        id: 's3-q5',
        question: 'In MoSCoW prioritization, "Custom alias URLs" for a URL shortener v1 is typically classified as:',
        options: [
          { text: 'Must Have', correct: false },
          { text: 'Should Have', correct: true },
          { text: 'Won\'t Have', correct: false },
          { text: 'Could Have only if legally required', correct: false }
        ],
        explanation: 'Core redirect and create functionality are Must Haves. Custom aliases are valuable but not blocking for launch — they are Should Haves. Analytics might be Could Have. QR codes might be Won\'t Have for v1.'
      },
      {
        id: 's3-q6',
        question: 'Why should you ask about read-to-write ratio during requirements clarification?',
        options: [
          { text: 'It determines the programming language', correct: false },
          { text: 'It drives caching strategy and database read replica decisions', correct: true },
          { text: 'It only matters for mobile apps', correct: false },
          { text: 'It replaces the need for load balancing', correct: false }
        ],
        explanation: 'A 100:1 read:write ratio means reads dominate — aggressive caching (Redis), read replicas, and CDN become essential. A 1:1 ratio suggests different optimization priorities. This single number reshapes your entire HLD.'
      },
      {
        id: 's3-q7',
        question: 'On the Fast-Cheap-Good constraint triangle, what does choosing "Fast" and "Cheap" typically sacrifice?',
        options: [
          { text: 'Time', correct: false },
          { text: 'Cost', correct: false },
          { text: 'Quality', correct: true },
          { text: 'Security', correct: false }
        ],
        explanation: 'The iron triangle: you can optimize for two of Fast (time), Cheap (cost), and Good (quality). Fast + Cheap means cutting corners on quality — fewer features, less testing, simpler architecture.'
      },
      {
        id: 's3-q8',
        question: 'What is the difference between a constraint and a non-functional requirement?',
        options: [
          { text: 'They are identical terms', correct: false },
          { text: 'Constraints are immovable limits; NFRs are targets you optimize toward', correct: true },
          { text: 'Constraints only apply to mobile apps', correct: false },
          { text: 'NFRs are always more important than constraints', correct: false }
        ],
        explanation: 'Constraints are walls: "must use existing PostgreSQL," "must launch in 3 months," "must comply with HIPAA." NFRs are goals: "target 99.99% uptime," "p99 latency under 100ms." You optimize toward NFRs; you cannot violate constraints.'
      },
      {
        id: 's3-q9',
        question: 'Which clarification question helps determine if you need strong consistency?',
        options: [
          { text: 'What is the team\'s favorite IDE?', correct: false },
          { text: 'Can we lose data or show stale reads? Under what conditions?', correct: true },
          { text: 'What color should the UI be?', correct: false },
          { text: 'How many developers know Python?', correct: false }
        ],
        explanation: 'Consistency requirements directly impact database choice, replication strategy, and caching invalidation. A banking ledger needs strong consistency; a social media like counter can tolerate eventual consistency.'
      },
      {
        id: 's3-q10',
        question: 'The "ilities" interview trick involves running through which quality attributes?',
        options: [
          { text: 'Only scalability and latency', correct: false },
          { text: 'Scalability, availability, reliability, maintainability, security, latency, durability, cost', correct: true },
          { text: 'Only functional requirements', correct: false },
          { text: 'Programming language features', correct: false }
        ],
        explanation: 'When stuck in an interview, systematically checking scalability, availability, reliability, maintainability, security, latency, durability, and cost surfaces NFRs the interviewer expected you to ask about.'
      }
    ]
  },

  'section-4': {
    title: 'Module 04 Assessment: High-Level Design Architecture',
    questions: [
      {
        id: 's4-q1',
        question: 'What are the four questions a good HLD diagram should answer at a glance?',
        options: [
          { text: 'What language, framework, IDE, and OS?', correct: false },
          { text: 'Who calls whom, where data lives, failure points, and how traffic scales', correct: true },
          { text: 'Class names, method signatures, variable types, and imports', correct: false },
          { text: 'Sprint dates, team members, and budget', correct: false }
        ],
        explanation: 'HLD diagrams are architectural — they show component interactions, data storage, single points of failure, and scaling paths. Implementation details (classes, methods) belong in LLD.'
      },
      {
        id: 's4-q2',
        question: 'Martin Fowler\'s "MonolithFirst" recommendation suggests:',
        options: [
          { text: 'Always start with microservices for new products', correct: false },
          { text: 'Start with a monolith and extract services when scale/team demands it', correct: true },
          { text: 'Never use monoliths in production', correct: false },
          { text: 'Use serverless for all new products', correct: false }
        ],
        explanation: 'MonolithFirst argues that premature microservices add operational complexity before you understand domain boundaries. Start monolith, learn the domain, then extract services when independent scaling or team autonomy justifies the cost.'
      },
      {
        id: 's4-q3',
        question: 'In a three-tier architecture, which layer should contain business validation rules?',
        options: [
          { text: 'Presentation layer (controllers)', correct: false },
          { text: 'Business logic layer (services)', correct: true },
          { text: 'Data access layer (repositories)', correct: false },
          { text: 'Database layer (stored procedures only)', correct: false }
        ],
        explanation: 'Business rules belong in the business logic layer. Putting them in controllers creates an "anemic domain model." Putting them only in stored procedures couples logic to the database engine.'
      },
      {
        id: 's4-q4',
        question: 'What is the primary benefit of event-driven architecture?',
        options: [
          { text: 'Synchronous request-response with lower latency', correct: false },
          { text: 'Loose coupling between producers and consumers', correct: true },
          { text: 'Elimination of all databases', correct: false },
          { text: 'Guaranteed strong consistency across all services', correct: false }
        ],
        explanation: 'EDA decouples services via events — producers don\'t know or care about consumers. This enables independent scaling, resilience (consumers retry), and natural audit trails. Trade-off: eventual consistency and harder debugging.'
      },
      {
        id: 's4-q5',
        question: 'Why should read path and write path be designed separately in HLD?',
        options: [
          { text: 'They always use the same components', correct: false },
          { text: 'They often have different performance characteristics and caching strategies', correct: true },
          { text: 'Writes are never cached', correct: false },
          { text: 'Reads never touch the database', correct: false }
        ],
        explanation: 'Read paths are often cache-heavy (CDN, Redis) with eventual consistency acceptable. Write paths hit primary databases with consistency requirements. Designing them separately optimizes each for its dominant pattern.'
      },
      {
        id: 's4-q6',
        question: 'In HLD notation, what does a dashed arrow typically represent?',
        options: [
          { text: 'Synchronous HTTP call', correct: false },
          { text: 'Asynchronous or event-based communication', correct: true },
          { text: 'Failed request', correct: false },
          { text: 'Database replication', correct: false }
        ],
        explanation: 'Solid arrows = synchronous request/response (HTTP, gRPC). Dashed arrows = asynchronous communication (message queues, events). Consistent notation makes diagrams readable at a glance.'
      },
      {
        id: 's4-q7',
        question: 'When is serverless (FaaS) MOST appropriate?',
        options: [
          { text: 'Long-running stateful services with constant traffic', correct: false },
          { text: 'Spiky, infrequent, event-driven workloads', correct: true },
          { text: 'Systems requiring sub-millisecond latency always', correct: false },
          { text: 'Large monolithic applications', correct: false }
        ],
        explanation: 'Serverless excels at event-driven, spiky workloads (image processing on upload, scheduled jobs). Trade-offs: cold start latency, vendor lock-in, statelessness requirements. Poor fit for constant high-throughput stateful services.'
      },
      {
        id: 's4-q8',
        question: 'Conway\'s Law states that system architecture tends to mirror:',
        options: [
          { text: 'The cloud provider chosen', correct: false },
          { text: 'The communication structure of the organization', correct: true },
          { text: 'The programming language used', correct: false },
          { text: 'The database schema design', correct: false }
        ],
        explanation: 'Conway\'s Law: "Organizations design systems that mirror their communication structure." A company with 5 teams often ends up with ~5 services. This is why microservices work better with team-per-service organizational alignment.'
      },
      {
        id: 's4-q9',
        question: 'What is a key drawback of microservices compared to monoliths?',
        options: [
          { text: 'Cannot scale horizontally', correct: false },
          { text: 'Operational complexity — distributed debugging, deployment, monitoring', correct: true },
          { text: 'Cannot use SQL databases', correct: false },
          { text: 'Only works with Python', correct: false }
        ],
        explanation: 'Microservices add network latency, distributed tracing needs, service discovery, circuit breakers, and per-service CI/CD. These operational costs are justified at scale but painful for small teams.'
      },
      {
        id: 's4-q10',
        question: 'A "modular monolith" is best described as:',
        options: [
          { text: 'Multiple microservices in one repository', correct: false },
          { text: 'A single deployable unit with well-separated internal modules', correct: true },
          { text: 'A monolith that cannot be refactored', correct: false },
          { text: 'A serverless application', correct: false }
        ],
        explanation: 'A modular monolith keeps single-deployment simplicity while enforcing clear module boundaries internally. This is a pragmatic middle ground — easier to extract microservices later because boundaries already exist.'
      }
    ]
  },

  'section-5': {
    title: 'Module 05 Assessment: API Design & Communication Patterns',
    questions: [
      {
        id: 's5-q1',
        question: 'Which REST URL design follows resource-oriented conventions?',
        options: [
          { text: 'POST /api/createShortUrl', correct: false },
          { text: 'POST /api/v1/urls', correct: true },
          { text: 'GET /api/deleteUrl?id=123', correct: false },
          { text: 'POST /api/v1/url/create', correct: false }
        ],
        explanation: 'REST uses nouns (resources) not verbs (actions). POST /api/v1/urls creates a URL resource. HTTP verbs carry the action. Verbs in URLs (/create, /delete) are RPC-style anti-patterns.'
      },
      {
        id: 's5-q2',
        question: 'Why should mutations NEVER use HTTP GET?',
        options: [
          { text: 'GET is too slow for mutations', correct: false },
          { text: 'GET is idempotent and cacheable — mutations via GET cause unintended side effects on retry/cache', correct: true },
          { text: 'GET cannot return JSON', correct: false },
          { text: 'Browsers block GET requests', correct: false }
        ],
        explanation: 'GET is defined as safe and idempotent — caches, prefetchers, and crawlers may execute GET requests without user intent. A GET that deletes data would cause catastrophic bugs. Use DELETE, POST, or PUT for mutations.'
      },
      {
        id: 's5-q3',
        question: 'gRPC is BEST suited for which use case?',
        options: [
          { text: 'Public-facing REST APIs for web browsers', correct: false },
          { text: 'Internal microservice-to-microservice communication', correct: true },
          { text: 'Static file serving', correct: false },
          { text: 'Human-readable API documentation', correct: false }
        ],
        explanation: 'gRPC uses binary Protobuf over HTTP/2 — efficient and strongly typed, but not browser-friendly. It excels for internal service meshes where performance and code generation matter more than human readability.'
      },
      {
        id: 's5-q4',
        question: 'GraphQL\'s primary advantage over REST is:',
        options: [
          { text: 'Better server-side caching via HTTP', correct: false },
          { text: 'Clients request exactly the fields they need, avoiding over-fetching', correct: true },
          { text: 'Simpler server implementation', correct: false },
          { text: 'Native browser support without libraries', correct: false }
        ],
        explanation: 'GraphQL lets clients specify exact fields in a single query — a mobile app fetches 5 fields while a web dashboard fetches 20 from the same endpoint. Trade-off: complex server-side caching compared to HTTP cache headers on REST.'
      },
      {
        id: 's5-q5',
        question: 'What HTTP status code should be returned when a client exceeds rate limits?',
        options: [
          { text: '200 OK', correct: false },
          { text: '404 Not Found', correct: false },
          { text: '429 Too Many Requests', correct: true },
          { text: '500 Internal Server Error', correct: false }
        ],
        explanation: '429 Too Many Requests is the standard rate-limiting response. Include headers like X-RateLimit-Remaining and X-RateLimit-Reset so clients can back off intelligently.'
      },
      {
        id: 's5-q6',
        question: 'Why is idempotency critical for payment APIs?',
        options: [
          { text: 'Payments are always free', correct: false },
          { text: 'Network retries can cause duplicate charges without idempotency keys', correct: true },
          { text: 'Banks require GET requests for payments', correct: false },
          { text: 'Idempotency eliminates the need for databases', correct: false }
        ],
        explanation: 'Clients retry failed requests. Without idempotency, POST /payments called twice charges twice. Idempotency-Key headers let the server recognize duplicates and return the cached result instead of reprocessing.'
      },
      {
        id: 's5-q7',
        question: 'When should you choose asynchronous communication over synchronous?',
        options: [
          { text: 'User-facing login authentication', correct: false },
          { text: 'Sending email notifications after order placement', correct: true },
          { text: 'Real-time redirect for URL shortener', correct: false },
          { text: 'Fetching user profile on page load', correct: false }
        ],
        explanation: 'Async is ideal when the caller doesn\'t need an immediate response: emails, analytics, image processing, order fulfillment. Sync is needed for user-facing operations requiring immediate feedback (auth, redirects, search results).'
      },
      {
        id: 's5-q8',
        question: 'Which API versioning approach is most common and easiest to test?',
        options: [
          { text: 'URL versioning: /api/v1/users', correct: true },
          { text: 'Date-based versioning only', correct: false },
          { text: 'No versioning ever', correct: false },
          { text: 'Versioning via request body only', correct: false }
        ],
        explanation: 'URL versioning (/api/v1/, /api/v2/) is explicit, easy to test in a browser, and widely used (Stripe, Twitter, GitHub). Header versioning keeps URLs clean but is harder to test without tools.'
      },
      {
        id: 's5-q9',
        question: 'Which HTTP methods are naturally idempotent?',
        options: [
          { text: 'POST and PATCH only', correct: false },
          { text: 'GET, PUT, and DELETE', correct: true },
          { text: 'POST only', correct: false },
          { text: 'None — all methods require idempotency keys', correct: false }
        ],
        explanation: 'GET, PUT, DELETE produce the same result when called multiple times. POST creates new resources each call (not idempotent). PATCH may or may not be idempotent depending on implementation.'
      },
      {
        id: 's5-q10',
        question: 'OpenAPI (Swagger) specifications are primarily used for:',
        options: [
          { text: 'Compiling Java code', correct: false },
          { text: 'API documentation, client SDK generation, and mock servers', correct: true },
          { text: 'Database schema migration', correct: false },
          { text: 'Load testing production servers', correct: false }
        ],
        explanation: 'OpenAPI specs define endpoints, request/response schemas, and auth — generating interactive docs (Swagger UI), client libraries, and mock servers for frontend development without a live backend.'
      }
    ]
  },

  'section-6': {
    title: 'Module 06 Assessment: Data Modeling & Database Selection',
    questions: [
      {
        id: 's6-q1',
        question: 'What should you model BEFORE choosing between SQL and NoSQL?',
        options: [
          { text: 'The cloud provider billing plan', correct: false },
          { text: 'Entities and their relationships (ER diagram)', correct: true },
          { text: 'The frontend CSS framework', correct: false },
          { text: 'The CI/CD pipeline', correct: false }
        ],
        explanation: 'Entity-relationship modeling is storage-agnostic. Understand your nouns (User, Order) and relationships (creates, contains) first — then choose SQL or NoSQL based on access patterns, consistency needs, and scale.'
      },
      {
        id: 's6-q2',
        question: 'Why is an index on the `code` column critical for a URL shortener?',
        options: [
          { text: 'It makes INSERT faster', correct: false },
          { text: 'Redirect lookups by short code are the dominant read pattern — index enables O(log n) retrieval', correct: true },
          { text: 'Indexes are required by PostgreSQL', correct: false },
          { text: 'It encrypts the URL data', correct: false }
        ],
        explanation: 'Every redirect does SELECT WHERE code = ?. Without an index, this is a full table scan — catastrophic at billions of rows. The index trades slightly slower writes for dramatically faster reads on the hot path.'
      },
      {
        id: 's6-q3',
        question: 'When is denormalization preferred over normalization?',
        options: [
          { text: 'Write-heavy banking systems', correct: false },
          { text: 'Read-heavy systems where query speed matters more than storage redundancy', correct: true },
          { text: 'Systems requiring strict ACID compliance', correct: false },
          { text: 'When data never changes', correct: false }
        ],
        explanation: 'Denormalization duplicates data for faster reads (single document fetch vs JOINs). Acceptable when reads dominate and some redundancy is tolerable — feeds, analytics dashboards. Banking needs normalization for consistency.'
      },
      {
        id: 's6-q4',
        question: 'What is "polyglot persistence"?',
        options: [
          { text: 'Using only one database for everything', correct: false },
          { text: 'Using multiple database types, each optimized for a specific access pattern', correct: true },
          { text: 'Storing data only in memory', correct: false },
          { text: 'A database that speaks multiple languages', correct: false }
        ],
        explanation: 'Polyglot persistence means PostgreSQL for transactions + Redis for caching + Elasticsearch for search + Cassandra for time-series — each store optimized for its job. Common and expected at scale.'
      },
      {
        id: 's6-q5',
        question: 'What makes a good shard key?',
        options: [
          { text: 'A field with few distinct values (e.g., country with 5 values)', correct: false },
          { text: 'A field that distributes data evenly (e.g., hashed user_id)', correct: true },
          { text: 'Always the primary key without hashing', correct: false },
          { text: 'The largest column in the table', correct: false }
        ],
        explanation: 'A bad shard key (country, boolean flags) creates hot shards — one shard gets 90% of traffic. Good keys (hashed user_id, UUID) distribute evenly. Design queries to hit a single shard and avoid cross-shard JOINs.'
      },
      {
        id: 's6-q6',
        question: 'Which database is BEST for full-text search across millions of documents?',
        options: [
          { text: 'Redis', correct: false },
          { text: 'Elasticsearch', correct: true },
          { text: 'Standard PostgreSQL without extensions', correct: false },
          { text: 'Memcached', correct: false }
        ],
        explanation: 'Elasticsearch uses inverted indexes optimized for text search, relevance scoring, and faceted queries. PostgreSQL has basic full-text search but Elasticsearch is purpose-built for search at scale.'
      },
      {
        id: 's6-q7',
        question: 'Horizontal partitioning (sharding) splits data by:',
        options: [
          { text: 'Columns — moving some columns to a separate table', correct: false },
          { text: 'Rows — distributing rows across multiple database nodes by a shard key', correct: true },
          { text: 'Deleting old data automatically', correct: false },
          { text: 'Compressing rows', correct: false }
        ],
        explanation: 'Horizontal sharding splits rows across nodes (user_id % 3 → shard 0/1/2). Vertical partitioning splits columns or tables by feature. Sharding enables scale beyond a single machine\'s capacity.'
      },
      {
        id: 's6-q8',
        question: 'For a session store requiring sub-millisecond lookups, which storage is most appropriate?',
        options: [
          { text: 'PostgreSQL on HDD', correct: false },
          { text: 'Redis (in-memory key-value store)', correct: true },
          { text: 'MongoDB with disk-only storage', correct: false },
          { text: 'Flat files on S3', correct: false }
        ],
        explanation: 'Redis stores data in memory — sub-millisecond access, perfect for sessions, hot key caching, and rate limiting counters. Data can be persisted to disk but the hot path is always in RAM.'
      },
      {
        id: 's6-q9',
        question: 'The principle "design schema around access patterns" means:',
        options: [
          { text: 'Make the ER diagram as pretty as possible', correct: false },
          { text: 'Structure data based on how it will be read and written, not just logical entity structure', correct: true },
          { text: 'Always use exactly three tables', correct: false },
          { text: 'Avoid indexes to save storage', correct: false }
        ],
        explanation: 'How you query data drives schema design. A feed system might denormalize posts into a timeline table (optimized for "get my feed") rather than normalizing into 5 JOINed tables optimized for storage elegance.'
      },
      {
        id: 's6-q10',
        question: 'When would you choose a graph database like Neo4j?',
        options: [
          { text: 'Simple key-value session storage', correct: false },
          { text: 'Social network friend-of-friend traversal and recommendation paths', correct: true },
          { text: 'Storing static images', correct: false },
          { text: 'Batch payroll processing', correct: false }
        ],
        explanation: 'Graph databases excel at relationship traversal — "friends of friends within 3 hops" is natural in Neo4j but requires expensive recursive JOINs in SQL. Use the right tool for the access pattern.'
      }
    ]
  },

  'section-7': {
    title: 'Module 07 Assessment: Caching Strategies',
    questions: [
      {
        id: 's7-q1',
        question: 'What is the primary purpose of a distributed cache hierarchy?',
        options: [
          { text: 'Replace databases entirely', correct: false },
          { text: 'Keep hot data as close to the consumer as possible to reduce latency and DB load', correct: true },
          { text: 'Encrypt all network traffic', correct: false },
          { text: 'Eliminate the need for load balancers', correct: false }
        ],
        explanation: 'Each cache layer (browser → CDN → Redis → DB) absorbs traffic before it hits the next slower layer. Hot data served from memory (~1ms) instead of disk (~10-50ms) dramatically improves latency and reduces database pressure.'
      },
      {
        id: 's7-q2',
        question: 'In the cache-aside pattern, what happens on a cache MISS?',
        options: [
          { text: 'Return an error to the client', correct: false },
          { text: 'Read from database, populate cache, then return data', correct: true },
          { text: 'Wait indefinitely for cache to refresh', correct: false },
          { text: 'Delete the database record', correct: false }
        ],
        explanation: 'Cache-aside (lazy loading): app checks cache first. On miss, reads from DB, writes result to cache with TTL, then returns. This is the most common pattern due to its simplicity.'
      },
      {
        id: 's7-q3',
        question: 'Which caching pattern writes to cache AND database synchronously on every write?',
        options: [
          { text: 'Cache-aside', correct: false },
          { text: 'Write-through', correct: true },
          { text: 'Write-behind', correct: false },
          { text: 'Read-through only', correct: false }
        ],
        explanation: 'Write-through ensures cache and DB are always consistent by writing to both synchronously. Trade-off: higher write latency. Write-behind writes to cache first and flushes to DB asynchronously — faster but riskier.'
      },
      {
        id: 's7-q4',
        question: 'What does a CDN primarily optimize?',
        options: [
          { text: 'Database query performance', correct: false },
          { text: 'Latency by serving content from edge servers geographically close to users', correct: true },
          { text: 'Server-side business logic execution', correct: false },
          { text: 'Message queue throughput', correct: false }
        ],
        explanation: 'CDNs cache static and dynamic content at edge locations worldwide. A user in Tokyo hits a Tokyo edge node (~20ms) instead of a US origin server (~300ms). Critical for static assets and cacheable API responses.'
      },
      {
        id: 's7-q5',
        question: 'What is the default eviction policy in Redis?',
        options: [
          { text: 'FIFO (First In First Out)', correct: false },
          { text: 'LRU (Least Recently Used)', correct: true },
          { text: 'Random eviction', correct: false },
          { text: 'Never evict', correct: false }
        ],
        explanation: 'LRU evicts the item that hasn\'t been accessed for the longest time. It\'s a strong general-purpose policy. LFU (Least Frequently Used) is better for long-tail popularity patterns like viral content.'
      },
      {
        id: 's7-q6',
        question: 'What is "write-invalidate" cache invalidation?',
        options: [
          { text: 'Update the cache entry directly on every write', correct: false },
          { text: 'Delete the cache key on DB write; next read repopulates from DB', correct: true },
          { text: 'Never update cache after initial population', correct: false },
          { text: 'Disable caching entirely on writes', correct: false }
        ],
        explanation: 'Write-invalidate: on DB update, delete the cache key (redis.del). The next read misses cache, fetches fresh data from DB, and repopulates cache. Simple and commonly paired with cache-aside.'
      },
      {
        id: 's7-q7',
        question: 'A cache stampede (thundering herd) occurs when:',
        options: [
          { text: 'Cache memory is too large', correct: false },
          { text: 'A popular cache key expires and thousands of concurrent requests all hit the database simultaneously', correct: true },
          { text: 'CDN edge servers go offline', correct: false },
          { text: 'TTL is set too long', correct: false }
        ],
        explanation: 'When a hot key expires, all waiting requests miss cache simultaneously and hammer the DB. Mitigations: mutex locks (one rebuilds, others wait), probabilistic early refresh, or background refresh before expiration.'
      },
      {
        id: 's7-q8',
        question: 'Why add jitter to TTL values?',
        options: [
          { text: 'To make cache keys harder to guess', correct: false },
          { text: 'To prevent synchronized mass expiration that could trigger cache stampedes', correct: true },
          { text: 'To increase cache hit rate to 100%', correct: false },
          { text: 'Jitter is only used in message queues', correct: false }
        ],
        explanation: 'If 10,000 keys are set with TTL=3600 at the same time, they all expire simultaneously — causing a stampede. Adding random jitter (±10%) spreads expirations over time, smoothing database load.'
      },
      {
        id: 's7-q9',
        question: 'For a URL shortener with 100:1 read-to-write ratio, where is caching MOST impactful?',
        options: [
          { text: 'On the write path only', correct: false },
          { text: 'On the redirect read path — caching short code → long URL mappings', correct: true },
          { text: 'Caching is not useful for URL shorteners', correct: false },
          { text: 'Only in the database layer', correct: false }
        ],
        explanation: 'With reads dominating 100:1, caching redirect lookups in Redis (sub-ms) vs PostgreSQL (~10ms) at 4,000 reads/sec dramatically reduces DB load and improves p99 latency. This is the highest-ROI optimization for a URL shortener.'
      },
      {
        id: 's7-q10',
        question: 'Write-behind caching is BEST suited when:',
        options: [
          { text: 'Strong consistency is mandatory (banking)', correct: false },
          { text: 'Write throughput is critical and brief data loss on crash is acceptable', correct: true },
          { text: 'Reads are rare', correct: false },
          { text: 'You have no database', correct: false }
        ],
        explanation: 'Write-behind: write to cache immediately, async flush to DB later. Extremely fast writes but if the cache node crashes before flush, data is lost. Suitable for analytics, metrics, non-critical counters — not financial transactions.'
      }
    ]
  },

  'section-8': {
    title: 'Module 08 Assessment: Load Balancing & Horizontal Scaling',
    questions: [
      {
        id: 's8-q1',
        question: 'What is the key advantage of horizontal scaling over vertical scaling?',
        options: [
          { text: 'Horizontal scaling is always cheaper per unit', correct: false },
          { text: 'You can add more machines to handle growth with no theoretical ceiling', correct: true },
          { text: 'Horizontal scaling requires no load balancer', correct: false },
          { text: 'Vertical scaling is always inferior', correct: false }
        ],
        explanation: 'Vertical scaling hits hardware ceilings and diminishing returns (10× cost for 2× performance). Horizontal scaling adds machines — the path to internet scale. Requires load balancing and stateless design but has no upper bound.'
      },
      {
        id: 's8-q2',
        question: 'Layer 7 load balancers can route traffic based on:',
        options: [
          { text: 'IP address and port only', correct: false },
          { text: 'HTTP URL path, headers, and cookies', correct: true },
          { text: 'Database query content', correct: false },
          { text: 'CPU temperature of backend servers', correct: false }
        ],
        explanation: 'L7 (application layer) inspects HTTP content — route /api/* to API servers, /static/* to CDN, route by cookie for A/B testing. L4 only sees IP+port — faster but less flexible.'
      },
      {
        id: 's8-q3',
        question: 'Which load balancing algorithm routes to the server with the fewest active connections?',
        options: [
          { text: 'Round Robin', correct: false },
          { text: 'Least Connections', correct: true },
          { text: 'Random', correct: false },
          { text: 'IP Hash only', correct: false }
        ],
        explanation: 'Least Connections sends the next request to the server handling fewest concurrent connections. Better than Round Robin when request durations vary (some requests take 10ms, others 10s).'
      },
      {
        id: 's8-q4',
        question: 'Why should application servers be stateless for horizontal scaling?',
        options: [
          { text: 'Stateless servers use less electricity', correct: false },
          { text: 'Any server can handle any request — enabling arbitrary load distribution and easy failover', correct: true },
          { text: 'Stateful servers cannot use HTTP', correct: false },
          { text: 'Databases require stateless servers', correct: false }
        ],
        explanation: 'Stateless servers store no session data locally — it lives in Redis/DB. Any request can go to any server. Stateful servers require sticky sessions, complicating scaling, deployments, and failover.'
      },
      {
        id: 's8-q5',
        question: 'Consistent hashing is particularly useful for:',
        options: [
          { text: 'Routing all traffic to one server', correct: false },
          { text: 'Distributed caches and sharding — minimizing redistribution when nodes are added/removed', correct: true },
          { text: 'SSL termination', correct: false },
          { text: 'Database backups', correct: false }
        ],
        explanation: 'Consistent hashing maps keys to nodes on a hash ring. Adding/removing a node only redistributes keys adjacent to it — not the entire keyspace. Essential for distributed caches (Memcached, Redis Cluster) and database sharding.'
      },
      {
        id: 's8-q6',
        question: 'What is the purpose of load balancer health checks?',
        options: [
          { text: 'Measure user satisfaction', correct: false },
          { text: 'Automatically remove unhealthy backends from rotation', correct: true },
          { text: 'Encrypt traffic between servers', correct: false },
          { text: 'Cache static assets', correct: false }
        ],
        explanation: 'Health checks (HTTP GET /health every N seconds) detect failed servers. Unhealthy backends are removed from rotation automatically — traffic only goes to healthy instances. Critical for zero-downtime deployments.'
      },
      {
        id: 's8-q7',
        question: 'Sticky sessions (session affinity) are problematic because:',
        options: [
          { text: 'They improve performance too much', correct: false },
          { text: 'They complicate scaling, failover, and deployments by binding users to specific servers', correct: true },
          { text: 'They only work with HTTPS', correct: false },
          { text: 'They require a CDN', correct: false }
        ],
        explanation: 'Sticky sessions route the same user to the same server. If that server dies, the session is lost. Adding/removing servers disrupts affinity. Better: externalize session state to Redis so any server can serve any user.'
      },
      {
        id: 's8-q8',
        question: 'An auto-scaling policy that adds instances when CPU > 70% for 3 minutes is an example of:',
        options: [
          { text: 'Vertical scaling', correct: false },
          { text: 'Reactive horizontal scaling based on metrics', correct: true },
          { text: 'Manual capacity planning', correct: false },
          { text: 'Database sharding', correct: false }
        ],
        explanation: 'Auto-scaling groups dynamically add/remove instances based on metrics (CPU, request count, queue depth). Scale out under load, scale in when idle — paying only for needed capacity while maintaining performance.'
      },
      {
        id: 's8-q9',
        question: 'Weighted Round Robin is used when:',
        options: [
          { text: 'All servers have identical capacity', correct: false },
          { text: 'Servers have different capacities — more powerful servers receive more traffic', correct: true },
          { text: 'You want random distribution', correct: false },
          { text: 'Only one server is available', correct: false }
        ],
        explanation: 'Weighted Round Robin assigns weights to servers (e.g., 8-core server weight=4, 4-core server weight=2). Higher-weight servers receive proportionally more requests — optimizing utilization of mixed instance types.'
      },
      {
        id: 's8-q10',
        question: 'AWS Application Load Balancer (ALB) operates at which OSI layer?',
        options: [
          { text: 'Layer 3 (Network)', correct: false },
          { text: 'Layer 4 (Transport) only', correct: false },
          { text: 'Layer 7 (Application)', correct: true },
          { text: 'Layer 1 (Physical)', correct: false }
        ],
        explanation: 'ALB is an L7 load balancer — it inspects HTTP/HTTPS traffic, routes by path/host/header, terminates SSL, and integrates with AWS services. NLB operates at L4 for ultra-low-latency TCP/UDP traffic.'
      }
    ]
  },

  'section-9': {
    title: 'Module 09 Assessment: Message Queues & Async Processing',
    questions: [
      {
        id: 's9-q1',
        question: 'What is the primary benefit of using a message queue for order confirmation emails?',
        options: [
          { text: 'Emails are sent synchronously faster', correct: false },
          { text: 'The order API responds immediately while email sending happens asynchronously in background', correct: true },
          { text: 'Queues eliminate the need for email servers', correct: false },
          { text: 'Messages cannot fail in a queue', correct: false }
        ],
        explanation: 'Queues decouple fast operations from slow ones. "Order Placed" returns in 50ms while email, analytics, and inventory updates process asynchronously — dramatically better user experience.'
      },
      {
        id: 's9-q2',
        question: 'In pub/sub messaging, one published message:',
        options: [
          { text: 'Is consumed by exactly one subscriber', correct: false },
          { text: 'Is delivered to all subscribers of the topic', correct: true },
          { text: 'Is deleted before any subscriber receives it', correct: false },
          { text: 'Can only be published once per day', correct: false }
        ],
        explanation: 'Pub/sub (topics): one event (UserSignedUp) is broadcast to all subscribers — email service, analytics, CRM. Point-to-point (queues): one message is consumed by exactly one worker.'
      },
      {
        id: 's9-q3',
        question: 'At-least-once delivery means:',
        options: [
          { text: 'Messages are never duplicated', correct: false },
          { text: 'Messages may be delivered more than once — consumers must be idempotent', correct: true },
          { text: 'Messages are always lost', correct: false },
          { text: 'Delivery is guaranteed within 1 millisecond', correct: false }
        ],
        explanation: 'At-least-once: the broker retries until acknowledged — duplicates are possible if a consumer crashes after processing but before acking. Consumers must handle duplicates via idempotency keys or deduplication.'
      },
      {
        id: 's9-q4',
        question: 'Apache Kafka is BEST described as:',
        options: [
          { text: 'A simple task queue that deletes messages after consumption', correct: false },
          { text: 'A distributed commit log optimized for high-throughput event streaming and replay', correct: true },
          { text: 'A relational database', correct: false },
          { text: 'A load balancer', correct: false }
        ],
        explanation: 'Kafka stores messages in an append-only log retained for days/weeks. Consumers read at their own pace and can replay history. Ideal for event sourcing, analytics pipelines, and inter-service event streams at massive scale.'
      },
      {
        id: 's9-q5',
        question: 'What is a Dead Letter Queue (DLQ)?',
        options: [
          { text: 'A queue for high-priority messages', correct: false },
          { text: 'A holding area for messages that failed processing after maximum retries', correct: true },
          { text: 'A queue that automatically deletes all messages', correct: false },
          { text: 'A backup database', correct: false }
        ],
        explanation: 'DLQ captures poison messages that fail repeatedly — preventing infinite retry loops that block the main queue. Engineers inspect DLQ messages manually to diagnose and fix processing bugs.'
      },
      {
        id: 's9-q6',
        question: 'Backpressure in a messaging system occurs when:',
        options: [
          { text: 'Producers send messages slower than consumers process them', correct: false },
          { text: 'Consumers cannot keep up with the rate producers are sending messages', correct: true },
          { text: 'The network is too fast', correct: false },
          { text: 'Messages are too small', correct: false }
        ],
        explanation: 'Backpressure: queue depth grows because consumers are overwhelmed. Solutions: scale consumers horizontally, throttle producers, increase queue capacity, or shed low-priority load.'
      },
      {
        id: 's9-q7',
        question: 'Why must message consumers be designed as idempotent?',
        options: [
          { text: 'To make messages smaller', correct: false },
          { text: 'Because at-least-once delivery can cause the same message to be processed multiple times', correct: true },
          { text: 'To eliminate the need for queues', correct: false },
          { text: 'Idempotency is only required for GET requests', correct: false }
        ],
        explanation: 'With at-least-once delivery, a consumer might process a payment event twice. Idempotent consumers check "have I already processed event ID X?" before acting — making duplicate delivery safe.'
      },
      {
        id: 's9-q8',
        question: 'RabbitMQ is better suited than Kafka for:',
        options: [
          { text: 'Replaying 30 days of event history', correct: false },
          { text: 'Complex routing task queues with per-message acknowledgment and deletion', correct: true },
          { text: 'Storing terabytes of log data', correct: false },
          { text: 'Real-time analytics at 1M events/sec', correct: false }
        ],
        explanation: 'RabbitMQ excels at traditional message brokering — complex routing (exchanges, bindings), per-message ack, messages deleted after consumption. Kafka excels at high-throughput event logs with replay capability.'
      },
      {
        id: 's9-q9',
        question: 'Event sourcing stores:',
        options: [
          { text: 'Only the current state of entities', correct: false },
          { text: 'Every state change as an immutable event — current state is reconstructed by replaying events', correct: true },
          { text: 'Only error events', correct: false },
          { text: 'UI event clicks only', correct: false }
        ],
        explanation: 'Event sourcing: instead of UPDATE balance=150, append events [Deposited(100), Withdrew(50)]. Current balance = replay all events. Provides complete audit trail and natural integration with Kafka\'s commit log.'
      },
      {
        id: 's9-q10',
        question: 'AWS SQS FIFO queues provide:',
        options: [
          { text: 'Random message ordering', correct: false },
          { text: 'Exactly-once processing and strict message ordering within a message group', correct: true },
          { text: 'Unlimited throughput with no ordering', correct: false },
          { text: 'Only at-most-once delivery', correct: false }
        ],
        explanation: 'SQS FIFO queues guarantee messages are processed exactly once in order — critical for sequential workflows (financial transactions, order processing). Standard SQS offers higher throughput with at-least-once delivery and best-effort ordering.'
      }
    ]
  },

  'section-10': {
    title: 'Module 10 Assessment: Low-Level Design Fundamentals',
    questions: [
      {
        id: 's10-q1',
        question: 'What is the key difference between HLD and LLD?',
        options: [
          { text: 'HLD uses Python; LLD uses Java', correct: false },
          { text: 'HLD defines services and architecture; LLD defines classes, methods, and algorithms inside components', correct: true },
          { text: 'LLD comes before HLD in the SDLC', correct: false },
          { text: 'HLD is only for databases', correct: false }
        ],
        explanation: 'HLD: boxes and arrows (API Server, Redis, DB). LLD: zoom into API Server — UrlController, UrlService, UrlRepository, Base62Encoder, method signatures, sequence diagrams, error handling.'
      },
      {
        id: 's10-q2',
        question: 'The Single Responsibility Principle (SRP) states:',
        options: [
          { text: 'A class should do everything related to a feature', correct: false },
          { text: 'A class should have only one reason to change', correct: true },
          { text: 'Only one class is allowed per file', correct: false },
          { text: 'Each method must be exactly one line', correct: false }
        ],
        explanation: 'SRP: a class should have one job. UrlService handles URL logic. EmailService handles email. If email templates change, EmailService changes — UrlService should not be affected.'
      },
      {
        id: 's10-q3',
        question: 'Dependency Inversion Principle means:',
        options: [
          { text: 'High-level modules depend directly on database implementations', correct: false },
          { text: 'High-level modules depend on abstractions (interfaces), not concrete implementations', correct: true },
          { text: 'Dependencies should always point downward', correct: false },
          { text: 'Remove all dependencies from code', correct: false }
        ],
        explanation: 'UrlService depends on IUrlRepository interface — not PostgreSQL directly. This enables swapping implementations (MongoDB, in-memory mock for tests) without changing business logic.'
      },
      {
        id: 's10-q4',
        question: 'A sequence diagram primarily shows:',
        options: [
          { text: 'Database table schemas', correct: false },
          { text: 'Object interactions and message flow over time for a use case', correct: true },
          { text: 'Server hardware specifications', correct: false },
          { text: 'Network topology', correct: false }
        ],
        explanation: 'Sequence diagrams: vertical lifelines (Client, Controller, Service, Repository) with horizontal arrows showing method calls in chronological order. Essential for walking through use cases in LLD interviews.'
      },
      {
        id: 's10-q5',
        question: 'Open/Closed Principle encourages:',
        options: [
          { text: 'Never modifying or extending code', correct: false },
          { text: 'Open for extension (new behaviors via interfaces) but closed for modification (existing code unchanged)', correct: true },
          { text: 'Opening all classes to public access', correct: false },
          { text: 'Closing unused database connections', correct: false }
        ],
        explanation: 'Add new URL encoding strategies (Base62, Base64, Hashids) by implementing a UrlEncoder interface — without modifying UrlService. Extension through new classes, not editing existing ones.'
      },
      {
        id: 's10-q6',
        question: 'In LLD, the Repository pattern primarily:',
        options: [
          { text: 'Handles HTTP routing', correct: false },
          { text: 'Abstracts data access logic behind an interface, decoupling business logic from database details', correct: true },
          { text: 'Caches static assets', correct: false },
          { text: 'Manages user authentication', correct: false }
        ],
        explanation: 'Repository pattern: UrlRepository interface with save() and findByCode() methods. PostgreSQLUrlRepository implements it. UrlService calls the interface — unaware of SQL, MongoDB, or in-memory storage details.'
      },
      {
        id: 's10-q7',
        question: 'Liskov Substitution Principle requires:',
        options: [
          { text: 'All classes must inherit from Object', correct: false },
          { text: 'Subtypes must be substitutable for their base types without breaking behavior', correct: true },
          { text: 'No inheritance allowed', correct: false },
          { text: 'Only one subclass per parent', correct: false }
        ],
        explanation: 'If UrlService expects an IUrlRepository, any implementation (PostgreSQL, MongoDB, Mock) must honor the contract — save() returns saved entity, findByCode() returns null if not found. No surprising behavior.'
      },
      {
        id: 's10-q8',
        question: 'What is the FIRST step in an LLD interview approach?',
        options: [
          { text: 'Write production code immediately', correct: false },
          { text: 'Clarify scope — what component or use cases are in scope', correct: true },
          { text: 'Choose a cloud provider', correct: false },
          { text: 'Design the database schema only', correct: false }
        ],
        explanation: 'Always clarify scope first: "Are we designing the full parking lot system or just the booking module?" Then identify entities, relationships, walk through use cases with sequence diagrams, and handle edge cases.'
      },
      {
        id: 's10-q9',
        question: 'Interface Segregation Principle advises:',
        options: [
          { text: 'One giant interface for all classes', correct: false },
          { text: 'Clients should not be forced to depend on methods they do not use', correct: true },
          { text: 'All interfaces must have exactly 3 methods', correct: false },
          { text: 'Interfaces should be avoided', correct: false }
        ],
        explanation: 'Split large interfaces into focused ones. Instead of one IDataStore with read+write+admin methods, use ReadableStore and WritableStore — consumers only depend on what they need.'
      },
      {
        id: 's10-q10',
        question: 'In the URL shortener LLD, Base62Encoder is separated from UrlService because of:',
        options: [
          { text: 'Random coding style preference', correct: false },
          { text: 'Single Responsibility — encoding logic is a distinct concern that can change independently', correct: true },
          { text: 'Base62 is the only possible encoding', correct: false },
          { text: 'Repositories cannot contain logic', correct: false }
        ],
        explanation: 'Separating Base62Encoder follows SRP and Open/Closed — UrlService orchestrates URL creation; encoder handles encoding/decoding. Switching to Hashids or Base64 means adding a new encoder implementation, not rewriting UrlService.'
      }
    ]
  },

  'section-11': {
    title: 'Module 11 Assessment: OOP Design Patterns for LLD',
    questions: [
      {
        id: 's11-q1',
        question: 'The Strategy pattern is BEST used when:',
        options: [
          { text: 'You need exactly one global instance of a class', correct: false },
          { text: 'You have multiple interchangeable algorithms and want to swap them at runtime', correct: true },
          { text: 'You need to notify multiple objects of state changes', correct: false },
          { text: 'You want to create objects step by step with many optional fields', correct: false }
        ],
        explanation: 'Strategy encapsulates interchangeable algorithms behind a common interface. Parking lot pricing (hourly vs flat vs weekend), payment methods (credit card vs PayPal), and routing algorithms are classic Strategy use cases.'
      },
      {
        id: 's11-q2',
        question: 'Which pattern mirrors pub/sub messaging at the code level?',
        options: [
          { text: 'Singleton', correct: false },
          { text: 'Observer', correct: true },
          { text: 'Builder', correct: false },
          { text: 'Adapter', correct: false }
        ],
        explanation: 'Observer: a Subject maintains a list of Observers and notifies them on state change. OrderSubject notifying EmailObserver, InventoryObserver, and AnalyticsObserver is the in-process equivalent of event-driven architecture.'
      },
      {
        id: 's11-q3',
        question: 'The Factory pattern primarily solves:',
        options: [
          { text: 'How to add logging to every method', correct: false },
          { text: 'How to create objects without the client knowing the concrete class', correct: true },
          { text: 'How to ensure only one instance exists', correct: false },
          { text: 'How to undo the last operation', correct: false }
        ],
        explanation: 'Factory encapsulates creation logic. NotificationFactory.create("email") returns the right Notification implementation — client code depends on the interface, not concrete classes. Enables adding new types without changing client code.'
      },
      {
        id: 's11-q4',
        question: 'Decorator pattern differs from inheritance because:',
        options: [
          { text: 'Decorator uses global variables', correct: false },
          { text: 'Decorator wraps objects to add behavior dynamically without subclass explosion', correct: true },
          { text: 'Decorator only works with databases', correct: false },
          { text: 'Decorator prevents all method calls', correct: false }
        ],
        explanation: 'Inheritance creates a combinatorial explosion (LoggedCoffee, CachedLoggedCoffee, AuthCachedLoggedCoffee...). Decorator wraps objects at runtime — compose LoggingDecorator(CachingDecorator(BaseService)) flexibly.'
      },
      {
        id: 's11-q5',
        question: 'The State pattern is ideal for designing a:',
        options: [
          { text: 'Static configuration file reader', correct: false },
          { text: 'Vending machine whose behavior changes between Idle, HasMoney, and Dispensing states', correct: true },
          { text: 'Single-method utility class', correct: false },
          { text: 'Database connection string', correct: false }
        ],
        explanation: 'State pattern: each state is a class implementing a common interface. VendingMachine delegates to current state object. Transitions (Idle → HasMoney → Dispensing) replace the state object — avoiding giant if/else chains.'
      },
      {
        id: 's11-q6',
        question: 'An Adapter pattern is used to:',
        options: [
          { text: 'Create complex objects step by step', correct: false },
          { text: 'Make an incompatible third-party API conform to your application\'s interface', correct: true },
          { text: 'Notify observers of changes', correct: false },
          { text: 'Cache database query results', correct: false }
        ],
        explanation: 'Adapter wraps a legacy or third-party class (Stripe SDK, old SOAP API) and exposes it through your PaymentProcessor interface. Your business logic never touches the foreign API directly.'
      },
      {
        id: 's11-q7',
        question: 'The Command pattern enables:',
        options: [
          { text: 'Global single instance access', correct: false },
          { text: 'Encapsulating requests as objects with execute() and undo() methods', correct: true },
          { text: 'Automatic database sharding', correct: false },
          { text: 'HTTP load balancing', correct: false }
        ],
        explanation: 'Command turns actions into objects: CopyCommand, PasteCommand, DeleteCommand each implement execute() and undo(). Enables undo/redo stacks, job queues, and macro recording.'
      },
      {
        id: 's11-q8',
        question: 'A Facade pattern provides:',
        options: [
          { text: 'A simplified unified interface hiding complexity of multiple subsystems', correct: true },
          { text: 'A way to clone objects', correct: false },
          { text: 'Thread-safe singleton access', correct: false },
          { text: 'Automatic API versioning', correct: false }
        ],
        explanation: 'OrderFacade.placeOrder() coordinates inventory, payment, shipping, and notifications behind one method. Clients don\'t need to know the internal orchestration — reducing coupling and simplifying the API.'
      },
      {
        id: 's11-q9',
        question: 'Which is an anti-pattern to avoid in LLD?',
        options: [
          { text: 'Using Strategy for interchangeable payment methods', correct: false },
          { text: 'God Object — one class that handles all responsibilities', correct: true },
          { text: 'Using Factory for notification channel creation', correct: false },
          { text: 'Separating concerns with interfaces', correct: false }
        ],
        explanation: 'God Object violates Single Responsibility — one massive class handling UI, business logic, data access, and validation. Untestable, unmaintainable, and a red flag in interviews.'
      },
      {
        id: 's11-q10',
        question: 'When should you NOT introduce a design pattern?',
        options: [
          { text: 'When it solves a specific, named problem in your design', correct: false },
          { text: 'When you are forcing patterns preemptively without a concrete problem (YAGNI)', correct: true },
          { text: 'When the interviewer asks about extensibility', correct: false },
          { text: 'When multiple algorithms need to be interchangeable', correct: false }
        ],
        explanation: 'YAGNI (You Aren\'t Gonna Need It): don\'t add Factory + Strategy + Observer to a simple CRUD app "for future flexibility." Introduce patterns when you can articulate the specific problem they solve. Interviewers reward clarity over pattern overload.'
      },
      {
        id: 's11-q11',
        question: 'Builder pattern is most appropriate when:',
        options: [
          { text: 'An object has few required fields and simple construction', correct: false },
          { text: 'An object has many optional fields and needs step-by-step validated construction', correct: true },
          { text: 'You need to swap algorithms at runtime', correct: false },
          { text: 'You need lazy loading of images', correct: false }
        ],
        explanation: 'Builder shines with complex objects: Order with items, coupons, shipping address, gift wrap, priority. Fluent API (.addItem().applyCoupon().build()) with validation before construction beats telescoping constructors.'
      },
      {
        id: 's11-q12',
        question: 'Singleton pattern is often criticized because:',
        options: [
          { text: 'It creates too many instances', correct: false },
          { text: 'Global mutable state makes unit testing difficult and hides dependencies', correct: true },
          { text: 'It cannot be used with databases', correct: false },
          { text: 'It requires inheritance', correct: false }
        ],
        explanation: 'Singleton introduces hidden global dependencies — tests can\'t easily mock or replace the instance. Modern alternatives: dependency injection containers manage single instances without global access points.'
      }
    ]
  },

  'section-12': {
    title: 'Module 12 Assessment: Concurrency & Thread Safety',
    questions: [
      {
        id: 's12-q1',
        question: 'What is the key difference between concurrency and parallelism?',
        options: [
          { text: 'They are identical concepts', correct: false },
          { text: 'Concurrency is structuring tasks to make progress together; parallelism is executing them simultaneously on multiple cores', correct: true },
          { text: 'Parallelism only works in single-threaded programs', correct: false },
          { text: 'Concurrency requires multiple physical machines', correct: false }
        ],
        explanation: 'Concurrency is about program structure — handling many tasks (time-slicing on one core counts). Parallelism is about hardware — literally running on multiple cores at the same time. You can have one without the other.'
      },
      {
        id: 's12-q2',
        question: 'Why do threads within the same process need synchronization but processes do not?',
        options: [
          { text: 'Processes are always single-threaded', correct: false },
          { text: 'Threads share the same memory space (heap); processes have isolated memory', correct: true },
          { text: 'Threads cannot access variables', correct: false },
          { text: 'Processes are faster than threads', correct: false }
        ],
        explanation: 'Threads in the same process share heap memory — two threads can read/write the same variable simultaneously. Processes have isolated memory spaces and communicate via IPC (pipes, sockets), avoiding direct shared-state races.'
      },
      {
        id: 's12-q3',
        question: 'A race condition occurs when:',
        options: [
          { text: 'Two threads run on different CPU cores', correct: false },
          { text: 'Program correctness depends on unpredictable thread execution timing', correct: true },
          { text: 'A thread completes before another starts', correct: false },
          { text: 'The program uses immutable objects', correct: false }
        ],
        explanation: 'Race conditions happen when threads interleave in ways that corrupt shared state — e.g., both threads read counter=0, both write 1, losing an increment. The bug may appear only under specific timing, making it hard to reproduce.'
      },
      {
        id: 's12-q4',
        question: 'What is a critical section?',
        options: [
          { text: 'Code that runs only on the main thread', correct: false },
          { text: 'The code region accessing shared resources that must not be executed concurrently by multiple threads', correct: true },
          { text: 'The section of code with the most bugs', correct: false },
          { text: 'A database backup routine', correct: false }
        ],
        explanation: 'Critical sections access shared mutable state. Only one thread may execute a critical section at a time — protected by mutexes, semaphores, or atomic operations.'
      },
      {
        id: 's12-q5',
        question: 'A Semaphore differs from a Mutex because:',
        options: [
          { text: 'Semaphore allows N threads concurrent access; Mutex allows only one', correct: true },
          { text: 'Mutex is faster in all cases', correct: false },
          { text: 'Semaphore can only be used with databases', correct: false },
          { text: 'Mutex allows unlimited concurrent access', correct: false }
        ],
        explanation: 'Mutex (binary semaphore): one thread at a time. Counting semaphore: up to N threads — perfect for connection pools (max 10 DB connections). Acquire on use, release when done.'
      },
      {
        id: 's12-q6',
        question: 'Which condition is NOT required for deadlock (Coffman conditions)?',
        options: [
          { text: 'Mutual exclusion', correct: false },
          { text: 'Circular wait', correct: false },
          { text: 'High CPU utilization', correct: true },
          { text: 'Hold and wait', correct: false }
        ],
        explanation: 'The four Coffman conditions for deadlock: mutual exclusion, hold and wait, no preemption, and circular wait. High CPU utilization is unrelated — deadlock can occur on idle systems when threads are blocked waiting for each other.'
      },
      {
        id: 's12-q7',
        question: 'Lock ordering prevents deadlock by:',
        options: [
          { text: 'Eliminating all locks from the program', correct: false },
          { text: 'Ensuring all threads acquire locks in the same order, breaking circular wait', correct: true },
          { text: 'Making locks execute faster', correct: false },
          { text: 'Using only one lock for the entire application', correct: false }
        ],
        explanation: 'If Thread A always acquires Lock1 then Lock2, and Thread B does the same, circular wait is impossible — neither can hold Lock2 while waiting for Lock1. This is the most practical deadlock prevention technique.'
      },
      {
        id: 's12-q8',
        question: 'Why are immutable objects inherently thread-safe?',
        options: [
          { text: 'They use special CPU instructions', correct: false },
          { text: 'They cannot be modified after creation, so no thread can corrupt shared state', correct: true },
          { text: 'They run on a dedicated core', correct: false },
          { text: 'They automatically use mutexes', correct: false }
        ],
        explanation: 'If state never changes, multiple threads can read the same object without coordination — no races possible. Immutable strings, event objects, and functional data structures leverage this for free thread safety.'
      },
      {
        id: 's12-q9',
        question: 'A Read-Write Lock is beneficial when:',
        options: [
          { text: 'Writes vastly outnumber reads', correct: false },
          { text: 'Reads vastly outnumber writes — multiple readers can proceed concurrently', correct: true },
          { text: 'No threads access the data', correct: false },
          { text: 'Only one thread exists in the process', correct: false }
        ],
        explanation: 'Read-write locks allow concurrent readers (shared lock) but exclusive writers. Ideal for config caches, metadata stores, and read-heavy registries where writes are rare but reads are constant.'
      },
      {
        id: 's12-q10',
        question: 'Optimistic locking is preferred over pessimistic locking when:',
        options: [
          { text: 'Conflicts are frequent and data integrity is critical (banking)', correct: false },
          { text: 'Conflicts are rare and you want higher concurrency without holding locks during reads', correct: true },
          { text: 'You have only one user', correct: false },
          { text: 'The database does not support transactions', correct: false }
        ],
        explanation: 'Optimistic locking: read without lock, check version/timestamp on write, retry if conflict. Great when collisions are rare (e-commerce inventory). Pessimistic (SELECT FOR UPDATE): lock row on read — safer for banking where conflicts must never occur.'
      },
      {
        id: 's12-q11',
        question: 'A thread pool primarily improves performance by:',
        options: [
          { text: 'Creating a new OS thread for every request', correct: false },
          { text: 'Reusing a fixed set of worker threads to avoid thread creation/destruction overhead', correct: true },
          { text: 'Eliminating the need for any synchronization', correct: false },
          { text: 'Running all tasks on the main thread', correct: false }
        ],
        explanation: 'Creating OS threads is expensive (memory allocation, kernel scheduling). Thread pools maintain N ready workers pulling from a task queue — amortizing creation cost and bounding resource usage.'
      },
      {
        id: 's12-q12',
        question: 'In a producer-consumer pattern, a BlockingQueue provides:',
        options: [
          { text: 'Unlimited memory for tasks', correct: false },
          { text: 'Thread-safe enqueue/dequeue with automatic blocking when full or empty', correct: true },
          { text: 'Guaranteed FIFO ordering across processes', correct: false },
          { text: 'Automatic deadlock detection', correct: false }
        ],
        explanation: 'BlockingQueue: producers block when queue is full (backpressure), consumers block when empty. Built-in synchronization eliminates manual lock management — a classic thread-safe pattern for work distribution.'
      }
    ]
  },

  'section-13': {
    title: 'Module 13 Assessment: Reliability, Fault Tolerance & CAP',
    questions: [
      {
        id: 's13-q1',
        question: 'What is the maximum downtime per year for 99.99% availability (four nines)?',
        options: [
          { text: '8.7 hours', correct: false },
          { text: '52 minutes', correct: true },
          { text: '5.2 minutes', correct: false },
          { text: '3.65 days', correct: false }
        ],
        explanation: '99.99% = 0.01% downtime = 0.0001 × 365 × 24 × 60 ≈ 52.6 minutes per year. Three nines (99.9%) ≈ 8.7 hours. Five nines (99.999%) ≈ 5.2 minutes. Each nine reduces downtime by 10×.'
      },
      {
        id: 's13-q2',
        question: 'A Single Point of Failure (SPOF) is:',
        options: [
          { text: 'A component that fails most often', correct: false },
          { text: 'Any component whose failure causes the entire system to stop working', correct: true },
          { text: 'The most expensive server in the architecture', correct: false },
          { text: 'A database with no indexes', correct: false }
        ],
        explanation: 'A SPOF is any single component — one load balancer, one API server, one database — whose failure takes down the whole system. Fault tolerance eliminates SPOFs through redundancy at every critical layer.'
      },
      {
        id: 's13-q3',
        question: 'According to the CAP theorem, during a network partition a distributed system must choose between:',
        options: [
          { text: 'Consistency and Partition tolerance', correct: false },
          { text: 'Consistency and Availability', correct: true },
          { text: 'Availability and Durability', correct: false },
          { text: 'Latency and Throughput', correct: false }
        ],
        explanation: 'During a partition (P), you cannot have both C and A. CP systems (MongoDB) reject requests to maintain consistency. AP systems (Cassandra) serve potentially stale data to stay available. P is non-negotiable in distributed systems.'
      },
      {
        id: 's13-q4',
        question: 'Why is Partition Tolerance (P) considered non-negotiable in distributed systems?',
        options: [
          { text: 'Networks never fail', correct: false },
          { text: 'Network partitions will inevitably occur — you cannot opt out of P', correct: true },
          { text: 'P only applies to single-node databases', correct: false },
          { text: 'P guarantees zero latency', correct: false }
        ],
        explanation: 'Networks fail — cables cut, switches crash, AZs go offline. Any distributed system must tolerate partitions. The real CAP choice is CP vs AP when a partition happens, not whether to include P.'
      },
      {
        id: 's13-q5',
        question: 'Cassandra is typically classified as which CAP type?',
        options: [
          { text: 'CP — Consistency + Partition tolerance', correct: false },
          { text: 'AP — Availability + Partition tolerance', correct: true },
          { text: 'CA — Consistency + Availability', correct: false },
          { text: 'CAP does not apply to Cassandra', correct: false }
        ],
        explanation: 'Cassandra is AP: during a partition, it remains available and accepts writes to reachable nodes, accepting eventual consistency. Conflict resolution happens via timestamps or application logic.'
      },
      {
        id: 's13-q6',
        question: 'Durability means:',
        options: [
          { text: 'The system responds quickly to requests', correct: false },
          { text: 'Once data is acknowledged as written, it survives crashes and is not lost', correct: true },
          { text: 'The system can handle unlimited traffic', correct: false },
          { text: 'All nodes have identical data at all times', correct: false }
        ],
        explanation: 'Durability guarantees persisted data survives failures. Achieved through replication (write to multiple nodes/disks), WAL (write-ahead logs), and backups. Distinct from availability (system is up) and consistency (reads match writes).'
      },
      {
        id: 's13-q7',
        question: 'PACELC extends CAP by stating that even without a partition, you trade off:',
        options: [
          { text: 'Security and Performance', correct: false },
          { text: 'Latency and Consistency', correct: true },
          { text: 'Cost and Scalability', correct: false },
          { text: 'Read and Write throughput', correct: false }
        ],
        explanation: 'PACELC: If Partition → A or C. Else → Latency or Consistency. Even in normal operation, strong consistency requires coordination (quorum reads, consensus) which adds latency. DynamoDB/Cassandra choose low latency + eventual consistency.'
      },
      {
        id: 's13-q8',
        question: 'Eventual consistency is ACCEPTABLE for:',
        options: [
          { text: 'Bank account balances', correct: false },
          { text: 'Social media like counts and view counters', correct: true },
          { text: 'Inventory deduction during checkout', correct: false },
          { text: 'Payment authorization', correct: false }
        ],
        explanation: 'Eventual consistency works when temporary staleness is tolerable — likes, view counts, DNS, CDN caches. Banking, inventory, and payments require strong consistency to prevent double-spending or overselling.'
      },
      {
        id: 's13-q9',
        question: 'In leader-follower replication, all writes go to:',
        options: [
          { text: 'Any follower randomly', correct: false },
          { text: 'The leader (primary) node only', correct: true },
          { text: 'All nodes simultaneously without coordination', correct: false },
          { text: 'A separate write-only database', correct: false }
        ],
        explanation: 'Leader-follower: single leader handles all writes, followers replicate asynchronously or synchronously and serve read traffic. Simplifies consistency — one source of truth for writes. PostgreSQL and MySQL use this model.'
      },
      {
        id: 's13-q10',
        question: 'Quorum consistency (W + R > N) in leaderless systems like Cassandra ensures:',
        options: [
          { text: 'Zero replication lag', correct: false },
          { text: 'Read and write quorums overlap, guaranteeing a consistent read', correct: true },
          { text: 'Only one replica is needed', correct: false },
          { text: 'Writes are always rejected during partitions', correct: false }
        ],
        explanation: 'With N=3 replicas, W=2 write quorum, R=2 read quorum: W+R=4>N=3 guarantees the read quorum overlaps with the write quorum, so the reader sees the latest write. Tunable consistency per query.'
      },
      {
        id: 's13-q11',
        question: 'Active-Passive failover means:',
        options: [
          { text: 'All nodes serve traffic simultaneously', correct: false },
          { text: 'A standby replica takes over when the primary fails', correct: true },
          { text: 'No redundancy exists', correct: false },
          { text: 'Traffic is never rerouted', correct: false }
        ],
        explanation: 'Active-Passive: primary handles all traffic; passive standby syncs data and takes over on failure. Simpler conflict resolution than active-active but wastes standby capacity. Common for databases and stateful services.'
      },
      {
        id: 's13-q12',
        question: 'Read-your-writes consistency guarantees:',
        options: [
          { text: 'All users see all updates immediately', correct: false },
          { text: 'A user always sees their own updates after writing', correct: true },
          { text: 'Reads are never cached', correct: false },
          { text: 'Writes are eventually deleted', correct: false }
        ],
        explanation: 'Read-your-writes: after you update your profile, you see the new value — even if other users see stale data briefly. Implemented by routing a user\'s reads to the node that handled their write, or using session tokens.'
      }
    ]
  },

  'section-14': {
    title: 'Module 14 Assessment: Security in System Design',
    questions: [
      {
        id: 's14-q1',
        question: 'In the CIA triad, Confidentiality means:',
        options: [
          { text: 'Data cannot be modified by unauthorized parties', correct: false },
          { text: 'Only authorized parties can access data', correct: true },
          { text: 'The system is always available', correct: false },
          { text: 'All data is encrypted with the same key', correct: false }
        ],
        explanation: 'Confidentiality ensures only authorized users/services access sensitive data — via encryption, access controls, and least privilege. Integrity protects against unauthorized modification. Availability ensures authorized access isn\'t blocked.'
      },
      {
        id: 's14-q2',
        question: 'What is the difference between Authentication and Authorization?',
        options: [
          { text: 'They are the same thing', correct: false },
          { text: 'Authentication verifies identity ("who are you?"); Authorization determines permissions ("what can you do?")', correct: true },
          { text: 'Authentication is for databases; Authorization is for APIs', correct: false },
          { text: 'Authorization happens before Authentication', correct: false }
        ],
        explanation: 'AuthN establishes identity (login, OAuth, API key). AuthZ checks permissions after identity is known (RBAC roles, JWT claims, resource-level access). You must authenticate before you can authorize.'
      },
      {
        id: 's14-q3',
        question: 'Defense in depth means:',
        options: [
          { text: 'Using one very strong security control', correct: false },
          { text: 'Layering multiple independent security controls so no single failure causes total compromise', correct: true },
          { text: 'Only securing the database', correct: false },
          { text: 'Hiding servers deep in the network', correct: false }
        ],
        explanation: 'Defense in depth stacks layers: WAF → firewall → TLS → auth → input validation → encryption at rest → secrets vault. Breaching one layer (e.g., stolen API key) doesn\'t automatically expose all data.'
      },
      {
        id: 's14-q4',
        question: 'Why should passwords be hashed with bcrypt/argon2 instead of stored plaintext or with MD5?',
        options: [
          { text: 'MD5 makes passwords longer', correct: false },
          { text: 'bcrypt/argon2 are slow, salted one-way hashes resistant to rainbow table and brute force attacks', correct: true },
          { text: 'Plaintext is faster to verify', correct: false },
          { text: 'MD5 is reversible for password recovery', correct: false }
        ],
        explanation: 'bcrypt and argon2 are deliberately slow (cost factor) with per-password salts, making brute force impractical. MD5 is fast and unsalted — crackable in seconds. Never store or log plaintext passwords.'
      },
      {
        id: 's14-q5',
        question: 'In OAuth 2.0 Authorization Code flow, the client app receives an access token by:',
        options: [
          { text: 'Hardcoding it in source code', correct: false },
          { text: 'Exchanging an authorization code with the auth server after user login', correct: true },
          { text: 'Reading it from the user\'s browser cookies directly', correct: false },
          { text: 'Guessing the token format', correct: false }
        ],
        explanation: 'Authorization Code flow: user authenticates with auth server → auth server redirects with short-lived code → client exchanges code (+ client secret) for access token server-side. Keeps tokens off the browser and front-channel.'
      },
      {
        id: 's14-q6',
        question: 'The primary defense against SQL injection is:',
        options: [
          { text: 'Using HTTPS', correct: false },
          { text: 'Parameterized queries / prepared statements — never concatenating user input into SQL', correct: true },
          { text: 'Storing passwords in the database', correct: false },
          { text: 'Disabling the database', correct: false }
        ],
        explanation: 'SQL injection exploits string concatenation: "SELECT * FROM users WHERE email = \'" + input + "\'". Parameterized queries separate SQL structure from data — the database treats input as data, never as executable SQL.'
      },
      {
        id: 's14-q7',
        question: 'mTLS (mutual TLS) differs from standard TLS because:',
        options: [
          { text: 'It only encrypts data, no authentication', correct: false },
          { text: 'Both client and server present certificates to authenticate each other', correct: true },
          { text: 'It is slower than HTTP', correct: false },
          { text: 'It only works for web browsers', correct: false }
        ],
        explanation: 'Standard TLS: server proves identity to client. mTLS: both sides present certificates — essential for service-to-service communication in microservices where you can\'t trust the network even inside a VPC.'
      },
      {
        id: 's14-q8',
        question: 'IDOR (Insecure Direct Object Reference) is prevented by:',
        options: [
          { text: 'Using longer URLs', correct: false },
          { text: 'Authorizing every request server-side — verifying the user owns/can access the requested resource', correct: true },
          { text: 'Hiding URLs from users', correct: false },
          { text: 'Using GET instead of POST', correct: false }
        ],
        explanation: 'IDOR: changing /api/orders/123 to /api/orders/456 accesses another user\'s data. Defense: always check "does authenticated user X have permission to access resource Y?" — never trust the resource ID alone.'
      },
      {
        id: 's14-q9',
        question: 'Zero Trust architecture assumes:',
        options: [
          { text: 'Internal network traffic is always safe', correct: false },
          { text: 'No user or service is trusted by default — verify every request regardless of network location', correct: true },
          { text: 'Firewalls are unnecessary', correct: false },
          { text: 'Only external attackers are threats', correct: false }
        ],
        explanation: 'Zero Trust: "never trust, always verify." Every request authenticated and authorized, even service-to-service inside the datacenter. Micro-segmentation limits lateral movement if one service is compromised.'
      },
      {
        id: 's14-q10',
        question: 'Where should secrets (API keys, DB passwords) be stored in production?',
        options: [
          { text: 'Hardcoded in source code and committed to git', correct: false },
          { text: 'In a dedicated secrets manager (Vault, AWS Secrets Manager) injected at runtime', correct: true },
          { text: 'In README.md for team access', correct: false },
          { text: 'In client-side JavaScript', correct: false }
        ],
        explanation: 'Secrets in git are exposed forever in history. Use Vault or cloud secret managers with automatic rotation, audit logging, and runtime injection via environment variables or sidecar agents.'
      },
      {
        id: 's14-q11',
        question: 'Rate limiting at the API gateway primarily helps prevent:',
        options: [
          { text: 'Database normalization issues', correct: false },
          { text: 'Brute force attacks, API abuse, and DDoS amplification', correct: true },
          { text: 'SQL injection', correct: false },
          { text: 'Slow database queries', correct: false }
        ],
        explanation: 'Rate limiting (token bucket, sliding window) caps requests per IP/API key — returning 429 when exceeded. Stops credential stuffing, scraper abuse, and reduces DDoS impact before traffic reaches application servers.'
      },
      {
        id: 's14-q12',
        question: 'JWT tokens should NOT contain:',
        options: [
          { text: 'User ID and role claims', correct: false },
          { text: 'Expiration timestamp (exp)', correct: false },
          { text: 'Passwords, API secrets, or other sensitive credentials', correct: true },
          { text: 'Issued-at timestamp (iat)', correct: false }
        ],
        explanation: 'JWT payloads are base64-encoded, not encrypted — anyone can decode them. Never put passwords, credit card numbers, or secrets in JWT claims. Include only identity/role claims and use short expiration times with refresh tokens.'
      }
    ]
  },

  'section-15': {
    title: 'Module 15 Assessment: Observability & Monitoring',
    questions: [
      {
        id: 's15-q1',
        question: 'What is the key difference between monitoring and observability?',
        options: [
          { text: 'They are identical concepts', correct: false },
          { text: 'Monitoring detects known problems via predefined alerts; observability lets you explore unknown issues with ad-hoc queries', correct: true },
          { text: 'Observability only uses logs', correct: false },
          { text: 'Monitoring is only for databases', correct: false }
        ],
        explanation: 'Monitoring answers "is something wrong?" based on dashboards you built in advance. Observability answers "why is it wrong?" by letting you interrogate metrics, logs, and traces for questions you didn\'t anticipate.'
      },
      {
        id: 's15-q2',
        question: 'Which observability pillar is BEST for understanding a single request\'s journey across microservices?',
        options: [
          { text: 'Metrics', correct: false },
          { text: 'Logs', correct: false },
          { text: 'Distributed traces', correct: true },
          { text: 'Uptime checks', correct: false }
        ],
        explanation: 'Traces follow a request through every service with timing per span — revealing which service in the chain caused latency. Metrics show aggregates; logs show individual events; traces show the full cross-service path.'
      },
      {
        id: 's15-q3',
        question: 'Google\'s four Golden Signals are:',
        options: [
          { text: 'CPU, Memory, Disk, Network', correct: false },
          { text: 'Latency, Traffic, Errors, Saturation', correct: true },
          { text: 'Read, Write, Delete, Update', correct: false },
          { text: 'Security, Cost, Scale, Speed', correct: false }
        ],
        explanation: 'Golden Signals: Latency (how long), Traffic (how much demand), Errors (failure rate), Saturation (how full). These four cover the health of any user-facing service. CPU/memory are resource metrics, not golden signals directly.'
      },
      {
        id: 's15-q4',
        question: 'The RED method measures:',
        options: [
          { text: 'Resource Utilization, Saturation, Errors', correct: false },
          { text: 'Rate (requests/sec), Error rate, Duration (latency)', correct: true },
          { text: 'Reliability, Efficiency, Durability', correct: false },
          { text: 'Read, Execute, Delete operations', correct: false }
        ],
        explanation: 'RED (Rate, Errors, Duration) is applied to services — how many requests, how many fail, how long they take. USE (Utilization, Saturation, Errors) is applied to resources like CPU and memory.'
      },
      {
        id: 's15-q5',
        question: 'An SLI (Service Level Indicator) is:',
        options: [
          { text: 'A contractual penalty clause', correct: false },
          { text: 'A quantifiable measure of service behavior (e.g., percentage of successful requests)', correct: true },
          { text: 'An internal team meeting', correct: false },
          { text: 'A type of database index', correct: false }
        ],
        explanation: 'SLI is the raw measurement: "99.95% of requests returned 2xx in the last 30 days." SLO sets the target ("we aim for 99.9%"). SLA is the customer contract with penalties. SLI → SLO → SLA hierarchy.'
      },
      {
        id: 's15-q6',
        question: 'An error budget with a 99.9% monthly SLO means:',
        options: [
          { text: 'Zero failures are allowed', correct: false },
          { text: 'You can afford roughly 43 minutes of downtime per month before breaching SLO', correct: true },
          { text: 'Errors are ignored entirely', correct: false },
          { text: 'Only errors during business hours count', correct: false }
        ],
        explanation: '99.9% SLO = 0.1% error budget. 0.001 × 30 × 24 × 60 ≈ 43 minutes/month of allowed failure. When budget is exhausted, teams pause feature work and focus on reliability improvements.'
      },
      {
        id: 's15-q7',
        question: 'Why propagate trace_id across service boundaries?',
        options: [
          { text: 'To encrypt requests', correct: false },
          { text: 'To correlate logs and spans from all services involved in a single user request', correct: true },
          { text: 'To replace authentication tokens', correct: false },
          { text: 'To reduce network bandwidth', correct: false }
        ],
        explanation: 'A trace_id in HTTP headers (traceparent, X-Request-ID) links spans and log entries across services. Search one ID in Jaeger + your log aggregator to see the complete request story across the entire system.'
      },
      {
        id: 's15-q8',
        question: 'OpenTelemetry is important because it:',
        options: [
          { text: 'Replaces all databases', correct: false },
          { text: 'Provides vendor-neutral instrumentation for traces, metrics, and logs', correct: true },
          { text: 'Only works with AWS', correct: false },
          { text: 'Eliminates the need for alerting', correct: false }
        ],
        explanation: 'OpenTelemetry (OTel) is the CNCF standard for observability instrumentation. Instrument your code once with OTel SDKs, export to any backend — Jaeger, Datadog, Honeycomb, Prometheus — avoiding vendor lock-in.'
      },
      {
        id: 's15-q9',
        question: 'A good alerting practice is to:',
        options: [
          { text: 'Alert on every metric threshold including CPU at 50%', correct: false },
          { text: 'Alert on user-facing symptoms (high error rate) that are actionable', correct: true },
          { text: 'Never use alerts — only dashboards', correct: false },
          { text: 'Send all alerts to all engineers simultaneously', correct: false }
        ],
        explanation: 'Alert fatigue kills on-call effectiveness. Alert on symptoms users feel (error rate spike, latency SLO breach) — not causes (CPU 82%). Every alert must be actionable with a linked runbook.'
      },
      {
        id: 's15-q10',
        question: 'Structured JSON logging is preferred over plain text because:',
        options: [
          { text: 'JSON is more readable for humans in raw form', correct: false },
          { text: 'Machine parsing, filtering, and correlation by fields (trace_id, level, service) is reliable', correct: true },
          { text: 'JSON uses less storage', correct: false },
          { text: 'Plain text logs cannot be stored', correct: false }
        ],
        explanation: 'Structured logs with consistent fields (timestamp, level, trace_id, service, message) enable precise queries: "show all ERROR logs for service X with trace_id Y." Plain text requires fragile regex parsing.'
      },
      {
        id: 's15-q11',
        question: 'In the USE method, "Saturation" for a CPU resource means:',
        options: [
          { text: 'The CPU is turned off', correct: false },
          { text: 'The degree to which the resource has extra work queued (run queue length)', correct: true },
          { text: 'The number of users logged in', correct: false },
          { text: 'Network bandwidth in Mbps', correct: false }
        ],
        explanation: 'USE for resources: Utilization (% busy), Saturation (queued work waiting — e.g., run queue length), Errors (hardware failures). High utilization + high saturation = resource is overloaded even if utilization isn\'t 100%.'
      },
      {
        id: 's15-q12',
        question: 'An SLO should typically be ________ than the SLA promised to customers:',
        options: [
          { text: 'Looser (lower target)', correct: false },
          { text: 'Stricter (higher target) to provide a safety buffer', correct: true },
          { text: 'Identical with no buffer', correct: false },
          { text: 'Unrelated to the SLA', correct: false }
        ],
        explanation: 'If SLA promises customers 99.9%, internal SLO might be 99.95%. The buffer absorbs measurement noise and gives engineering time to fix issues before breaching the customer-facing SLA with financial penalties.'
      }
    ]
  },

  'section-16': {
    title: 'Module 16 Assessment: URL Shortener Case Study',
    questions: [
      { id: 's16-q1', question: 'For a URL shortener with 100:1 read-to-write ratio, the MOST critical optimization is:', options: [{ text: 'Optimizing write path with sharding', correct: false }, { text: 'Aggressive caching (Redis + CDN) on the redirect read path', correct: true }, { text: 'Using a graph database', correct: false }, { text: 'Synchronous replication on every write', correct: false }], explanation: 'With 4,000 reads/sec vs 40 writes/sec, reads dominate. Redis cache (sub-ms) and CDN for popular redirects are the highest-ROI optimizations for meeting p99 < 100ms.' },
      { id: 's16-q2', question: 'Base62 encoding of a counter ID is preferred over random hashing because:', options: [{ text: 'It produces longer URLs', correct: false }, { text: 'It guarantees unique codes without collision retries via centralized counter', correct: true }, { text: 'It encrypts the URL', correct: false }, { text: 'It eliminates the need for a database', correct: false }], explanation: 'Auto-increment counter → base62 encode = guaranteed unique, no collisions. 7 base62 chars = 62⁷ ≈ 3.5 trillion URLs. Hash-based approaches risk collisions at scale.' },
      { id: 's16-q3', question: 'Why use 301 (permanent) redirect instead of 302 for URL shortener?', options: [{ text: '301 is faster to process', correct: false }, { text: 'Browsers and CDNs cache 301 redirects, reducing repeat server load', correct: true }, { text: '302 is not supported by HTTP', correct: false }, { text: '301 allows changing the destination later', correct: false }], explanation: '301 tells clients/CDN the redirect is permanent — they cache it. Subsequent requests never hit your server. 302 is temporary — every request hits your server. Trade-off: 301 makes changing destination harder.' },
      { id: 's16-q4', question: 'Click analytics for a URL shortener should be processed:', options: [{ text: 'Synchronously before returning the redirect', correct: false }, { text: 'Asynchronously via Kafka/message queue to avoid slowing redirects', correct: true }, { text: 'Not at all', correct: false }, { text: 'Only in the database primary', correct: false }], explanation: 'Redirects must be fast (p99 < 100ms). Analytics are a Should Have — publish click events to Kafka async, process in a separate analytics service without blocking the redirect path.' },
      { id: 's16-q5', question: 'Estimated storage for 100M URLs/month over 5 years at 500 bytes each is approximately:', options: [{ text: '3 GB', correct: false }, { text: '3 TB', correct: true }, { text: '3 PB', correct: false }, { text: '30 MB', correct: false }], explanation: '100M × 12 months × 5 years × 500 bytes = 3×10¹² bytes = 3 TB raw. With replication (3×) = ~9 TB. Plan sharding before hitting single-node limits.' },
      { id: 's16-q6', question: 'The redirect API (GET /{code}) should be separated from the management API (/api/v1/urls) because:', options: [{ text: 'HTTP requires it', correct: false }, { text: 'Different scaling, caching, and routing needs — redirects are high-volume reads', correct: true }, { text: 'They use different programming languages', correct: false }, { text: 'Management API does not need authentication', correct: false }], explanation: 'Redirect path: ultra-low latency, CDN-cacheable, no auth. Management API: CRUD operations, authenticated, lower volume. Separating allows independent scaling and CDN placement on redirect only.' },
      { id: 's16-q7', question: 'On URL update, cache invalidation strategy should be:', options: [{ text: 'Wait for TTL expiration only', correct: false }, { text: 'Write-invalidate: delete Redis key on DB write', correct: true }, { text: 'Never update cache', correct: false }, { text: 'Delete the entire database', correct: false }], explanation: 'Write-invalidate: on URL update, redis.del("url:" + code). Next redirect misses cache, fetches fresh data from DB, repopulates cache. Prevents serving stale long URLs after updates.' },
      { id: 's16-q8', question: 'At ~40 writes/sec, database sharding is:', options: [{ text: 'Immediately required on day one', correct: false }, { text: 'Not needed initially — single PostgreSQL primary can handle this; plan for sharding at higher scale', correct: true }, { text: 'Impossible with SQL databases', correct: false }, { text: 'Only needed for reads', correct: false }], explanation: '40 writes/sec is modest for PostgreSQL. Start with single primary + read replicas. Shard when storage exceeds node capacity (~TB scale) or write throughput requires it.' },
      { id: 's16-q9', question: '7-character base62 codes provide approximately how many unique URLs?', options: [{ text: '1 million', correct: false }, { text: '3.5 trillion', correct: true }, { text: '3.5 billion', correct: false }, { text: 'Unlimited', correct: false }], explanation: '62⁷ = 3,521,614,606,208 ≈ 3.5 trillion unique codes. Sufficient for most URL shortener scale. Can extend to 8 chars if needed (62⁸ ≈ 218 trillion).' },
      { id: 's16-q10', question: 'PostgreSQL read replicas in the URL shortener architecture primarily serve:', options: [{ text: 'Write operations only', correct: false }, { text: 'Cache miss fallback reads without overloading the primary', correct: true }, { text: 'Analytics only', correct: false }, { text: 'User authentication', correct: false }], explanation: 'Read replicas handle cache miss lookups and analytics queries, keeping write load on the primary. Async replication means replicas may be slightly stale — acceptable for cache miss fallback.' }
    ]
  },

  'section-17': {
    title: 'Module 17 Assessment: Chat System Case Study',
    questions: [
      { id: 's17-q1', question: 'Why are WebSockets preferred over HTTP polling for chat?', options: [{ text: 'WebSockets use less memory always', correct: false }, { text: 'WebSockets enable full-duplex real-time communication without repeated HTTP overhead', correct: true }, { text: 'HTTP cannot send messages', correct: false }, { text: 'WebSockets do not require servers', correct: false }], explanation: 'WebSockets maintain a persistent bidirectional connection — messages push instantly in both directions. Polling wastes bandwidth with repeated requests and adds latency.' },
      { id: 's17-q2', question: 'Redis is used in chat architecture primarily for:', options: [{ text: 'Storing all message history', correct: false }, { text: 'Mapping user_id to chat server and tracking online presence', correct: true }, { text: 'Image storage', correct: false }, { text: 'User password hashing', correct: false }], explanation: 'Redis stores user_id → chat_server_id (which server holds the user\'s WebSocket) and online/offline presence status. Enables routing messages to the correct server for delivery.' },
      { id: 's17-q3', question: 'Cassandra is a good fit for message storage because:', options: [{ text: 'It only supports SQL queries', correct: false }, { text: 'It handles high write throughput and time-series message data with horizontal scaling', correct: true }, { text: 'It eliminates the need for WebSockets', correct: false }, { text: 'It provides strong ACID transactions for chat', correct: false }], explanation: 'Chat generates massive write volume (230K msgs/sec at scale). Cassandra\'s wide-column, write-optimized, eventually consistent model scales horizontally for message history storage.' },
      { id: 's17-q4', question: 'When User B is offline, message delivery should:', options: [{ text: 'Be dropped permanently', correct: false }, { text: 'Store in inbox/pending table and send push notification; sync on reconnect', correct: true }, { text: 'Block User A from sending', correct: false }, { text: 'Only work via email', correct: false }], explanation: 'Offline delivery: persist message in user\'s inbox, send push notification (APNs/FCM). On reconnect, client syncs missed messages from inbox table. Standard WhatsApp/Messenger pattern.' },
      { id: 's17-q5', question: 'For a group chat with 500 members, fan-out on write means:', options: [{ text: 'Each member reads all messages when opening the group', correct: false }, { text: 'When a message is sent, it is pushed/delivered to all 500 members immediately', correct: true }, { text: 'Messages are never delivered', correct: false }, { text: 'Only the sender sees the message', correct: false }], explanation: 'Fan-out on write for small groups: sender posts → system delivers to all 500 member connections. Works for groups up to ~500. Large groups (10K+) switch to fan-out on read to avoid write amplification.' },
      { id: 's17-q6', question: 'Chat servers need Redis pub/sub OR sticky sessions because:', options: [{ text: 'Users can only use one device', correct: false }, { text: 'User A on Server 1 sending to User B on Server 2 requires cross-server message routing', correct: true }, { text: 'Redis replaces WebSockets', correct: false }, { text: 'HTTP load balancers cannot route WebSocket', correct: false }], explanation: 'WebSocket connections are stateful — User B\'s connection lives on Server 2. When User A on Server 1 sends a message, Server 1 must route to Server 2 via Redis pub/sub or a message bus.' },
      { id: 's17-q7', question: 'Media (images/videos) in chat should be stored in:', options: [{ text: 'The Cassandra messages table as BLOBs', correct: false }, { text: 'Object storage (S3) with CDN; messages table stores only the URL reference', correct: true }, { text: 'Redis', correct: false }, { text: 'Local server disk only', correct: false }], explanation: 'Binary media doesn\'t belong in Cassandra rows. Upload to S3, store URL in message metadata. CDN serves media globally. Keeps message store lean and fast.' },
      { id: 's17-q8', question: 'Message ordering in group chats is typically achieved with:', options: [{ text: 'Random UUIDs only', correct: false }, { text: 'Per-conversation sequence numbers or timestamps with causal ordering', correct: true }, { text: 'Alphabetical sorting by sender name', correct: false }, { text: 'No ordering is needed', correct: false }], explanation: 'Sequence numbers per conversation ensure deterministic ordering. Clock skew makes pure timestamps unreliable — Lamport timestamps or server-assigned sequence IDs provide causal ordering.' },
      { id: 's17-q9', question: 'Kafka in chat architecture is useful for:', options: [{ text: 'Replacing WebSocket connections', correct: false }, { text: 'Decoupling message persistence, analytics, and push notification from the real-time delivery path', correct: true }, { text: 'Storing user passwords', correct: false }, { text: 'Load balancing WebSocket connections', correct: false }], explanation: 'Kafka decouples: chat server publishes message event → consumers handle persistence, analytics, search indexing, and push notifications asynchronously without blocking real-time delivery.' },
      { id: 's17-q10', question: 'At 230K messages/sec, the PRIMARY scaling challenge is:', options: [{ text: 'User interface design', correct: false }, { text: 'Write throughput for message persistence and real-time connection management', correct: true }, { text: 'DNS resolution', correct: false }, { text: 'CSS rendering', correct: false }], explanation: '230K writes/sec requires distributed message storage (Cassandra), horizontal chat server scaling, and efficient connection management. Read path is lighter — users pull history on demand.' }
    ]
  },

  'section-18': {
    title: 'Module 18 Assessment: News Feed Case Study',
    questions: [
      { id: 's18-q1', question: 'Fan-out on write (push model) pre-computes feeds when:', options: [{ text: 'A user opens their home feed', correct: false }, { text: 'A user creates a new post — pushing post ID to all followers\' feed caches', correct: true }, { text: 'A user logs out', correct: false }, { text: 'The database restarts', correct: false }], explanation: 'Fan-out on write: celebrity posts → system immediately inserts post ID into each follower\'s pre-computed feed cache (Redis sorted set). Reading feed = fast cache lookup. Write cost scales with follower count.' },
      { id: 's18-q2', question: 'The celebrity problem in fan-out on write occurs when:', options: [{ text: 'A user has no followers', correct: false }, { text: 'A user with millions of followers posts — requiring millions of cache writes', correct: true }, { text: 'A user unfollows someone', correct: false }, { text: 'The feed is empty', correct: false }], explanation: 'If a celebrity with 30M followers posts, fan-out on write means 30M Redis writes — slow and expensive. Solution: hybrid model — skip fan-out for celebrities, pull their posts on read instead.' },
      { id: 's18-q3', question: 'The hybrid feed approach used by Twitter/Instagram:', options: [{ text: 'Uses only fan-out on read for all users', correct: false }, { text: 'Fan-out on write for normal users; fan-out on read for celebrities; merge at read time', correct: true }, { text: 'Does not use any caching', correct: false }, { text: 'Stores all feeds in a single SQL table', correct: false }], explanation: 'Hybrid: normal user posts → push to follower caches (fast reads). Celebrity posts → skip push, merge into feed at read time. Best of both worlds for mixed follower distributions.' },
      { id: 's18-q4', question: 'Redis sorted sets are ideal for feed caches because:', options: [{ text: 'They only store strings', correct: false }, { text: 'Score (timestamp) enables efficient retrieval of most recent N posts via ZREVRANGE', correct: true }, { text: 'They cannot be updated', correct: false }, { text: 'They replace the need for a database', correct: false }], explanation: 'ZADD feed:user-id timestamp post-id stores posts chronologically. ZREVRANGE feed:user-id 0 19 returns top 20 most recent in O(log N + M) time. Perfect for timeline feeds.' },
      { id: 's18-q5', question: 'Fan-out on read is BETTER when:', options: [{ text: 'Users have millions of followers', correct: false }, { text: 'Read volume is low relative to writes, or users follow very few people', correct: true }, { text: 'Feed must load in under 10ms always', correct: false }, { text: 'Storage is unlimited', correct: false }], explanation: 'Fan-out on read: assemble feed at request time by querying followed users\' recent posts. Cheap writes, expensive reads. Works when users follow few people or read infrequently.' },
      { id: 's18-q6', question: 'After retrieving post IDs from feed cache, the feed service must:', options: [{ text: 'Return only the IDs to the client', correct: false }, { text: 'Hydrate full post content (text, media URLs, author info) from the posts store', correct: true }, { text: 'Delete the cache', correct: false }, { text: 'Write new posts', correct: false }], explanation: 'Feed cache stores lightweight post IDs only. Hydration step fetches full post objects (content, images, likes count, author) from posts DB/CDN. Can batch-fetch (MGET) for efficiency.' },
      { id: 's18-q7', question: 'Images and videos in social feeds should be served from:', options: [{ text: 'The PostgreSQL database', correct: false }, { text: 'CDN-backed object storage (S3 + CloudFront) — feed stores only metadata URLs', correct: true }, { text: 'Redis exclusively', correct: false }, { text: 'Email attachments', correct: false }], explanation: 'Media files are large — store in S3, serve via CDN for global low-latency delivery. Feed cache and posts table store only the CDN URL reference, keeping data layers fast.' },
      { id: 's18-q8', question: 'A read:write ratio of 100:1 for a news feed means:', options: [{ text: 'Optimize write path with complex sharding first', correct: false }, { text: 'Optimize read path with pre-computed feeds and aggressive caching', correct: true }, { text: 'Writes and reads are equally important', correct: false }, { text: 'No caching is needed', correct: false }], explanation: '100:1 read:write ratio means feed loads vastly outnumber post creations. Pre-computed feed caches (fan-out on write) and CDN make reads fast. Write path can be simpler.' },
      { id: 's18-q9', question: 'The social graph (follow relationships) is best stored in:', options: [{ text: 'A CDN', correct: false }, { text: 'A graph-friendly store or relational table with indexes on follower_id and followee_id', correct: true }, { text: 'Redis only with no persistence', correct: false }, { text: 'Kafka', correct: false }], explanation: 'Follow graph needs efficient lookups: "who does user X follow?" and "who follows user Y?" Relational tables with indexes or graph DB (Neo4j) for complex queries. Redis caches hot follow lists.' },
      { id: 's18-q10', question: 'ML-based feed ranking in production systems:', options: [{ text: 'Replaces the need for any feed storage', correct: false }, { text: 'Is layered on top of candidate generation — start with chronological, add ranking as extension', correct: true }, { text: 'Is not used by any social platform', correct: false }, { text: 'Requires deleting all cached feeds', correct: false }], explanation: 'In interviews: start with chronological feed (simpler), mention ML ranking as a follow-up. Production systems (Twitter, TikTok) rank candidates by engagement prediction — but the underlying fan-out/caching architecture remains.' }
    ]
  },

  'section-19': {
    title: 'Module 19 Assessment: Interview Framework & Best Practices',
    questions: [
      { id: 's19-q1', question: 'In a 45-minute system design interview, how much time should requirements clarification take?', options: [{ text: '0 minutes — start drawing immediately', correct: false }, { text: 'Approximately 5 minutes asking clarifying questions', correct: true }, { text: '30 minutes', correct: false }, { text: 'The entire interview', correct: false }], explanation: 'Spend ~5 minutes clarifying FRs, NFRs, scale, and constraints. Skipping this leads to over/under-engineering. The interviewer expects questions — it demonstrates senior thinking.' },
      { id: 's19-q2', question: 'The BEST communication tactic during a system design interview is:', options: [{ text: 'Work in complete silence to show focus', correct: false }, { text: 'Think aloud, state assumptions, and check in with the interviewer', correct: true }, { text: 'Only write code', correct: false }, { text: 'Argue with the interviewer\'s suggestions', correct: false }], explanation: 'Narrate your reasoning, state assumptions explicitly, propose trade-offs, and ask "should I go deeper here?" Silence makes interviewers unable to guide you or assess your thinking process.' },
      { id: 's19-q3', question: 'Which is a common system design interview mistake?', options: [{ text: 'Asking clarifying questions about scale', correct: false }, { text: 'Jumping to microservices without discussing whether a monolith suffices', correct: true }, { text: 'Drawing architecture diagrams', correct: false }, { text: 'Discussing trade-offs', correct: false }], explanation: 'Premature microservices is a top mistake. Start with monolith for MVPs, justify service extraction with scale/team needs. Over-engineering (Kafka for 10 QPS) also signals lack of practical experience.' },
      { id: 's19-q4', question: 'Back-of-the-envelope estimation in interviews demonstrates:', options: [{ text: 'Memorization of exact cloud pricing', correct: false }, { text: 'Ability to reason about scale and make informed architectural decisions', correct: true }, { text: 'Advanced calculus skills', correct: false }, { text: 'Knowledge of specific CPU models', correct: false }], explanation: 'Estimation shows you think about whether 4,000 QPS needs caching or a single server handles it. Order-of-magnitude math drives every subsequent decision — interviewers weight this heavily.' },
      { id: 's19-q5', question: 'When an interviewer asks you to go deeper on a component, you should:', options: [{ text: 'Restart the entire design from scratch', correct: false }, { text: 'Zoom into that component while keeping the overall architecture visible', correct: true }, { text: 'Refuse to change focus', correct: false }, { text: 'Switch to a different problem', correct: false }], explanation: 'Deep dives test specific knowledge (DB schema, cache strategy, protocol choice). Zoom in on the requested component, explain in detail, then offer to zoom back out. Shows flexibility and depth.' },
      { id: 's19-q6', question: 'Every design decision in an interview should be accompanied by:', options: [{ text: 'Silence', correct: false }, { text: 'The requirement driving it, the trade-off accepted, and how you mitigate downsides', correct: true }, { text: 'A reference to a specific company only', correct: false }, { text: 'Apologies for not knowing more', correct: false }], explanation: '"I\'m choosing Redis because reads are 100:1 and p99 < 100ms is required. Trade-off: cache invalidation complexity. Mitigation: write-invalidate on URL update." This structure signals senior-level thinking.' },
      { id: 's19-q7', question: 'Interviewers primarily evaluate:', options: [{ text: 'Whether you memorized specific AWS instance types', correct: false }, { text: 'Structured problem solving, technical depth, trade-off analysis, and communication', correct: true }, { text: 'Typing speed', correct: false }, { text: 'Whether you use the same architecture for every problem', correct: false }], explanation: 'Four evaluation dimensions: structured approach, technical depth (how things work), trade-off articulation, and collaborative communication. Memorized templates without reasoning score poorly.' },
      { id: 's19-q8', question: 'If you have 5 minutes left in an interview, the BEST use of time is:', options: [{ text: 'Start a completely new design', correct: false }, { text: 'Summarize trade-offs, mention extensions, and identify what you\'d do with more time', correct: true }, { text: 'Leave early', correct: false }, { text: 'Erase the whiteboard', correct: false }], explanation: 'Strong closings: recap key decisions and trade-offs, mention extensions (ML ranking, multi-region), acknowledge gaps ("I\'d explore consistent hashing for DB sharding next"). Shows self-awareness.' },
      { id: 's19-q9', question: '"Think aloud" during interviews is important because:', options: [{ text: 'It fills silence awkwardly', correct: false }, { text: 'Interviewers cannot grade your thought process if they cannot hear it', correct: true }, { text: 'It speeds up the interview', correct: false }, { text: 'It replaces drawing diagrams', correct: false }], explanation: 'Interviewers assess HOW you think, not just the final diagram. Narrating reasoning lets them provide hints, course-correct early, and score your problem-solving approach even if the final answer isn\'t perfect.' },
      { id: 's19-q10', question: 'Proposing a design and asking "does that align with your constraints?" demonstrates:', options: [{ text: 'Weakness and indecision', correct: false }, { text: 'Collaborative senior thinking — treating the interview as a design discussion', correct: true }, { text: 'That you don\'t know the answer', correct: false }, { text: 'Disrespect for the interviewer', correct: false }], explanation: 'System design interviews are collaborative discussions, not exams. Checking alignment shows you design with stakeholders in real life — and gives the interviewer a chance to steer you toward what they want to evaluate.' }
    ]
  },

  'section-20': {
    title: 'Module 20 Assessment: Capstone Review',
    questions: [
      { id: 's20-q1', question: 'The course covered how many modules total?', options: [{ text: '10', correct: false }, { text: '20', correct: true }, { text: '5', correct: false }, { text: '50', correct: false }], explanation: 'This masterclass contains 20 modules: foundations (1-2), requirements through observability (3-15), three case studies (16-18), interview framework (19), and capstone review (20).' },
      { id: 's20-q2', question: 'Which case study demonstrates fan-out on write vs read trade-offs?', options: [{ text: 'URL Shortener', correct: false }, { text: 'News Feed (Twitter/Instagram)', correct: true }, { text: 'Chat System', correct: false }, { text: 'None of the case studies', correct: false }], explanation: 'Module 18 (News Feed) is the canonical fan-out on write vs read case study, including the celebrity hybrid approach used by Twitter and Instagram.' },
      { id: 's20-q3', question: 'The recommended book for continued deep learning is:', options: [{ text: 'Harry Potter', correct: false }, { text: 'Designing Data-Intensive Applications by Martin Kleppmann', correct: true }, { text: 'The Great Gatsby', correct: false }, { text: 'Any cookbook', correct: false }], explanation: 'DDIA by Martin Kleppmann is the industry-standard reference for distributed systems, databases, and data-intensive application design. The natural next step after this course.' },
      { id: 's20-q4', question: 'The 7-step system design framework begins with:', options: [{ text: 'Writing production code', correct: false }, { text: 'Clarifying requirements (FRs and NFRs)', correct: true }, { text: 'Choosing a cloud provider', correct: false }, { text: 'Database schema design', correct: false }], explanation: 'Step 1 is always clarify requirements. Steps 2-7: estimate scale, define API, HLD, deep dive, trade-offs, LLD. This framework was introduced in Module 2 and applied in all case studies.' },
      { id: 's20-q5', question: 'WebSockets, Redis presence, and Cassandra are core to which case study?', options: [{ text: 'URL Shortener', correct: false }, { text: 'Chat System', correct: true }, { text: 'News Feed', correct: false }, { text: 'Payment Gateway', correct: false }], explanation: 'Module 17 (Chat System) uses WebSockets for real-time delivery, Redis for presence/routing, Cassandra for message history, and Kafka for async processing.' },
      { id: 's20-q6', question: 'CAP theorem states that during a network partition you must choose between:', options: [{ text: 'Speed and Cost', correct: false }, { text: 'Consistency and Availability', correct: true }, { text: 'SQL and NoSQL', correct: false }, { text: 'Monolith and Microservices', correct: false }], explanation: 'Module 13 covered CAP in depth. During partitions (unavoidable in distributed systems), choose CP (reject requests for consistency) or AP (serve stale data for availability).' },
      { id: 's20-q7', question: 'The three pillars of observability are:', options: [{ text: 'CPU, Memory, Disk', correct: false }, { text: 'Metrics, Logs, and Traces', correct: true }, { text: 'HLD, LLD, and API', correct: false }, { text: 'Auth, Encrypt, Audit', correct: false }], explanation: 'Module 15: Metrics (time-series aggregates), Logs (discrete events), Traces (request journeys). Together they answer "what\'s wrong," "what happened," and "where in the chain."' },
      { id: 's20-q8', question: 'Best practice for mastering system design after this course:', options: [{ text: 'Only re-read modules without practice', correct: false }, { text: 'Design 2 systems/week on Excalidraw and implement at least one project', correct: true }, { text: 'Memorize all quiz answers', correct: false }, { text: 'Avoid mock interviews', correct: false }], explanation: 'Active practice cements learning: weekly design exercises, building a URL shortener or chat app, mock interviews on Pramp/interviewing.io. Theory + practice = interview readiness.' },
      { id: 's20-q9', question: 'Redis cache-aside pattern was applied in which modules?', options: [{ text: 'Only Module 7', correct: false }, { text: 'Module 7 (Caching) and practically in URL Shortener, News Feed, and Chat case studies', correct: true }, { text: 'Only security module', correct: false }, { text: 'No modules covered caching', correct: false }], explanation: 'Caching theory in Module 7, applied in URL Shortener (redirect cache), News Feed (feed cache sorted sets), and Chat (presence/routing). Caching appears in nearly every scaled system design.' },
      { id: 's20-q10', question: 'SOLID principles and design patterns are most relevant to:', options: [{ text: 'High-Level Design only', correct: false }, { text: 'Low-Level Design (Modules 10-11) and LLD interview rounds', correct: true }, { text: 'GitHub Pages deployment', correct: false }, { text: 'DNS configuration', correct: false }], explanation: 'Modules 10-11 cover LLD fundamentals and OOP design patterns (Strategy, Observer, Factory, etc.) — essential for LLD-focused interviews (parking lot, elevator, book library).' }
    ]
  }
};

// ─── Utility: Seeded Fisher-Yates Shuffle ───────────────────────────────────
function shuffleArray(array, seed) {
  const arr = [...array];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

function shuffleOptions(options, questionId) {
  const seed = hashString(questionId);
  return shuffleArray(options, seed);
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// ─── Navigation Module ──────────────────────────────────────────────────────
function buildNavLink(module) {
  const available = module.available;
  const classes = available
    ? 'sidebar-link block px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-sand-100 hover:text-ocean-700 transition-colors'
    : 'block px-3 py-2.5 rounded-lg text-sm text-slate-300 cursor-not-allowed';

  if (!available) {
    return `<span class="${classes}" title="Coming soon">
      <span class="text-xs text-slate-400 mr-1">${String(module.number).padStart(2, '0')}</span>
      ${module.title}
    </span>`;
  }

  return `<a href="#${module.id}" class="${classes}" data-nav="${module.id}">
    <span class="text-xs text-lagoon-500 mr-1 font-semibold">${String(module.number).padStart(2, '0')}</span>
    ${module.title}
  </a>`;
}

function initNavigation() {
  const desktopNav = document.getElementById('desktop-nav');
  const mobileNav = document.getElementById('mobile-nav');
  const navHTML = COURSE_MODULES.map(buildNavLink).join('');

  if (desktopNav) desktopNav.innerHTML = navHTML;
  if (mobileNav) mobileNav.innerHTML = navHTML;

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });
}

// ─── Mobile Drawer ──────────────────────────────────────────────────────────
function openMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) {
    drawer.classList.remove('drawer-closed');
    drawer.classList.add('drawer-open');
  }
  if (overlay) {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) {
    drawer.classList.add('drawer-closed');
    drawer.classList.remove('drawer-open');
  }
  if (overlay) {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100');
  }
  document.body.style.overflow = '';
}

function initMobileDrawer() {
  const toggle = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const overlay = document.getElementById('drawer-overlay');

  if (toggle) toggle.addEventListener('click', openMobileDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
  if (overlay) overlay.addEventListener('click', closeMobileDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileDrawer();
  });
}

// ─── Progress Tracking ──────────────────────────────────────────────────────
function updateProgress() {
  const sections = document.querySelectorAll('.course-section[data-section]');
  const availableSections = Array.from(sections).filter(s => {
    const num = parseInt(s.dataset.section, 10);
    const mod = COURSE_MODULES.find(m => m.number === num);
    return mod && mod.available;
  });

  if (availableSections.length === 0) return;

  const viewportMiddle = window.scrollY + window.innerHeight * 0.4;
  let completedCount = 0;

  availableSections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionBottom = sectionTop + rect.height;

    if (viewportMiddle >= sectionBottom - 100) {
      completedCount = index + 1;
    } else if (viewportMiddle >= sectionTop && completedCount < index + 1) {
      completedCount = index + 0.5;
    }
  });

  const progress = Math.min(100, Math.round((completedCount / availableSections.length) * 100));

  ['desktop-progress-bar', 'mobile-progress-bar'].forEach(id => {
    const bar = document.getElementById(id);
    if (bar) bar.style.width = `${progress}%`;
  });

  const desktopText = document.getElementById('desktop-progress-text');
  const mobileText = document.getElementById('mobile-progress');
  if (desktopText) desktopText.textContent = `${progress}%`;
  if (mobileText) mobileText.textContent = `${progress}%`;
}

function initScrollSpy() {
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('.course-section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.nav === id);
          });
        }
      });
      updateProgress();
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
  window.addEventListener('scroll', updateProgress, { passive: true });
}

// ─── Quiz Renderer ──────────────────────────────────────────────────────────
function renderQuizSection(sectionId) {
  const container = document.querySelector(`[data-quiz-id="${sectionId}"]`);
  const quiz = QUIZ_DATA[sectionId];
  if (!container || !quiz) return;

  const questionsHTML = quiz.questions.map((q, qIndex) => {
    const shuffled = shuffleOptions(q.options, q.id);
    const correctIndex = shuffled.findIndex(o => o.correct);
    const correctLabel = OPTION_LABELS[correctIndex];

    const optionsHTML = shuffled.map((opt, i) => `
      <button type="button"
        class="quiz-option w-full text-left px-4 py-3 rounded-lg border border-sand-200 bg-white hover:border-ocean-300 hover:bg-ocean-50 transition-all text-sm text-slate-700"
        data-question="${q.id}"
        data-option-index="${i}"
        aria-label="Option ${OPTION_LABELS[i]}: ${opt.text}">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sand-100 text-ocean-700 text-xs font-bold mr-3">${OPTION_LABELS[i]}</span>
        ${opt.text}
      </button>
    `).join('');

    return `
      <div class="quiz-question bg-sand-50 rounded-2xl border border-sand-200 p-5 mb-4" data-qid="${q.id}">
        <div class="flex items-start gap-3 mb-4">
          <span class="flex-shrink-0 w-8 h-8 rounded-full bg-ocean-600 text-white flex items-center justify-center text-sm font-bold">${qIndex + 1}</span>
          <p class="text-slate-800 font-medium leading-relaxed pt-1">${q.question}</p>
        </div>
        <div class="space-y-2 ml-11" role="group" aria-label="Answer options for question ${qIndex + 1}">
          ${optionsHTML}
        </div>
        <div class="quiz-answer hidden ml-11 mt-4" data-answer-for="${q.id}">
          <button type="button"
            class="quiz-reveal w-full flex items-center justify-between px-4 py-3 bg-white border border-ocean-200 rounded-xl hover:bg-ocean-50 transition-colors"
            aria-expanded="false"
            data-reveal="${q.id}">
            <span class="text-sm font-semibold text-ocean-700">Reveal Answer &amp; Explanation</span>
            <svg class="quiz-chevron w-5 h-5 text-ocean-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="quiz-explanation hidden mt-2 px-4 py-4 bg-white border border-lagoon-200 rounded-xl">
            <p class="text-sm font-semibold text-palm-700 mb-2">✓ Correct Answer: ${correctLabel}</p>
            <p class="text-sm text-slate-600 leading-relaxed">${q.explanation}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="quiz-header mb-6">
      <h3 class="text-2xl font-semibold text-ocean-700 flex items-center gap-2">
        <span class="text-2xl">📝</span> ${quiz.title}
      </h3>
      <p class="text-sm text-slate-500 mt-2">${quiz.questions.length} questions — select an option, then reveal the answer to check your understanding.</p>
    </div>
    ${questionsHTML}
    <div class="quiz-score mt-6 p-4 bg-ocean-50 rounded-xl border border-ocean-200 text-center hidden">
      <p class="text-ocean-800 font-semibold">Quiz Progress: <span class="quiz-score-value">0</span> / ${quiz.questions.length} reviewed</p>
    </div>
  `;

  initQuizInteractions(container);
}

function initQuizInteractions(container) {
  container.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.dataset.question;
      const questionEl = container.querySelector(`[data-qid="${qId}"]`);

      questionEl.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('ring-2', 'ring-ocean-500', 'bg-ocean-50', 'border-ocean-400');
      });

      btn.classList.add('ring-2', 'ring-ocean-500', 'bg-ocean-50', 'border-ocean-400');

      const answerBlock = questionEl.querySelector(`[data-answer-for="${qId}"]`);
      if (answerBlock) answerBlock.classList.remove('hidden');

      updateQuizScore(container);
    });
  });

  container.querySelectorAll('.quiz-reveal').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.dataset.reveal;
      const explanation = btn.parentElement.querySelector('.quiz-explanation');
      const chevron = btn.querySelector('.quiz-chevron');
      const isOpen = !explanation.classList.contains('hidden');

      explanation.classList.toggle('hidden', isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
    });
  });
}

function updateQuizScore(container) {
  const total = container.querySelectorAll('.quiz-question').length;
  const reviewed = container.querySelectorAll('.quiz-explanation:not(.hidden)').length;
  const scoreEl = container.querySelector('.quiz-score');
  const scoreValue = container.querySelector('.quiz-score-value');

  if (reviewed > 0 && scoreEl) {
    scoreEl.classList.remove('hidden');
    if (scoreValue) scoreValue.textContent = reviewed;
  }
}

function initAllQuizzes() {
  Object.keys(QUIZ_DATA).forEach(renderQuizSection);
}

// ─── Bootstrap ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileDrawer();
  initScrollSpy();
  initAllQuizzes();
  updateProgress();
});

// Export for extensibility (future modules can append to QUIZ_DATA)
if (typeof window !== 'undefined') {
  window.SystemDesignCourse = { COURSE_MODULES, QUIZ_DATA, renderQuizSection, shuffleOptions };
}
