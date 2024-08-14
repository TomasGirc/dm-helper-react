// Todo remove after finished
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { citySize } from "../entities/types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCitys } from "src/api/citys";
import { ButtonComponent } from "../button/ButtonComponent";

type modalType = {
  title: string;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CityModals(props: modalType) {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [region, setRegion] = React.useState<string>("");
  const [size, setSize] = React.useState<citySize>("Village");
  const [population, setPopulation] = React.useState<number>(100);
  const [description, setDescription] = React.useState<string>("");

  const { mutateAsync: addCityMutation } = useMutation({
    mutationFn: addCitys,
    onSuccess: () => {
      queryClient.invalidateQueries(["citys"]);
      setOpen(false);
      setName("");
      setRegion("");
      setSize("Village");
      setPopulation(10);
      setDescription("");
    },
  });

  const addCityToTheList = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    addCityMutation({
      name: name,
      region: region,
      size: size,
      population: population,
      description: description,
    });
  };

  const handleImageChange = (event) => {
    event.prevent.deafault;
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{props.title}</Button>
      <ButtonComponent onClick={() => handleOpen}>
        {props.title}
      </ButtonComponent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          component="form"
          noValidate
          onSubmit={addCityToTheList}
          sx={{ ...style, width: 400, mt: 3 }}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New City
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
              onClick={() => {
                setOpen(false);
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Region</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <MenuItem value="Asena">Asena</MenuItem>
                    <MenuItem value="Kemet">Kemet</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-white-50 border border-gray-300 hover:border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 h-14"
                placeholder="Population"
                required={true}
                value={population}
                onChange={(e) => setPopulation(parseInt(e.target.value))}
              ></input>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="cityTypeLabel">City type</InputLabel>
                  <Select
                    labelId="cityTypeLabel"
                    id="cityType"
                    value={size}
                    label="cityType"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <MenuItem value="Village">Village</MenuItem>
                    <MenuItem value="City">City</MenuItem>
                    <MenuItem value="Capital">Capital</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={12}>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City description
              </label>
              <textarea
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-white-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe your city"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
