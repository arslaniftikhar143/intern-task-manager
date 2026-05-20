# Intern Task Manager - MERN Stack Learning Project

A full-stack web application built with the **MERN stack** (MongoDB, Express, React, Node.js) for practicing and mastering CRUD operations. This project demonstrates core concepts in modern web development including REST API design, React component architecture, state management, and database integration.

## 🎯 Features

- ✅ Create, Read, Update, and Delete (CRUD) tasks
- ✅ Task pagination with customizable limits
- ✅ Input validation for task data
- ✅ MongoDB Atlas cloud database integration
- ✅ Real-time frontend updates
- ✅ Responsive UI with React components
- ✅ RESTful API architecture

## 🛠 Tech Stack

**Frontend:**
- React 19.2.0 - Component-based UI framework
- Vite 7.2.4 - Fast build tool and dev server
- Axios 1.13.2 - HTTP client for API communication
- ESLint - Code quality and linting

**Backend:**
- Express.js 5.2.1 - Node.js web framework
- Mongoose 9.1.4 - MongoDB object modeling
- MongoDB Atlas - Cloud database
- Morgan - HTTP request logging
- Nodemon - Auto-reload on code changes

## 📋 Prerequisites

Before running this project, ensure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/arslaniftikhar143/intern-task-manager.git
cd inter-task-manager
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 5. Configure Environment Variables

Create a `.env` file in the `backend` folder with:
```env
MONGO_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?appName=YOUR_APP_NAME
PORT=3000
```

**How to get your MongoDB connection string:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Click "Connect" and select "Drivers"
4. Copy your connection string and add your username/password

### 6. Run the Project
```bash
npm start
```

This command will automatically start:
- **Backend API** → `http://localhost:3000`
- **Frontend** → `http://localhost:5173`

### 7. Verify Installation
- Open browser to `http://localhost:5173` - You should see the task manager UI
- Open `http://localhost:3000/health` - Should return "OK"

## 📁 Project Structure

```
inter-task-manager/
├── backend/                    # Express.js API server
│   ├── config/db.js           # MongoDB connection setup
│   ├── controllers/           # Request handlers and business logic
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoints
│   ├── services/              # Database operations
│   ├── utils/                 # Validation utilities
│   ├── index.js              # Express server entry point
│   └── package.json
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── utils/            # Frontend utilities
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # React entry point
│   ├── vite.config.js
│   └── package.json
└── package.json              # Root package.json (run scripts)
```

## 🔧 Available Commands

### At Root Level
```bash
npm start          # Start both frontend and backend
npm run server     # Start only backend server
npm run client     # Start only frontend dev server
npm test           # Run tests (placeholder)
```

### Backend Commands (from `backend` folder)
```bash
npm start          # Start Express server (production)
npm run dev        # Start with Nodemon (development)
```

### Frontend Commands (from `frontend` folder)
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (paginated) |
| GET | `/api/tasks/:id` | Get single task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task by ID |
| DELETE | `/api/tasks/:id` | Delete task by ID |

### Example: Get Tasks with Pagination
```bash
curl http://localhost:3000/api/tasks?page=1&limit=10
```

## 🎓 Learning Outcomes

This project teaches:
- Building RESTful APIs with Express.js
- Database modeling with MongoDB and Mongoose
- React component architecture and hooks
- Form handling and validation
- HTTP requests with Axios
- State management in React
- Full-stack development workflow

## 📝 Notes

- The `.env` file in the backend folder should never be committed to version control (add to `.gitignore`)
- Task validation ensures titles and descriptions contain at least one alphabetic character
- MongoDB IDs are validated as valid 24-character hex strings
- The app uses pagination with default limit of 10 tasks per page

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` in the affected folder |
| Backend won't start | Check `.env` file has correct `MONGO_URL` |
| Frontend won't load | Ensure backend is running on port 3000 |
| MongoDB connection fails | Verify internet connection and MongoDB Atlas credentials |

## 📖 For Complete Setup Details

See [ANSWERS.md](ANSWERS.md) for detailed information about:
- Exact step-by-step installation instructions
- Stack choice rationale
- Edge cases in code
- AI usage disclosure
- Known gaps and improvements

## 📄 License

ISC License - See LICENSE file for details

## 👤 Author

**Arslan Iftikhar** - [@arslaniftikhar143](https://github.com/arslaniftikhar143)

---

**Happy coding!** 🚀 For questions or issues, please open a GitHub issue or contact the author.

