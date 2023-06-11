import * as React from 'react';

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_BRANDS_PRODUCTS_QUERY } from '../../crud-operations/queries';
import {  INSERT_REBATE_WITH_PRODUCTS } from '../../crud-operations/mutations';
import { Stack } from '@mui/material';
import { ProductsTable } from './ProductsTable';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const AddModal = ({open, handleClose, setIsSubmitted}) => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setCheckedIds] = useState([]);
    
    const { loading, error, data, refetch } = useQuery(GET_BRANDS_PRODUCTS_QUERY,{
            variables: {
                offset: page * rowsPerPage,
                limit: rowsPerPage
            },
    });

    const totalRebateCounts = data?.Products_aggregate?.aggregate?.count;
    console.log("after add modal seleced", selected);

    // Pagination handlers
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const [formstate, setFormState] = useState({
        "title": '',
        "is_active": false,
        "brand_id" : 1,
        "description": '',
        "start_date": new Date(),
        "end_date": new Date(),
        "data": [],
    });

    const handleFormValueChange = (event) => {
        setFormState({
            ...formstate,
            [event.target.name]: event.target.value
        });
    };

    const handleActiveChange = (event) => {
        setFormState({
            ...formstate,
            [event.target.name] : event.target.checked
        })
    }

    const [insertRebateWithProducts] = useMutation(INSERT_REBATE_WITH_PRODUCTS, {
        onCompleted : () => {
            refetch();
            // setCheckedIds([]);
            handleCloseModal();
            console.log("after saving selected",selected)
        }
    });

    const handleSubmit = async () => {
        const dataObjectArray = await selected.map((item) => {
            return { product_id: item };
          });
        const { returnData } = await insertRebateWithProducts({
            variables: {
                "title": formstate.title,
                "is_active": formstate.is_active,
                "brand_id" : formstate.brand_id,
                "description": formstate.description,
                "start_date": formstate.start_date,
                "end_date": formstate.end_date,
                "data": dataObjectArray
            }

        });
        await handleClose();
        await setIsSubmitted(true);
    };

    const handleCloseModal = () => {
        handleClose();
        setCheckedIds([]);
        setFormState({
            "title": '',
            "is_active": false,
            "brand_id" : 1,
            "description": '',
            "start_date": new Date(),
            "end_date": new Date(),
            "data": [],
        })
    }

    if (loading) {
        return 'loading';
    }
    if (error) {
        return 'error';
    }
    
    
    return (
    <div>
        <Dialog
        open={open}
        maxWidth = "md"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>{"Modal"}</DialogTitle>
        <DialogContent>
            <Grid
                fullWidth
                container
                spacing={3}
            >
                <FormControl fullWidth>
                    <Grid xs={12} md={12}>
                        <FormControlLabel control={<Switch checked={formstate.is_active} onChange={handleActiveChange} name="is_active" color="secondary" />} label="Active" />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                            fullWidth
                            label="Brand"
                            name="brand_id"
                            onChange={handleFormValueChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={formstate.brand_id}
                            >
                            {data?.Brands?.map((option) => (
                                <option
                                key={option.id}
                                value={option.id}
                                >
                                {option.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        label="Promotion Title"
                        name="title"
                        onChange={handleFormValueChange}
                        value = {formstate.title}
                        required
                        />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        onChange={handleFormValueChange}
                        value = {formstate.description}
                        required
                        />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        type='date'
                        label="Start Date"
                        name="start_date"
                        onChange={handleFormValueChange}
                        value={formstate.start_date}
                        required
                        />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        type='date'
                        label="End Date"
                        name="end_date"
                        onChange={handleFormValueChange}
                        value={formstate.end_date}
                        required
                        />
                    </Grid>
                        <p>Select Products</p>

                    <Grid xs={12} md={12} >
                        <Stack spacing={2} direction="row" justifyContent="space-between" >
                            <Stack>
                                <FormControlLabel control={<Switch defaultChecked />} label="Use All Products" />
                            </Stack>
                            <Stack spacing={2} direction="row" justifyContent="space-between">
                                <Button variant="contained" alignitems="right">Filter</Button>
                                <Button variant="contained" alignitems="right">Import</Button>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid xs={12} md={12}>
                        <ProductsTable
                            count={totalRebateCounts}
                            items={data}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setCheckedIds = {setCheckedIds}
                            selected={selected}
                        />
                    </Grid>

                </FormControl>
            </Grid>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleSubmit} variant='contained'>Save</Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>

        </Dialog>
    </div>
    );
}