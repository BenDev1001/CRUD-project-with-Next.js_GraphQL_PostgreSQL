import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Card,
  Checkbox,
  Stack,
  TablePagination
} from '@mui/material';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';


export const ProductsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setCheckedIds = () => {}
  } = props;



  const handleCheckboxClick = (id) => {
    if (selected.includes(id)) {
      setCheckedIds(selected.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedIds([...selected, id]);
    }
  };


  return (
    <Card>
        <Box sx={{ minWidth: 800 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Reg.Price/Sale</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.Products?.map((item) => {
                    return (
                    <TableRow
                        hover
                        key={item.id}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={selected.includes(item.id)}
                                onClick={() => handleCheckboxClick(item.id)}
                            />
                        </TableCell>
                        <TableCell  align="center">
                        {item.title}
                        </TableCell>
                        <TableCell align="center">
                        {item.Brand.name}
                        </TableCell>
                        <TableCell align="center">
                        {item.description}
                        </TableCell>
                        <TableCell align="center">
                            <Stack spacing={1} direction="column">
                                <div>{item.regular_price}</div>
                                <div>{item.sale_price}</div>
                            </Stack>
                        </TableCell>
                    </TableRow>
                    );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />


    </Card>
  );
}

ProductsTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
};

