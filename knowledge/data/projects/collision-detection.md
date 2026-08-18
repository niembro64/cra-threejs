# Collision Detection Lab

- Category: Computer Science
- Type: 2D physics simulation
- Public URL: https://games.niemo.io/raycast
- Declared stack: HTML5 Canvas, JavaScript
- Platforms: desktop and mobile web

## What Eric built

Collision Detection Lab compares two ways of deciding how balls should bounce inside polygonal enclosures.

The naive version is intentionally stateless and discrete. On each rendered frame, it determines which side of a boundary line the ball occupies and uses that result to choose the bounce direction. It has no continuous collision history between frames. If a ball moves far enough in one update, it can cross a wall completely before the next sample and appear on the opposite side. The collision is never observed, so the ball tunnels or “flies through” the enclosure. Moving objects quickly makes this limitation easy to reproduce.

The raycast version performs a point-in-polygon containment test. It casts a ray from the ball and counts intersections with enclosure walls: an odd number of crossings means the point is inside, while an even number means it is outside. One crossing is simply the smallest odd case. This rule works across a variety of polygonal shapes and provides a more general inside/outside classification than checking a single line.

## Implementation and interaction details

The live canvas displays a polygonal enclosure and several colored moving balls. Controls compare naive and raycast behavior and allow the visitor to change shapes and simulation parameters such as gravity, rotation, speed, and bounce. Multiple boundary shapes make it possible to see why assumptions that work for a simple convex box can fail for irregular geometry.

## What it demonstrates

The lab connects computational geometry with visible physics behavior. It demonstrates side-of-line tests, odd/even ray intersection logic, point-in-polygon classification, motion integration, gravity, boundary response, and the tunneling problem caused by frame-sampled collision detection. It is an educational comparison rather than a claim that raycasting alone implements swept or fully continuous collision detection.
