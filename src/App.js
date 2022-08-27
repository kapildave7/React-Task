import "./App.css";
import data from "./data.json";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


function App() {
  function getMappedData(data) {
    const mappedData = [...data];
    mappedData.map((element) => {
      element["level"] = 0;
      element["total_staked"] = 0;
      if (element.pools && element.pools.length > 0) {
        element["level"] = element.pools.length;
        element.pools.forEach(
          (pool) => (element.total_staked += pool.staked_amount)
        );
      }
      if (element.deep_childrens.length > 0) {
        element.level = element["level"] + element.deep_childrens.length;
        if (
          element.deep_childrens.pools &&
          element.deep_childrens.pools.length > 0
        ) {
          element.deep_childrens.pools.forEach(
            (pool) => (element.total_staked += pool.staked_amount)
          );
        }
      }
      element["total_staked"] = parseFloat(
        element["total_staked"].toString()
      ).toFixed(2);
      return element;
    });
    return mappedData;
  }

  console.log(getMappedData(data));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell align="right">Deep Childrens</StyledTableCell>
            <StyledTableCell align="right">Level</StyledTableCell>
            <StyledTableCell align="right">Parent Address</StyledTableCell>
            <StyledTableCell align="right">Pools</StyledTableCell>
            <StyledTableCell align="right">Total Childs</StyledTableCell>
            <StyledTableCell align="right">Total Staked</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row?.address}>
              <StyledTableCell component="th" scope="row">
                {row.address}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.deep_childrens.length}
              </StyledTableCell>
              <StyledTableCell align="right">{row.level}</StyledTableCell>
              <StyledTableCell align="right">
                {row.parent_address}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.pools.length}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.total_childs}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.total_staked}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
}

export default App;
