import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { DELETE_REBATE } from '../../crud-operations/mutations';
import { useQuery, useMutation, gql } from '@apollo/client';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const DeleteModal = ({open, handleClose, selectedId}) => {

  const [deleteRebate] = useMutation(DELETE_REBATE, {
    onCompleted: (data) => {
      window.location.reload();
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteRebate({
      variables: { id : selectedId },
    });
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move', color:'red' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this rebate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='warning'>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}