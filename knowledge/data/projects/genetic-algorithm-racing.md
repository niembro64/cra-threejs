# Genetic Algorithm Racing

- Category: Machine Learning
- Type: neural-network evolution simulation
- Public URL: https://games.niemo.io/genetic-racing
- Declared stack: HTML5 Canvas, Vue, neural networks
- Platforms: desktop and mobile web

## What Eric built

This experiment evolves neural-network controllers for autonomous cars without backpropagation. Cars receive distance-sensor or raycast readings about the track as inputs and produce steering behavior. A generation begins with random or inherited weights; better-performing controllers pass their “brain” forward, and mutation produces the next population.

The project is therefore a compact demonstration of neuroevolution. Fitness comes from behavior in the environment rather than a labeled training set, and model improvement is visible as successive generations negotiate more of the track.

## Published experience observed August 13, 2026

The live canvas shows many cars attempting a winding race circuit at once. Colored sensor rays make the perception inputs visible, and a panel plots generation performance. Controls include synchronizing generations, restarting the simulation, selecting car or controller types, showing rays, changing speed and steering behavior, adjusting mutation, saving a brain, and a “sexual” reproduction option. The last option appears to contrast multi-parent recombination with mutation-only inheritance; that interpretation is an inference from the label, not a published implementation specification.

## What it demonstrates

Genetic Algorithm Racing connects several disciplines in one understandable system: 2D physics, collision and distance sensing, neural control, fitness design, mutation and selection, simulation speed, and live analytics. It is also a useful contrast with Conv-Net Chess: both learn from an environment, but this project evolves weights through population search rather than optimizing them through gradient descent or backpropagation.

