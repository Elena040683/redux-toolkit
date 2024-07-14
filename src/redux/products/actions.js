import { createAction } from "@reduxjs/toolkit";

export const addProduct = createAction('product/add');
export const deleteProduct = createAction('product/delete');
export const filterValue = createAction('filter/value');


// export const addProduct = (product) => ({
//   type: 'product/add',
//   payload: product,
// });

// export const deleteProduct = (id) => ({
//   type: 'product/delete',
//   payload: id,
// });

// export const filterValue = value => ({
//   type: 'filter/value',
//   payload: value,
// });

