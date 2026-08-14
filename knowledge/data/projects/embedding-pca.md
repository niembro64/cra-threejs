# Embedding PCA

- Category: Machine Learning
- Type: 3D word-embedding visualization
- Public URL: https://games.niemo.io/token-embedding
- Declared stack: Vue, TypeScript, Three.js, GloVe
- Platforms: desktop and mobile web

## What Eric built

Embedding PCA is an interactive tool for exploring relationships among words as geometry. It begins with 50-dimensional GloVe word embeddings and uses principal component analysis to project them into three dimensions. The resulting vectors can be inspected in a navigable Three.js scene.

The project focuses especially on analogies: relationships of the form “a is to b as c is to d.” The portfolio example is “Italy is to pasta as Japan is to ____.” Instead of showing only a predicted word, the interface places the inputs and candidate result in vector space, making direction and distance part of the explanation. Spring-physics animation helps communicate changes in the selected words or projection without abrupt jumps.

## Published experience observed August 13, 2026

The live interface provides an analogies panel and settings for projection and presentation. It explains PCA as finding axes of maximum variance, offers optional distance spheres, and can display the four-part analogy relationship. Camera instructions include middle-drag to pan, scrolling to zoom, and Alt plus middle-drag to rotate the scene. A setting can show all analogies or emphasize a selected result.

## What it demonstrates

The project turns an otherwise abstract ML representation into a spatial teaching tool. It combines data preparation, linear dimensionality reduction, semantic-vector reasoning, 3D rendering, animation, and interaction design. The visualization is an approximation—three principal components cannot preserve every relation from a 50-dimensional space—but that tradeoff is the core educational idea rather than a hidden limitation.

