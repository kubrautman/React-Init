import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import CartSummary from './CartSummary';
import { Link } from "react-router-dom";

export default class Navi extends React.Component {


  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            
            <NavLink active>
            <CartSummary  cart={this.props.cart} removeFromCart={this.props.removeFromCart} />

            </NavLink>
          </NavItem >
         
        </Nav>
      </div>
    );
  }
}
