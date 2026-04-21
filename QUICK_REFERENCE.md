# 🗺️ Quick Navigation Guide

## 🎯 Project Entry Points

### Backend API

- **Main Settings**: [config/settings.py](backend/config/settings.py)
- **Database Models**: [api/models.py](backend/api/models.py)
- **API Views**: [api/views.py](backend/api/views.py)
- **API Routes**: [api/urls.py](backend/api/urls.py)
- **Main URL Config**: [config/urls.py](backend/config/urls.py)

### Frontend App

- **Entry Point**: [frontend/src/main.jsx](frontend/src/main.jsx)
- **Main App**: [frontend/src/App.jsx](frontend/src/App.jsx)
- **API Client**: [frontend/src/services/api.js](frontend/src/services/api.js)
- **Auth Context**: [frontend/src/context/AuthContext.js](frontend/src/context/AuthContext.js)

---

## 📖 Key Configuration Files

### Backend Setup

```
backend/
├── .env                    ← Database credentials
├── requirements.txt        ← Python packages
└── manage.py              ← Django commands
```

### Frontend Setup

```
frontend/
├── package.json           ← Node dependencies
├── vite.config.js         ← Build configuration
└── index.html             ← HTML entry
```

---

## 🔄 Common Development Tasks

### Add New Model to Database

1. Edit [backend/api/models.py](backend/api/models.py)
2. Create serializer in [backend/api/serializers.py](backend/api/serializers.py)
3. Create viewset in [backend/api/views.py](backend/api/views.py)
4. Register in [backend/api/urls.py](backend/api/urls.py)
5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Add New Page to Frontend

1. Create page in [frontend/src/pages/](frontend/src/pages/)
2. Add route in [frontend/src/App.jsx](frontend/src/App.jsx)
3. Add navigation link in [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx)

### Modify API Endpoints

1. Update endpoints in [backend/api/views.py](backend/api/views.py)
2. Update client in [frontend/src/services/api.js](frontend/src/services/api.js)
3. Update frontend components accordingly

---

## 📝 Important Files by Purpose

### Authentication

- Backend: [backend/api/views.py](backend/api/views.py) - `RegisterView`, `LoginView`
- Frontend: [frontend/src/context/AuthContext.js](frontend/src/context/AuthContext.js)
- Frontend: [frontend/src/pages/LoginPage.jsx](frontend/src/pages/LoginPage.jsx)

### Posts Management

- Models: [backend/api/models.py](backend/api/models.py) - `Post`, `Like`, `Comment`
- Serializers: [backend/api/serializers.py](backend/api/serializers.py) - `PostSerializer`
- Views: [backend/api/views.py](backend/api/views.py) - `PostViewSet`
- Frontend: [frontend/src/pages/HomePage.jsx](frontend/src/pages/HomePage.jsx)
- Component: [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)

### User Profiles

- Models: [backend/api/models.py](backend/api/models.py) - `User`, `Follow`
- Views: [backend/api/views.py](backend/api/views.py) - `UserViewSet`
- Frontend: [frontend/src/pages/ProfilePage.jsx](frontend/src/pages/ProfilePage.jsx)

### State Management

- Auth: [frontend/src/context/AuthContext.js](frontend/src/context/AuthContext.js)
- Posts: [frontend/src/context/PostContext.js](frontend/src/context/PostContext.js)

---

## 🔧 Troubleshooting Quick Links

### Backend Issues

- Database problems → Check [backend/.env](backend/.env)
- CORS errors → Check [backend/config/settings.py](backend/config/settings.py) line `CORS_ALLOWED_ORIGINS`
- JWT errors → Check [backend/config/settings.py](backend/config/settings.py) line `SIMPLE_JWT`

### Frontend Issues

- API errors → Check [frontend/src/services/api.js](frontend/src/services/api.js)
- Auth problems → Check [frontend/src/context/AuthContext.js](frontend/src/context/AuthContext.js)
- Routing issues → Check [frontend/src/App.jsx](frontend/src/App.jsx)

---

## 📚 Documentation Quick Links

1. **Full Setup Guide**: [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)
2. **Project Overview**: [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
3. **API Documentation**: See SETUP_INSTRUCTIONS.md - API Endpoints section
4. **Backend README**: [backend/README.md](backend/README.md)
5. **Frontend README**: [frontend/README.md](frontend/README.md)

---

## 🚀 Quick Run Commands

```bash
# Backend
cd backend && source venv/bin/activate && python manage.py runserver

# Frontend (new terminal)
cd frontend && npm run dev

# Admin Panel
http://localhost:8000/admin

# Access App
http://localhost:3000
```

---

## 🎯 Development Checklist

- [ ] Backend running on :8000
- [ ] Frontend running on :3000
- [ ] Can register new account
- [ ] Can login
- [ ] Can create post
- [ ] Can like post
- [ ] Can comment on post
- [ ] Can follow user
- [ ] Can view profile
- [ ] Images upload working

---

## 💡 Tips & Tricks

**Django Admin Secret**: `/admin/` - Login with superuser account to manage data directly

**JWT Token Check**: Tokens stored in browser localStorage under `access_token`

**Database Reset**:

```bash
python manage.py flush  # ⚠️ Deletes all data
python manage.py migrate
```

**Create Sample Data**:

```bash
python manage.py shell
>>> from api.models import User
>>> User.objects.create_user('testuser', 'test@test.com', 'password123')
```

---

## 📞 Project Support

For issues, check:

1. SETUP_INSTRUCTIONS.md Troubleshooting section
2. Backend logs: `python manage.py runserver` output
3. Frontend console: Browser DevTools (F12)
4. Django admin: Check database at localhost:8000/admin

---

**Last Updated**: April 2026
**Status**: ✅ Production Ready MVP
