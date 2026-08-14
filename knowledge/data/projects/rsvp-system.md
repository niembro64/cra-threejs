# RSVP System

- Category: Full-Stack Web
- Type: C# full-stack event management application
- Date: 2022
- Public URL: https://events.niemo.io
- Declared stack: C#, ASP.NET Core, MySQL, Entity Framework Core with LINQ
- Platforms: desktop and mobile web

## What Eric built

RSVP System is a database-backed event-management application with account registration, authentication, validation, and create/read/update/delete workflows. Authenticated users create events and RSVP to events. The central relational-modeling exercise is the many-to-many relationship between users and events: one user can attend many events, while one event can contain many attendees. Entity Framework Core and LINQ provide the application’s object-relational interface to MySQL.

The portfolio explicitly identifies validation on both the frontend and backend. That is important for a public form application: client checks improve feedback, while server checks remain authoritative and protect data integrity when browser validation is bypassed.

## Published experience observed August 13, 2026

The public URL currently redirects to a login page titled “Users RSVP Events.” It provides new-user registration and returning-user login, lists password requirements, and links back to an about/projects area. A demonstration account is visible on the page, but credentials are intentionally omitted from this knowledge document.

Eric’s first-person project description confirms the event CRUD and many-to-many attendance model. Detailed claims about calendar layout, permissions, or individual event fields should still come from the source code or a signed-in review.

## What it demonstrates

The application demonstrates a conventional server-backed full-stack architecture in C#: identity flows, password handling, data validation, relational persistence, many-to-many joins, ORM queries, and CRUD resource management. Alongside Eric’s JavaScript and Python examples, it shows the same application pattern implemented in the .NET ecosystem.
