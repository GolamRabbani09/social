# 🚀 Quick Start Guide - Run App Now

## ✅ All Issues Fixed - Ready to Run!

This guide will get your Social Media App running in 2 minutes.

---

## 📋 Prerequisites

Ensure you have:

- PostgreSQL running (should be from previous setup)
- Python 3.13 virtual environment (already created)
- Node.js/npm installed

---

## 🔧 Setup Verification

### Check PostgreSQL

```bash
# Test PostgreSQL connection
PGPASSWORD=224656 psql -U postgres -d social_media_db -c "SELECT 'Connected!' as status;"
```

**Expected:** ✅ Connected!

### Check Virtual Environment

```bash
# Activate and check Python
cd /Users/golamrabbani/social/backend
source venv/bin/activate
python --version  # Should be 3.13.x
```

---

## 🎯 Step 1: Start Backend Server

### Terminal 1 - Backend

```bash
cd /Users/golamrabbani/social/backend
source venv/bin/activate
python manage.py runserver
```

**Expected Output:**

```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

✅ Backend running at `http://localhost:8000`

---

## 🎯 Step 2: Start Frontend Server

### Terminal 2 - Frontend

```bash
cd /Users/golamrabbani/social/frontend
npm install  # First time only (installs node_modules)
npm run dev
```

**Expected Output:**

```
  VITE v4.3.0  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend running at `http://localhost:5173`

---

## 🌐 Access the App

### URLs

| Component       | URL                         | Notes                        |
| --------------- | --------------------------- | ---------------------------- |
| Frontend App    | http://localhost:5173       | Main app                     |
| Backend API     | http://localhost:8000/api   | REST API                     |
| Django Admin    | http://localhost:8000/admin | Admin panel (admin/admin123) |
| Admin Dashboard | http://localhost:5173/admin | Stats dashboard              |

---

## 👤 Test Accounts

### Option 1: Create New Account

1. Go to http://localhost:5173
2. Click "Register"
3. Fill in username, email, password
4. Click "Sign Up"
5. Login with your new account

### Option 2: Use Existing Admin Account

```
Username: admin
Password: admin123
```

---

## ✅ What's Now Working

### 1. ✅ Post Creation with Images

- Write title & content
- Optional: Upload image
- Click "Post"
- Should appear immediately

### 2. ✅ Profile Page

- Click on profile picture or username
- See user profile with:
  - Profile picture
  - Username & bio
  - Posts, Followers, Following counts
  - User's recent posts

### 3. ✅ Admin Dashboard

- Click "📊 Admin" in navbar
- See:
  - Total users count
  - Total posts count
  - Recent posts table
  - Like & comment counts
  - Click "Refresh" to update

### 4. ✅ Other Features (Already Working)

- View feed
- Like/unlike posts
- Comment on posts
- Follow/unfollow users
- Update profile

---

## 🐛 Troubleshooting

### Frontend Shows Blank Page

```bash
# Terminal 2
npm install  # Reinstall dependencies
npm run dev
```

### Backend API Errors

```bash
# Terminal 1
python manage.py migrate  # Apply migrations
python manage.py runserver
```

### Port Already in Use

**Backend (8000):**

```bash
# Kill process on port 8000
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Frontend (5173):**

```bash
# Kill process on port 5173
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database Connection Error

```bash
# Check PostgreSQL
brew services restart postgresql@14

# Verify connection
PGPASSWORD=224656 psql -U postgres -d social_media_db -c "SELECT 1;"
```

### FormData Upload Not Working

Make sure backend is running and accepting POST requests:

```bash
# Test from backend terminal
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"Test1234","password2":"Test1234"}'
```

---

## 📝 Testing Checklist

After starting both servers:

- [ ] Frontend loads without errors (http://localhost:5173)
- [ ] Can register new user
- [ ] Can login
- [ ] Can view home feed
- [ ] Can create text post
- [ ] Can create post with image
- [ ] Can like a post
- [ ] Can comment on post
- [ ] Can visit user profile
- [ ] Profile shows user info & posts
- [ ] Can follow/unfollow users
- [ ] Can visit Admin Dashboard
- [ ] Admin dashboard shows correct stats
- [ ] Admin dashboard shows recent posts

---

## 🎬 Complete Test Scenario

1. **Register new user:**
   - Go to Register page
   - Create account with username "testuser"
   - Check users count in admin increases

2. **Create posts:**
   - Post text-only post
   - Upload image and post
   - Check posts count in admin increases

3. **Test profile:**
   - Click on post author's name
   - View profile page
   - Verify posts display
   - Check follow button works

4. **Check admin:**
   - Click "Admin" link
   - Verify stats match your actions
   - See posts in recent posts table

---

## 🚨 Important Notes

### 1. Frontend First Time Setup

```bash
npm install  # Takes 1-2 minutes
# This creates node_modules folder with all dependencies
```

### 2. Database Auto-Migrations

If you get migration errors:

```bash
python manage.py migrate --run-syncdb
```

### 3. Static Files for Admin

If Django admin looks broken:

```bash
python manage.py collectstatic --no-input
```

### 4. Redis (Optional)

Backend works without Redis. If you want caching later:

```bash
brew install redis
brew services start redis
```

---

## 📚 Documentation Files Created

- `FIXES_SUMMARY.md` - What was fixed and why
- `BEFORE_AFTER_COMPARISON.md` - Code comparisons
- `API_TESTING_GUIDE.md` - Test API with cURL
- `README.md` - Original project overview

---

## 🎉 You're Ready!

Just run these 2 commands in separate terminals:

**Terminal 1:**

```bash
cd /Users/golamrabbani/social/backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2:**

```bash
cd /Users/golamrabbani/social/frontend
npm install  # First time only
npm run dev
```

Then open: **http://localhost:5173** 🚀

---

## 💡 Tips

- **Save time:** Run both in Screen/Tmux/VSCode terminals to avoid opening multiple terminals
- **Debug:** Open browser DevTools (F12) to see console errors
- **Backend logs:** Check terminal 1 for API request details
- **Check database:** Use Django admin (http://localhost:8000/admin)

---

## ❓ Questions?

- Check `FIXES_SUMMARY.md` for what was fixed
- Check `API_TESTING_GUIDE.md` for API testing
- Check `BEFORE_AFTER_COMPARISON.md` for code changes
- Check browser console for frontend errors (F12)
- Check backend terminal for server errors

**Happy coding! 🎉**
