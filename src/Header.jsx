import ctdLogo from './assets/mono-blue-logo.svg';
import { useEffect } from 'react';
import shoppingCart from './assets/icons/shoppingCart.svg';

function Header({ cart, handleOpenCart }) {
  function getItemCount() {
    return cart.reduce((acc, item) => acc + item.itemCount, 0);
  }
  {
    /*//useEffect(() => {
    cart.forEach((item) => {
      console.log(item.baseName, item.cartItemId);
    });
    if (cart.length > 0) {
      console.log('--end of cart--');
    }
  });*/
  }

  return (
    <header>
      <div className="siteBranding">
        {/*<div style={{ height: 100, width: 100 }}>*/}
        <img src={ctdLogo} alt="Code The Dream Logo" />
        <h1>CTD Swag</h1>
      </div>
      <div className="shoppingCart">
        <button type="button" onClick={handleOpenCart}>
          <img src={shoppingCart} alt="shopping cart" />
        </button>
        <p className="cartCount">{getItemCount()}</p>
        {/*{cart.length > 0 && <div className="cartCount">{cart.length}</div>}*/}
      </div>
    </header>
  );
}

export default Header;
