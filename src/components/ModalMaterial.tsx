import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { citySize, cityType } from "../assets/types";
import { requestAddressCity } from "../assets/requestInfo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

type modalType = {
  title: string;
  citydata: (data: cityType) => void;
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

export default function MaterialModal(props: modalType) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [region, setRegion] = React.useState<string>("");
  const [size, setSize] = React.useState<citySize>("Village");
  const [population, setPopulation] = React.useState<number>(10);
  const [description, setDescription] = React.useState<string>("");

  const addCityToTheList = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    fetch(requestAddressCity, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        region: region,
        size: size,
        population: population,
        description: description,
      }),
    })
      .then((data) => data.json())
      .then((results) => {
        props.citydata(results);
        setOpen(false);
        setName("");
        setRegion("");
        setSize("Village");
        setPopulation(10);
        setDescription("");
      })
      .catch((e) => console.warn(e));
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
          onSubmit={addCityToTheList}
          sx={{ ...style, width: 400, mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
                    value={region}
                    label="Region"
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <MenuItem value="Asena">Asena</MenuItem>
                    <MenuItem value="Kemet">Kemet</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* <Select
                labelId="region"
                id="region"
                value={region}
                label="Region"
                onChange={(e) => setRegion(e.target.value)}
              >
                <MenuItem value="Asena">Asena</MenuItem>
                <MenuItem value="Kemet">Kemet</MenuItem>
              </Select> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
