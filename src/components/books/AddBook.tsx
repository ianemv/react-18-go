import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import BookForm from "./BookForm";
import api from "../../services/api";

const AddBook: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (bookData: {
      title: string;
      author: string;
      description: string;
    }) => api.post("/books/", bookData),
    onSuccess: () => {
      navigate("/books");
    },
  });

  const handleSubmit = (bookData: {
    title: string;
    author: string;
    description: string;
  }) => {
    mutation.mutate(bookData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
      {mutation.isError && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
          Failed to add book. Please try again.
        </div>
      )}
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBook;
