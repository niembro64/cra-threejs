# Eric Niemeyer - Engineering Behavioral Evidence

> This document converts Eric's detailed spoken work notes into concise, factual examples. Use the examples as source material for questions about past experience. Preserve Eric's individual actions and do not invent metrics, dates, or outcomes.

## Most complex professional system - SeniorSafe

**Situation:** SeniorSafe needed to recognize potentially fraudulent phone conversations while they were happening. The product had two concurrent audio or transcript sources, roughly fifty conversational risk labels, noisy speech recognition, external metadata, mobile clients, and a voice agent.

**Task:** Eric needed to turn those separate concerns into a system that could classify risk, preserve context, and provide useful intervention support during a call.

**Action:** He architected a Node.js streaming service and a Python machine-learning service that could support training, deployment, embeddings, and inference. He moved classification from word-count heuristics through recurrent models into turn-aware transformer and conversation-level models. He connected transcription, the classification services, application APIs, database records, external telephone-number metadata, pgvector semantic retrieval, iOS and Android clients, and the later voice-agent workflow. He personally trained and deployed the classification models and owned the iOS implementation while another contributor handled Android.

**Result:** The components operated as one real-time phone-fraud protection platform rather than as isolated experiments. Live conversations could be transcribed, classified across multiple risk categories, enriched with relevant evidence, and passed into the user-facing intervention flow.

## Defining ambiguous machine-learning requirements

**Situation:** The original SeniorSafe requirement was essentially to determine when a conversation had become dangerous and when the system should intervene. Neither danger nor the intervention boundary was initially defined precisely enough for supervised learning.

**Task:** Eric needed to define what the product was classifying, create a usable target taxonomy, and make the decision concrete enough for humans to label examples and models to learn it.

**Action:** He analyzed the ways a real phone conversation could become dangerous and built a broad set of categories covering those behaviors. He designed workflows for categorizing both synthetic training examples and real calls reviewed by human agents. He also created a higher-level Danger grouping across related categories so a transformer could learn the shared concept and potentially recognize dangerous cases between narrowly named labels. After defining the label system, he trained and evaluated the models against it.

**Result:** A vague product intention became an explicit, testable classification problem. The resulting system could surface dangerous conversations and provide structured evidence to the intervention voice agent.

## Diagnosing ambiguous label states

**Situation:** In the training data, an unreviewed label could look identical to a label that a reviewer had explicitly marked negative. That ambiguity could silently teach the model that unknown examples were confirmed negatives.

**Task:** Eric needed to find the source of the misleading targets and preserve the semantic difference between missing review and negative evidence.

**Action:** He traced model and dataset behavior back through the human labeling workflow. He introduced explicit null states for categories that had not been reviewed, separated them from confirmed negative labels, and built review, cleaning, fixing, and backfill tools. He audited target generation before later training runs.

**Result:** The pipeline no longer treated missing annotation as negative evidence. Multi-label training became safer, more auditable, and easier to extend when new risk categories were added.

## Making model training observable

**Situation:** SeniorSafe experiments varied across architectures, optimizers, weight decay, hyperparameters, and training duration. Code-based early stopping alone did not make it easy to compare the validation behavior visually across runs.

**Task:** Eric wanted a repeatable way to understand whether validation had stopped improving and whether a run should continue.

**Action:** He integrated MLflow experiment tracking, recorded run configuration consistently, and plotted training and validation curves across time. He used patience-based stopping after validation improvement had leveled off and used the visual record to confirm that the automated stopping behavior matched the actual curves. The same view made architecture and hyperparameter comparisons easier.

**Result:** Training decisions became inspectable rather than implicit. Eric could compare runs, verify stopping behavior, and retain a clearer record of why one model configuration was favored over another.

## Learning neural architectures quickly

**Situation:** Audience AI and SeniorSafe required neural-network skills beyond Eric's earlier software work. Audience AI involved audio patterns; SeniorSafe later required deep contextual language modeling across speaker turns.

**Task:** Eric needed to learn the appropriate architectures deeply enough to change their behavior, not merely call a packaged model.

