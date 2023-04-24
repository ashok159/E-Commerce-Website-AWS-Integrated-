import React from "react";
import { Link } from "react-router-dom";
import "../styles/CartPage.css";

//User signed out:
//  load cart with local storage 
//  save items added/removed to local storage

//User signed in 
//if user signed in 
//  => append current items in local storage to DDB + clear local storage
//  => add/remove a item => update DDB (put)

function CartPage() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    subtotal += cart[i].price;
  }

  function windowRefresh() {
    window.location.reload();
  }

  function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].title === productName) {
        cart.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart.length);
  }

  function goToCheckout() {
    window.location.href = "/checkout";
  }

  return (
    <div className="cart-page">
      {console.log(localStorage.getItem('isLoggedIn'))}
      <div className="items-in-cart">
        <div className="cart-title">SHOPPING CART</div>
        {cart.map((item) => (
          <div className="item-display">
            <Link to={`/item/${item.id}`}>
              <img
                src={item.thumbnail}
                alt="product"
                className="cart-item-image"
              />
            </Link>
            <div className="cart-item-text">
              <Link to={`/item/${item.id}`}>
                <div className="cart-item-title">{item.title}</div>
              </Link>
              <div className="cart-item-price-info">
                <div className="cross-out">
                  $
                  {(
                    item.price +
                    eval(item.price * (item.discountPercentage / 100))
                  )
                    .toFixed(2)
                    .toString()}
                </div>
                <div className="cart-item-price">${item.price}</div>
              </div>
              <button
                className="cart-item-btn"
                onClick={() => {
                  removeFromCart(item.title);
                  windowRefresh();
                  alert("Item removed from cart!");
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-sidebar">
        <div className="cart-free-ship">You've Earned FREE SHIPPING!</div>
        <div className="cart-total">
          <div className="cart-total-heading">Subtotal: ${subtotal}.00</div>
        </div>
        <button
          className="checkout-btn"
          onClick={() => {
            if (cart.length === 0) {
              alert("No items in cart!");
            } else goToCheckout();
          }}
        >
          Checkout
        </button>
        <div className="cart-sidebar-end1">Don’t Miss Out!</div>
        <div className="cart-sidebar-end2">
          Items in bag are not held and may sell out
        </div>
        <div className="cart-help-title">NEED SOME HELP?</div>
        <div className="cart-help-text"><Link to="/contact"className="cart-help-link">Contact Us</Link>. And we'd love to help!</div>
      </div>
    </div>
  );
}

export default CartPage;
