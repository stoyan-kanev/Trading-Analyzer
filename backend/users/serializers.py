from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.core.exceptions import ValidationError as DjangoValidationError

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email","first_name","last_name","password"]

        extra_kwargs = {"email": {"required":True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user




class MeUpdateSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True, required=False, allow_blank=False)
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=False)

    class Meta:
        model = User
        fields = ("email", "first_name", "last_name", "current_password", "new_password")

    def validate(self, attrs):
        user = self.context["request"].user

        new_password = attrs.get("new_password")
        current_password = attrs.get("current_password")

        if new_password is not None:
            if not current_password:
                raise serializers.ValidationError({
                    "current_password": "Current password is required to change your password."
                })

            if not user.check_password(current_password):
                raise serializers.ValidationError({
                    "current_password": "Current password is incorrect."
                })

            try:
                validate_password(new_password, user=user)
            except DjangoValidationError as e:
                raise serializers.ValidationError({"new_password": list(e.messages)})

        return attrs
    def update(self, instance, validated_data):
        new_password = validated_data.pop("new_password", None)
        validated_data.pop("current_password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if new_password is not None:
            instance.set_password(new_password)

        instance.save()
        return instance