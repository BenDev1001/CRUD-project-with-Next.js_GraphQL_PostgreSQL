// import { gql } from '@apollo/client';
import gql from 'graphql-tag';


///////////////////////////////////////////////////////////////////

const DELETE_REBATE = gql`
    mutation DeleteRebate($id: Int!) {
        delete_Rebates_by_pk(id: $id) {
            id
        }
    }
 
`;

const ACTIVE_OR_INACTIVE_REBATE = gql`
    mutation ActiveOrInactive($id: Int!, $is_active: Boolean) {
        update_Rebates_by_pk(pk_columns: {id: $id}, _set: {is_active: $is_active}) {
            id
            is_active
        }
    }
  
 
`;

const INSERT_REBATE_WITH_PRODUCTS = gql`
    mutation InsertRebate($brand_id: Int, $description: String, $end_date: date, $is_active: Boolean!, $start_date: date, $title: String, $data: [Rebate_products_insert_input!]!) {
        insert_Rebates(objects: {is_active: $is_active, end_date: $end_date, description: $description, brand_id: $brand_id,  start_date: $start_date, title: $title, Rebates_Rebate_products: {data: $data}}, on_conflict: {constraint: Rebates_pkey, update_columns: id}) {
            returning {
                id
            }
        }
    }
`;

const UPDATE_REBATE_WITH_PRODUCTS = gql`
    mutation UpdateRebate($id: Int!, $brand_id: Int, $description: String, $end_date: date, $is_active: Boolean, $start_date: date, $title: String, $object: [Rebate_products_insert_input!]!) {
        update_Rebates_by_pk(pk_columns: {id: $id}, _set: {brand_id: $brand_id, description: $description, end_date: $end_date, is_active: $is_active, start_date: $start_date, title: $title}) {
            brand_id
            description
            end_date
            id
            is_active
            start_date
            title
        }
        delete_Rebate_products(where: {rebate_id: {_eq: $id}}) {
            affected_rows
        }
        insert_Rebate_products(objects: $object) {
            affected_rows
        }
    }
    
  
`;



export {
   ACTIVE_OR_INACTIVE_REBATE,
   DELETE_REBATE,
   INSERT_REBATE_WITH_PRODUCTS,
   UPDATE_REBATE_WITH_PRODUCTS
};
