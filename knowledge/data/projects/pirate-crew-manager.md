# Pirate Crew Manager

- Category: Full-Stack Web
- Type: JavaScript full-stack application
- Date: 2022
- Public URL: https://pirates.niemo.io
- Declared stack: React, Express, MongoDB
- Platforms: desktop and mobile web

## What Eric built

Pirate Crew Manager is a deliberately playful CRUD application for maintaining a roster of pirates. A React frontend communicates with an Express backend and MongoDB data store. Users create and maintain pirates with names, traits, treasure, and other crew details. The application validates data on both the frontend and backend.

## Published experience observed August 13, 2026

The deployed page shows a “Pirate Crew” roster of illustrated cards. Cards include pirate identity and crew details, and the interface offers an add-pirate action. A “Walk the Plank” control supplies the deletion metaphor. This presentation wraps standard database operations in a memorable theme rather than exposing them as generic administrative tables.

Some image slots on the inspected page did not resolve, which appears to be an asset issue in the deployment; it does not prevent the roster controls and data from rendering. Eric’s first-person description confirms names and treasure as stored pirate details, but fields beyond the publicly described traits should not be invented.

## What it demonstrates

This project demonstrates a MERN-style division of responsibilities without claiming a particular scaffold: React components and forms, REST-style Express routes, MongoDB persistence, validation across the trust boundary, error presentation, and end-to-end CRUD state refresh. Its smaller scope makes the architecture easy to explain and compare with Eric’s Flask and ASP.NET database applications.
