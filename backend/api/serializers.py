from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Like, Comment, Follow

User = get_user_model()


# Minimal serializer for nested user data (to avoid circular imports)
class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "bio", "profile_picture"]
        read_only_fields = ["id"]


class UserSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    posts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "bio",
            "profile_picture",
            "posts_count",
            "followers_count",
            "following_count",
            "posts",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def get_posts_count(self, obj):
        return obj.posts.count()

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_posts(self, obj):
        # Return latest 5 posts with minimal serializer to avoid circular import
        posts = obj.posts.all()[:5]
        # Pass context so nested ImageFields can build absolute URLs
        return PostMinimalSerializer(posts, many=True, context=self.context).data


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


# Minimal Post serializer (no nested objects to avoid circular import)
class PostMinimalSerializer(serializers.ModelSerializer):
    author = UserMinimalSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "author", "title", "content", "image", "likes_count", "created_at"]
        read_only_fields = ["id", "author", "created_at"]

    def get_likes_count(self, obj):
        return obj.likes.count()


class CommentSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "user", "content", "created_at", "updated_at"]
        read_only_fields = ["id", "user", "created_at", "updated_at"]


class PostSerializer(serializers.ModelSerializer):
    author = UserMinimalSerializer(read_only=True)  # Use minimal serializer
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "title",
            "content",
            "image",
            "likes_count",
            "comments_count",
            "is_liked",
            "comments",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "author", "created_at", "updated_at"]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, post=obj).exists()
        return False


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "post", "created_at"]
        read_only_fields = ["id", "user", "created_at"]


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ["id", "follower", "following", "created_at"]
        read_only_fields = ["id", "follower", "created_at"]
