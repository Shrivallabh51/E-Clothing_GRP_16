import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../Style/Cart.css";
import { getCart, clearCart, incProductQty, decProductQty } from "./CartSlice";
import { setOrderTotal } from "./CartSlice";

const Cart = () => {
  const { user } = useSelector((store) => store.User);
  const { carts, isQtyChange } = useSelector((store) => store.Cart);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const dispatch = useDispatch();

  const calculateSubtotal = () => {
    return carts
      .reduce(
        (total, product) => total + product.productDto.price * product.stockQty,
        0
      )
      .toFixed(2);
  };
  useEffect(() => {
    dispatch(setOrderTotal(calculateSubtotal()));
  }, [dispatch, carts]);

  const handleDelete = async (p_id) => {
    setIsItemDeleted(false);
    try {
      const response = await fetch(
        `http://localhost:8090/remove?userId=${user.userId}&productId=${p_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setIsItemDeleted(true);
        const data = await response.json();
        return data; // Return the response data if needed
      }
    } catch (error) {
      console.log(error); // Return the error message to be handled in the slice
    }
  };

  useEffect(() => {
    // console.log("rerender");
    dispatch(getCart());
  }, [dispatch, isItemDeleted, isQtyChange]);

  const calculateOrderTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shippingFee = 50; // Assuming a fixed shipping fee
    return (subtotal + shippingFee).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`http://localhost:8090${product.productDto.imageUrl}`}
                  alt={product.name}
                  className="img-fluid"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </td>
              <td>
                <strong>{product.productDto.product_Name}</strong>
                <br />
              </td>
              <td>{product.productDto.price.toFixed(2)}</td>
              <td>
                <Button
                  className="transparent-btn mr-2"
                  variant="outline-dark"
                  size="bg"
                  onClick={() =>
                    dispatch(decProductQty(product.productDto.p_id))
                  }
                >
                  -
                </Button>
                {product.stockQty}
                <Button
                  className="transparent-btn ml-2"
                  variant="outline-dark"
                  size="bg"
                  onClick={() =>
                    dispatch(incProductQty(product.productDto.p_id))
                  }
                >
                  +
                </Button>
              </td>
              <td>
                {(product.productDto.price * product.stockQty).toFixed(2)}
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.productDto.p_id)}
                >
                  &#128465;
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-4">
        <Col md={6}>
          <Link to="/products">
            <Button variant="outline-secondary">Continue Shopping</Button>
          </Link>
        </Col>
        <Col md={6}>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(clearCart())}
          >
            Clear Shopping Cart
          </Button>
        </Col>
      </Row>
      <Row
        className="mt-4 mb-5"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Col md={{ span: 4, offset: 2 }}>
          <div className="bg-light p-3 rounded">
            <p>Subtotal: {calculateSubtotal()}</p>
            <p>Shipping Fee: 50</p>
            <hr />
            <h5>Order Total: {calculateOrderTotal()}</h5>
          </div>
          {user ? (
            <Link to="/checkout">
              <Button variant="primary" className="mt-3 w-100">
                CHECKOUT
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="primary" className="mt-3 w-100">
                LOGIN
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
