import { cityType } from "../entities/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCitys } from "src/api/citys";
import { ButtonComponent } from "./ux/ButtonComponent";

export default function CityCard({ city }: { city: cityType }) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCitysMutation } = useMutation({
    mutationFn: deleteCitys,
    onSuccess: () => {
      queryClient.invalidateQueries(["citys"]);
    },
  });

  return (
    <>
      <div>
        <div>
          {city.size} in {city.region}
        </div>
        <div>{city.name}</div>
        <div>{city.population}</div>
        <div>{city.description}</div>
        <ButtonComponent onClick={() => deleteCitysMutation(city._id || "")}>
          Delete
        </ButtonComponent>
      </div>
    </>
  );
}
