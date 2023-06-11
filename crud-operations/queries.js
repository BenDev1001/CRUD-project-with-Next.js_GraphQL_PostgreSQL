import { gql } from '@apollo/client';
// import gql from 'graphql-tag';

const GET_RABATES_QUERY = gql`
  query getRabates($offset: Int, $limit: Int) {
    Rebates(offset: $offset, limit: $limit,order_by: {id: asc}) {
      id
      brand_id
      title
      description
      is_active
      Brand {
        id
        name
        code
      }
      start_date
      end_date
    }
    Rebates_aggregate {
      aggregate {
        count
      }
    }
  }
`;
const GET_BRANDS_QUERY = gql`
  query getBrands {
    Brands {
      id
      code
      is_active
      name
    }
  }
`;
const GET_BRANDS_PRODUCTS_QUERY = gql`
  query getBrandsAndProducts($offset: Int, $limit: Int) {
    Brands {
      id
      code
      is_active
      name
    }
    Products(offset: $offset, limit: $limit) {
      id
      title
      description
      sale_price
      regular_price
      brand_id
      Brand {
        id
        code
        is_active
        name
      }
    }
    Products_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_SELECTED_DATA_QUERY = gql`
  query getBrandsAndProducts($offset: Int, $limit: Int, $rebateId: Int_comparison_exp = {}) {
    Brands {
      id
      code
      is_active
      name
    }
    Products(offset: $offset, limit: $limit) {
      id
      title
      description
      sale_price
      regular_price
      brand_id
      Brand {
        id
        code
        is_active
        name
      }
    }
    Products_aggregate {
      aggregate {
        count
      }
    }
    Rebates(where: {id: $rebateId}) {
      id
      end_date
      description
      brand_id
      is_active
      start_date
      title
      Rebates_Rebate_products {
        product_id
      }
    }
  }
`;



export {
  GET_RABATES_QUERY,
  GET_BRANDS_QUERY,
  GET_BRANDS_PRODUCTS_QUERY,
  GET_SELECTED_DATA_QUERY
  
};
