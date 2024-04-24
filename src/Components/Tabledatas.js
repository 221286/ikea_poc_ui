import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}



export default function BasicTable({get}) {
  
  if (!get || !get[0]) {
    console.error("'get' is null or undefined");
    return null; // or any other fallback behavior you prefer
  }

  // Extracting column headers (keys)
  const headers = Object.keys(get[0]);
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {headers?.map(header => (
              <TableCell key={header} style={{ fontWeight: 'bold', fontSize: '1.2rem' }} align="left">{header}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {get.map((row,index) => (
            <TableRow
              key={index}
              sx={{minWidth: 650}}
            >
              <TableCell align="left" >
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.content_size}</TableCell>
              <TableCell align="left">{row.created_at}</TableCell>
              <TableCell align="left">{row.content_type}</TableCell>
              <TableCell align="left">{row.last_modified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
