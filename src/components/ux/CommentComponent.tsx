import { useState } from "react";
import LabelComponent from "./LabelComponent";
import { ButtonComponent } from "./ButtonComponent";
import { commentType } from "src/entities/types";
import { dateFormat } from "../helpers/DateFormat";

const CommentComponent = ({
  commentList,
  onSubmit,
}: {
  commentList: commentType[];
  onSubmit: (value: commentType) => void;
}) => {
  const [comment, setComment] = useState<string>("");

  return (
    <div className="flex flex-col justify-center bg-white  py-[12px]">
      <div className="space-y-6 my-[12px]">
        <LabelComponent text="Add comment" />
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <ButtonComponent
          onClick={() => {
            onSubmit({
              author: {
                username: "Anonymous",
                preferredName: "Preffered",
              },
              comment: comment,
              emoticon: "smile",
            });
            setComment("");
          }}
        >
          Add
        </ButtonComponent>
      </div>
      <div className="space-y-6 border-l-2 border-dashed">
        {commentList.map((value, index) => (
          <div className="relative w-full" key={index}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-6">
              <h4 className="font-bold text-blue-500">
                {value.author.username} ({value.author.preferredName})
              </h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                {value.comment}
              </p>
              {value.createdAt && (
                <span className="mt-1 block text-sm font-semibold text-blue-500">
                  {dateFormat(value.createdAt)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
