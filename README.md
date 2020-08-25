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
| POST   | /api/auth/register | Requires `username`, `password` and `email` fields in the request `body`. Returns a success message and the user's `id`                          |
| POST   | /api/auth/login    | Requires `username` and `password` in `body`. Successful login returns success message and the `token` *new* and the `user_id`                   |
| ------ | -------------       | ---------------------------------------------------------------------------------------------------------------------------------------------  |
| POST   | /api/stories | Requires `user_id`, `title` and `body` fields in the request `body`. `image_url` and `location` are optional fields. Returns the newly created story object.                          |
| GET   | /api/stories | Returns array of all stories                                                                                                                       |
| GET   | /api/stories/user/:userId | Returns array of all stories posted by the specified user                                                                             |
| GET   | /api/stories/storyId/:storyId | Returns the specified story                                                                                                       |
| PUT   | /api/:storyId | Applies changes to any modified fields                                                                                                            |
| DELETE   | /api/:storyId | Returns status 204 on a successful delete                                                                                                      |   
