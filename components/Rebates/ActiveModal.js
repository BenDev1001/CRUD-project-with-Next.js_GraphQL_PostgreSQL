import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { ACTIVE_OR_INACTIVE_REBATE } from '../../crud-operations/mutations';
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

export const ActiveModal = ({open, handleClose, selectedId, isActive}) => {

  const [activeRebate] = useMutation(ACTIVE_OR_INACTIVE_REBATE, {
    onCompleted: (data) => {
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    activeRebate({
      variables: { id : selectedId, "is_active" : !isActive },
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
          {isActive ? "Inactive" : "Active"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to {isActive ? "inactive" : "active"} this rebate?
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