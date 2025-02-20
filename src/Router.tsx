import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookList from "./components/books/BookList";
import BookDetail from "./components/books/BookDetail";
import AddBook from "./components/books/AddBook";
import EditBook from "./components/books/EditBook";
import PublicLayout from "./components/layouts/PublicLayout";
import AuthLayout from "./components/layouts/AuthLayout";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        element={
          <PublicLayout>
            <Outlet />
          </PublicLayout>
        }
      >
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          }
        >
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book/:id/edit" element={<EditBook />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
