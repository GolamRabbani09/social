# 📡 API Endpoints Reference

## Base URL

```
http://localhost:8000/api
```

---

## 🔐 Authentication Endpoints

### Register User

```http
POST /auth/register/
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword123",
  "password2": "securepassword123"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully"
}
```

---

### Login

```http
POST /auth/login/
Content-Type: application/json

{
  "username": "newuser",
  "password": "securepassword123"
}
```

**Response (200):**

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "newuser",
    "email": "user@example.com",
    "bio": null,
    "profile_picture": null,
    "created_at": "2024-04-19T10:30:00Z"
  }
}
```

---

### Refresh Token

```http
POST /auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response (200):**

```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 👤 User Endpoints

### List All Users

```http
GET /users/
Authorization: Bearer <access_token>
```

**Response (200):**

```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Web Developer",
    "profile_picture": "http://localhost:8000/media/profile_pics/john.jpg",
    "created_at": "2024-04-19T10:30:00Z"
  }
]
```

---

### Get Current User

```http
GET /users/me/
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "bio": "Web Developer",
  "profile_picture": "http://localhost:8000/media/profile_pics/john.jpg",
  "created_at": "2024-04-19T10:30:00Z"
}
```

---

### Get Specific User

```http
GET /users/{id}/
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": 2,
  "username": "jane_smith",
  "email": "jane@example.com",
  "bio": "Designer & Artist",
  "profile_picture": null,
  "created_at": "2024-04-18T15:20:00Z"
}
```

---

### Update User Profile

```http
PUT /users/update_profile/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

bio: "Updated bio here"
profile_picture: <image_file>
```

**Response (200):**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "bio": "Updated bio here",
  "profile_picture": "http://localhost:8000/media/profile_pics/new_pic.jpg",
  "created_at": "2024-04-19T10:30:00Z"
}
```

---

## 📝 Post Endpoints

### List All Posts (Paginated)

```http
GET /posts/?page=1
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "count": 25,
  "next": "http://localhost:8000/api/posts/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "author": {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com",
        "bio": "Web Developer",
        "profile_picture": null,
        "created_at": "2024-04-19T10:30:00Z"
      },
      "title": "First Post",
      "content": "This is my first post on this platform!",
      "image": null,
      "likes_count": 5,
      "comments_count": 2,
      "is_liked": false,
      "comments": [
        {
          "id": 1,
          "user": {
            "id": 2,
            "username": "jane_smith",
            "email": "jane@example.com",
            "bio": null,
            "profile_picture": null,
            "created_at": "2024-04-18T15:20:00Z"
          },
          "content": "Great post!",
          "created_at": "2024-04-19T11:00:00Z",
          "updated_at": "2024-04-19T11:00:00Z"
        }
      ],
      "created_at": "2024-04-19T10:30:00Z",
      "updated_at": "2024-04-19T10:30:00Z"
    }
  ]
}
```

---

### Create Post

```http
POST /posts/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

title: "My Awesome Post"
content: "This is the content of my post"
image: <image_file> (optional)
```

**Response (201):**

```json
{
  "id": 5,
  "author": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Web Developer",
    "profile_picture": null,
    "created_at": "2024-04-19T10:30:00Z"
  },
  "title": "My Awesome Post",
  "content": "This is the content of my post",
  "image": "http://localhost:8000/media/posts/post_image.jpg",
  "likes_count": 0,
  "comments_count": 0,
  "is_liked": false,
  "comments": [],
  "created_at": "2024-04-19T15:45:00Z",
  "updated_at": "2024-04-19T15:45:00Z"
}
```

---

### Get Specific Post

```http
GET /posts/{id}/
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": 1,
  "author": {...},
  "title": "First Post",
  "content": "This is my first post",
  "image": null,
  "likes_count": 5,
  "comments_count": 2,
  "is_liked": true,
  "comments": [...],
  "created_at": "2024-04-19T10:30:00Z",
  "updated_at": "2024-04-19T10:30:00Z"
}
```

---

### Update Post

```http
PUT /posts/{id}/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

title: "Updated Title"
content: "Updated content"
```

