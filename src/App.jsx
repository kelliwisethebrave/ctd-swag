import { useState } from 'react';
import './App.css';
import inventoryData from './assets/inventory.json'
import Header from '../Header';
import ProductList from '../InventoryList';
import ProductCard from '../ProductCard';

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);

  function promoteItem() {
    return (
      <ProductCard 
        name="Limited Edition Tee!"
        description="Special limited edition neon green shirt with a metallic Code the Dream Logo shinier than the latest front-end framework! Signed by the legendary Frank!"
      />
    );
  }

  return (
    <main>
      <Header />
      <ProductList inventory={inventory}>{promoteItem()}</ProductList>
      {/*invoking promoted item between the tags inserts the ItemCard*/}
    </main>
  );
}

export default App;