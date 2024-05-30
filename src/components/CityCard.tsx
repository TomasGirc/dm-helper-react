import { cityType } from "../assets/types";

export default function CityCard(props: { city: cityType }) {
  return (
    <div
      key={props.city.name}
      className="border-2 border-solid rounded border-rose-600 h-64"
    >
      <p className="font-extrabold">{props.city.name}</p>
      <p className="font-extrabold">{props.city.region}</p>
      <p className="font-extrabold">{props.city.size}</p>
      <p className="font-extrabold">{props.city.population}</p>
      <p className="font-extrabold">{props.city.description}</p>
    </div>
  );
}