**Response (200):**

```json
{
  "id": 1,
  "author": {...},
  "title": "Updated Title",
  "content": "Updated content",
  "image": null,
  "likes_count": 5,
  "comments_count": 2,
  "is_liked": true,
  "comments": [...],
  "created_at": "2024-04-19T10:30:00Z",
  "updated_at": "2024-04-19T16:00:00Z"
}
```

---

### Delete Post

```http
DELETE /posts/{id}/
Authorization: Bearer <access_token>
```

**Response (204 No Content)**

---

## ❤️ Like Endpoints

### Like/Unlike Post

```http
POST /posts/{id}/like/
Authorization: Bearer <access_token>
```

**Response (201 - If liked):**

```json
{
  "message": "Post liked"
}
```

**Response (204 - If unliked):**

```
No Content
```

---

## 💬 Comment Endpoints

### Add Comment to Post

```http
POST /posts/{id}/comment/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "This is a great post!"
}
```

**Response (201):**

```json
{
  "id": 10,
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Web Developer",
    "profile_picture": null,
    "created_at": "2024-04-19T10:30:00Z"
  },
  "content": "This is a great post!",
  "created_at": "2024-04-19T16:15:00Z",
  "updated_at": "2024-04-19T16:15:00Z"
}
```

---

### List Post Comments

```http
GET /posts/{id}/comments/
Authorization: Bearer <access_token>
```

**Response (200):**

```json
[
  {
    "id": 1,
    "user": {...},
    "content": "Great post!",
    "created_at": "2024-04-19T11:00:00Z",
    "updated_at": "2024-04-19T11:00:00Z"
  }
]
```

---

### Update Comment

```http
PUT /comments/{id}/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "Updated comment text"
}
```

**Response (200):**

```json
{
  "id": 1,
  "user": {...},
  "content": "Updated comment text",
  "created_at": "2024-04-19T11:00:00Z",
  "updated_at": "2024-04-19T16:30:00Z"
}
```

---

### Delete Comment

```http
DELETE /comments/{id}/
Authorization: Bearer <access_token>
```

**Response (204 No Content)**

---

## 👥 Follow Endpoints

### Follow/Unfollow User

```http
POST /follow/follow/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "user_id": 2
}
```

**Response (201 - If followed):**

```json
{
  "message": "User followed"
}
```

**Response (204 - If unfollowed):**

```
No Content
```

---

### Get User Followers

```http
GET /follow/followers/?user_id={user_id}
Authorization: Bearer <access_token>
```

**Response (200):**

```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Web Developer",
    "profile_picture": null,
    "created_at": "2024-04-19T10:30:00Z"
  }
]
```

---

### Get User Following

```http
GET /follow/following/?user_id={user_id}
Authorization: Bearer <access_token>
```

**Response (200):**

```json
[
  {
    "id": 2,
    "username": "jane_smith",
    "email": "jane@example.com",
    "bio": "Designer",
    "profile_picture": null,
    "created_at": "2024-04-18T15:20:00Z"
  }
]
```

---

## 🔑 Authentication Headers

All endpoints (except `/auth/register/` and `/auth/login/`) require:

```http
Authorization: Bearer <your_access_token>
```

Get the token from login response and store in `localStorage` automatically by the frontend app.

---

## ❌ Error Responses

### 400 Bad Request

```json
{
  "field_name": ["Error message here"]
}
```

### 401 Unauthorized

```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden

```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found

```json
{
  "detail": "Not found."
}
```

---

## 🧪 Testing with cURL

### Register

```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password2": "testpass123"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### Get Posts (with token)

```bash
curl -X GET http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Create Post

```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "content": "Post content here"
  }'
```

---

## 📊 Pagination

List endpoints support pagination:

```
GET /posts/?page=1
GET /users/?page=1
```

**Response includes:**

```json
{
  "count": 100,           # Total items
  "next": "...?page=2",   # Next page URL
  "previous": null,       # Previous page URL
  "results": [...]        # Items array
}
```

**Page size:** 10 items per page (configurable in settings.py)

---

**Last Updated:** April 2026
**Version:** 1.0.0
