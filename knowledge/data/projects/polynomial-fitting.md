# Polynomial Fitting / Function Approximation

- Category: Machine Learning
- Portfolio type: polynomial fitting via evolution
- Public URL: https://games.niemo.io/function-approximation
- Portfolio stack: Vue, TypeScript, genetic algorithm
- Platforms: desktop and mobile web

## Portfolio description

The niemo.io project data describes this as a real-time polynomial-fitting experiment in which a genetic algorithm evolves coefficients to fit draggable data points. Its declared features include adaptive mutation variance based on fitness, weight-proportional scaling, interactive point manipulation, and configurable parameters.

## Implementation and interaction details

The live project has evolved beyond, or diverged from, that stored description. The inspected interface is an optimizer-oriented function-approximation laboratory. It plots a fitted curve and target points, reports loss, and exposes controls for weight penalty, learning rate, epsilon, momentum/Beta 1, RMSProp/Beta 2, number of weights, number of points, and simulation speed. The visitor can choose algorithms including Gradient Descent and AdamW, reset parameters or the optimizer, and generate new points.

The current visualization therefore appears to compare iterative numerical optimizers and regularization behavior while fitting a parameterized curve. It may still contain an evolutionary mode elsewhere, but one was not visible in the inspected state. The voice agent should distinguish the live observation from the older portfolio metadata instead of claiming that the displayed AdamW run is a genetic algorithm.

## What it demonstrates

In either form, the project makes model fitting tangible: users can see how parameter updates reshape a curve and affect loss. The live version is particularly useful for discussing optimizer hyperparameters and the difference between basic gradient descent and adaptive, decoupled-weight-decay methods. It also illustrates iterative experimentation—the implementation has continued changing faster than its portfolio summary.

