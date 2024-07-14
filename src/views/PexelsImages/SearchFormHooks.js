import {useState} from 'react';

export function SearchForm({getSearchValues}) {
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    // this.setState({ [name]: value })
    switch(name) {
      case 'searchValue':
        setSearchValue(value);
        break;
      case 'perPage':
        setPerPage(value);
        break;
       default: 
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('BEFORE FETCH', searchValue, perPage);
    getSearchValues(searchValue, perPage);
    setSearchValue('');
    setPerPage(2);
  };
  
  return (
    <form onSubmit={handleSearchSubmit}>
    <input 
      type="text" 
      name="searchValue"
      onChange={handleSearchChange} 
      value={searchValue}
      placeholder="value"
    />
     <input 
      type="number"
      name="perPage"
      onChange={handleSearchChange} 
      value={perPage}
      placeholder="how many results?"
    />
    <button type="submit">search</button>
  </form>
  )
}