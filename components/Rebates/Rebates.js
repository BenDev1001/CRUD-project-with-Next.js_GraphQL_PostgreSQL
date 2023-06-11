import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { RebatesTable } from './RebatesTable';
import { RebatesSearch } from './RebatesSearch';
import { AddModal } from './AddModal';
import { useQuery, gql, useMutation, useSubscription } from '@apollo/client';
import { GET_RABATES_QUERY, GET_RABATES_QUERY_SUBSCRIPTION } from '../../crud-operations/queries';

const now = new Date();

export const Rebates = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_RABATES_QUERY,{
    skip:isSubmitted,
    variables: {
      offset: page * rowsPerPage,
      limit: rowsPerPage
    },
  });

  const RebatesData = data?.Rebates;
  const totalRebateCounts = data?.Rebates_aggregate?.aggregate?.count;

  useEffect(() => {
    if(isSubmitted){
      refetch();
      setIsSubmitted(false);
    }
  },[isSubmitted, refetch])
  
  // Pagination handlers
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  
  const handleAddOpen = () => {
    setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
  };

  if (loading) {
    return 'loading';
  }
  if (error) {
    return 'error';
  }

  return (
    <>
      <Head>
        <title>
          Customers | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Rebates
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddOpen}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <RebatesSearch />
            <RebatesTable
              count={totalRebateCounts}
              items={RebatesData}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
            <AddModal open={open} handleClose={handleAddClose} setIsSubmitted = {setIsSubmitted}/>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

