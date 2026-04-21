# 🚀 Deployment & Production Checklist

## Pre-Production Checklist

Use this checklist before deploying to production.

---

## 🔒 Security

### Backend Security

- [ ] Change `SECRET_KEY` in `settings.py` to a secure random value
  ```python
  SECRET_KEY = 'your-very-secure-and-random-key-here'
  ```
- [ ] Set `DEBUG = False` in settings

  ```python
  DEBUG = False
  ```

- [ ] Configure `ALLOWED_HOSTS` with your domain

  ```python
  ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
  ```

- [ ] Update `CORS_ALLOWED_ORIGINS`

  ```python
  CORS_ALLOWED_ORIGINS = ['https://yourdomain.com']
  ```

- [ ] Use strong database password

  ```env
  DATABASE_PASSWORD=your-very-strong-password-here
  ```

- [ ] Enable HTTPS
  - Generate SSL certificate (Let's Encrypt recommended)
  - Configure server to use HTTPS only

- [ ] Set secure Cookie settings

  ```python
  SESSION_COOKIE_SECURE = True
  CSRF_COOKIE_SECURE = True
  SECURE_SSL_REDIRECT = True
  SECURE_HSTS_SECONDS = 31536000
  ```

- [ ] Configure CSRF middleware

  ```python
  CSRF_TRUSTED_ORIGINS = ['https://yourdomain.com']
  ```

- [ ] Setup proper logging
  ```python
  LOGGING = {
      'version': 1,
      'handlers': {
          'file': {
              'level': 'ERROR',
              'class': 'logging.FileHandler',
              'filename': '/var/log/django/error.log',
          },
      },
  }
  ```

### Frontend Security

- [ ] Remove API debug logs
- [ ] Use environment variables for API URL

  ```javascript
  const API_URL = process.env.REACT_APP_API_URL || "https://api.yourdomain.com";
  ```

- [ ] Build with production flag

  ```bash
  npm run build
  ```

- [ ] Enable Content Security Policy headers
- [ ] Implement proper error boundaries

---

## 🗄️ Database

### PostgreSQL Production Setup

- [ ] Backup current database

  ```bash
  pg_dump social_media_db > backup.sql
  ```

- [ ] Configure PostgreSQL:
  - [ ] Enable SSL connections
  - [ ] Setup regular backups
  - [ ] Configure connection pooling (pgbouncer)
  - [ ] Setup replication for high availability

- [ ] Create dedicated database user

  ```sql
  CREATE USER prod_user WITH PASSWORD 'strong_password';
  CREATE DATABASE social_media_prod OWNER prod_user;
  GRANT ALL PRIVILEGES ON DATABASE social_media_prod TO prod_user;
  ```

- [ ] Enable archiving for backup/recovery
  - [ ] Setup WAL (Write-Ahead Logging)
  - [ ] Configure backup schedule

---

## 🖼️ Media & Static Files

- [ ] Setup S3 (or similar) for media storage

  ```bash
  pip install django-storages boto3
  ```

  ```python
  if not DEBUG:
      DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
      AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
      AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
      AWS_STORAGE_BUCKET_NAME = 'your-bucket-name'
  ```

- [ ] Collect static files

  ```bash
  python manage.py collectstatic
  ```

- [ ] Configure CDN for static files
  - [ ] CloudFront / Cloudflare recommended

---

## 📦 Deployment Infrastructure

### Server Setup

- [ ] Use production web server (Gunicorn/uWSGI)

  ```bash
  pip install gunicorn
  gunicorn config.wsgi:application --bind 0.0.0.0:8000
  ```

- [ ] Setup reverse proxy (Nginx/Apache)

  ```nginx
  server {
      listen 443 ssl;
      server_name yourdomain.com;

      ssl_certificate /path/to/cert.pem;
      ssl_certificate_key /path/to/key.pem;

      location / {
          proxy_pass http://127.0.0.1:8000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }
  ```

- [ ] Setup process manager (Systemd/Supervisor)

  ```ini
  [program:django]
  command=/path/to/venv/bin/gunicorn config.wsgi:application
  directory=/path/to/project
  autostart=true
  autorestart=true
  ```

- [ ] Configure caching (Redis)

  ```bash
  pip install django-redis
  ```

  ```python
  CACHES = {
      'default': {
          'BACKEND': 'django_redis.cache.RedisCache',
          'LOCATION': 'redis://127.0.0.1:6379/1',
      }
  }
  ```

### Frontend Deployment

- [ ] Build optimized production bundle
- [ ] Deploy to CDN (Vercel, Netlify, etc.)
- [ ] Enable gzip compression
- [ ] Setup caching headers

---

## 📊 Monitoring & Logging

- [ ] Setup error tracking (Sentry)

  ```bash
  pip install sentry-sdk
  ```

  ```python
  import sentry_sdk
  sentry_sdk.init(
      dsn="your-sentry-dsn",
      traces_sample_rate=1.0
  )
  ```

- [ ] Configure logging (ELK Stack recommended)
- [ ] Monitor server health
  - [ ] CPU usage
  - [ ] Memory usage
  - [ ] Disk space
  - [ ] Database performance

- [ ] Setup alerts for critical issues
- [ ] Monitor API response times

---

## 🔄 CI/CD Pipeline

- [ ] Setup GitHub Actions / GitLab CI

  ```yaml
  # .github/workflows/deploy.yml
  name: Deploy
  on:
    push:
      branches: [main]

  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - name: Run tests
          run: python manage.py test
        - name: Deploy
          run: |
            # deployment commands
  ```

- [ ] Run automated tests before deploy
- [ ] Automated linting and code quality checks
- [ ] Auto-deploy on main branch push

---

## 📝 Environment Variables

### Create `.env.production`

```env
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_NAME=social_media_prod
DATABASE_USER=prod_user
DATABASE_PASSWORD=very-strong-password
DATABASE_HOST=your-db-server.com
DATABASE_PORT=5432

ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com

AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=your-bucket

SENTRY_DSN=your-sentry-dsn
```

---

## 🧹 Performance Optimization

- [ ] Enable database query caching
- [ ] Index frequently queried fields

  ```python
  class Post(models.Model):
      created_at = models.DateTimeField(auto_now_add=True, db_index=True)
      author = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
  ```

- [ ] Optimize serializers with `select_related` / `prefetch_related`

  ```python
  queryset = Post.objects.select_related('author').prefetch_related('comments')
  ```

- [ ] Implement pagination (already done)
- [ ] Add rate limiting to API

  ```bash
  pip install djangorestframework-ratelimit
  ```

- [ ] Enable compression (gzip)
- [ ] Optimize images
- [ ] Minify frontend assets

---

## 🧪 Testing

### Before Deployment

- [ ] Run all unit tests

  ```bash
  python manage.py test
  ```

- [ ] Run integration tests
- [ ] Run security checks

  ```bash
  python manage.py check --deploy
  ```

- [ ] Load testing

  ```bash
  # Using Apache Bench or similar
  ab -n 1000 -c 10 https://yourdomain.com/api/posts/
  ```

- [ ] Penetration testing (optional)

---

## 🔐 Backup & Recovery

- [ ] Setup automated daily backups

  ```bash
  # Backup script
  #!/bin/bash
  pg_dump social_media_prod | gzip > /backups/db_$(date +%Y%m%d).sql.gz
  ```

- [ ] Test backup restoration
- [ ] Store backups in multiple locations
- [ ] Document recovery process
- [ ] Backup media files to S3/cloud

---

## 📋 Domain & DNS

- [ ] Register domain
- [ ] Point DNS to your server

  ```
  A record: your-server-ip
  AAAA record: your-server-ipv6 (if available)
  ```

- [ ] Setup CNAME for www subdomain
- [ ] Configure MX records (if sending emails)
- [ ] ADD SPF/DKIM records (for email)

---

## 📧 Email Configuration (Future)

For future email features:

- [ ] Configure email backend (SendGrid/AWS SES)

  ```python
  EMAIL_BACKEND = 'sendgrid_backend.SendgridBackend'
  SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')
  ```

- [ ] Setup email templates
- [ ] Test email sending

---

## 🚀 Launch Steps

### Step 1: Pre-Launch

1. [ ] Complete above checklist
2. [ ] Run final tests
3. [ ] Notify team

### Step 2: Deployment

1. [ ] Backup production data
2. [ ] Deploy backend
3. [ ] Run migrations (in production)
4. [ ] Deploy frontend
5. [ ] Verify all services running

### Step 3: Post-Launch

1. [ ] Monitor error logs
2. [ ] Test critical flows
3. [ ] Check system performance
4. [ ] Verify backups working
5. [ ] Document any issues

---

## 📞 Post-Launch Support

- [ ] Setup 24/7 monitoring
- [ ] Establish incident response procedure
- [ ] Create runbooks for common issues
- [ ] Schedule regular maintenance windows
- [ ] Plan for scaling as needed

---

## 📈 Scaling Considerations

As your app grows:

- [ ] Database read replicas for scaling reads
- [ ] Implement database sharding if needed
- [ ] Use message queues (Celery/Redis) for async tasks
- [ ] Cache frequently accessed data
- [ ] Load balance across multiple server instances
- [ ] Use CDN for media files

---

## 🎯 KPIs to Monitor

- [ ] Application response time
- [ ] Error rate
- [ ] Uptime percentage (target: 99.9%)
- [ ] User engagement metrics
- [ ] Server resource utilization
- [ ] API rate limit hits

---

## ✅ Final Verification

Before going live:

- [ ] All tests passing
- [ ] No console errors
- [ ] All endpoints responding
- [ ] Database backups verified
- [ ] SSL certificate working
- [ ] Email notifications working
- [ ] Error tracking configured
- [ ] Analytics/monitoring active
- [ ] Team trained on new system
- [ ] Runbooks documented

---

**Deployment Date:** ****\_\_\_****
**Deployed By:** ****\_\_\_****
**Environment:** Production
**Version:** 1.0.0

---

Good luck with your deployment! 🎉
