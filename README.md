# Social Media Web App

A clean and minimal social media MVP built with Django + React.

## 🎯 Features

✅ **Authentication**

- User registration & login with JWT
- Secure password handling

✅ **User Profiles**

- Username, bio, profile picture
- Follow/Unfollow system

✅ **Posts**

- Create posts with text and images
- Global feed view
- Edit/Delete own posts

✅ **Interactions**

- Like/Unlike posts
- Comment on posts
- Real-time interactions

✅ **Social Features**

- Follow/Unfollow users
- View followers and following lists

## 🚀 Quick Start

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

## 📖 Documentation

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed setup guide.

## 📁 Project Structure

```
social/
├── backend/          # Django REST API
├── frontend/         # React + Vite app
└── SETUP_INSTRUCTIONS.md
```

## 🔑 API Base

- Backend: `http://localhost:8000/api`
- Frontend: `http://localhost:3000`

## 📚 Tech Stack

**Backend:**

- Django 4.2
- Django REST Framework
- PostgreSQL
- JWT Authentication

**Frontend:**

- React 18
- React Router
- Axios
- Context API

## 📝 License

MIT - Open for learning and development
