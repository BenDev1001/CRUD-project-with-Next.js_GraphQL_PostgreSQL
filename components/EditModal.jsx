import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const EditModal = ({ onSubmit, onClose, isOpen }) => (
  <Dialog open={isOpen} onClose={onClose} aria-labelledby="dialog-title">
    <DialogTitle id="dialog-title">Edit Users</DialogTitle>
    <form onSubmit={onSubmit}>
      <DialogContent>
        <TextField autoFocus margin="dense" fullWidth name="name" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default EditModal;