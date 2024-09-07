import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CategoryForm from "../layouts/categoryForm";

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories(response.data.data);
      } catch (error: any) {
        console.error("Failed to fetch categories.", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    } catch (error: any) {
      console.error("Failed to delete category.", error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Categories</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              setEditingCategory(null);
              setShowForm(true);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-600 transition-colors shadow-md"
          >
            Add New Category
          </button>
          <button
            onClick={() => router.push("/tasks")}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            Back to Tasks
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow"
          >
            <span className="text-lg font-medium text-gray-800">
              {category.name}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(category)}
                className="bg-yellow-400 text-white py-1 px-4 rounded-md hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showForm && (
        <CategoryForm
          onClose={() => setShowForm(false)}
          categoryToEdit={editingCategory}
        />
      )}
    </div>
  );
};

export default CategoryList;
