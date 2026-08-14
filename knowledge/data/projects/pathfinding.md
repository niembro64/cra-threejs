# Pathfinding

- Category: Computer Science
- Type: algorithm visualization
- Public URL: https://games.niemo.io/pathfinding
- Declared stack: Vue, TypeScript, Tailwind
- Platforms: desktop and mobile web

## What Eric built

Pathfinding is an interactive comparison of five graph-search algorithms: breadth-first search, depth-first search, Dijkstra’s algorithm, A*, and greedy best-first search. The visitor chooses start and goal nodes and watches each algorithm explore a graph or grid around obstacles before producing a route.

The algorithms embody different tradeoffs. BFS explores in layers and is optimal for unweighted graphs; DFS follows branches deeply but does not generally guarantee the shortest route; Dijkstra uses path cost and is optimal with nonnegative weights; A* combines known path cost with a heuristic; greedy search prioritizes its heuristic and may reach the goal quickly without finding the best path.

## Published experience observed August 13, 2026

The live page presents a dense 15-by-15 node field and selectors for the start and goal. A single-algorithm mode lets a visitor focus on one search, while “All Algorithms” is designed for comparison. The interface also includes an edge-weight display option. The visual makes explored nodes and resulting connections visible, so the behavioral differences are easier to grasp than they would be from pseudocode alone.

## What it demonstrates

This project combines classic data structures and algorithms with interactive teaching. It demonstrates graph modeling, priority and queue-based search, heuristics, weighted routing, visualization state, and UI controls for reproducible comparisons. It should not be described as proving every algorithm finds an optimal path: DFS and greedy search are included precisely because their behavior and guarantees differ from BFS, Dijkstra, and A* under the appropriate assumptions.

