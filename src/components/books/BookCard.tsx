import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: number; // Make sure id is included
  title: string;
  author: string;
  description?: string;
  coverImageUrl?: string;
  onDelete: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id, // Add id to destructuring
  title,
  author,
  description,
  coverImageUrl,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {coverImageUrl && (
        <img
          src={coverImageUrl}
          alt={`Cover of ${title}`}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{author}</p>
        {description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <Link
            to={`/book/${id}/edit`} // Direct link instead of using onEdit
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
