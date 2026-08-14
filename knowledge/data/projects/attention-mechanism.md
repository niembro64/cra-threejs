# Attention Mechanism

- Category: Machine Learning
- Type: transformer self-attention visualization
- Public URL: https://games.niemo.io/attention
- Portfolio stack: React and Tailwind
- Platforms: desktop and mobile web

## What Eric built

Attention Mechanism is an interactive explanation of how token representations move through a transformer-style self-attention calculation. The portfolio describes controls for adding and removing tokens, adjusting weights, inspecting an MLP and next-token prediction, and an in-progress training mode.

## Published experience observed August 13, 2026

The current page focuses tightly on single-head self-attention using four tokens with four-dimensional embeddings. It exposes the input embeddings and the query, key, and value weight matrices; then shows the derived Q, K, and V vectors. The next stages display scaled dot-product scores, row-wise softmax attention weights, and the final weighted combination of the value vectors. The page explicitly notes that every attention row sums to one and that the 4-by-4 input shape is preserved in the 4-by-4 output.

Visitors can randomize the values, show labels, select individual numeric cells, and use an “Auto Wiggle” mode to see downstream values respond. The live footer identifies Vue and TypeScript and cites “Attention Is All You Need.” That conflicts with the older React/Tailwind stack stored in the portfolio, so the deployed implementation appears to have been rewritten or the metadata is stale.

## What it demonstrates

The project decomposes a dense ML concept into inspectable matrix operations. It is valuable as an educational tool because a user can perturb a single embedding or weight and follow the effect through Q/K/V, similarity scores, normalization, and output. Public evidence supports the self-attention visualization; unfinished training and next-token features should be described as planned or in progress rather than complete.

