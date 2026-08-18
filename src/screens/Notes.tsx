import React, { useEffect, useMemo, useState } from 'react';

type StarRow = {
  id: string;
  title: string;
  question: string;
  classes: string[];
  situation: string;
  task: string;
  action: string[];
  result: string;
};

const spreadsheetCategories = [
  'Cross-Cultural Work',
  'Difficult Teammate',
  'Difficult Customer',
  'Time Crunch',
  'Process Improvement',
  'Multiple Deadlines',
  'Changed Direction',
  'Technical Cooperation',
  'Multiple Engineering Disciplines',
  'Data Analysis',
  'Beyond Experience',
  'New Or Modified System',
  'Evaluate And Recommend',
  'Team Presentation',
  'Hesitant Interviewee',
  'Independent Action',
  'Far-Reaching Decision',
  'Positive Team Relationship',
  'Train A Coworker',
];

const commonCategories = [
  'Conflict / Disagreement',
  'Mistake / Failure',
  'Pressure',
  'Leadership / Initiative',
  'Problem Solving',
  'Customer Focus',
  'Communication',
  'Stakeholder Collaboration',
  'Safety / Ethics',
  'Quality / Attention To Detail',
  'Ambiguity',
  'Adaptability',
  'Persuasion / Influence',
  'Mentorship',
  'Learning Quickly',
  'Ownership',
  'Innovation',
  'Prioritization',
];

