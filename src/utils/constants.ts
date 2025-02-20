// filepath: /my-react-app/my-react-app/src/utils/constants.ts

export const API_BASE_URL = "http://localhost:8080/api";
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/auth/register`;
export const BOOKS_ENDPOINT = `${API_BASE_URL}/books`;

export const ERROR_MESSAGES = {
  REQUIRED: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_MISMATCH: "Passwords do not match.",
};
