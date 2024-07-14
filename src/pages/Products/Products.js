import { useState, useMemo, useCallback } from 'react';

import Form from '../../components/Forms/Form';
import {Modal} from '../../components/Modal/Modal';
import ProductList from '../../components/Products/ProductsList';
import { SolidTitle } from '../../components/Title/SolidTitle';

import { useToggle } from '../../hooks/useToggle';
import {useLS} from '../../hooks/useLS';
// === REDUX ===
import {useDispatch} from 'react-redux';
import { filterValue } from '../../redux/products/actions';

export default function ProductsPage () {
  const [allProducts, setAllProducts] = useLS('products', []);
  const [showModal, setShowModal] = useToggle(false);
  const [filter, setFilter] = useState('');

  const filteredProducts = useMemo(() =>{
    let normFilter = filter.toLowerCase();
    return allProducts.filter(prod => 
      prod.title.toLowerCase().includes(normFilter));
  }, [filter, allProducts])

  console.log(filteredProducts);

  // ===== REDUX ==== //
  const dispatch = useDispatch();
  // ===== REDUX ==== //


  //const addNewProduct = obj => setAllProducts((zuzuzu) => [...zuzuzu, obj]);
  //const deleteProduct = id => setAllProducts(zuzuzu => zuzuzu.filter(prod => prod.id !== id));
  // const toggleModal = () => setShowModal(!showModal);
  
  const handleChangeFilter = useCallback( (e) => {
    // console.log(e.target.value);
    setFilter(e.target.value); // сетим локально
    dispatch(filterValue(e.target.value)); // отправляем значение в redux
  }, [dispatch]); 

  return (
    <>
      {showModal && (
        <Modal toggleModal={setShowModal}>
          <Form 
            //addNewProduct={addNewProduct} 
          />
        </Modal>
      )}
      
      <h1>Products</h1>
       {/* <SolidTitle titleText="Products"/> */}
      <button 
        type="button" 
        onClick={setShowModal} 
      >
        Add Product
      </button>
      <br/>
      <label htmlFor="filter">Filter</label>
      <br/>
      <input 
        type="text" 
        id="filter" 
         value={filter} 
        onChange={handleChangeFilter}
      />
      <br/>
  {/* <DeleteButton isOpen={this.state.isOpen} text={text}/>
      <DeleteButton isOpen={!this.state.isOpen}/> */}
     
     <ProductList 
        //products={filteredProducts} 
        //onDeleteProduct={deleteProduct}
      />
    </>
  )
}