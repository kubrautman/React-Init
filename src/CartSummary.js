import { Component } from "react";
import { Link } from "react-router-dom";
import {

    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Badge,
    NavItem,
    NavLink
} from 'reactstrap';
export default class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    renderCartSummary() {
        return (<UncontrolledDropdown nav inNavbar>
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                    Your Cart - {this.props.cart.length}
                </DropdownToggle>
                <DropdownMenu end>
                    {this.props.cart.map(cartItem => (

                        <DropdownItem header key={cartItem.product.id}>
                            <Badge color="danger" onClick={() => this.props.removeFromCart(cartItem.product)}>-</Badge>
                            {cartItem.product.title}
                            <Badge color="success">{cartItem.quantity}</Badge>
                        </DropdownItem>
                    ))}

                    <DropdownItem divider />
                    <DropdownItem >
                        <Link to="cart">Go to Cart</Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </UncontrolledDropdown>)
    }

    renderEmptyCart() {
        return (<NavItem>
            <NavLink>Empty Cart</NavLink></NavItem>)
    }
    render() {

        return (
            <div>{this.props.cart.length > 0 ? this.renderCartSummary() : this.renderEmptyCart()}

            </div>
        )

    }
}