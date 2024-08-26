"use client";
import * as React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem, fetchItems } from "src/api/items";
import ItemModal from "src/components/modal/ItemModal";
import ModalComponent from "src/components/modal/ModalComponent";
import { useState } from "react";

const ItemTableComponent = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data: items, isLoading } = useQuery({
    queryFn: () => fetchItems(),
    queryKey: ["items"],
  });

  const { mutateAsync: deleteItemMutation } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });

  const [expandedRows, setExpandedRows] = useState(null);

  // expand table row
  const handleExpandRow = (userId) => {
    let currentExpandedRows = null;
    const isRowExpanded = currentExpandedRows === userId ? userId : null;
    const newExpandedRows = isRowExpanded
      ? null
      : (currentExpandedRows = userId);
    if (expandedRows !== userId) {
      setExpandedRows(newExpandedRows);
    } else {
      setExpandedRows(null);
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="table-rows">
              Name
            </th>
            <th scope="col" className="table-rows">
              Rarity
            </th>
            <th scope="col" className="table-rows">
              Type
            </th>
            <th scope="col" className="table-rows">
              Price
            </th>
            <th scope="col" className="table-rows max-w-[24px]">
              <div className="flex justify-end">
                <ModalComponent
                  title="+"
                  colorBg="bg-blue-500"
                  colorTxt="text-white"
                  modalState={showModal}
                  setShowModal={setShowModal}
                  content={<ItemModal setShowModal={setShowModal}></ItemModal>}
                />
              </div>
            </th>
          </tr>
        </thead>

        {items?.sort().map((item, index) => (
          <tbody
            className="cursor-pointer"
            key={"body" + index}
            onClick={() => handleExpandRow(index)}
          >
            <tr
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              key={"table" + index}
            >
              <th
                scope="row"
                className="table-rows table-border font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <p>{item.name}</p>
              </th>
              <td className="table-rows table-border">
                <p>{item.rarity}</p>
              </td>
              <td className="table-rows table-border">
                <p>{item.type}</p>
              </td>
              <td className="table-rows table-border ">
                <p>{item.price}</p>
              </td>
              <td className="table-rows table-border w-[24px]">
                <div className="flex justify-end">
                  <p
                    className="font-medium  text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => deleteItemMutation(item._id || "")}
                  >
                    Delete/Edit
                  </p>
                </div>
              </td>
            </tr>
            {expandedRows === index && (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                key={"table" + index + "expand"}
              >
                <td colSpan={6} className="table-rows table-border">
                  Description {item.description}
                </td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
    </>
  );
};

export default ItemTableComponent;
