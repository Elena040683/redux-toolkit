import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { PixelsFetchObject } from "../../services/pexels";

const base_url = 'https://api.pexels.com/v1/';
const api_key = 'C0c8jsEIkIzHhJ34LClN7vk5fJStc0qpj2n2MRQ5zthwSKBkRibKG5uF';
const x = new PixelsFetchObject(base_url, api_key);

export default function ImageCard() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const [imageInfo, setImageInfo] = useState(null);
  console.log("CARD:", history);
  console.log(location);
  console.log("params:", params);

  useEffect(() => {
    x.getImageInfo(params.imageId)
    .then(data => setImageInfo(data))
    .catch(err => alert('err'));
  }, [params.imageId]);

  const handleClick = () => history.push(location?.state?.from?.location ?? '/pexels');
  
  console.log(imageInfo);
  return (
    <>
      <button type="button" onClick={handleClick}>
        {location?.state?.from?.label ?? 'Go back'}
      </button>
      
      {imageInfo ? (
        <article id={imageInfo.id}>
          <h2>{imageInfo.photographer}</h2>
          <img
            src={imageInfo.src.original}
            alt="origin size"
            style={{ objectFit: 'contain', width: '100%' }}
          />
        </article>
      ) : (
        <p>No match found</p>
      )}
    </>
  );
}