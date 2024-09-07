"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: string;
  name: string;
}

interface CategoryFormProps {
  onClose: () => void;
  categoryToEdit?: Category;
  onSuccess?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onClose,
  categoryToEdit,
  onSuccess,
}) => {
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Set initial values for editing
  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
    }
  }, [categoryToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found");
        return;
      }

      if (categoryToEdit) {
        // Update category
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryToEdit.id}`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSuccessMessage("Category updated successfully.");
      } else {
        // Add new category
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSuccessMessage("Category added successfully.");
      }

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error: any) {
      setErrorMessage(
        "Failed to save category. " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {categoryToEdit ? "Edit Category" : "Add Category"}
        </h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {categoryToEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
