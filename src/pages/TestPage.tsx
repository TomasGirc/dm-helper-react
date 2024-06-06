import { useState } from "react";
import HomePage from "./HomePage";

export default function TestPage() {
  const [likeList, setLikeList] = useState("");
  const renderLikeList = () => {
    return <HomePage></HomePage>;
  };
  const handleLeave = () => {
    return setLikeList("");
  };
  const handleHover = () => {
    return setLikeList(renderLikeList);
  };
  return (
    <div className="likes__wrapper">
      <div
        className="likes__relavance"
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
      >
        Hover me
        {likeList}
      </div>
    </div>
  );
}
