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
import { EditModal } from './EditModal';
import { ActiveModal } from './ActiveModal';


export const RebatesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const [openActive, setOpenActive] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [view, setViewMode] = React.useState(false);


  const handleActiveOpen = (id) => {
    setOpenActive(true);
    setSelectedId(id);
  };

  const handleActiveClose = () => {
    setOpenActive(false);
  };

  const handleDeleteOpen = (id) => {
    setOpenDelete(true);
    setSelectedId(id);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditOpen = (id, viewMode) => {
    setOpenEdit(true);
    setSelectedId(id);
    setViewMode(viewMode);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const selectedObj = items.find((item) => item.id == selectedId);
  const isActive = selectedObj?.is_active;

  return (
    <Card>
        <Box sx={{ minWidth: 800 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">StartDate</TableCell>
                  <TableCell align="center">EndDate</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item) => {
                return (
                  <TableRow
                    hover
                    key={item.id}
                  >
                    <TableCell  align="center"  style={{ width: "5%" }}>
                      {item.is_active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell align="center"  style={{ width: "10%" }}>
                      {item.Brand.name}
                    </TableCell>
                    <TableCell align="center"  style={{ width: "15%" }}>
                      {item.title}
                    </TableCell>
                    <TableCell align="center"  style={{ width: "25%" }}>
                      {item.description}
                    </TableCell>
                    <TableCell align="center"  style={{ width: "10%" }}>
                      {item.start_date}
                    </TableCell>
                    <TableCell align="center"  style={{ width: "10%" }}>
                      {item.end_date}
                    </TableCell>

                    <TableCell  style={{ width: "25%" }}>
                      <Stack spacing={2} direction="row" alignItems="center" >
                        <Button 
                          variant="outlined" 
                          color='error'
                          onClick={() => handleActiveOpen(item.id, true)}
                        >
                          {item.is_active ? "Inactive" : "Active"}
                        </Button>
                        <Button 
                          variant="outlined" 
                          onClick={() => handleEditOpen(item.id, true)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outlined" 
                          color='success' 
                          onClick={() => handleEditOpen(item.id, false)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDeleteOpen(item.id)}
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
        <ActiveModal 
        open = {openActive} 
        handleClose={handleActiveClose} 
        selectedId = {selectedId} 
        isActive = {isActive}/>
        <DeleteModal open = {openDelete} handleClose={handleDeleteClose} selectedId = {selectedId} />
        {openEdit && <EditModal open={openEdit} handleClose={handleEditClose} setIsSubmitted = {setIsSubmitted} selectedId = {selectedId} isView = {view}/>}


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

