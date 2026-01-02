import ctdLogo from './assets/mono-blue-logo.svg';
import { useEffect } from 'react';
import shoppingCart from './assets/icons/shoppingCart.svg';

function Header({ cart }) {
  useEffect(() => {
    cart.forEach((item) => {
      console.log(item.baseName, item.cartItemId);
    });
    if (cart.length > 0) {
      console.log('--end of cart--');
    }
  });

  return (
    <div className="coming-soon">
      <h1>CTD Swag</h1>
      <div style={{ height: 100, width: 100 }}>
        <img src={ctdLogo} alt="Code The Dream Logo" />

        <div className="shoppingCart">
          <button aria-label="Shopping cart">
            <img src={shoppingCart} alt="shopping cart" />
          </button>
          {cart.length > 0 && <div className="cartCount">{cart.length}</div>}
        </div>
      </div>
    </div>
  );
}

export default Header;
