import React from "react";
import { TableRow as MuiTableRow, TableCell } from "@mui/material";
import { Data } from "./TableContainer";

interface TableRowProps {
  row: Data;
}

const TableRow: React.FC<TableRowProps> = ({ row }) => {
  return (
    <MuiTableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    </MuiTableRow>
  );
};

export default TableRow;
