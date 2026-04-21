from django.contrib import admin
from .models import User, Post, Like, Comment, Follow


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "created_at"]
    search_fields = ["username", "email"]


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "created_at"]
    search_fields = ["title", "author__username"]
    list_filter = ["created_at"]


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ["user", "post", "created_at"]
    list_filter = ["created_at"]


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["user", "post", "created_at"]
    search_fields = ["user__username", "post__title"]
    list_filter = ["created_at"]


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ["follower", "following", "created_at"]
    list_filter = ["created_at"]
