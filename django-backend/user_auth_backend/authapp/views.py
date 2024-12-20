# views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from .models import CustomUser

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # No authentication required for registration.

    def perform_create(self, serializer):
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({
            'message': 'Registration successful',
            'token': access_token,
            'user': {'username': user.username, 'email': user.email}
        })

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            raise AuthenticationFailed('Email and Password are required')

        # Authenticate the user
        user = authenticate(request, username=email, password=password)

        if user is None:
            raise AuthenticationFailed('Invalid credentials')

        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'message': 'Login successful',
            'token': access_token,
            'user': {'username': user.username, 'email': user.email}
        })