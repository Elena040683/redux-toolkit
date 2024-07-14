import { useState, useEffect } from "react";
import {useLS} from '../../hooks/useLS';
import {PixelsFetchObject} from '../../services/pexels'
import s from './ImagesList.module.css';
import {Link, useLocation} from 'react-router-dom';
import { Loader } from "../../components/Loader/Loader";

const base_url = 'https://api.pexels.com/v1/';
const api_key = 'C0c8jsEIkIzHhJ34LClN7vk5fJStc0qpj2n2MRQ5zthwSKBkRibKG5uF';
const newPexelsFetchObject = new PixelsFetchObject(base_url, api_key);
console.log(newPexelsFetchObject);

export function ImagesList({searchValue, perPage}) {
  const [searchResults, setSearchResults] = useLS('pexelImages', []);
  const [searchValueLS, setSearchValueLS] = useLS('searchValue', '');
  const [searchPageLS, setSearchPageLS] = useLS('searchPage', '');
  const [status, setStatus] = useState('init');

  const location = useLocation();
  console.log('LIST location:', location);

  useEffect(() => {
    if(!searchValue.trim()) return;
    setSearchValueLS(searchValue);
    setSearchPageLS(1);
    setStatus('pending');
    newPexelsFetchObject.resetPage();
    newPexelsFetchObject.searchQuery = searchValue; 
    newPexelsFetchObject.perPage = perPage;

    newPexelsFetchObject.searchPhotos()
      .then(res => {
        console.log(res);
        //this.setState({ searchResults: res, status: 'success' })
        setStatus('success');
        setSearchResults(res);
      })
      .catch(err => {
        console.log(err);
        setStatus('error');
        // setStatus(() => (err ? 'error' : 'Opps'));
      });
      // return () => alert('UNMOUNT');
  }, [searchValue, perPage, setSearchResults, setSearchPageLS, searchValueLS]);


  const handleClick = () => {
    if(!searchValue && searchValueLS) {
      newPexelsFetchObject.searchQuery = searchValueLS;
      setSearchPageLS(searchPageLS + 1);
      newPexelsFetchObject.page = searchPageLS + 1;
      newPexelsFetchObject.searchPhotos()
        .then(res => {
          setSearchResults(prev => [...prev, ...res]);
          setStatus('success')
        })
        .catch(err => setStatus('error'))
    } else {
        newPexelsFetchObject.page = 1;
        console.log(newPexelsFetchObject.page);
        newPexelsFetchObject.searchPhotos()
          .then((res) => {
            console.log(res);
            setSearchResults(prev => [...prev, ...res]);
            setStatus('success');
          })
          .catch(err => {
            //console.log(err);
            setStatus('error');
          }) 
    }
  }

  if(status === 'init' && searchResults.length === 0) {
    return (
      <>
        <h1>Hello! Search something</h1>
        <Loader/>
      </>
    )
  }

  if(status === 'pending') {
    return (
      <h1>Wait please!</h1>
    )
  }
  if(status === 'success' || (status === 'init' && searchResults.length > 0)) {
    return (
      <>
        <ul className={s.imagesList}>
          {searchResults.length > 0 && 
            searchResults.map(el => (
              <li key={el.id}>
                <Link to={{
                  pathname: `/pexels/${el.id}`,
                  state: {
                    from: {location, label: 'back to pexels'}
                  }
                }}>
                  <img src={el.src.small} alt={el.alt}/>
                </Link>
              </li>
          ))}
        </ul>   
        <button type='button' onClick={handleClick} className={s.loadMoreBtn}>Load more</button>
      </>
    )
  }
  if(status === 'error') {
    return (
      <h1>ALARMA!!!</h1>
    )
  }
}