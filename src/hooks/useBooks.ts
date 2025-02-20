// filepath: /book-management-app/book-management-app/src/hooks/useBooks.ts
import { useEffect, useState } from "react";
import fetchBooks from "../services/api";
import { Book } from "../types/book";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return { books, loading, error };
};

export default useBooks;
