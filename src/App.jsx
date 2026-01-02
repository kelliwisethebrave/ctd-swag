import { useEffect, useState } from 'react';
import './App.css';
import inventoryData from './assets/inventory.json';
import Header from './Header';
import ProductList from './InventoryList';
import ProductCard from './ProductCard';

function App() {
  const [inventory, setInventory] = useState([]);
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

  const [cart, setCart] = useState([]);
  function handleAddItemToCart(id) {
    const target = inventory.find((item) => item.id === id);
    //if no inventory items are found
    //we want to prevent the app from crashing
    //by exiting this function now
    if (!target) {
      console.error('cart error: item not found');
      return;
    }
    //create an new object, spread the contents of the item selected
    //and add a `cartItemId`
    const cartItem = { ...target, cartItemId: Date.now() };
    console.log(cartItem);
    setCart([...cart, cartItem]);
  }

  return (
    <main>
      <Header cart={cart} />
      <ProductList
        inventory={inventory}
        handleAddItemToCart={handleAddItemToCart}
      >
        {/*{promoteItem()}*/}
      </ProductList>
      {/*invoking promoted item between the tags inserts the ItemCard*/}
    </main>
  );
}

export default App;
