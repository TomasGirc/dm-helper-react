"use client";

import { Box, Divider, Grid } from "@mui/material";
import ModalInventory from "src/components/ModalInventory";
import TableOfItems from "src/components/TableOfItems";

export default function Character() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12} display={{ xs: "none", lg: "block" }}>
            <Box
              component="img"
              sx={{
                height: 400,
                width: 350,
              }}
              alt="The house from the offer."
              src="https://pics.craiyon.com/2023-09-19/b0c73c52f77c473d8aab161b6f873938.webp"
            />
          </Grid>
          <Grid container item lg={6} xs={12} spacing={2}>
            <Grid item lg={6} xs={12}>
              Name
            </Grid>
            <Grid item lg={6} xs={12}>
              Class
            </Grid>
            <Grid item lg={6} xs={12}>
              Health
            </Grid>
            <Grid item lg={6} xs={12}>
              Stamina
            </Grid>
          </Grid>
        </Grid>
        <Divider>Inventory</Divider>
        <Grid container spacing={2}>
          <Grid item lg={4} sm={12} xs={12}>
            <Divider>Equipment</Divider>
            <Grid container spacing={3}>
              <Grid item lg={4} xs={4}></Grid>
              <Grid item lg={4} xs={4}>
                <Box
                  component="img"
                  sx={{
                    height: 100,
                    width: 100,
                  }}
                  alt="Helm"
                  src="https://www.english-heritageshop.org.uk/media/catalog/product/cache/a3b225711045be8da804c8f77b8471be/c/l/close-helm_2.jpg"
                />
              </Grid>
              <Grid item lg={4} xs={4}></Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid container spacing={1} item lg={4} xs={4}>
                <Grid item lg={12} xs={12}>
                  <Box
                    component="img"
                    sx={{
                      height: 100,
                      width: 100,
                    }}
                    alt="ArmL"
                    src="https://media.istockphoto.com/id/1358237005/photo/medieval-sword-isolated-on-white-with-clipping-path.jpg?s=612x612&w=0&k=20&c=F-F2WN5_CBDM9T4ZvJPEZbmwdK-zOz2YtnhXX3VKOGI="
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} item lg={4} xs={4}>
                <Grid item lg={12} xs={12}>
                  <Box
                    component="img"
                    sx={{
                      height: 100,
                      width: 100,
                    }}
                    alt="Armor"
                    src="https://st3.depositphotos.com/8517310/12519/i/450/depositphotos_125193114-stock-photo-armor-3d-illustration-isolated.jpg"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} item lg={4} xs={4}>
                <Grid item lg={12} xs={12}>
                  <Box
                    component="img"
                    sx={{
                      height: 100,
                      width: 100,
                    }}
                    alt="ArmL"
                    src="https://media.istockphoto.com/id/1180956293/photo/steel-medieval-shield-metallic-shield-isolated-on-white-background-3d-rendering.jpg?s=612x612&w=0&k=20&c=yx5RS8je_6A559wE8bK0VPiylyo41AeG7Bzli0i44RM="
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid container spacing={1} item lg={4} xs={4}></Grid>
              <Grid container spacing={1} item lg={4} xs={4}>
                <Grid item lg={12} xs={12}>
                  <Grid item lg={12} xs={12}>
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 100,
                      }}
                      alt="Leggings"
                      src="https://www.medievalware.com/wp-content/uploads/2021/03/dragon-leg-guards-1-600x600.png"
                    />
                  </Grid>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Box
                    component="img"
                    sx={{
                      height: 100,
                      width: 100,
                    }}
                    alt="Boots"
                    src="https://st3.depositphotos.com/8517310/14151/i/1600/depositphotos_141518896-stock-photo-iron-fantasy-high-boots-knight.jpg"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} item lg={4} xs={4}></Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} sm={12} xs={12}>
            <Divider>Backpack</Divider>
            <TableOfItems />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <ModalInventory content={<TableOfItems />}></ModalInventory>
      </Grid>
    </Grid>
  );
}
