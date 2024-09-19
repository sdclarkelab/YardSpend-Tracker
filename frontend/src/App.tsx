import React from "react";
import TableContainer, { Column, Data } from "./components/TableContainer";

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return { id, name, calories, fat, carbs, protein };
}

const columns: Column[] = [
  { id: "name", label: "Dessert (100g serving)" },
  { id: "calories", label: "Calories", align: "right" },
  { id: "fat", label: "Fat (g)", align: "right" },
  { id: "carbs", label: "Carbs (g)", align: "right" },
  { id: "protein", label: "Protein (g)", align: "right" },
];

const rows: Data[] = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Cupcake", 305, 3.7, 67, 4.3),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
];

const App: React.FC = () => {
  return (
    <div>
      <TableContainer columns={columns} rows={rows} />
    </div>
  );
};

export default App;
