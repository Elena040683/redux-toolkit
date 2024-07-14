import { useState } from "react";

export function SearchForm({add}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;

    switch(name) {
      case 'title': 
        setTitle(value);
        break;
      case 'desc': 
        setDesc(value);
        break;  
      default:
    }

    // this.setState({
    //   [name]: value,
    // })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    // const obj = {
    //   [name]: [value],
    //   desc: [value],
    // }

    add({[name]: value});

    setTitle('');
    setDesc('')
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor={title}>Title</label>
        <input 
          type="text" 
          // id={prodIdTitle} 
          name="title" 
          value={title}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor={desc}>Description</label>
        <input 
          type="text" 
          // id={this.prodIdDesc} 
          name="desc"
          value={desc}
          onChange={handleChange}
        />
        <br/>
        {/* <label htmlFor={this.prodIdSize}>Choose your size</label>
        <select 
          name="size"
          // id={prodIdSize}
          value={size}
          onChange={handleChange}
        > */}
          {/* <option value="" disabled>...</option>
          <option value="s">s</option>
          <option value="m">m</option>
          <option value="l">l</option>
        </select>
        <br/> */}
        {/* <label htmlFor={prodIdAgreed}>Agree?</label>
        <input 
          type="checkbox" 
          name="agreed" 
          id={prodIdAgreed}
          checked={agreed}
          onChange={handleCheck} 
          /> */}
        <br/>
        <button type="submit">add</button>
      </form>
  )
}