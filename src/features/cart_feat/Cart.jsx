import { useState, useEffect } from 'react';
import placeholder from '../../assets/placeholder.png';
import CartItem from './CartItem';

//`handleCloseCart` is not made yet but we know we will need it
function Cart({
  cart,
  handleCloseCart,
  setCart,
  isCartSyncing,
  handleSyncCart,
}) {
  const [workingCart, setWorkingCart] = useState(cart);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    if (isFormDirty || isCartSyncing) {
      //prevents setWorkingCart from running
      return;
    }
    setWorkingCart(cart);
  }, [cart, isFormDirty, isCartSyncing]);

  function getWorkingCartPrice() {
    //using `.toFixed` because floating point arithmetic
    //introduces surprising rounding issues
    //e.g. `console.log(.99 + .99 + .99)` will print 2.969999999998
    return workingCart
      .reduce((acc, item) => acc + item.price * item.itemCount, 0)
      .toFixed(2);
  }

  function handleUpdateField({ event, id }) {
    event.preventDefault();
    //prevent re-render if already dirty
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
    const targetProduct = workingCart.find((item) => item.id === id);
    const targetIndex = workingCart.findIndex((item) => item.id === id);
    if (!targetProduct) {
      console.error('cart error: item not found');
      return;
    }
    //reject negative values or if user deletes value
    if (event.target.value < 0 || event.target.value === '') {
      return;
    }
    // create new object instead of updating old
    const updatedProduct = {
      ...targetProduct,
      itemCount: parseInt(event.target.value, 10),
    };
    //avoid re-ordering array when updating cart item
    setWorkingCart([
      ...workingCart.slice(0, targetIndex),
      updatedProduct,
      ...workingCart.slice(targetIndex + 1),
    ]);
  }
  function handleCancel(e) {
    e.preventDefault();
    setIsFormDirty(false);
    setWorkingCart([...cart]);
  }

  function removeEmptyItems(workingCart) {
    return workingCart.filter((item) => item.itemCount > 0);
  }
  function handleConfirm(event) {
    event.preventDefault();
    //call setCart with workingCart value
    const cleanedCart = removeEmptyItems(workingCart);
    //setCart(cleanedCart);
    //setWorkingCart(cleanedCart);
    handleSyncCart(cleanedCart);
    setIsFormDirty(false);
  }

  return (
    <>
      <div className="cartScreen"></div>
      {/*
        .cartScreen covers the product list with a div that has a blur effect
        placed on it. this makes the product buttons unclickable
        */}
      <div className="cartListWrapper">
        {workingCart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <form>
            <ul className="cartList">
              {workingCart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    onHandleItemUpdate={handleUpdateField}
                  />
                );
              })}
            </ul>
          </form>
        )}
        {/* cart total will need to be calculated */}
        <h2>Cart Total: ${getWorkingCartPrice()}</h2>
        {isFormDirty && (
          <div>
            <button onClick={handleConfirm} type="button">
              Confirm Update
            </button>
            <button onClick={handleCancel} type="button">
              Cancel Update
            </button>
          </div>
        )}
        <button onClick={handleCloseCart}>CloseCart</button>
      </div>
    </>
  );
}

export default Cart;
