import React from "react";
import {
  Table,
  TableContainer as MuiTableContainer,
  Paper,
} from "@mui/material";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export interface Column {
  id: string;
  label: string;
  align?: "right" | "left" | "center";
}

export interface Data {
  id: number;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

interface TableContainerProps {
  columns: Column[];
  rows: Data[];
}

const TableContainer: React.FC<TableContainerProps> = ({ columns, rows }) => {
  return (
    <MuiTableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeader columns={columns} />
        <TableBody rows={rows} />
      </Table>
    </MuiTableContainer>
  );
};

export default TableContainer;