**Action:** For Audience AI, he explored convolutional and recurrent approaches over audio features because nearby spectral buckets and temporal patterns carry related information. For SeniorSafe, he learned transformer encoders in depth, recomposed their components, rewrote attention masks for multi-turn supervision, and inspected how tokens and special classifier states behaved. His turn-aware design allowed bidirectional attention within the current turn while restricting contextual attention to completed earlier turns.

**Result:** He delivered working neural products in both domains: responsive mobile audio scoring and causal, turn-aware fraud classifiers. The work also gave him a practical understanding of attention, token behavior, and architecture tradeoffs.

## Integrating Lucid Motors manufacturing subsystems

**Situation:** At Lucid Motors, vehicle assembly crossed business requirements, parts, production bays, PLC-controlled equipment, torque tools, operators, QA, databases, and ERP-level systems. No single software component represented the complete process.

**Task:** Eric needed to help make the manufacturing execution system reflect and coordinate the physical process reliably.

**Action:** He mapped business requirements into explicit actions for the bay where a vehicle arrived. A workflow could identify or scan a part, retrieve the correct production context, issue instructions to a torque tool, receive the actual completion value from the tool, store the result for traceability, and present the status for operator confirmation through an HMI. He coordinated with PLC engineers, QA engineers, operators, database and application teams, and business-system stakeholders while respecting the boundary that application engineers were not meant to control the machines directly.

**Result:** The integrated workflow connected physical assembly actions with reliable digital state and traceability. Commands, measured results, and operator confirmation could move through a coherent MES process.

## Defining and approving a Lucid operator interface

**Situation:** A Lucid torque-tool workflow required a new human-machine interface, but coding before the interaction was agreed would risk rework and operator confusion.

**Task:** Eric needed to define the screens, navigation, and intended functionality clearly enough for both project and client approval.

**Action:** He diagrammed the interface and navigation before implementation, presented the proposed flow to client leadership and the project manager, incorporated the discussion, and obtained written approval by email. He then implemented the agreed interface.

**Result:** The team received the approved torque-tool HMI and retained a traceable path from requirement to design decision to implementation.

## Clarifying greenfield Spray Integrity requirements

**Situation:** The Spray Integrity Program was a new system whose priorities and feature descriptions changed frequently. Client requests often named a desired area without defining the actual data, behavior, or workflow.

**Task:** Eric was frequently the primary person responsible for determining what the client meant and converting it into work the team could safely build.

**Action:** During meetings he asked detailed follow-up questions, whiteboarded workflows while the client explained them, and identified the data entities, user actions, and interfaces implied by each request. Afterward he sent meeting minutes, summaries, and high-level architectural interpretations for confirmation and sign-off before implementation.

**Result:** Ambiguous conversations became written, approved requirements. The method reduced reliance on memory and gave both sides a shared record when the product moved through later iterations.

## Choosing schedule over speculative database complexity

**Situation:** In the Spray Integrity data model, a physical barrel and the uses of that barrel could be represented as separate one-to-many entities. Eric advocated two tables; another engineer preferred a single record so the team could demonstrate the requested system sooner. Repeated use was a plausible future need but was not part of the client's current requirement.

**Task:** Eric needed to protect software quality without delaying the requested release for an assumption the customer had not made.

**Action:** He explained the relational distinction and disagreed strongly at first. He then separated architectural preference from current product scope, confirmed that multiple uses were not a committed requirement, accepted the simpler implementation, and kept the future reason for normalization clear.

**Result:** The team shipped the requested functionality on schedule. The speculative relationship was still not needed much later, so the decision avoided complexity that would not have delivered customer value.

## Adapting after a feature lost priority

**Situation:** Spray Integrity changed direction after a chatbot had already been developed and asked for it to disappear from the current experience.

**Task:** Eric needed to respond to the new priority without erasing completed paid work or destabilizing backend behavior.

**Action:** He hid the frontend behavior behind configuration, left stable backend APIs in place, documented the effort already spent and the changed request, and moved the team to the newly prioritized work. He used TestFlight and equivalent mobile testing workflows to make changed builds available to stakeholders.

