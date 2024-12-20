from rest_framework import serializers
from .models import CustomUser

# Serializer for registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'fullname', 'mobile', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user

# Serializer for login (Just email and password)
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

