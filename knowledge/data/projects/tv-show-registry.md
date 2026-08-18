# TV Show Registry

- Category: Full-Stack Web
- Type: Python full-stack application
- Date: 2022
- Public URL: https://shows.niemo.io
- Declared stack: Python, Flask, MySQL
- Platforms: desktop and mobile web

## What Eric built

TV Show Registry is a Flask application where authenticated users create television-show records and like shows contributed by other users. It combines registration and authentication with validated create/read/update/delete operations and a small community interaction around shared show entries. Passwords are hashed with bcrypt, while the project deliberately uses direct SQL queries against MySQL rather than an ORM.

## Implementation and interaction details

The public site redirects unauthenticated visitors to a combined login and registration page. New accounts collect first name, last name, email, password, and password confirmation. A demo login is displayed on the page, but its credentials are intentionally not included in the voice-agent corpus.

Eric’s first-person project description confirms that users can create shows and like shows other users created. The authenticated registry was not inspected during this research pass, so specific record fields, authorization rules, reviews, and ratings should not be inferred without further evidence.

## What it demonstrates

The project covers HTTP request handling in Flask, sessions and authentication, bcrypt password security, form validation, direct parameterized SQL, relational data modeling, CRUD flows, and user-to-content likes. It is also a useful contrast with RSVP System: both solve authenticated relational workflows, one through Python/Flask and direct SQL and the other through C#/ASP.NET Core and an ORM.
