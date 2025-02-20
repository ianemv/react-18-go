import api from "./api";

import { Book } from "../types/book";

class BookService {
  async fetchBooks(): Promise<Book[]> {
    const { data } = await api.get<Book[]>("/books/");
    return data;
  }

  async getBookById(id: number): Promise<Book> {
    const { data } = await api.get<Book>(`/books/${id}`);
    return data;
  }

  async createBook(book: Omit<Book, "id">): Promise<Book> {
    const { data } = await api.post<Book>("/books/", book);
    return data;
  }

  async updateBook(id: number, book: Partial<Book>): Promise<Book> {
    const { data } = await api.put<Book>(`/books/${id}`, book);
    return data;
  }

  async deleteBook(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  }
}

export const bookService = new BookService();
export default bookService;
