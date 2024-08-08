"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTodo, fetchTodos } from "src/api/todo";
import ModalComponent from "src/components/modal/ModalComponent";
import TodoCard from "src/components/todo/TodoCard";

export default function Page() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(search),
    queryKey: ["todos", { search }],
    staleTime: Infinity, //do not refresh data
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ModalComponent title="Modal" />
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={async () => {
            try {
              await addTodoMutation({ title });
              setTitle("");
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Add Todo
        </button>
      </div>
      {todos?.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} />;
      })}
    </>
  );
}
