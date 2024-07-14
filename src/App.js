import { useState, lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
// Статические импорты
// import HomePage from './pages/Home/Home';
// import PexelsPage from './pages/Pixels/Pexels';
// import ProductsPage from './pages/Products/Products';
import {Loader} from './components/Loader/Loader';
import { Navigation } from './components/Navigation/Navigation';

// Динамический импорт через lazy загрузку
const HomePage = lazy(() => import('./pages/Home/Home'));
const PexelsPage = lazy(() => import('./pages/Pixels/Pexels'));
const ProductsPage = lazy(() => import('./pages/Products/Products'));
const ImageCard = lazy(() => import('./views/PexelsImages/ImageCard'));

function App() {
  const [counter, setCounter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="App">
      <Navigation/>
      
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/pexels" component={PexelsPage} />
          <Route path="/pexels/:imageId" component={ImageCard}/>
          <Route exact path="/products" component={ProductsPage} />
          <Route>
            <p>Page not found</p>
          </Route>
        </Switch>
      </Suspense>

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

export default App;