**Result:** The product could change direction without destructive rework. The client relationship remained strong and the team preserved the ability to restore or reuse the completed capability if priorities changed again.

## Delivering Audience AI from beginning to end

**Situation:** Audience AI began as an idea for a stand-up comedy practice application with an artificial audience. No existing architecture defined how recording, neural scoring, responsive laughter, playback, and shareable video should work together.

**Task:** Eric needed to define and build the standalone mobile product end to end.

**Action:** He designed the application and model interfaces, built the React Native iOS and Android workflows, experimented with CNN and LSTM audio classifiers, and used MFCC, FFT, spectral, loudness, and related DSP evidence. He built a layered laugh engine whose randomized intensity buckets responded to the model score. He then built the FFmpeg stages that normalized recordings, inserted selected laughter at the correct times, applied user or product branding, appended closing media, and produced a downloadable video.

**Result:** Eric delivered the product the client requested, and the client accepted and paid for the work. A later package-ecosystem change involving the mobile FFmpeg dependency prevented continued development in that original form, which is a lifecycle constraint rather than a failure of the delivered system.

## Managing Lucid and 3M concurrently

**Situation:** Eric was performing onsite engineering at Lucid Motors in Arizona while also serving as the on-the-ground project manager for a 3M engagement. Critical calls for one project could overlap with work on the other.

**Task:** He needed to keep both high-stakes industrial efforts supported without leaving meetings, decisions, or urgent questions ownerless.

**Action:** Eric kept his calendar explicit, protected buffer around meetings, tracked time separately, and stepped out of the Lucid environment when a critical 3M call required him. When a conflict could not be avoided, he arranged for a secondary person to cover the immediate need and remain able to field questions.

**Result:** He sustained responsibilities for both projects concurrently and prevented schedule overlap from becoming a gap in ownership.

## Preserving evidence during a difficult 3M project

**Situation:** A 3M project became chaotic as requirements and priorities changed, and the companies eventually needed to negotiate the termination of the work.

**Task:** Eric needed an objective record showing what had been requested, decided, assigned, changed, and completed.

**Action:** He recorded meetings and action items in OneNote with clear timestamps, maintained minutes and requirement history, and connected time spent to the requests active at that point. When the engagement was negotiated, the team could rely on those records instead of conflicting recollections.

**Result:** The documentation supported an evidence-based negotiation over the partially completed project and made previously requested work visible under difficult circumstances.

## Building deterministic cross-architecture simulation

**Situation:** Annihilation++ is a large C++ real-time strategy simulation with WebRTC communication, short-lived multiplayer lobbies, physics, pathfinding, resources, factories, combat, and many interacting stateful systems. Streaming authoritative world state would constrain the intended scale, while ordinary floating-point differences could desynchronize clients across processors.

**Task:** Eric needed every participant to execute the same simulation and remain in the same state across Windows, Linux, macOS, x86-64, and ARM-class hardware.

**Action:** He selected deterministic lockstep, used fixed-point math where consistent numerical behavior was required, and added lightweight state checks during play. For heavier verification during development, he ran the game across multiple machines and compared periodic hashes of complete game state. He also designed pathfinding, physics, collision, resource, and rendering systems around deterministic state.

**Result:** Matching state hashes demonstrated consistent execution across the tested operating systems and processor architectures. Reproducibility became an explicit invariant rather than an assumption.

## Performance engineering in a large simulation

**Situation:** Annihilation++ must continue simulating a large world even when units are hidden by fog of war, while the player can move from a close view to the entire map and battles can produce many projectiles, collisions, and effects.

**Task:** Eric needed to keep computation and rendering practical without weakening simulation correctness.

**Action:** He used spatial grids so collisions, projectiles, explosions, hit boxes, and beams query nearby cells instead of every entity. He applied size- and screen-aware levels of detail, terrain-time heuristics for A-star pathfinding, and interpolation between lower-rate simulation ticks and smoother rendering. He bounded expensive effects and considered physical plausibility, visual prominence, and cost together.

**Result:** The engine avoids all-pairs interaction work and can maintain full-world deterministic behavior across changing camera scales and combat densities.