const starRows: StarRow[] = [
  {
    id: 'cross-cultural-daegu-acle',
    title: 'Building trust across Korean and Italian classrooms',
    question: 'Tell me about a time you worked with people from a different cultural background.',
    classes: ['Cross-Cultural Work', 'Communication', 'Stakeholder Collaboration'],
    situation:
      'I worked in international education roles in South Korea and Italy, including gifted STEM classrooms in Daegu and multi-city English camps through A.C.L.E.',
    task:
      'I needed to teach technical and communication-heavy material while coordinating with local teachers, administrators, students, and parents who had different expectations for classroom structure.',
    action: [
      'I kept the context brief for each group, then adapted my communication style to the local environment instead of forcing one default approach.',
      'I used bilingual support where it helped, including English/Hangul scheduling tools at Daegu, so the work was easier for Korean staff to audit and maintain.',
      'I planned lessons around visible outcomes, such as hands-on STEM tasks and performance-based camp activities, because those made expectations clear even when language comfort varied.',
      'I asked local teachers what had worked before, preserved the parts that fit their standards, and changed only the pieces that needed my technical or instructional ownership.',
      'I watched for quiet disagreement and invited it early, because in some settings people were less likely to interrupt publicly.',
    ],
    result:
      'The classes and camps ran across multiple cities and institutions, students stayed engaged, and the local staff had tools and lesson structures they could keep using after I left.',
  },
  {
    id: 'difficult-teammate-captain',
    title: 'Getting a resistant league captain aligned',
    question: 'Give me an example of a difficult teammate or someone who was hard to motivate.',
    classes: ['Difficult Teammate', 'Conflict / Disagreement', 'Persuasion / Influence'],
    situation:
      'While helping run Korean ultimate frisbee leagues, I coordinated with captains, regional leaders, and board members across roughly 35 teams.',
    task:
      'When a captain resisted a league decision, I needed to keep the league consistent without turning a disagreement into a public fight.',
    action: [
      'I moved the discussion out of the group thread and had the difficult conversation directly so the person did not have to defend their position in public.',
      'I asked what constraint they were actually worried about, separated that from the emotional part of the complaint, and repeated it back to confirm I understood it.',
      'I explained the league-wide tradeoff, including fairness to other teams, field availability, and the precedent the board would create if we made an exception.',
      'I gave the captain a clear path to comply and still save face with their team, then documented the decision so future captains received the same standard.',
      'I followed up after the event instead of treating the relationship as disposable once the immediate issue was solved.',
    ],
    result:
      'The league kept a consistent rule set, the event continued without disruption, and the captain relationship remained workable for later scheduling and competition issues.',
  },
  {
    id: 'difficult-customer-venturetec',
    title: 'Keeping a client relationship intact while controlling scope',
    question: 'Tell me about a difficult customer or collaborative relationship.',
    classes: ['Difficult Customer', 'Customer Focus', 'Communication'],
    situation:
      'At Venturetec I worked directly with startup clients whose product ideas changed quickly, sometimes while payment, delivery expectations, and feature scope were still unsettled.',
    task:
      'I needed to protect the engineering schedule and payment path while still making the client feel heard and supported.',
    action: [
      'I listened first and wrote down the client request in concrete product language instead of debating it immediately.',
      'I separated must-have delivery work from nice-to-have expansion work, then mapped the request to cost, timeline, and release risk.',
      'I used a calm written follow-up so there was a shared record of what was included, what was deferred, and what would require additional approval.',
      'I kept the product conversation constructive by offering lower-risk alternatives when the requested feature was too broad for the current milestone.',
      'I escalated business terms when needed, but I continued owning the technical explanation so the customer did not receive vague answers.',
    ],
    result:
      'The team preserved the client relationship, avoided uncontrolled scope growth, and kept the product moving toward a deliverable release instead of letting late changes consume the schedule.',
  },
  {
    id: 'time-crunch-venue-weather',
    title: 'Recovering a sports event under weather and venue pressure',
    question: 'Describe a situation where you had to work under time pressure.',
    classes: ['Time Crunch', 'Pressure', 'Prioritization'],
    situation:
      'For Korean ultimate frisbee events, weather and venue access could change late, and those decisions affected many players, captains, and travel plans.',
    task:
      'I had to decide whether to delay, cancel, move venues, or continue while keeping the event fair and safe.',
    action: [
      'I gathered the facts that mattered first: field status, weather timing, travel impact, captain availability, and safety concerns.',
      'I reduced the options to a few executable choices instead of keeping the group in open-ended discussion.',
      'I communicated the decision quickly through captains and regional contacts, with enough detail that teams understood the reason and next step.',
      'I adjusted schedules and brackets around the constraint so the competitive result stayed as fair as possible.',
      'I tracked follow-up items afterward so the same failure mode could be handled faster the next time.',
    ],
    result:
      'The events continued with less confusion, teams received clear instructions, and the league built a repeatable pattern for handling weather and field disruptions.',
  },
  {
    id: 'process-improvement-action-emailer',
    title: 'Automating league action items with Excel and VBA',
    question: 'Tell me about a time you made a process more efficient.',
    classes: ['Process Improvement', 'Leadership / Initiative', 'Ownership'],
    situation:
      'ROK-U and WUDI league operations created recurring meeting notes, owner assignments, and follow-up tasks across board members and regional leads.',
    task:
      'I needed to reduce the manual burden of turning meeting decisions into clear action items people would actually see and complete.',
    action: [
      'I identified the repeatable part of the workflow: collecting owners, actions, due dates, and decision notes after each meeting.',
      'I built an Excel/VBA action-item emailer so the team could generate structured follow-ups without retyping the same format every week.',
      'I made the output readable for busy volunteers, with clear owners and next steps rather than dense minutes.',
      'I kept the tool lightweight because the league did not need a heavy enterprise system for a volunteer process.',
      'I used the tool as part of the operating rhythm so the improvement changed behavior, not just the document format.',
    ],
    result:
      'The league spent less time manually writing follow-up emails, board decisions became easier to track, and recurring operations had a more reliable handoff between meetings.',
  },
  {
    id: 'multiple-deadlines-venturetec',
    title: 'Balancing multiple client products at Venturetec',
    question: 'Describe a time when you had multiple deadlines at once.',
    classes: ['Multiple Deadlines', 'Pressure', 'Prioritization'],
    situation:
      'At Venturetec I worked across mobile apps, dashboards, games, data scrapers, and client demos with overlapping delivery expectations.',
    task:
      'I had to keep multiple products moving without letting a noisy request from one client silently starve another project.',
    action: [
      'I broke each project into release-critical tasks, support tasks, and speculative features so I could compare work by delivery risk.',
      'I gave clients and internal leadership honest tradeoffs when dates, features, or quality were in conflict.',
      'I protected integration and deployment time instead of filling the schedule only with feature coding.',
      'I used smaller milestones and demos to surface misunderstandings before they became late-stage rework.',
      'I shifted my own focus to the highest-risk blocker first, then returned to lower-risk implementation once the schedule pressure was under control.',
    ],
    result:
      'The team kept client products moving in parallel, reduced surprise rework, and had clearer conversations about what could realistically ship in each milestone.',
  },
  {
    id: 'changed-direction-requirements',
    title: 'Handling changing requirements without losing the release',
    question: 'Tell me about a difficult change in direction, schedule, or priority.',
    classes: ['Changed Direction', 'Adaptability', 'Ambiguity'],
    situation:
      'In both MES consulting and startup product work, requirements could change after engineering had already started because stakeholders learned more from demos, shop-floor constraints, or customer conversations.',
    task:
      'I needed to adapt to the new information without letting every change reset the schedule.',
    action: [
      'I first clarified whether the change represented a true business requirement, a user preference, or a misunderstanding of the existing design.',
      'I documented the difference between current scope and requested scope so the impact was visible.',
      'I estimated the risk in terms stakeholders cared about: schedule, production disruption, app-store release timing, or operational usability.',
      'I proposed the smallest change that solved the actual problem, then deferred broader redesign work when it was not needed for the current release.',
      'I kept a decision trail through Jira, meeting notes, or release documentation so later conversations did not restart from memory.',
    ],
    result:
      'Stakeholders could make informed tradeoffs, and projects continued moving even when priorities changed because the impact was explicit instead of hidden inside the code.',
  },
  {
    id: 'technical-cooperation-mes',
    title: 'Coordinating MES work across controls, ERP, QA, and production',
    question: 'Tell me about a time you cooperated with others to solve a technical problem.',
    classes: [
      'Technical Cooperation',
      'Multiple Engineering Disciplines',
      'Stakeholder Collaboration',
      'Communication',
    ],
    situation:
      'At Rockwell Automation and Maverick Technologies, I worked on manufacturing execution systems tied to PLCs, HMIs, ERP flows, QA requirements, robotics, and shop-floor traceability.',
    task:
      'I needed to solve production software problems without breaking the assumptions of the controls team, plant operators, business stakeholders, or QA process owners.',
    action: [
      'I collected the technical facts from each discipline before proposing a fix, because MES issues often crossed system boundaries.',
      'I used pre-meeting topic collection and OneNote-style decision notes so meetings focused on open questions rather than status noise.',
      'I drew in quieter subject matter experts when I could tell the loudest person did not own the missing information.',
      'I translated between plant-floor language, software behavior, and business reporting needs so each group understood the same constraint.',
      'I documented the agreed design and test path so offshore developers, local controls engineers, and client reviewers could execute against the same understanding.',
    ],
    result:
      'The work produced safer integration decisions, fewer repeated meetings, and clearer handoffs across disciplines that had to coordinate for production systems to run correctly.',
  },
  {
    id: 'data-analysis-seniorsafe',
    title: 'Using data to improve phone-fraud detection',
    question: 'Tell me about a time you analyzed data and drew conclusions.',
    classes: ['Data Analysis', 'Problem Solving', 'Quality / Attention To Detail'],
    situation:
      'At SeniorSafe/Sentien, I worked on real-time phone-fraud detection using live call audio, transcripts, speaker turns, and roughly 50 scam and conversation labels.',
    task:
      'I needed to improve detection quality while avoiding brittle models that looked good in a narrow test set but failed on real conversations.',
    action: [
      'I compared simple heuristics, recurrent models, and transformer-based approaches so the team could see what each method actually bought us.',
      'I built speaker-turn-aware transformer inputs with attention masks that let turns see the right prior context without leaking future information.',
      'I used validation splits, threshold analysis, ablations, F2-oriented thinking, and precision-recall behavior to tune for the cost of missing scams.',
      'I treated unlabeled or partially labeled data carefully so missing annotations did not accidentally become false negatives.',
      'I inspected model behavior at the conversation and turn level, not only the aggregate score, because the product needed explainable timing for alerts and interventions.',
    ],
    result:
      'The project moved from simple trigger logic toward a more robust fraud-detection pipeline that could use conversation context, speaker roles, and measured model tradeoffs.',
  },
  {
    id: 'beyond-experience-audience-ai',
    title: 'Building a real-time comedy feedback app from scratch',
    question: 'Tell me about a technical assignment beyond your previous experience.',
    classes: ['Beyond Experience', 'Learning Quickly', 'Problem Solving'],
    situation:
      'At Venturetec, Audience AI needed a mobile app that could record a stand-up set, score whether moments were funny, and export a polished social video.',
    task:
      'I had to build across mobile, audio processing, machine learning, and video rendering even though the product did not fit one narrow engineering lane.',
    action: [
      'I broke the problem into audio capture, feature extraction, humor/laughter scoring, playback timing, video processing, and export workflow.',
      'I used React Native for the app layer and applied DSP concepts such as FFT, MFCC-style features, and spectrum analysis to represent the audio signal.',
      'I trained and evaluated audio classifiers aimed at separating laughter-like signals from speech and noise, then bucketed laugh events by timestamp.',
      'I built a layered laugh-track engine that could place selected audio clips at the right moments rather than adding one flat sound effect.',
      'I implemented an FFmpeg pipeline to normalize video, add selected laughs, watermark the output, add branding and user identity, and produce a shareable export.',
    ],
    result:
      'The product became a working 0-to-1 mobile experience that combined ML, audio analysis, and automated video generation without depending on a large external production pipeline.',
  },
  {
    id: 'new-modified-system-audio',
    title: 'Creating a reliable live audio and monitoring system',
    question: 'Tell me about using electronics or technical knowledge to develop a new or modified system.',
    classes: ['New Or Modified System', 'Problem Solving', 'Quality / Attention To Detail'],
    situation:
      'For the Jackson/Mars performance work, the live setup involved music timing, in-ear monitoring, crowd energy, and stage conditions where failure would be very visible.',
    task:
      'I needed to make the performance system reliable enough that the performers could stay in sync and the sound team could operate it under live conditions.',
    action: [
      'I analyzed the full signal path instead of treating it as only a software or only an audio problem.',
      'I built and refined a stomp-box style control workflow so timing cues could be triggered in a way that matched the physical performance environment.',
      'I worked with sound engineers to make sure the in-ear monitor setup supported the performers without creating confusing feedback or timing issues.',
      'I planned for handoff and repeatability, because a live system has to work when someone else is operating parts of it under pressure.',
      'I paid attention to stage and crowd safety so technical choices did not create operational risk.',
    ],
    result:
      'The system supported live performance needs with clearer cues, better operator confidence, and a workflow that could survive real event pressure.',
  },
  {
    id: 'evaluate-recommend-privacy',
    title: 'Recommending a privacy-safe audio retention policy',
    question: 'Tell me about a time you evaluated a situation and recommended a course of action.',
    classes: ['Evaluate And Recommend', 'Safety / Ethics', 'Customer Focus'],
    situation:
      'At SeniorSafe/Sentien, the product used phone-call audio and transcripts, which created privacy, consent, and data-retention concerns.',
    task:
      'I needed to support ML development and transcription verification without keeping sensitive raw recordings longer than necessary.',
    action: [
      'I separated what the system needed for model improvement from what it needed for operational support and compliance.',
      'I considered one-party and two-party consent implications and made sure recording-announcement behavior was part of the product discussion.',
      'I used AWS Transcribe PII redaction for text where possible and treated raw MP3 audio as a higher-risk artifact.',
      'I recommended short raw-audio retention for transcription verification, then deletion once the useful verification window passed.',
      'I communicated the tradeoff in product terms: preserve enough evidence to improve the system while reducing unnecessary exposure of private call content.',
    ],
    result:
      'The product had a clearer privacy posture, with raw audio treated as temporary and sensitive rather than as default long-term training data.',
  },
  {
    id: 'team-presentation-investor-demo',
    title: 'Explaining a complex AI product in investor and client demos',
    question: 'Tell me about a team oral presentation or important technical presentation.',
    classes: ['Team Presentation', 'Communication', 'Stakeholder Collaboration'],
    situation:
      'At SeniorSafe/Sentien, I participated in demos and product discussions around an AI voice and fraud-detection system for protecting older adults.',
    task:
      'I needed to explain complex ML and product behavior to people who cared about business value, trust, and safety rather than model internals.',
    action: [
      'I translated the system into a story about calls, speaker turns, scam signals, and intervention timing instead of starting with architecture diagrams.',
      'I prepared concrete examples that showed how a conversation moved from raw audio to transcript, labels, model confidence, and product behavior.',
      'I highlighted the parts I personally owned, including ML pipelines, semantic retrieval, voice-agent memory, and iOS product work.',
      'I adjusted the depth of the explanation based on the audience, going deeper on technical tradeoffs only when the question called for it.',
      'I kept privacy and false-negative risk visible because those were product trust issues, not side details.',
    ],
    result:
      'The demos gave stakeholders a clearer understanding of both the technical path and product value, helping connect engineering work to customer and investor concerns.',
  },
  {
    id: 'hesitant-interviewee-plc',
    title: 'Getting information from hesitant controls stakeholders',
    question: 'Tell me about a time you interviewed someone who was resistant or hesitant.',
    classes: ['Hesitant Interviewee', 'Stakeholder Collaboration', 'Communication'],
    situation:
      'On MES projects, some controls or plant-floor stakeholders were cautious about software changes because production disruptions could be expensive.',
    task:
      'I needed accurate requirements and integration details from people who had good reasons to be skeptical of another software request.',
    action: [
      'I started by acknowledging the operational risk they owned instead of acting like the software task was isolated.',
      'I asked targeted questions about signals, state transitions, operator behavior, and failure cases rather than asking for broad opinions.',
      'I used their terminology when documenting requirements so they could quickly verify whether I understood the plant reality.',
      'I avoided forcing decisions in the first conversation when the missing detail required them to check equipment, PLC logic, or production history.',
      'I brought the information back into a shared design record so their input was visibly used instead of disappearing into a meeting note.',
    ],
    result:
      'The hesitant stakeholders became more willing to share critical details, and the resulting integration work had fewer surprises because their operational knowledge made it into the design.',
  },
  {
    id: 'independent-action-founding-ml',
    title: 'Owning the ML path as a founding engineer',
    question: 'Tell me about a time you acted independently without much guidance.',
    classes: ['Independent Action', 'Ownership', 'Ambiguity'],
    situation:
      'At SeniorSafe/Sentien, I joined as a founding ML engineer while the product direction, data strategy, and modeling approach were still being formed.',
    task:
      'I needed to turn an ambiguous fraud-protection idea into working technical systems and product capabilities.',
    action: [
      'I mapped the product goal to concrete data assets: audio, transcripts, speaker turns, labels, repeated calls, semantic retrieval, and intervention moments.',
      'I built early heuristics to create a baseline before investing in deeper models.',
      'I moved the system toward RNN and transformer approaches once the baseline made the data and failure modes clearer.',
      'I designed pgvector/Postgres retrieval views over whole conversations, speaker-only content, turns, and prior-context windows to support RAG and memory features.',
      'I also owned iOS product work and demo readiness so the research direction stayed tied to what users and stakeholders could actually experience.',
    ],
    result:
      'The company gained an end-to-end technical path from raw calls to ML scoring, retrieval, product demos, and mobile user experience instead of a disconnected research prototype.',
  },
  {
    id: 'far-reaching-decision-lockstep',
    title: 'Choosing deterministic lockstep for a commercial RTS engine',
    question: 'Tell me about a far-reaching technical decision you made.',
    classes: ['Far-Reaching Decision', 'Problem Solving', 'Quality / Attention To Detail'],
    situation:
      'For Annihilation++, my personal C++ RTS project intended for commercial release, I had to choose the core simulation architecture early.',
    task:
      'I needed an architecture that could support many units, physics, pathing, networking, replays, debugging, and long-term maintainability.',
    action: [
      'I chose a deterministic lockstep simulation model because the project needed reproducible game state across machines rather than a visually plausible but divergent simulation.',
      'I designed cross-platform state hashing so I could detect differences across operating systems and CPUs.',
      'I built the physics around force, mass, acceleration, gravity-like effects, terrain friction, and consistent time steps so movement felt grounded and remained testable.',
      'I implemented terrain-aware A* pathing, spatial grids, interpolation, and level-of-detail decisions to keep the simulation responsive at 60 FPS.',
      'I treated reproducibility as a product feature because it affects multiplayer sync, replay debugging, and whether a complex game can be maintained by one developer.',
    ],
    result:
      'The project has a stronger foundation for a Steam-oriented release, with simulation behavior that is easier to debug, replay, and extend than an ad hoc real-time update loop.',
  },
  {
    id: 'positive-team-mentorship',
    title: 'Building positive relationships through mentoring and handoff',
    question: 'Tell me about a time you created a positive relationship between team members or coworkers.',
    classes: ['Positive Team Relationship', 'Train A Coworker', 'Mentorship'],
    situation:
      'Across Venturetec, sports-league operations, and live-event work, I often had to leave systems in the hands of interns, volunteers, or operators who would keep using them after I stepped away.',
    task:
      'I needed people to feel ownership instead of feeling like they were only following instructions from the person who built the system.',
    action: [
      'I explained the purpose behind the workflow before showing the mechanics, because people learn faster when they understand the reason for each step.',
      'I gave people bounded responsibility first, then widened their ownership as they demonstrated comfort.',
      'I wrote practical handoff notes focused on the decisions they would need to make, not just a list of buttons or commands.',
      'I stayed available for early questions without taking the work back from them.',
      'I made sure public credit matched the work people actually did, which helped volunteers and junior contributors stay engaged.',
    ],
    result:
      'The teams had smoother handoffs, newer contributors became more independent, and recurring work did not depend entirely on me being present.',
  },
  {
    id: 'mistake-failure-label-state',
    title: 'Catching a labeling failure mode before it distorted model quality',
    question: 'Tell me about a mistake, failure, or risk you found and fixed.',
    classes: ['Mistake / Failure', 'Data Analysis', 'Quality / Attention To Detail'],
    situation:
      'In the SeniorSafe/Sentien ML pipeline, conversation labels were not always complete, and incomplete labels can quietly corrupt model evaluation.',
    task:
      'I needed to prevent missing annotations from being treated as clean negative examples.',
    action: [
      'I inspected the label states instead of assuming every absent label meant the behavior did not occur.',
      'I treated unknown, missing, and negative states differently so training and evaluation would not learn the wrong lesson.',
      'I checked model behavior at the turn and conversation level to see whether confusing labels were creating misleading confidence.',
      'I used ablations and validation splits to compare whether modeling changes were actually improving the target behavior.',
      'I documented the caveat so future analysis would not overstate performance based on a flawed ground truth assumption.',
    ],
    result:
      'The evaluation became more trustworthy because the pipeline reduced a subtle source of false confidence before it became a larger product-quality issue.',
  },
  {
    id: 'initiative-scheduling-app',
    title: 'Creating a bilingual scheduling tool for school operations',
    question: 'Tell me about a time you went above and beyond your normal responsibilities.',
    classes: ['Leadership / Initiative', 'Process Improvement', 'Independent Action'],
    situation:
      'At Daegu Science High School, scheduling and coordination had to work across English-speaking instruction needs and Korean administrative workflows.',
    task:
      'I saw an opportunity to make scheduling clearer and less dependent on manual back-and-forth communication.',
    action: [
      'I identified the recurring scheduling pain points that created confusion for teachers and administrative staff.',
      'I built an English/Hangul scheduling tool so both sides could use the same source of truth.',
      'I designed it around the actual school workflow instead of building a generic calendar that ignored local constraints.',
      'I made the interface straightforward enough that non-technical users could validate the schedule without needing me beside them.',
      'I used the tool to reduce communication ambiguity rather than only to demonstrate coding ability.',
    ],
    result:
      'The school had a clearer bilingual coordination workflow, and the tool reduced avoidable scheduling confusion for staff who had to work across languages.',
  },
  {
    id: 'technical-depth-game-physics',
    title: 'Making game simulation feel physically grounded',
    question: 'Describe a difficult technical problem you solved.',
    classes: ['Problem Solving', 'Innovation', 'New Or Modified System'],
    situation:
      'In my personal game projects, including Smashed Fighter and Annihilation++, I cared about simulation behavior that was more than graphical movement.',
    task:
      'I wanted player and unit movement to respond to real forces such as gravity, collision, terrain, friction, air-like effects, and changing environmental constraints.',
    action: [
      'I modeled motion using force, mass, acceleration, and consistent time steps so changes to the simulation had predictable effects.',
      'I tuned gravity, collision response, terrain friction, and movement constraints to make the game feel physically plausible without making it unplayable.',
      'I separated simulation state from rendering so the game could interpolate smoothly while the underlying state stayed deterministic.',
      'I used spatial partitioning and pathing logic to keep many moving objects responsive instead of relying only on brute-force checks.',
      'I tested edge cases such as collisions, terrain transitions, and high-unit-count scenarios because simulation bugs often appear only under stress.',
    ],
    result:
      'The projects became stronger demonstrations of real-world simulation thinking, not just graphics work, and the C++ RTS gained a maintainable foundation for commercial release preparation.',
  },
  {
    id: 'release-management-versioning',
    title: 'Making releases reproducible instead of ambiguous',
    question: 'Tell me about a time you improved documentation, quality, or release discipline.',
    classes: ['Process Improvement', 'Quality / Attention To Detail', 'Communication'],
    situation:
      'Across mobile apps and personal projects, ambiguous release files and dates can make it hard to know exactly what source code produced a build.',
    task:
      'I needed a release process that made app versions, file snapshots, and build provenance easier to trust.',
    action: [
      'I used Git history and release markers so source state could be tied back to delivered builds.',
      'I preferred unambiguous timestamp formats such as year-month-day-hour-minute-second when filenames needed date ordering.',
      'I tracked iOS and Android version numbers so the app-store state matched the engineering state.',
      'I documented release decisions close to the code and build artifacts instead of leaving them only in chat or memory.',
      'I treated reproducibility as part of engineering quality because it affects debugging, support, and team confidence.',
    ],
    result:
      'The release state became easier to audit, older builds were less confusing to reason about, and future debugging had a clearer trail back to the source code.',
  },
  {
    id: 'ethical-judgment-grading',
    title: 'Using judgment instead of rigid scoring for English assessment',
    question: 'Tell me about a time you made a judgment call involving fairness or ethics.',
    classes: ['Safety / Ethics', 'Evaluate And Recommend', 'Communication'],
    situation:
      'At Daegu Science High School, I assessed English communication for gifted STEM students whose technical ability and spoken English confidence varied.',
    task:
      'I needed to evaluate students fairly without reducing communication ability to a mechanical grammar checklist.',
    action: [
      'I looked at whether students could communicate ideas clearly, participate, improve, and use English functionally in context.',
      'I avoided over-penalizing small language errors when the student was successfully communicating complex ideas.',
      'I gave feedback that helped students improve the next attempt instead of only explaining a grade after the fact.',
      'I aligned expectations with local teachers so my judgment fit the school environment.',
      'I kept the assessment focused on learning outcomes, not on rewarding the students who were already most comfortable speaking.',
    ],
    result:
      'Students received fairer, more useful feedback, and the assessment supported real communication growth rather than only measuring surface-level fluency.',
  },
  {
    id: 'customer-process-spray-integrity',
    title: 'Turning field operations into a usable mobile workflow',
    question: 'Tell me about a time you focused on a customer or process problem.',
    classes: ['Customer Focus', 'Process Improvement', 'Problem Solving'],
    situation:
      'For the Spray Integrity Program at Venturetec, contractors and administrators needed a workflow for barrels, estimates, jobs, referrals, rewards, and field metadata.',
    task:
      'I needed to turn a messy operational process into a usable mobile and web product.',
    action: [
      'I mapped the real workflow from QR barrel tracking through product selection, estimate building, job forms, weather metadata, and back-office review.',
      'I used React Native Expo for the field app and a Vue/Laravel portal for administrative workflows.',
      'I designed around fast field entry because contractors would not tolerate a workflow that slowed down real jobs.',
      'I connected referral and reward logic to the operational data so it was not just a standalone marketing feature.',
      'I tested the flow as a full process rather than isolated screens because the value came from connecting the job lifecycle.',
    ],
    result:
      'The product translated field and back-office needs into one connected workflow, making the process easier to track and more realistic for contractors to use.',
  },
  {
    id: 'networked-shooter-sync',
    title: 'Keeping a multiplayer shooter responsive and synchronized',
    question: 'Tell me about a complex system you built where responsiveness mattered.',
    classes: ['Problem Solving', 'Innovation', 'Data Analysis'],
    situation:
      'In Seouldat Shooter, I built a multiplayer browser shooter using Phaser, Express, and Socket.IO.',
    task:
      'I needed the game to feel responsive locally while keeping the authoritative server state trustworthy for multiple players.',
    action: [
      'I separated client prediction from authoritative server updates so player input felt immediate without letting the client own the truth.',
      'I implemented reconciliation logic so the client could correct to the server state when prediction diverged.',
      'I kept network messages small and focused on the state needed for gameplay instead of sending unnecessary data.',
      'I tested behavior under latency and update-rate pressure because networking bugs often feel like unfair gameplay rather than obvious crashes.',
      'I used the project to deepen my understanding of real-time state synchronization, not just front-end animation.',
    ],
    result:
      'The game became a practical demonstration of responsive multiplayer engineering, with clear tradeoffs between latency, fairness, and authoritative state.',
  },
  {
    id: 'disagreement-feature-focus',
    title: 'Pushing back on product scope to protect the core mission',
    question: 'Tell me about a time you disagreed with a manager, customer, or stakeholder.',
    classes: ['Conflict / Disagreement', 'Persuasion / Influence', 'Customer Focus', 'Changed Direction'],
    situation:
      'At SeniorSafe/Sentien, the core product was meant to protect older adults from phone scams, but startup product discussions could pull attention toward adjacent features.',
    task:
      'I needed to challenge scope expansion without sounding negative or blocking legitimate product learning.',
    action: [
      'I framed the disagreement around the customer risk: the product had to detect scam behavior reliably before secondary features could matter.',
      'I separated the stakeholder idea from the implementation request, then asked what user problem the idea was supposed to solve.',
      'I compared the new work against the current fraud-detection path, including data needs, model quality, privacy risk, and demo readiness.',
      'I proposed smaller experiments when the idea had merit, so the team could learn without derailing the main delivery path.',
      'I kept the tone factual and product-focused, because the goal was better prioritization, not winning an argument.',
    ],
    result:
      'The discussion stayed constructive, the product stayed more focused on fraud detection, and stakeholders had clearer tradeoffs for deciding what belonged in the next milestone.',
  },
  {
    id: 'quality-traceability-mes',
    title: 'Protecting production quality through traceable MES behavior',
    question: 'Tell me about a time attention to detail mattered to safety, quality, or reliability.',
    classes: [
      'Quality / Attention To Detail',
      'Safety / Ethics',
      'Customer Focus',
      'Evaluate And Recommend',
    ],
    situation:
      'At Rockwell Automation and Maverick Technologies, MES work supported high-consequence manufacturing environments where production records, materials, and operator actions had to be traceable.',
    task:
      'I needed to help deliver software behavior that plant teams and customers could trust during real production.',
    action: [
      'I treated traceability as a production-quality requirement, not just a database feature.',
      'I checked how material state, operator actions, PLC signals, HMI behavior, ERP records, and QA expectations connected across the workflow.',
      'I asked edge-case questions about what should happen when equipment, data, or operator inputs did not follow the happy path.',
      'I documented the expected behavior so controls, QA, offshore developers, and client reviewers could test against the same standard.',
      'I recommended changes when the software behavior created ambiguity in what happened on the production floor.',
    ],
    result:
      'The work reduced the risk of ambiguous production records and helped align software behavior with the reliability expectations of major industrial customers.',
  },
  {
    id: 'feedback-iteration-voice-agent',
    title: 'Using feedback to make technical demos easier to understand',
    question: 'Tell me about a time you received feedback and changed your approach.',
    classes: ['Communication', 'Customer Focus', 'Learning Quickly', 'Team Presentation'],
    situation:
      'At SeniorSafe/Sentien, I had to explain ML classification, semantic retrieval, and voice-agent behavior to investors and interested parties who did not necessarily care about model internals.',
    task:
      'I needed to make the technical story understandable without stripping away the parts that made the system credible.',
    action: [
      'I paid attention to where people got lost during demos and treated those moments as feedback on my explanation.',
      'I moved the explanation from model-first language to user-first language: a phone call comes in, the system reads risk signals, and the product decides when to intervene.',
      'I kept technical detail ready for follow-up questions, but I stopped leading with architecture unless the audience asked for it.',
      'I used concrete examples of scam concepts, conversation turns, labels, and retrieval memory so the system felt practical rather than abstract.',
      'I adjusted the depth of each answer based on the person asking, which made demos more conversational and less like a lecture.',
    ],
    result:
      'The demos became clearer for mixed audiences, and I could still support deeper technical questions when stakeholders wanted evidence behind the product behavior.',
  },
];

