import { Container } from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import { Component } from "react";
import { Row, Col } from "reactstrap"
import alertify from 'alertifyjs';
import {
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";


import NotFound from './NotFound';
import CartList from './CartList';
export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: []
  };
  changeCategory = (category) => {
    
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };
  getProducts = (categoryId) => {
    var url = 'http://localhost:3000/products';
    if(categoryId){
      url +="?categoryId="+categoryId;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ products: data }))

  };
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });

    }
    this.setState({ cart: newCart })
    alertify.success(product.title + "added to cart !");
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id);
    this.setState({ cart: newCart })
    alertify.error(product.title + "removed from cart !");
  }
  componentDidMount() {
    this.getProducts();
  }
  render() {
    let productInfo = { title: "Product List", id: "1" };
    let categoryInfo = { title: "Category List", id: "2" };
    return (
      <div>
        <Container>
          <Row>
            <Col xs="9"><h3>Nortwind App</h3></Col>
         
          <Col xs="3">
          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />
          </Col>
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList key={productInfo.id} info={categoryInfo.title} currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} />
            </Col>
            <Col xs="9">

 
              <Routes>
                <Route exact path='/' element={
             
                    <ProductList
                 
                     addToCart={this.addToCart} 
                    products={this.state.products} 
                    key={productInfo.id} info={productInfo.title} />

                  
                } />
                <Route exact path='/cart' element={<CartList 
                                     removeFromCart={this.removeFromCart} 
                                     cart={this.state.cart} 
                />} />

                <Route path='*' element={<NotFound></NotFound>} />
              </Routes>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

