import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Avatar,
  Box,
  Card,
  SvgIcon,
  Stack,
  TablePagination,
  Typography
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { getInitials } from '../utils/get-initials';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { DeleteModal } from './DeleteModal';


export const RebatesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleDeleteClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };


  return (
    <Card>
        <Box sx={{ minWidth: 800 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Create_at</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => {
                return (
                  <TableRow
                    hover
                    key={item.id}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                      >
                        <Avatar src={item.avatar}>
                          {getInitials(item.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {item.email}
                    </TableCell>
                    <TableCell align="center">
                      {item.address.city}, {item.address.state}, {item.address.country}
                    </TableCell>
                    <TableCell align="center">
                      {item.phone}
                    </TableCell>
                    <TableCell align="center">
                      {item.createdAt}
                    </TableCell>
                    <TableCell align="center">
                      <Stack spacing={1} direction="row">
                        <Button variant="outlined">Deactive</Button>
                        <Button variant="outlined">View</Button>
                        <Button variant="outlined">Edit</Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleDeleteClickOpen}
                        > Delete </Button>
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
        <DeleteModal open = {open} handleClose={handleDeleteClose}/>


    </Card>
  );
}

RebatesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

