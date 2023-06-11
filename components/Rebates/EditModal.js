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
import { GET_SELECTED_DATA_QUERY } from '../../crud-operations/queries';
import { UPDATE_REBATE_WITH_PRODUCTS } from '../../crud-operations/mutations';
import { Stack } from '@mui/material';
import { ProductsTable } from './ProductsTable';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const EditModal = ({open, handleClose, setIsSubmitted, selectedId, isView}) => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setCheckedIds] = useState([]);
    const [submitClicked, setSubmitClicked] = useState(false);
    console.log("selectedId in edit modal", selectedId)


    const [editFormstate, setEditFormState] = useState({
        'id' : '',
        "title": '',
        "is_active": false,
        "brand_id" : 1,
        "description": '',
        "start_date": new Date(),
        "end_date": new Date(),
        "object": [],
    });
    
    const { loading, error, data, refetch } = useQuery(GET_SELECTED_DATA_QUERY,{
            skip:!open,
            variables: {
                offset: page * rowsPerPage,
                limit: rowsPerPage,
                rebateId : {
                    "_eq" : selectedId
                }
            },
    });

    const totalRebateCounts = data?.Products_aggregate?.aggregate?.count;


    
    const setFormDataToInput = async (data) => {
        const selectedRebateData = data?.Rebates[0];
        await setEditFormState({
            "id" : selectedRebateData?.id,
            "title": selectedRebateData?.title,
            "is_active": selectedRebateData?.is_active,
            "brand_id" : selectedRebateData?.brand_id,
            "description": selectedRebateData?.description,
            "start_date": selectedRebateData?.start_date,
            "end_date": selectedRebateData?.end_date,
            "object": []
        });
        const checkProductsIds = selectedRebateData?.Rebates_Rebate_products?.map(item => item.product_id);
        await setCheckedIds(checkProductsIds);
        console.log("selected in open edit modal", selectedRebateData)
    }
    console.log("after checking selected", selected)

    useEffect(() => {
        if (!loading && data) {
            setFormDataToInput(data);
        }
    }, [loading, data]);


    // Pagination handlers
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleFormValueChange = (event) => {
        setEditFormState({
            ...editFormstate,
            [event.target.name]: event.target.value
        });
    };

    const handleActiveChange = (event) => {
        setEditFormState({
            ...editFormstate,
            [event.target.name] : event.target.checked
        })
    }

    const [updateRebateWithProducts] = useMutation(UPDATE_REBATE_WITH_PRODUCTS, {
        onCompleted : (data) => {
            refetch();
        }
    });

    const handleSubmit = async () => {
        await setSubmitClicked(true);
        const dataObjectArray = await selected.map((item) => {
            return { rebate_id : editFormstate.id, product_id: item };
        });
        console.log("dataObjectArray", dataObjectArray);


        // await setEditFormState({
        //     "id" : editFormstate.id,
        //     "title": editFormstate.title,
        //     "is_active": editFormstate.is_active,
        //     "brand_id" : editFormstate.brand_id,
        //     "description": editFormstate.description,
        //     "start_date": editFormstate.start_date,
        //     "end_date": editFormstate.end_date,
        //     "object": dataObjectArray
        // });
        console.log("editFormstate", editFormstate)

        const { returnData } = await updateRebateWithProducts({
            variables: {
                "id" : editFormstate.id,
                "title": editFormstate.title,
                "is_active": editFormstate.is_active,
                "brand_id" : editFormstate.brand_id,
                "description": editFormstate.description,
                "start_date": editFormstate.start_date,
                "end_date": editFormstate.end_date,
                "object": dataObjectArray
            }
        });
        await handleClose();
        await setIsSubmitted(true);
    };

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
        onClose={handleClose}
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
                        <FormControlLabel control={<Switch checked={editFormstate.is_active} onChange={handleActiveChange} name="is_active" color="secondary" />} label="Active" />
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
                            value={editFormstate.brand_id}
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
                        value = {editFormstate.title}
                        required
                        />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        onChange={handleFormValueChange}
                        value = {editFormstate.description}
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
                        value={editFormstate.start_date}
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
                        value={editFormstate.end_date}
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
            { isView ? <Button onClick={handleClose}>Confirm</Button> : <Button onClick={handleSubmit} variant='contained'>Save</Button> }
            <Button onClick={handleClose}>Cancel</Button> 
            
        </DialogActions>

        </Dialog>
    </div>
    );
}