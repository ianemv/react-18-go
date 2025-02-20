import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import BookForm from "./BookForm";
import api from "../../services/api";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => api.get(`/books/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (bookData: {
      title: string;
      author: string;
      description: string;
    }) => api.put(`/books/${id}`, bookData),
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
      {mutation.isError && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
          Failed to update book. Please try again.
        </div>
      )}
      <BookForm onSubmit={handleSubmit} initialData={book} />
    </div>
  );
};

export default EditBook;
