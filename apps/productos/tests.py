from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase


class ProductosJWTTests(APITestCase):
    def setUp(self):
        self.username = 'jwt_test_user'
        self.password = 'test-password-123'
        get_user_model().objects.create_user(
            username=self.username,
            password=self.password,
        )

    def test_product_endpoints_require_authentication(self):
        response = self.client.get('/api/productos/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_token_authenticates_product_endpoint(self):
        token_response = self.client.post(
            '/api/token/',
            {'username': self.username, 'password': self.password},
            format='json',
        )
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token_response.data['access']}"
        )
        response = self.client.get('/api/productos/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_refresh_endpoint_issues_a_new_access_token(self):
        token_response = self.client.post(
            '/api/token/',
            {'username': self.username, 'password': self.password},
            format='json',
        )
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)

        refresh_response = self.client.post(
            '/api/token/refresh/',
            {'refresh': token_response.data['refresh']},
            format='json',
        )

        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', refresh_response.data)
