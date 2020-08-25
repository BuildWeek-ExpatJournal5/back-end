# Build Week Docs
## Expat Journal 5 Backend API



### Getting Started

 - Database created
 - Auth endpoints created
 - 

### Tech Stack

 - Node.js
 - Express
 - jsonwebtoken
 - bcryptjs
 - knex
 - pg (postgres for production)
 - sqlite3 (for development)
 - cors
 - helmet

### Endpoints


| Method | Endpoint            | Description                                                                                                                                    |
| ------ | -------------       | ---------------------------------------------------------------------------------------------------------------------------------------------  |
| POST   | /api//auth/register | Requires `username`, `password` and `email` fields in the request `body`. Returns a success message and the user's `id`                        |
| POST   | /api//auth/login    | Requires `username` and `password` in body. Successful login returns success message and the `token`                                           |
                                                                 |
