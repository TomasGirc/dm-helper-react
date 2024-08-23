// import the dependencies
import { MarkerComponentProps } from "react-image-marker";

export const CustomMarker = (props: MarkerComponentProps) => {
  return (
    <>
      <div className="flex">
        <span
          className="h-[25px] w-[25px] bg-black text-white rounded-full inline-block text-center"
          onClick={() => alert(props.status)}
        >
          {props.itemNumber.toString()}
        </span>
        <h1 className="text-black ml-[5px]">Vardas</h1>
      </div>
    </>
  );
};
