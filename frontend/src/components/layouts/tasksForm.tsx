import { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ onClose, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
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
        setError(
          "Failed to fetch categories. " +
            (error.response?.data?.message || error.message)
        );
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setCategoryId(taskToEdit.categoryId || "");
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      const payload = {
        title,
        description,
        categoryId: categoryId || null,
      };

      if (taskToEdit) {
        // Update existing task
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToEdit.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage("Task updated successfully.");
      } else {
        // Create new task
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMessage("Task added successfully.");
      }

      onClose();
    } catch (error: any) {
      setError(
        "Failed to submit task. " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
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
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Task Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={categoryId || ""}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
              {taskToEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
