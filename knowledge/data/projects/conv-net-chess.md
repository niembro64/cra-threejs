# Conv-Net Chess

- Category: Machine Learning
- Type: Reinforcement Learning Chess AI
- Dates: 2026–ongoing
- Public URL: https://games.niemo.io/chess/
- Declared stack: Vue, TypeScript, PyTorch, TensorFlow.js, Three.js
- Platforms: desktop and mobile web

## What Eric built

Conv-Net Chess is an interactive chess application centered on a neural chess engine Eric trained from scratch. The portfolio states that the model learned solely through self-play reinforcement learning, without human-game data or supervised examples. Its architecture combines a convolutional policy-and-value network with Monte Carlo tree search. PyTorch supports model training, while TensorFlow.js performs model inference in the browser. Three.js is used for the live neural-network visualization.

The point of the project is not merely to put a bot behind a chess board. It exposes parts of the system so a visitor can inspect how the AI encodes the board, evaluates moves, and searches for a play. This makes it both a playable game and an explanation of the inference/search pipeline.

## Published experience observed August 13, 2026

The live page presents an “AI Chess” entry screen. A visitor can start online multiplayer, enter a code to join a game, or play either the Sage Bot or Toy Bot. Those choices suggest the project supports both human-to-human sessions and more than one bot strength or implementation. The distinction between Sage and Toy is visible in the interface, but their exact model sizes or playing strengths are not documented in the public page and should not be invented.

## What it demonstrates

This project demonstrates end-to-end ML ownership: designing a model, generating training experience through self-play, combining learned evaluation with tree search, exporting a model for browser execution, and wrapping the result in a usable interactive product. It also shows Eric’s recurring interest in making an algorithm visible rather than treating it as a black box.

