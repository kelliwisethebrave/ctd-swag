import { useEffect, useState } from 'react';
import './App.css';
//import inventoryData from './assets/inventory.json';
import Header from './shared/layout/Header';
import ProductList from './features/InventoryList';
import ProductCard from './features/ProductCard';
import Cart from './features/cart_feat/Cart';
import Footer from './shared/layout/Footer';
import AuthForm from './features/Auth/AuthForm';

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCartSyncing, setIsCartSyncing] = useState(false);
  const [cartError, setCartError] = useState('');

  //const year = useRef(new Date().getFullYear());

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${baseUrl}/products`);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const products = await resp.json();
        console.log(products);
        setInventory([...products]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [baseUrl]);

  //this is the old way to do the inventory with the json (before backend connection)
  //setInventory([...inventoryData.inventory]);
  //}, []); //<--- don't forget the dependency array or you can end up with an infinite loop!!

  {
    /*function promoteItem() {
    return (
      <ProductCard
        name="Limited Edition Tee!"
        description="Special limited edition neon green shirt with a metallic Code the Dream Logo shinier than the latest front-end framework! Signed by the legendary Frank!"
      />
    );
  }*/
  }

  async function handleAddItemToCart(id) {
    //debug
    console.log('USER AT ADD:', user);
    console.log('TOKEN:', user.token);
    const inventoryItem = inventory.find((item) => item.id === id);

    //if no inventory items are found
    //we want to prevent the app from crashing
    //by exiting this function now
    if (!inventoryItem) {
      console.error('cart error: item not found');
      return;
    }
    //create an new object, spread the contents of the item selected
    //and add a `cartItemId`
    //const cartItem = { ...target, cartItemId: Date.now() };
    const itemToUpdate = cart.find((item) => item.id === id);
    let updatedCartItem;
    //for lesson 6, remove Date.now() since each item will have an itemCount instead
    //console.log(cartItem);
    if (itemToUpdate) {
      updatedCartItem = {
        ...itemToUpdate,
        itemCount: itemToUpdate.itemCount + 1,
      };
    } else {
      updatedCartItem = { ...inventoryItem, itemCount: 1 };
    }
    setCart([...cart.filter((item) => item.id !== id), updatedCartItem]);

    if (!user.id || !user.token) {
      console.warn('user not fully authenticated yet');
      return;
    }

    const payload = {
      userId: updatedCartItem.userId,
      productId: updatedCartItem.productId,
      quantity: updatedCartItem.quantity,
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const resp = await fetch(`${baseUrl}/cart`, options);
      if (!resp.ok) {
        console.log(resp);
        const failData = await resp.json();
        console.dir(failData);
      }
    } catch (error) {
      console.log(error.message);
      //TODO code to de-increment item count here
    }
  }

  function handleCloseCart() {
    //prevents-rerender if unchanged
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  }

  function handleOpenCart() {
    //prevents-rerender if unchanged
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  }

  async function handleAuthenticate(credentials) {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/login`, options);
      if (!resp.ok) {
        //status will be 401 if authentication fails
        //we want to handle it differently than other errors
        if (resp.status === 401) {
          //console.dir(resp);
          setAuthError('email or password incorrect');
        }
        throw new Error(resp.status);
      }
      //console.dir(resp);
      const userData = await resp.json();
      console.log('LOGIN RESPONSE:', userData); // check the token field
      //assigning a new object that's more convenient to work with
      //this is a LOT of state update functions in arow!!
      //we fix this in week 11
      setUser({ ...userData.user, token: userData.token });
      //setCart([...userData.cartItems]);
      setCart(
        userData.cartItems.map((item) => ({
          ...item,
          itemCount: item.quantity || 1,
        }))
      );
      //console.log(userData);
      //console.log(setUser);
      setAuthError('');
      setIsAuthenticating(false);
      setIsAuthFormOpen(false);
    } catch (error) {
      //console.dir(error);
      setIsAuthenticating(false);
      console.log(error.message);
    }
  }
  async function handleRegister(user) {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/register`, options);
      if (!resp.ok) {
        //status will be 401 if authentication fails
        //we want to handle it differently than other errors
        if (resp.status === 401) {
          //console.dir(resp);
          setAuthError('failed to create a new account');
        }
        throw new Error(resp.status);
      }
      //console.dir(resp);
      const userData = await resp.json();
      //assigning a new object that's more convenient to work with
      //this is a LOT of state update functions in arow!!
      //we fix this in week 11
      setUser({ ...userData.user, token: userData.token });
      //console.log(userData);
      //console.log(setUser);
      setAuthError('');
    } catch (error) {
      //console.dir(error);

      console.log(error.message);
    } finally {
      setIsAuthenticating(false);
      setIsAuthFormOpen(false);
    }
  }
  function handleCloseAuthForm() {
    setIsAuthFormOpen(false);
  }

  function handleOpenAuthForm(option) {
    switch (option) {
      case 'register':
        setIsRegistering(true);
        break;
      default:
        setIsRegistering(false);
        break;
    }
    setIsAuthFormOpen(true);
  }

  function handleLogOut() {
    setUser({});
    setCart([]);
  }

  async function handleSyncCart(workingCart) {
    if (!user.id) {
      setCart(workingCart);
      return;
    }
    setIsCartSyncing(true);
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ cartItems: workingCart }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const resp = await fetch(`${baseUrl}/cart`, options);
      if (!resp.ok) {
        console.log('resp not okay');
        if (resp.status === 401) {
          throw new Error('Not authorized. Please log in.');
        }
        const cartData = await resp.json();
        //cartData.error on all other errors from this endpoint
        if (cartData.error) {
          throw new Error(cartData.error);
        }
        //catch-all
        throw new Error('Error occurred while syncing');
      }
      const cartData = await resp.json();
      setCart([...cartData]);
      //clean up state variables
      setIsCartSyncing(false);
      setCartError('');
    } catch (error) {
      setCartError(error.message);
      setIsCartSyncing(false);
    }
  }

  return (
    <>
      <main>
        <Header
          cart={cart}
          handleOpenCart={() => setIsCartOpen(true)}
          //handleOpenAuthForm={() => setIsAuthFormOpen(true)}
          handleOpenAuthForm={handleOpenAuthForm}
          //new props
          handleLogOut={handleLogOut} //wipes out the user and cart values
          user={user} // used to tell if user is logged in
        />
        {isAuthFormOpen && (
          <AuthForm
            handleAuthenticate={handleAuthenticate}
            handleCloseAuthForm={handleCloseAuthForm}
            isAuthenticating={isAuthenticating}
            authError={authError}
            handleRegister={handleRegister}
            isRegistering={isRegistering}
          />
        )}
        <ProductList
          inventory={inventory}
          handleAddItemToCart={handleAddItemToCart}
        >
          {/*{promoteItem()}*/}
        </ProductList>
        {/*invoking promoted item between the tags inserts the ItemCard*/}
        {/* `isCartOpen` has to be true for the cart to be rendered */}
        {isCartOpen && (
          <Cart
            cart={cart}
            setCart={setCart}
            handleCloseCart={handleCloseCart}
            isCartSyncing={isCartSyncing}
            handleSyncCart={handleSyncCart}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
