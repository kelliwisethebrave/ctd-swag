import ctdLogo from '../../assets/mono-blue-logo.svg';
import { useEffect } from 'react';
import shoppingCart from '../../assets/icons/shoppingCart.svg';

function Header({
  cart,
  handleOpenCart,
  handleOpenAuthForm,
  user,
  handleLogOut,
}) {
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
      <div className="userActions">
        {user.id ? (
          <>
            {/*  <Link to="/account" className="linkButton">*/}
            <span>Hi, {user.firstName}</span>
            {/*</Link>*/}
            <button className="authButton signOut" onClick={handleLogOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthForm('login')}
            >
              Log in
            </button>{' '}
            or
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthForm('register')}
            >
              Register
            </button>
          </>
        )}
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
