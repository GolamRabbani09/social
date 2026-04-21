# Social Media Web App - Django Backend README

## Quick Start

### 1. Setup Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure Database

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Admin User

```bash
python manage.py createsuperuser
```

### 5. Start Server

```bash
python manage.py runserver
```

## 🏗️ Architecture

### Models

- **User**: Custom user model extending AbstractUser
- **Post**: User posts with title, content, optional image
- **Like**: Track post likes (unique per user+post)
- **Comment**: Post comments
- **Follow**: User follow relationships

### API Features

- JWT Authentication
- Permission-based access control
- Image upload support
- Pagination for posts
- Admin panel for content management

## 📁 Key Files

- `config/settings.py` - Django configuration
- `api/models.py` - Database models
- `api/serializers.py` - DRF serializers
- `api/views.py` - API endpoints
- `api/urls.py` - URL routing

## 🔑 Environment Variables

See `.env.example` for all required variables.

```
DEBUG=True
SECRET_KEY=your-key-here
DATABASE_NAME=social_media_db
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```
