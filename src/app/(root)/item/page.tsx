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
import ItemModal from "src/components/ItemModal";
import { itemType } from "src/entities/types";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteItem, fetchItems } from "src/api/items";

function Row(props: {
  row: itemType;
  index: number;
  deleteCallback: UseMutateAsyncFunction<void, Error, string, unknown>;
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
          {row.keywords.map((value, index) => {
            return <div key={index}>{value.name}</div>;
          })}
        </TableCell>
        <TableCell key={props.index + "requirements"} align="right">
          {row.requirements &&
            row.requirements.map((value, index) => {
              return <div key={index}>{value.name}</div>;
            })}
        </TableCell>
        <TableCell key={props.index + "deletes"} align="right">
          <Button
            size="small"
            onClick={() => props.deleteCallback(row._id || "")}
          >
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
  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryFn: () => fetchItems(),
    queryKey: ["items"],
    staleTime: Infinity, //do not refresh data
  });

  const { mutateAsync: deleteItemMutation } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
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
                <ItemModal title={"+"} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((row, index) => (
              <Row
                key={index}
                row={row}
                index={index}
                deleteCallback={deleteItemMutation}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
