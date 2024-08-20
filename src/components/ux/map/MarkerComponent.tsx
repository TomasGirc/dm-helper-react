// import the dependencies
import { MarkerComponentProps } from "react-image-marker";

export const CustomMarker = (props: MarkerComponentProps) => {
  return (
    <>
      <span
        className="h-[25px] w-[25px] bg-sky-500 rounded-full inline-block text-center"
        onClick={() => alert(props.status)}
      >
        {props.itemNumber.toString()}
      </span>
    </>
  );
};
