import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListItemButtonComponent from "./ListItemButtonComponent";

export const mainListItems = (
  <>
    <ListItemButtonComponent
      icon={<DashboardIcon />}
      link={"/"}
      text={"Home"}
    />
    <ListItemButtonComponent
      icon={<ShoppingCartIcon />}
      link={"/city"}
      text={"Cities"}
    />
    <ListItemButtonComponent
      icon={<BarChartIcon />}
      link={"/character"}
      text={"Character"}
    />
    <ListItemButtonComponent
      icon={<LayersIcon />}
      link={"/item"}
      text={"Items"}
    />
    <ListItemButtonComponent
      icon={<PeopleIcon />}
      link={"/test"}
      text={"Testable components"}
    />
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButtonComponent
      icon={<AssignmentIcon />}
      link={"/"}
      text={"Current month"}
    />
  </>
);
