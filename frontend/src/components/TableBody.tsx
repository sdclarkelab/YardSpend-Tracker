import React from "react";
import { TableBody as MuiTableBody } from "@mui/material";
import TableRow from "./TableRow";
import { Data } from "./TableContainer";

interface TableBodyProps {
  rows: Data[];
}

const TableBody: React.FC<TableBodyProps> = ({ rows }) => {
  return (
    <MuiTableBody>
      {rows.map((row) => (
        <TableRow key={row.id} row={row} />
      ))}
    </MuiTableBody>
  );
};

export default TableBody;
