import { useEffect, useState, useRef } from 'react';
import './App.css';
import inventoryData from './assets/inventory.json';
import Header from './Header';
import ProductList from './InventoryList';
import ProductCard from './ProductCard';
import Cart from './Cart';

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const year = useRef(new Date().getFullYear());

  useEffect(() => {
    setInventory([...inventoryData.inventory]);
  }, []); //<--- don't forget the dependency array or you can end up with an infinite loop!!
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

  function handleAddItemToCart(id) {
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

  return (
    <>
      <main>
        <Header cart={cart} handleOpenCart={handleOpenCart} />
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
          />
        )}
      </main>
      <footer>
        <p>
          Made with ❤️ | &copy; {year.current}{' '}
          <a href="https://codethedream.org">CTD</a>
        </p>
      </footer>
    </>
  );
}

export default App;
