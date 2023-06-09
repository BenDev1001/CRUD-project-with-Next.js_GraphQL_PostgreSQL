import { useQuery } from '@apollo/client';
import { GET_USERS } from '../crud-operations/queries';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)`
  margin: 15px 0;
`;

const View = ({ name, id, onDelete, openModal }) => {
  return (
    <StyledCard>

      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>

      <CardActions>
        <Button onClick={() => openModal(id)} size="small" color="primary">
          Edit
        </Button>
        <Button onClick={() => onDelete(id)} size="small" color="primary">
          Delete
        </Button>
      </CardActions>

    </StyledCard>
  );
};

const ViewUsers = ({ onDelete, openModal }) => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) {
    return 'loading';
  }
  if (error) {
    return 'error';
  }

  return data.getUsers.map((user) => (
    <View
      openModal={openModal}
      onDelete={onDelete}
      {...user}
      key={user.id}
    />
  ));
};

export default ViewUsers;
