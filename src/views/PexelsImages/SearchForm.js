import {Component} from 'react';

export class SearchForm extends Component {
  state = {
    searchValue: '',
    perPage: 5,
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('BEFORE FETCH', this.state.searchValue);
    this.props.getSearchValues(this.state.searchValue, this.state.perPage);
    this.setState({ searchValue: '', perPage: 5})
  }
  
  handleSearchChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
    // this.setState({searchValue: e.target.value})
  }

  render() {
    const {handleSearchSubmit, handleSearchChange} = this
    return (
      <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              name="searchValue"
              onChange={handleSearchChange} 
              value={this.state.searchValue}
              placeholder="value"
            />
             <input 
              type="number"
              name="perPage"
              onChange={handleSearchChange} 
              value={this.state.perPage}
              placeholder="how many results?"
            />
            <button type="submit">search</button>
          </form>
    )
  }
}
