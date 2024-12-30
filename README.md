# Movies App

A modern web application for managing your personal movie collection. Built with React, TypeScript, and Next.js, featuring a beautiful UI with Tailwind CSS and secure authentication.

## 🌐 Live Demo
- Frontend: http://16.16.184.152
- Backend API: http://16.16.184.152:4000
- GitHub Repository: [github.com/mkraiemm/movies-app](https://github.com/mkraiemm/movies-app)


## ✨ Features
- 🎬 Movie management (Create, Read, Update, Delete)
- 🔐 Secure authentication
- 🖼️ Image upload for movie posters
- 📱 Responsive design
- 🎨 Modern UI with dark theme
- 📝 Form validation
- 📄 Pagination
- 🌍 API documentation


## 🚀 Deployment

### Infrastructure
The application is deployed on AWS EC2 in the eu-north-1 (Stockholm) region:

- **Instance Type**: t3.micro
- **Region**: eu-north-1 (Stockholm)
- **OS**: Ubuntu 22.04 LTS
- **Architecture**: x86_64

### Security Groups
- HTTP (80)
- HTTPS (443)
- Custom TCP (4000) - Backend API
- Custom TCP (80) - Frontend Dev Server
- SSH (22) - Remote Access

### Deployment Process

1. **Server Setup**
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install git -y
```

2. **Application Setup**
```bash
# Clone repository
git clone https://github.com/mkraiemm/movies-app.git
cd movies-app

# Install dependencies
npm install
cd backend && npm install
```

3. **Environment Configuration**
```bash
# Frontend (.env)
VITE_API_URL=http://16.16.184.152:4000/api

# Backend (.env)
PORT=4000
JWT_SECRET=your-secret-key
```

4. **Build & Start**
```bash
# Build frontend
npm run build

# Start backend with PM2
cd backend
pm2 start npm --name "movies-backend" -- start

# Start frontend with PM2
cd ..
pm2 start npm --name "movies-frontend" -- run preview
```

5. **PM2 Process Management**
```bash
# List running processes
pm2 list

# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart processes
pm2 restart all

# Setup PM2 startup script
pm2 startup
```

### Maintenance

1. **Updates**
```bash
# Pull latest changes
git pull

# Update dependencies
npm install
cd backend && npm install

# Rebuild and restart
npm run build
pm2 restart all
```

2. **Monitoring**
- Use PM2 monitoring: `pm2 monit`
- Check logs: `pm2 logs`
- Monitor system resources: `htop`

3. **Backup**
```bash
# Backup data directory
tar -czf backup-$(date +%Y%m%d).tar.gz backend/data/

# Copy to secure location
scp backup-*.tar.gz user@backup-server:/backups/
```

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