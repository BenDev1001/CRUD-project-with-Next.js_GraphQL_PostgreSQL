import Head from 'next/head';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../crud-operations/mutations';
import Container from '@mui/material/Container';
import EditModal from '../components/EditModal';
import ViewUsers from '../components/ViewData';
import CreateUser from '../components/CreateData';
import { Rebates } from '../components/Rebates/Rebates';
import { styled } from '@mui/material/styles';

const Home = () => {

  const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
  });

  return (
    <LayoutContainer>
        <Head>
          <title>
            CRUD APPLICATION WITH NEXTJS-GRAPHQL-MATERIAL UI-POSTGRESQL
          </title>
        </Head>
        <Rebates/>
    </LayoutContainer>

  );
}


export default Home;
