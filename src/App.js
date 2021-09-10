import Main from "./Components/Main/Main";
import Product from "./Components/Main/Product/Product";
import Navigation from "./Components/Navigation/Navigation";
import Cart from './Components/Cart/Cart'
import OrderSummary from "./Components/OrderSummary/OrderSummary";
const { Switch, BrowserRouter, Route } = require("react-router-dom");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart' component={Cart} />
          <Route path='/orderSummary' component={OrderSummary}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
