from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Post, Like, Comment, Follow
from .serializers import (
    UserSerializer,
    UserRegisterSerializer,
    PostSerializer,
    LikeSerializer,
    CommentSerializer,
    FollowSerializer,
)
from .permissions import IsAuthorOrReadOnly, IsAuthor

User = get_user_model()


# Authentication Views
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED,
        )


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        from django.contrib.auth import authenticate

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data,
            }
        )


# User Views
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=["put"])
    def update_profile(self, request):
        user = request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# Post Views
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrReadOnly, IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):
        post = self.get_object()
        like, created = Like.objects.get_or_create(user=request.user, post=post)

        if not created:
            like.delete()
            return Response(
                {"message": "Post unliked"}, status=status.HTTP_204_NO_CONTENT
            )

        return Response({"message": "Post liked"}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def comment(self, request, pk=None):
        post = self.get_object()
        # include context so nested user/profile image URLs are correct
        serializer = CommentSerializer(data=request.data, context=self.get_serializer_context())
        if serializer.is_valid():
            serializer.save(user=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get"])
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = post.comments.all()
        # include context so nested user/profile image URLs are correct
        serializer = CommentSerializer(comments, many=True, context=self.get_serializer_context())
        return Response(serializer.data)


# Comment Views
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthor, IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Follow Views
class FollowViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["post"])
    def follow(self, request):
        user_id = request.data.get("user_id")
        follow_user = get_object_or_404(User, id=user_id)

        if follow_user == request.user:
            return Response(
                {"error": "You cannot follow yourself"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        follow, created = Follow.objects.get_or_create(
            follower=request.user, following=follow_user
        )

        if not created:
            follow.delete()
            return Response(
                {"message": "User unfollowed"}, status=status.HTTP_204_NO_CONTENT
            )

        return Response(
            {"message": "User followed"}, status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=["get"])
    def followers(self, request):
        user_id = request.query_params.get("user_id", request.user.id)
        user = get_object_or_404(User, id=user_id)
        followers = user.followers.all()
        serializer = UserSerializer(
            [follow.follower for follow in followers], many=True
        )
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def following(self, request):
        user_id = request.query_params.get("user_id", request.user.id)
        user = get_object_or_404(User, id=user_id)
        following = user.following.all()
        serializer = UserSerializer(
            [follow.following for follow in following], many=True
        )
        return Response(serializer.data)
