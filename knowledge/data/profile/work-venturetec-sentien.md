# Eric Niemeyer — Venturetec, Sentien, and SeniorSafe

## Role and product ownership

Eric is Head of Engineering and Lead Software Engineer at Venturetec, where Sentien and SeniorSafe are major product efforts. He works across system architecture, implementation, machine learning, web and mobile applications, AWS deployment, client delivery, and product demonstrations. He owns both technical depth and the work of explaining the system to investors, prospective customers, teammates, and other stakeholders.

## Phone-fraud classification architecture

SeniorSafe detects suspicious phone conversations in near real time. Eric evolved the system from heuristics to recurrent neural networks and then to transformer-based classifiers. The data contains roughly fifty conversational labels. Turn-level models can attend bidirectionally within the current speaker turn while using only causal context from earlier turns. He has also evaluated conversation-level classifiers and combinations of turn and conversation evidence rather than assuming one architecture fits every decision.

The initial product goal - determine when a call becomes dangerous and when an agent should intervene - was too ambiguous to train directly. Eric analyzed dangerous conversational behaviors, defined a broad risk taxonomy, created a higher-level Danger grouping, and built human workflows for categorizing synthetic and real calls. This converted a vague intervention idea into explicit training targets and testable product behavior.

Operationally, the platform integrates two live audio sources, a Node.js streaming service, Python training and inference services, transcription, application APIs, external telephone-number metadata, database records, pgvector retrieval, iOS and Android clients, and a voice agent. Eric trained and deployed the models, exposed the machine-learning and embedding routes, and owned the iOS implementation.

## Training data and label quality

Eric built human-in-the-loop workflows for creating, reviewing, cleaning, and backfilling labeled conversation data. Explicit null-label states distinguish a reviewed negative example from missing annotation. He pays attention to label imbalance, noisy labels, threshold selection, and validation splits that reflect production conditions. For fraud detection, he emphasizes recall-sensitive measures such as F2 and precision-recall behavior instead of treating raw accuracy as sufficient.

He also integrated MLflow so architectures, optimizers, hyperparameters, training curves, and validation curves could be compared visually. Patience-based stopping is verified against the observed validation plateau, making training duration and experiment selection inspectable rather than implicit.

## Speech-to-text robustness

SeniorSafe consumes imperfect phone transcripts, so Eric designed preprocessing and augmentation around real ASR behavior. AWS Transcribe can introduce redaction markers, number forms, speaker tokens, and other vocabulary that differs from ordinary text. He normalizes special tokens, initializes useful semantic representations where appropriate, tests tokenizer drift, and augments training text with realistic recognition errors. Training and validation noise remain separated so evaluation does not merely reward memorized corruption patterns.

## Retrieval and conversation intelligence

Eric uses PostgreSQL with pgvector to represent whole conversations, individual turns, and turns combined with a small amount of prior context. Embeddings support semantic retrieval, similarity and diversity analysis, outlier discovery, spam detection, and memory for an ElevenLabs voice agent. The current résumé guide uses conventional retrieval-augmented generation with contextualized chunks and conversation-aware novelty; it is not a full recursive RAPTOR implementation.

## Privacy and data handling

Eric treats call recording and personal data as product-design constraints. The system includes consent-aware recording flows, PII-conscious transcript handling, and redaction. Raw audio may be retained briefly when needed to verify a transcript and then removed rather than kept indefinitely. This is an engineering and privacy practice, not a claim of legal advice or universal compliance.

## Demonstrations and stakeholder communication

Eric has demonstrated live scam-call classification, embeddings, PCA, training tools, iOS experiences, and retrieval-backed voice agents. His explanations connect product value to observable system behavior, then go deep enough for technical audiences to understand the data and architecture. Quarterly investor reporting follows the same pattern: what the team intended to build, what shipped, what problems appeared, what changed, and where the product is heading.
