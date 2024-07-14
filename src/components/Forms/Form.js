import {Component} from 'react';
import {connect} from 'react-redux';
import {v4 as uuid} from 'uuid';
import {addProduct, deleteProduct} from '../../redux/products/actions';

class Form extends Component {
  prodIdTitle = uuid();
  prodIdDesc = uuid();
  prodIdAgreed = uuid();
  prodIdSize = uuid();
  
  state = {
    title: '',
    desc: '',
    agreed: false,
    size: '',
    product: null,
  }

// функции обработчики событий

  handleCheck = (e) => {
    this.setState({
      agreed: !this.state.agreed,
    })
  }
  
  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      // title: e.target.value,
      [e.target.name]: e.target.value,
    })
  };
  
  handleChangeAllInputs = () => {
    const {name, type, checked, value} = this.state
    this.setState({
      [name]: type === "checkbox" ? checked : value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const {title, desc, size} = this.state;
    const obj = {
      id: uuid(),
      title,
      desc,
      size,
    }
    this.setState({product: obj}); // тут для себя пишем новый объект продукта в свой локальный стэйт
    //this.props.addNewProduct(obj); // !!! метод из page Products.js

    this.props.onAdd(obj); // диспатчим - передаем продукт в redux

    this.resetForm();
  };
  
  resetForm = () => {
    this.setState({
      title: '',
      desc: '',
      size: '',
      agreed: false,
    })
    // распыляем дефолтное состояние стэйта
    // this.setState({ ...this.state})
  }


  render() {
    // console.log('zzz prop from store:', this.props.productsList);
    console.log('метод add:', this.props.onAdd);

    const {title, desc, size, agreed} = this.state;
    const {handleSubmit, handleChange, handleCheck} = this;
    return ( 
      <form onSubmit={handleSubmit}>
        <label htmlFor={this.prodIdTitle}>Title</label>
        <input 
          type="text" 
          id={(this.prodIdTitle)} 
          name="title" 
          value={title}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor={this.prodIdDesc}>Description</label>
        <input 
          type="text" 
          id={this.prodIdDesc} 
          name="desc"
          value={desc}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor={this.prodIdSize}>Choose your size</label>
        <select 
          name="size"
          id={this.prodIdSize}
          value={size}
          onChange={handleChange}
        >
          <option value="" disabled>...</option>
          <option value="s">s</option>
          <option value="m">m</option>
          <option value="l">l</option>
        </select>
        <br/>
        <label htmlFor={this.prodIdAgreed}>Agree?</label>
        <input 
          type="checkbox" 
          name="agreed" 
          id={this.prodIdAgreed}
          checked={agreed}
          onChange={handleCheck} 
          />
        <br/>
        <button type="submit" disabled={!agreed}>add</button>
      </form>
    )
  }
};

// const mapStateToProps = (state) => {
//   return {
//     productsList: state.products,
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (obj) => dispatch(addProduct(obj)),
  }
}

export default connect(null, mapDispatchToProps)(Form);