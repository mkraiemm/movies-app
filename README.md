# Movies App

A modern web application for managing your personal movie collection. Built with React, TypeScript, and Next.js, featuring a beautiful UI with Tailwind CSS and secure authentication.

## ✨ Features
- 🎬 Movie management (Create, Read, Update, Delete)
- 🔐 Secure authentication
- 🖼️ Image upload for movie posters
- 📱 Responsive design
- 🎨 Modern UI with dark theme
- 📝 Form validation
- 📄 Pagination
- 🌍 API documentation

## 🛠️ Getting Started

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run start
```

The backend server will start on `http://localhost:3000`

### Frontend Setup
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend development server will start on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string"
  },
  "token": "string"
}
```

### Movies

#### Get All Movies
```http
GET /movies
```
**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
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

#### Get Movie by ID
```http
GET /movies/:id
```
**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

#### Create Movie
```http
POST /movies
```
**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

#### Update Movie
```http
PUT /movies/:id
```
**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "publishingYear": "number",
  "poster": "string"
}
```

#### Delete Movie
```http
DELETE /movies/:id
```
**Headers:**
```
Authorization: Bearer <token>
```

### Image Storage

#### Upload Image
```http
POST /storage/images
```
**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "data": "string (base64)",
  "oldImageId": "string (optional)"
}
```

**Response:**
```json
{
  "id": "string"
}
```

#### Get Image
```http
GET /storage/images/:id
```
**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "data": "string (base64)"
}
```

### Error Responses
All endpoints may return the following errors:

```json
{
  "error": "string",
  "status": "number"
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## 🔒 Security Features
- JWT-based authentication
- Password hashing
- Protected API endpoints
- CORS configuration
- Input validation
- Image compression
- Secure file handling

## 💻 Tech Stack
- **Frontend**: 
  - React 18
  - TypeScript
  - Vite
  - TailwindCSS
  - Lucide Icons
  - React Router
  - React Hook Form
  - React Dropzone
- **Backend**: 
  - Node.js
  - Next.js
  - TypeScript
  - File-based storage
- **Development**:
  - ESLint
  - Prettier
  - TypeScript
  - Git

## 📦 Project Structure
```
.
├── backend/
│   ├── data/           # Storage files
│   ├── src/
│   │   ├── app/       # API routes
│   │   └── lib/       # Utilities
│   └── package.json
├── src/
│   ├── components/    # UI components
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities
│   ├── pages/        # Page components
│   ├── providers/    # Context providers
│   ├── services/     # API services
│   └── types/        # TypeScript types
└── package.json
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.