
import './App.scss';
import {Component} from 'react';
import {DeleteButton} from './components/Widgets/RemoveItem';
import {Counter} from './components/Counter/Counter';
import {Form} from './components/Forms/Form';
import { ProductList } from './components/Products/ProductsList';
import {Training} from './components/MyComponent/Training';
import {Modal} from './components/Modal/Modal';
import axios from 'axios';
import { SearchForm } from './views/PexelsImages/SearchFormHooks';
import { ImagesList } from './views/PexelsImages/ImageList';
// console.dir(axios);

// const text = {
//   title: 'title-1',
//   content: 'content-1',
//   backBtn: 'go back',
//   deleteBtn: 'delete',
// }

// let searchQuery = 'banana';
// let searchPage = 1;
// let searchPerPage = 5;
// let endpoint = 'search';
// let params = `?query=${searchQuery}&page=${searchPage}&per_page=${searchPerPage}`
// let url = endpoint + params;

class App extends Component {
  constructor(props) {
    super(props)
    this.addNewProduct = this.addNewProduct.bind(this);
  }

state = {
  counter: 0,
  isOpen: false,

  allProducts: [],
  showModal: false,

  searchValue: '',
  perPage: 5,
}

componentDidMount() {
  // console.log(`MOUNT`);
  const localProducts = localStorage.getItem('products');
  const parseProducts = JSON.parse(localProducts);
  console.log(parseProducts);

  if(parseProducts) {
    this.setState({allProducts: parseProducts});
  }
}

componentDidUpdate(prevProps, prevState) {
  // console.log(`UPDATE`);
  // Если изменилось значение поля стэйт prevState.prop
  // То будем переписывать localStorage
  if(prevProps.allProducts !== this.state.allProducts) {
    localStorage.setItem('products', JSON.stringify(this.state.allProducts));
  }
  
}

componentWillUnmount() {
  // console.log(`UNMOUNT`);
}


addNewProduct = (obj) => {
  this.setState((prevState) => {
    return {
      allProducts:[...prevState.allProducts, obj],
    }
  })
}

deleteProduct = (id) => {
 console.log(`DELETE`);
 this.setState((prevState) => ({
    allProducts: prevState.allProducts.filter((product) => product.id !== id)
  }))
 }

 toggleModal = () => {
  this.setState({showModal: !this.state.showModal})
 }

handleDecrement = () => {
  // this.setState({
  //   counter: this.state.counter - 1,
  // })

  // this.setState((prevState) => {
  //   return {counter: prevState.counter - 1}
  // })
  // или короче
  this.setState((prevState) => ({
      counter: prevState.counter - 1
    }) 
  )
}

handleIncrement = () => {
  this.setState((prevState) => ({
    counter: prevState.counter + 1
  }))
}

getSearchValues = (searchValue, perPage) => 
  this.setState({ searchValue, perPage });

  render() {
    const {counter} = this.state;
    const {handleDecrement, handleIncrement, deleteProduct, toggleModal} = this;
    return (
      <div className="App">
        <SearchForm getSearchValues={this.getSearchValues}/>
        <ImagesList 
          searchValue={this.state.searchValue}
          perPage={this.state.perPage}
          />
        
        {this.state.showModal && (
          <Modal toggleModal={toggleModal}>
            <Form addNewProduct={this.addNewProduct} />
          </Modal>
        )}
        <h1>Products</h1>
        <button type="button" onClick={toggleModal} >Add Product</button>
        {/* <DeleteButton isOpen={this.state.isOpen} text={text}/>
        <DeleteButton isOpen={!this.state.isOpen}/> */}
       
        <ProductList products={this.state.allProducts} onDeleteProduct={deleteProduct}/>
        {/* <Counter 
          value={counter} 
          handleDecrement={handleDecrement} 
          handleIncrement={handleIncrement}
        /> */}
        {/* <div className="counter">
          <button onClick={handleDecrement}>-</button>
          <p>{counter}</p>
          <button onClick={handleIncrement}>+</button>
        </div> */}
        {/* <SearchForm add={this.addNewProduct}/>
        <Training/> */}
        {/* <Mycounter/> */}
  
      </div>
    );
  }
}

export default App;
