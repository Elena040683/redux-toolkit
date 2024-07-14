import { useState } from "react";

import { SearchForm } from "../../views/PexelsImages/SearchFormHooks"
import { ImagesList } from "../../views/PexelsImages/ImagesListHooks"
import { SolidTitle } from "../../components/Title/SolidTitle"

export default function PexelsPage () {
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);

  const getSearchValues = (searchValue, perPage) => {
    setSearchValue(searchValue);
    setPerPage(perPage);
  }
  
  return (
    <>
      <h2>Pexels</h2>
      <SearchForm getSearchValues={getSearchValues}/>
      <ImagesList
        searchValue={searchValue}
        perPage={perPage}
        />
    </>
  )
}