# Movies API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
```

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

Response:
```json
{
  "user": {
    "id": "string",
    "email": "string"
  },
  "token": "string"
}
```

## Movies Endpoints

### Get All Movies
Retrieves all movies for the authenticated user.

```http
GET /movies
```

Response:
```json
[
  {
    "id": "string",
    "title": "string",
    "publishingYear": "number",
    "poster": "string"
  }
]
```

### Get Movie by ID
Retrieves a specific movie by ID.

```http
GET /movies/:id
```

Response:
```json
{
  "id": "string",
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

### Create Movie
Creates a new movie.

```http
POST /movies
```

Request body:
```json
{
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

Response:
```json
{
  "id": "string",
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

### Update Movie
Updates an existing movie.

```http
PUT /movies/:id
```

Request body:
```json
{
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

Response:
```json
{
  "id": "string",
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

### Delete Movie
Deletes a movie.

```http
DELETE /movies/:id
```

Response: `204 No Content`

## Error Responses

The API returns standard HTTP status codes:

- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

Error response body:
```json
{
  "error": "string"
}
```

## Rate Limiting

- Rate limit: 100 requests per minute
- Rate limit header: `X-RateLimit-Limit`
- Remaining requests header: `X-RateLimit-Remaining`
- Reset time header: `X-RateLimit-Reset`

## Data Types

### Movie Object
```typescript
{
  id: string;          // Unique identifier
  title: string;       // Movie title
  publishingYear: number; // Year the movie was published
  poster: string;      // URL or base64 string of the movie poster
}
```

### User Object
```typescript
{
  id: string;          // Unique identifier
  email: string;       // User's email address
}
```

## Security

- All endpoints except `/auth/login` require authentication
- HTTPS is required for all API calls
- Tokens expire after 7 days
- CORS is enabled for `http://localhost:5173`