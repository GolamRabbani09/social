# Social Media Web App - Setup & Run Instructions

## 📋 Project Structure

```
social/
├── backend/                          # Django API backend
│   ├── config/                       # Django configuration
│   │   ├── __init__.py
│   │   ├── settings.py              # Main settings
│   │   ├── urls.py                  # URL routing
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── api/                          # Main API app
│   │   ├── __init__.py
│   │   ├── models.py                # DB models
│   │   ├── serializers.py           # DRF serializers
│   │   ├── views.py                 # API views
│   │   ├── permissions.py           # Custom permissions
│   │   ├── urls.py                  # API routes
│   │   ├── admin.py                 # Django admin
│   │   ├── apps.py
│   │   └── migrations/
│   ├── media/                        # User uploads
│   │   ├── profile_pics/
│   │   └── posts/
│   ├── manage.py                    # Django CLI
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment template
│   └── README.md
│
└── frontend/                         # React+Vite frontend
    ├── src/
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   └── AuthPages.css
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── CreatePost.jsx
    │   │   ├── PostCard.jsx
    │   │   └── *.css files
    │   ├── context/
    │   │   ├── AuthContext.js        # Auth state management
    │   │   └── PostContext.js        # Post state management
    │   ├── services/
    │   │   └── api.js                # Axios API client
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── App.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .gitignore
    └── README.md
```

---

## 🚀 Backend Setup (Django)

### Prerequisites

- Python 3.9+
- PostgreSQL 12+

### Step 1: Create Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production
DATABASE_NAME=social_media_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Step 4: Create PostgreSQL Database

```bash
# Open PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE social_media_db;

# Exit
\q
```

### Step 5: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 6: Create Superuser (Admin)

```bash
python manage.py createsuperuser
# Follow prompts to create admin account
```

### Step 7: Run Development Server

```bash
python manage.py runserver
```

Backend will be available at: `http://localhost:8000`

Admin panel: `http://localhost:8000/admin`

---

## 🎨 Frontend Setup (React)

### Prerequisites

- Node.js 16+ & npm

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

---

## 🔑 JWT Authentication

### Login Flow

1. User registers at `/register`
2. Redirected to `/login`
3. Submit credentials
4. Backend returns `access_token` and `refresh_token`
5. Token stored in localStorage
6. Token included in all API requests via Axios interceptor

### Tokens

- **Access Token**: Valid for 1 hour
- **Refresh Token**: Valid for 24 hours

---

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/register/     - Register new user
POST   /api/auth/login/        - Login user
POST   /api/auth/token/refresh/- Refresh access token
```

### Users

```
GET    /api/users/             - List all users
GET    /api/users/{id}/        - Get user details
GET    /api/users/me/          - Get current user
PUT    /api/users/update_profile/ - Update user profile
```

### Posts

```
GET    /api/posts/             - List all posts (paginated)
POST   /api/posts/             - Create new post
GET    /api/posts/{id}/        - Get post details
PUT    /api/posts/{id}/        - Update post
DELETE /api/posts/{id}/        - Delete post
POST   /api/posts/{id}/like/   - Like/Unlike post
POST   /api/posts/{id}/comment/ - Comment on post
GET    /api/posts/{id}/comments/ - Get post comments
```

### Follow

```
POST   /api/follow/follow/     - Follow/Unfollow user
GET    /api/follow/followers/ - Get user followers
GET    /api/follow/following/ - Get user following
```

---

## 🧪 Test the Application

### 1. Register a New User

- Navigate to `http://localhost:3000/register`
- Fill in username, email, password
- Click "Register"

### 2. Login

- Navigate to `http://localhost:3000/login`
- Enter credentials
- Click "Login"

### 3. Create a Post

- You'll be redirected to the home feed
- Enter title and content
- (Optional) Upload an image
- Click "Post"

### 4. Like & Comment

- Click heart icon to like posts
- Click comment button to add comments

### 5. Follow Users

- Visit a user's profile
- Click "Follow" button

---

## 🔐 Security Notes

⚠️ **For Production:**

1. Change `SECRET_KEY` in `settings.py`
2. Set `DEBUG = False`
3. Use strong database password
4. Set up HTTPS
5. Use environment variables for all sensitive data
6. Setup CSRF protection
7. Configure secure cookies
8. Add rate limiting

---

## 📦 Requirements

### Backend (`requirements.txt`)

- Django 4.2.0
- DRF 3.14.0
- django-cors-headers 4.0.0
- psycopg2-binary 2.9.6
- python-decouple 3.8
- PyJWT 2.6.0
- Pillow 9.5.0

### Frontend (`package.json`)

- React 18.2.0
- React Router 6.10.0
- Axios 1.3.0
- Vite 4.3.0

---

## 🐛 Troubleshooting

### Database Connection Error

```
Check PostgreSQL is running:
- macOS: brew services list
- Linux: sudo systemctl status postgresql
- Windows: Services (search in Start)
```

### Port Already in Use

```
Backend (8000): lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9
Frontend (3000): lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### CORS Error

```
Make sure CORS_ALLOWED_ORIGINS in settings.py includes your frontend URL
```

### Image Upload Not Working

```
Ensure media folder exists and has write permissions
python manage.py collectstatic
```

---

## 📚 Additional Resources

- [Django REST Framework Docs](https://www.django-rest-framework.org/)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [JWT.io](https://jwt.io)

---

## 📝 License

MIT License - feel free to use this project for learning and development!
