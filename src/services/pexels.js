import axios from 'axios';

// OOP
export class PixelsFetchObject {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = '';
    this._page = 1;
    this._perPage = 5;
    this.endpoint = '';
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }

  set page(value) {
    return (this._page += value); // изменяем значение на 1
  }

  resetPage() {
    return (this._page = 1), (this._perPage = 5);
  }

  get perPage() {
    return this._perPage;
  }

  set perPage(value) {
    return (this._perPage = value);
  }

  searchPhotos() {
    axios.defaults.baseURL = this.base_url;
    axios.defaults.headers.common.Authorization = this.api_key;
    
    this.endpoint = 'search';
    console.log('searchQuery:', this.searchQuery, 'page:', this.page, 'perPage:', this.perPage);
    let params = `?query=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`;
    let url = this.endpoint + params;

    return axios.get(url)
      .then((result) => {
        // console.log(result);
        return result.data;
      })
      .then(data => {
        // console.log(data);
       return data.photos
      })
      .catch((err) => {
        (console.log(err));
      })
  }

  // запрос за 1 картинкой по id
  
  async getImageInfo(id) {
    axios.defaults.baseURL = this.base_url;
    axios.defaults.headers.common.Authorization = this.api_key;
    this.endpoint = 'photos';
    let params = `/${id}`;
    let url = this.endpoint + params;
    try {
      const result = await axios.get(url);
      const data = result.data;
      if (result.status === 400) throw new Error();
      // console.log(data);
      if (result.status === 200) return data;
    } catch (err) {
      // console.log('err', err);
      return err.message;
    }
  }

   // Перепишем на async
  //  async searchPhotos() {
  //   axios.defaults.baseURL = this.base_url;
  //   axios.defaults.headers.common.Authorization = this.api_key;
    
  //   this.endpoint = 'search';
  //   let params = `?query=${this.searchQuery}&page=${this.searchPage}&per_page=${this.searchPerPage}`;
  //   let url = this.endpoint + params;

  //   try {
  //     const result = await axios.get(url);
  //     const data = result.data.phtos;
  //     return data;
  //   } catch {err => {
  //     return err.message;
  //   }}
  // }
}

// DECLARATIVE
// export function PixelsFetchFunc() {
//   const base_url = 'https://api.pexels.com/v1/';
//   const api_key = 'C0c8jsEIkIzHhJ34LClN7vk5fJStc0qpj2n2MRQ5zthwSKBkRibKG5uF';
//   axios.defaults.baseURL = base_url;
//   axios.defaults.headers.common.Authorization = api_key;

//   const searchPhotos = (searchQuery, searchPage, searchPerPage) => {
//     axios.defaults.baseURL = this.base_url;
//     axios.defaults.headers.common.Authorization = this.api_key;
    
//     let endpoint = 'search';
//     let params = `?query=${searchQuery}&page=${searchPage}&per_page=${searchPerPage}`
//     let url = endpoint + params;

//     axios.get(url)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         (console.log(err));
//       })
//   }
// }
