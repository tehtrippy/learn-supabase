import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { getUser, supabase } from "../../helpers/supabase";
import { toast } from "react-toastify";

type TodosType = {
  className?: string;
};

const Todos = ({ className }: TodosType) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState<string>("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { user } = await getUser();
        setUser(user);
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  const fetchTodos = async () => {
    try {
      if (user) {
        const { data: todos } = await supabase
          .from("todos")
          .select()
          .eq("user_id", user.id)
          .order("id", { ascending: true });
        setTodos(todos);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, [user]);

  const handleOnAddTaskClick = async () => {
    try {
      await supabase.from("todos").insert({ user_id: user.id, task });
      toast.success("Add task succesfully!");
      setTask("");
      await fetchTodos();
    } catch (err) {
      throw err;
    }
  };

  const handleOnCheckboxClick = async ({ id, is_complete }) => {
    try {
      await supabase.from("todos").update({ is_complete }).eq("id", id);
      toast.success("Update task succesfully!");
      await fetchTodos();
    } catch (err) {
      throw err;
    }
  };

  if (!user) {
    return <div />;
  }

  return (
    <div className={classNames("flex flex-col space-y-4", className)}>
      <span className="text-white font-bold text-4xl">TODO LIST</span>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="w-1/2 px-4 py-1 rounded outline-lime-500 text-xl"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button
          className="bg-lime-500 px-4 py-1 rounded text-white text-xl"
          onClick={() => handleOnAddTaskClick()}
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-col">
        {todos.map((todo, key) => {
          const { id, task, inserted_at, is_complete } = todo;
          return (
            <div
              className={`flex items-center space-x-4 text-2xl ${
                !is_complete ? "text-white" : "line-through text-red-500"
              }`}
              key={key}
            >
              <input
                checked={is_complete}
                type="checkbox"
                onChange={(e) =>
                  handleOnCheckboxClick({ id, is_complete: e.target.checked })
                }
              />
              <span>#{key + 1}</span>
              <span>{task}</span>
              <span>{new Date(inserted_at).toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
