# 🧪 API Testing Guide - Postman / cURL

Use this guide to test all fixed issues before running the frontend.

---

## 🔐 Authentication Setup

### 1. Register New User

```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123",
    "password2": "TestPass123"
  }'
```

**Expected Response:**

```json
{
  "message": "User registered successfully"
}
```

---

### 2. Login User

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123"
  }'
```

**Expected Response:**

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 2,
    "username": "testuser",
    "email": "test@example.com",
    "bio": null,
    "profile_picture": null,
    "posts_count": 0,
    "followers_count": 0,
    "following_count": 0
  }
}
```

**Save the `access` token for next requests:**

```bash
TOKEN="your_access_token_here"
```

---

## 📝 Test Post Creation (FIXED ISSUE #1)

### Create Post WITH Text Only

```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is my first post on SocialHub!"
  }'
```

**Expected Response:**

```json
{
  "id": 1,
  "author": {
    "id": 2,
    "username": "testuser",
    "bio": null,
    "profile_picture": null
  },
  "title": "My First Post",
  "content": "This is my first post on SocialHub!",
  "image": null,
  "likes_count": 0,
  "comments_count": 0,
  "is_liked": false,
  "comments": [],
  "created_at": "2024-04-19T10:30:00Z",
  "updated_at": "2024-04-19T10:30:00Z"
}
```

---

### Create Post WITH Image (FormData)

**Important:** This tests the FormData fix!

```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Post with Image" \
  -F "content=Check out this image!" \
  -F "image=@/path/to/image.jpg"
```

**Expected Response:**

```json
{
  "id": 2,
  "author": { ... },
  "title": "Post with Image",
  "content": "Check out this image!",
  "image": "/media/posts/image.jpg",
  "likes_count": 0,
  "comments_count": 0,
  ...
}
```

---

### Get All Posts (with pagination)

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/posts/?page=1
```

**Expected Response:**

```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    { ... post objects ... }
  ]
}
```

---

## 👤 Test Profile Page (FIXED ISSUE #2)

### Get User Profile

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/users/2/
```

**Expected Response (with posts included):**

```json
{
  "id": 2,
  "username": "testuser",
  "email": "test@example.com",
  "bio": "My bio here",
  "profile_picture": null,
  "posts_count": 2,
  "followers_count": 1,
  "following_count": 3,
  "posts": [
    {
      "id": 1,
      "author": { ... },
      "title": "My First Post",
      "content": "...",
      "image": null,
      "likes_count": 5,
      "created_at": "2024-04-19T10:30:00Z"
    },
    { ... more posts ... }
  ],
  "created_at": "2024-04-19T09:00:00Z"
}
```

✅ **Notice:** User data now includes `posts`, `posts_count`, `followers_count`, `following_count`

---

### Update User Profile

```bash
curl -X PUT http://localhost:8000/api/users/update_profile/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Love coding & social media!",
    "email": "newemail@example.com"
  }'
```

---

## ❤️ Test Like Functionality

### Like a Post

```bash
curl -X POST http://localhost:8000/api/posts/1/like/ \
  -H "Authorization: Bearer $TOKEN"
```

**First time Response:**

```json
{
  "message": "Post liked"
}
```

**Second time (unlike):**

```json
{
  "message": "Post unliked"
}
```

---

## 💬 Test Comments

### Add Comment to Post

```bash
curl -X POST http://localhost:8000/api/posts/1/comment/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great post!"
  }'
```

**Expected Response:**

```json
{
  "id": 1,
  "user": {
    "id": 2,
    "username": "testuser",
    "bio": null,
    "profile_picture": null
  },
  "content": "Great post!",
  "created_at": "2024-04-19T10:35:00Z",
  "updated_at": "2024-04-19T10:35:00Z"
}
```

---

### Get All Comments for a Post

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/posts/1/comments/
```

---

## 👥 Test Follow Functionality

### Follow a User

```bash
curl -X POST http://localhost:8000/api/follow/follow/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1
  }'
```

**First time Response:**

```json
{
  "message": "User followed"
}
```

**Second time (unfollow):**

```json
{
  "message": "User unfollowed"
}
```

---

### Get User's Followers

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8000/api/follow/followers/?user_id=1"
```

**Expected Response:**

```json
[
  {
    "id": 2,
    "username": "testuser",
    "bio": null,
    "profile_picture": null
  },
  { ... more followers ... }
]
```

---

### Get Users Being Followed

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8000/api/follow/following/?user_id=1"
```

---

## 🧠 Error Handling Tests

### Missing Required Fields

```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post without content"
  }'
```

**Expected Error:**

```json
{
  "content": ["This field is required."]
}
```

---

### Unauthorized Request

```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post",
    "content": "Test"
  }'
```

**Expected Error:**

```json
{
  "detail": "Authentication credentials were not provided."
}
```

---

### Invalid Token

```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer invalid_token_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post",
    "content": "Test"
  }'
```

**Expected Error:**

```json
{
  "detail": "Given token not valid for any token type"
}
```

---

## 📊 Quick Test Sequence

Run these in order to test the complete flow:

```bash
# 1. Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"demo1","email":"demo1@test.com","password":"Demo1234","password2":"Demo1234"}'

# 2. Login
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"demo1","password":"Demo1234"}' | python -m json.tool | grep '"access"' | cut -d'"' -f4)

# 3. Create post
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"This is a test"}'

# 4. Get user profile
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/users/me/
```

---

## ✅ Verification Checklist

After running tests:

- [ ] Post creation returns success with post data
- [ ] Post with image uploads successfully
- [ ] User profile API returns posts_count, followers_count, following_count
- [ ] Comments can be added and retrieved
- [ ] Like/unlike toggle works
- [ ] Follow/unfollow toggle works
- [ ] Error messages are descriptive
- [ ] Unauthorized requests return 401

---

## 🚀 Running Backend

```bash
cd /Users/golamrabbani/social/backend
source venv/bin/activate
python manage.py runserver
```

API will be available at: `http://localhost:8000/api`
