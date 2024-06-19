import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import { requestItems } from "../assets/requestInfo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ChipInput from "./ChipInput";

type modalType = {
  title: string;
  modalData: (data: any) => void;
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

export default function ItemModal(props: modalType) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [rarity, setRarity] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [keywords, setKeywords] = React.useState<string>("");
  const [requirements, setRequirements] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>("");

  const addItemToTheList = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    fetch(requestItems, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        rarity: rarity,
        type: type,
        keywords: keywords,
        requirements: requirements,
        price: price,
        description: description,
      }),
    })
      .then((data) => data.json())
      .then((results) => {
        props.modalData(results);
        setOpen(false);
        setName("");
        setRarity("");
        setType("");
        setKeywords("");
        setRequirements("");
        setPrice(0);
        setDescription("");
      })
      .catch((e) => console.warn(e));
  };

  const requirementsData = (data: string) => {
    setRequirements(data);
  };
  const keywordsData = (data: string) => {
    setKeywords(data);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          component="form"
          noValidate
          onSubmit={addItemToTheList}
          sx={{ ...style, width: 400, mt: 3 }}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Item
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
                  <InputLabel id="demo-simple-select-label">Rarity</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Region"
                    value={rarity}
                    onChange={(e) => setRarity(e.target.value)}
                  >
                    <MenuItem value="Miscalenious">Miscalenious</MenuItem>
                    <MenuItem value="Common">Common</MenuItem>
                    <MenuItem value="Rare">Rare</MenuItem>
                    <MenuItem value="Legendary">Legendary</MenuItem>
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
                placeholder="Price"
                required={true}
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              ></input>
            </Grid>
            <Grid item xs={12} sm={12}>
              <ChipInput
                options={["Magic", "Nature", "Metal"]}
                name={"Keywords"}
                changeData={keywordsData}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ChipInput
                options={["Magic", "Strength", "Agility"]}
                name={"Requirements"}
                changeData={requirementsData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-type"
                name="type"
                required
                fullWidth
                id="type"
                label="Type"
                autoFocus
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Item description
              </label>
              <textarea
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-white-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe your item"
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
