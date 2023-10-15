import { Component } from "react";
import { Table,Button } from "reactstrap";

export default class ProductList extends Component {



    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product => (
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td><Button  onClick={()=>this.props.addToCart(product)} color="info">ADD</Button></td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        )
    }
}