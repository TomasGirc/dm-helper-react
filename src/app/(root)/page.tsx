"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTodo, fetchTodos } from "src/api/todo";

import ModalComponent from "src/components/modal/ModalComponent";
import TodoCard from "src/components/todo/TodoCard";
import { ButtonComponent } from "src/components/ux/ButtonComponent";

export default function Page() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ["todos"],
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
      <ModalComponent
        title="Modal"
        colorBg="bg-blue-500"
        colorTxt="text-white"
        modalState={showModal}
        setShowModal={setShowModal}
        content={
          <>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <ButtonComponent onClick={() => setShowModal(false)}>
                Close
              </ButtonComponent>
            </div>
          </>
        }
      />
      <br />
      <br />
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
