import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../layouts/tasksForm";
import AddCategoryForm from "../layouts/categoryForm";
import { useRouter } from "next/navigation";

const Tasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      const endpoint =
        selectedCategory === ""
          ? `${process.env.NEXT_PUBLIC_API_URL}/tasks`
          : `${process.env.NEXT_PUBLIC_API_URL}/tasks/category/${selectedCategory}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.data);
    } catch (error: any) {
      setError(
        "Failed to fetch tasks. " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/completed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompletedTasks(response.data.data);
    } catch (error: any) {
      setError(
        "Failed to fetch completed tasks. " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    }
  };

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

  useEffect(() => {
    fetchCategories();
    fetchTasks();
    fetchCompletedTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedCategory]);

  const handleEdit = (task: any) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchTasks();
    fetchCompletedTasks();
  };

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    router.push("/auth/login");
  };

  const handleSelesai = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          isCompleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Task completed successfully.");
      fetchTasks();
      fetchCompletedTasks();
    } catch (error: any) {
      setError(
        "Failed to complete task. " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    }
  };

  const handleBatalkan = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          isCompleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Task uncompleted successfully.");
      fetchTasks();
      fetchCompletedTasks();
    } catch (error: any) {
      setError(
        "Failed to uncomplete task. " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Task deleted successfully.");
      fetchTasks();
      fetchCompletedTasks();
    } catch (error: any) {
      setError(
        "Failed to delete task. " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    }
  };

  const handleCategoryFormSuccess = () => {
    setShowCategoryForm(false);
    fetchCategories();
  };

  const toggleDescription = (id: number) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const navigateToCategoryList = () => {
    router.push("/categories");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Daily Tasks</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setTaskToEdit(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
          <button
            onClick={() => setShowCategoryForm(true)}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Add Category
          </button>
          <button
            onClick={navigateToCategoryList}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            View Category List
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="categoryFilter"
          className="block text-gray-700 font-medium mb-2"
        >
          Filter by Category
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 transition"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Pending Tasks
      </h2>
      <ul className="space-y-4 mb-8">
        {tasks
          .filter((task) => !task.isCompleted)
          .map((task) => (
            <li
              key={task.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
              onClick={() => toggleDescription(task.id)}
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-900">
                  <span className="text-lg font-semibold">{task.title}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleSelesai(task.id)}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {expandedTaskId === task.id && (
                <p className="mt-2 text-gray-600">{task.description}</p>
              )}
            </li>
          ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Completed Tasks
      </h2>
      <ul className="space-y-4">
        {completedTasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
            onClick={() => toggleDescription(task.id)}
          >
            <div className="flex items-center justify-between">
              <div className="text-gray-900">
                <span className="text-lg font-semibold">{task.title}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBatalkan(task.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
            {expandedTaskId === task.id && (
              <p className="mt-2 text-gray-600">{task.description}</p>
            )}
          </li>
        ))}
      </ul>
      {showForm && (
        <TaskForm
          onSuccess={handleFormSuccess}
          onClose={() => setShowForm(false)}
          taskToEdit={taskToEdit}
        />
      )}
      {showCategoryForm && (
        <AddCategoryForm
          onSuccess={handleCategoryFormSuccess}
          onClose={() => setShowCategoryForm(false)}
        />
      )}
    </div>
  );
};

export default Tasks;
