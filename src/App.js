import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTask";
import About from "./components/About";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);

  const [isAddTask, setIsAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle reminder
  const toggleReminder = async (id) => {
    const task = await fetchTask(id);
    const updTask = { ...task, reminder: !task.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  // Add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    // const id = Math.floor(Math.random() * 10000);
    setTasks([...tasks, data]);
  };
  return (
    <Router>
      <div className="container">
        <Header
          onToggle={() => setIsAddTask(!isAddTask)}
          isAddTask={isAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {isAddTask && <AddTasks onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Task To Show"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
