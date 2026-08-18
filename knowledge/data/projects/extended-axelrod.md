# Extended Axelrod

- Category: Computer Science
- Type: game-theory and ecological simulation
- Public URL: https://games.niemo.io/axelrod
- Declared stack: Phaser, React
- Platforms: desktop and mobile web

## What Eric built

Extended Axelrod takes the iterated prisoner’s-dilemma idea behind Axelrod’s tournaments and places strategy selection inside a configurable ecological simulation. The core question is whether agents should cooperate or defect when their outcomes depend on repeated encounters and imperfect information.

## Implementation and interaction details

The setup screen lets visitors include Always Cooperate, Always Defect, Tit-for-Tat, Tit-for-Two-Tats, Win-Stay Lose-Shift, Grim Trigger, and Random strategies. Each strategy states its rule in plain language. The simulation also exposes environmental and behavioral parameters including wandering, seeking food, fleeing, chasing, movement speed, reproduction cost, food rate, action error, and memory error.

Those controls show how the project extends a fixed payoff-table tournament. Agents appear to move, acquire resources, reproduce, and make noisy decisions in a shared environment. This can reveal how a strategy’s success depends not just on its abstract rule but on mobility, scarcity, error, and population dynamics. The exact fitness and reproduction equations were not published on the inspected screen, so they should not be asserted without source-code confirmation.

## What it demonstrates

The project joins game theory, agent-based modeling, simulation design, and interactive experimentation. It lets a visitor test how robust familiar cooperation strategies remain when idealized assumptions are relaxed. The result is less a conventional game than a laboratory for emergent behavior and ethics-oriented questions about trust, retaliation, forgiveness, and survival.

