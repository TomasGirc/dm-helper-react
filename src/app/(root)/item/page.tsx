"use client";
import * as React from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { itemType } from "src/assets/types";
import { requestItems } from "src/assets/constants/requestInfo";
import ItemModal from "src/components/ItemModal";

const proxyItem: itemType[] = [
  {
    id: 1,
    name: "The first rod",
    rarity: "Legendary",
    type: "Rod",
    keywords: ["Rod", "Magical", "Wood", "Lost"],
    requirements: ["Intelect", "Magic", "Nature"],
    price: 10000,
    description: "Test",
  },
];

function Row(props: {
  row: itemType;
  index: number;
  deleteCallback: (data: number | undefined) => void;
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={row.name} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell key={props.index + "open"}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell key={props.index + "name"} component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell key={props.index + "rarity"} align="right">
          {row.rarity}
        </TableCell>
        <TableCell key={props.index + "type"} align="right">
          {row.type}
        </TableCell>
        <TableCell key={props.index + "keywords"} align="right">
          {row.keywords}
        </TableCell>
        <TableCell key={props.index + "requirements"} align="right">
          {row.requirements}
        </TableCell>
        <TableCell key={props.index + "deletes"} align="right">
          <Button size="small" onClick={() => props.deleteCallback(row.id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow key={row.name + 1}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.description + props.index}>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Item() {
  const [loading, setLoading] = useState<boolean>(false);
  const [itemData, setItemData] = useState<itemType[]>(proxyItem);

  const fetchItems = () => {
    setLoading(false);
    fetch(requestItems, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((results) => {
        setItemData(results);
        setLoading(true);
      })
      .catch((e) => console.error("Item fetch threw error: ", e))
      .finally(() => setLoading(true));
  };

  const deleteItem = async (data: number) => {
    await fetch(`${requestItems + "/" + data}`, {
      method: "DELETE",
    }).then();
    fetchItems();
  };

  const data_from_modal = (data: itemType) => {
    setItemData([...itemData, data]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      {loading ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">rarity</TableCell>
                <TableCell align="right">type</TableCell>
                <TableCell align="right">keywords</TableCell>
                <TableCell align="right">requirements</TableCell>
                <TableCell align="right">
                  <ItemModal modalData={data_from_modal} title={"+"} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemData.map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  index={index}
                  deleteCallback={deleteItem}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
