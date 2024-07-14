import {Component} from 'react';
import {PixelsFetchObject} from '../../services/pexels'

const base_url = 'https://api.pexels.com/v1/';
const api_key = 'C0c8jsEIkIzHhJ34LClN7vk5fJStc0qpj2n2MRQ5zthwSKBkRibKG5uF';
const newPexelsFetchObject = new PixelsFetchObject(base_url, api_key);
console.log(newPexelsFetchObject);

export class ImagesList extends Component {
  state = {
    searchResults: [],
    status: 'init',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue || prevProps.perPage !== this.props.perPage)  {
      console.log('get fetch');
      this.setState({status: 'pending'})
      // Вызываем метод, который сносит page в единицу
      newPexelsFetchObject.resetPage();
     // засэтили новое значение (получили через пропс) из введенного в инпут и записанного в стэйт App

      newPexelsFetchObject.searchQuery = this.props.searchValue; 
      newPexelsFetchObject.perPage = this.props.perPage;
    
      //  сделали запрос и записали данные в стэйт
      newPexelsFetchObject.searchPhotos()
      .then(res => {
        console.log(res);
        this.setState({ searchResults: res, status: 'success' })
      })
      .catch(err => {
        console.log(err);
        this.setState({status: 'error'})
      })
      
    }
  }

  handleClick = () => {
    newPexelsFetchObject.page = 1;
    console.log(newPexelsFetchObject.page);
    newPexelsFetchObject.searchPhotos()
      .then((res) => {
        console.log(res);
        this.setState((prev) => ({
          searchResults: [...prev.searchResults, ...res],
          status: 'success'
        }))
      })  
  }
  render() {
    if(this.state.status === 'init') {
      return (
      <h1>Hello! Search something.</h1>
      )
    }
    if(this.state.status === 'pending') {
      return (
      <h1>Wait please!</h1>
      )
    }
    if(this.state.status === 'success') {
      return (
        <>
          <ul>
            {this.state.searchResults.map(el => (
              <li key={el.id}>
                <img src={el.src.small} alt={el.alt}/>
              </li>
            ))}
          </ul>   
          <button type='button' onClick={this.handleClick}>Load more</button>
        </>
      )
    }
    if(this.state.status === 'error') {
      return (
        <h1>ALARMA!!!</h1>
      )
    }
  }
}