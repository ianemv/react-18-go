import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Book } from "../../types/book";
import api from "../../services/api";

interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery<Book>({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await api.get(`/books/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: async (bookId: string) => {
      await api.delete(`/books/${bookId}`);
    },
    onSuccess: () => {
      navigate("/books");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?") && id) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading book details
      </div>
    );
  }

  if (!book) {
    return <div className="text-gray-500 text-center p-4">Book not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <div className="space-x-2">
            <button
              onClick={() => navigate(`/books/${id}/edit`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {book.coverImageUrl && (
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="w-full h-auto rounded-lg shadow"
              />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Author</h2>
              <p className="text-gray-600">{book.author}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700">ISBN</h2>
              <p className="text-gray-600">{book?.isbn}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Publication Year
              </h2>
              <p className="text-gray-600">{book.publishedDate}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Description
              </h2>
              <p className="text-gray-600">{book.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/books")}
          className="text-blue-500 hover:text-blue-600"
        >
          ← Back to Books
        </button>
      </div>
    </div>
  );
};
export default BookDetail;