const filterCategories = Array.from(
  new Set([...spreadsheetCategories, ...commonCategories, ...starRows.flatMap((row) => row.classes)]),
);

const Notes: React.FC = () => {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => new Set(filterCategories),
  );

  useEffect(() => {
    document.title = 'STAR Interview Notes | Eric Niemeyer';

    const robotsName = 'robots';
    const previousRobots = document.querySelector<HTMLMetaElement>(`meta[name="${robotsName}"]`);
    const ownedRobots = !previousRobots;
    const robots = previousRobots ?? document.createElement('meta');
    robots.setAttribute('name', robotsName);
    robots.setAttribute('content', 'noindex,nofollow');
    if (ownedRobots) {
      document.head.appendChild(robots);
    }

    return () => {
      document.title = 'Eric Niemeyer';
      if (ownedRobots) {
        robots.remove();
      }
    };
  }, []);

  const visibleRows = useMemo(() => {
    return starRows.filter((row) => row.classes.some((category) => activeCategories.has(category)));
  }, [activeCategories]);

  const selectedCategoryCount = activeCategories.size;

  const toggleCategory = (category: string) => {
    setActiveCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-[#111418] text-slate-100">
      <section className="mx-auto flex w-full max-w-[1800px] flex-col gap-5 px-3 py-4 sm:px-5 lg:px-6">
        <header className="flex flex-col gap-2 border-b border-slate-700/70 pb-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Private Interview Prep
            </p>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              STAR Notes
            </h1>
            <p className="max-w-4xl text-sm text-slate-300">
              Boeing-style behavioral prompts based on the spreadsheet categories plus common STAR
              interview themes. Each row is a real story that fits Situation, Task, Action, Result.
            </p>
          </div>
          <div className="text-sm text-slate-300">
            Showing <span className="font-semibold text-white">{visibleRows.length}</span> of{' '}
            <span className="font-semibold text-white">{starRows.length}</span> stories with{' '}
            <span className="font-semibold text-white">{selectedCategoryCount}</span> filters on.
          </div>
        </header>

        <section className="flex flex-col gap-3 rounded border border-slate-700/70 bg-slate-950/40 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategories(new Set(filterCategories))}
              className="rounded border border-cyan-300/60 bg-cyan-300/15 px-3 py-1.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() => setActiveCategories(new Set())}
              className="rounded border border-slate-600 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Deselect All
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterCategories.map((category) => {
              const isActive = activeCategories.has(category);
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleCategory(category)}
                  className={[
                    'rounded border px-2.5 py-1 text-xs font-medium transition',
                    isActive
                      ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100'
                      : 'border-slate-700 bg-slate-900/80 text-slate-400 hover:border-slate-500 hover:text-slate-200',
                  ].join(' ')}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded border border-slate-700/70 bg-slate-950/50">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1320px] border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10 bg-slate-900 text-slate-100">
                <tr className="border-b border-slate-700">
                  <th rowSpan={2} className="w-[250px] border-r border-slate-700 px-3 py-2 align-bottom">
                    Interview Topic
                  </th>
                  <th rowSpan={2} className="w-[230px] border-r border-slate-700 px-3 py-2 align-bottom">
                    Question Themes
                  </th>
                  <th colSpan={4} className="px-3 py-2 text-center text-base font-bold">
                    STAR
                  </th>
                </tr>
                <tr className="border-b border-slate-700">
                  <th className="w-[210px] border-r border-slate-700 px-3 py-2">Situation</th>
                  <th className="w-[210px] border-r border-slate-700 px-3 py-2">Task</th>
                  <th className="w-[430px] border-r border-slate-700 px-3 py-2">Action</th>
                  <th className="w-[220px] px-3 py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800 align-top last:border-b-0">
                    <th scope="row" className="border-r border-slate-800 bg-slate-950/60 px-3 py-3">
                      <div className="font-semibold text-white">{row.title}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-400">{row.question}</div>
                    </th>
                    <td className="border-r border-slate-800 px-3 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {row.classes.map((category) => (
                          <span
                            key={category}
                            className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-slate-300"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border-r border-slate-800 px-3 py-3 leading-6 text-slate-200">
                      {row.situation}
                    </td>
                    <td className="border-r border-slate-800 px-3 py-3 leading-6 text-slate-200">
                      {row.task}
                    </td>
                    <td className="border-r border-slate-800 px-3 py-3">
                      <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-6 text-slate-100">
                        {row.action.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-3 py-3 leading-6 text-slate-200">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visibleRows.length === 0 && (
            <div className="border-t border-slate-800 px-4 py-6 text-sm text-slate-300">
              No STAR stories match the current filters.
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Notes;
