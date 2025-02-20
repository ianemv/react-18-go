export interface Book {
  ID: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
  description: string;
  coverImageUrl?: string;
  isbn?: string;
}

export interface BookFormValues {
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
  description: string;
  coverImageUrl?: string;
}
