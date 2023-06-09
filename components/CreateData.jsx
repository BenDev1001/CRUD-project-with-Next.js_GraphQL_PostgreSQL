import { TextField, Button } from "@mui/material";
import { useState } from 'react'

const CreateUser = ({ onSubmit }) => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  return (
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        variant="filled"
        color="primary"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
       <TextField
        fullWidth
        variant="filled"
        color="primary"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CreateUser;
