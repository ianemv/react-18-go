import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import bookService from "../../services/books";
import { Book } from "../../types/book";
import BookCard from "./BookCard";

const BookList: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: bookService.fetchBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: (bookId: number) => bookService.deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const handleDelete = async (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteMutation.mutateAsync(bookId);
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
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
      <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg">
        Failed to fetch books
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Book Collection</h2>
        <Link
          to="/add-book"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books?.map((book) => (
          <BookCard
            key={book.ID}
            id={book.ID}
            title={book.title}
            author={book.author}
            description={book.description}
            coverImageUrl={book.coverImageUrl}
            onDelete={() => handleDelete(book.ID)}
          />
        ))}
      </div>

      {books?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books found. Add your first book to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookList;
