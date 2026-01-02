import ProductCard from './ProductCard';

function ProductList({ inventory, children, handleAddItemToCart }) {
  return (
    <ul>
      {children}{' '}
      {/*this location guarantees that this list item will be first*/}
      {inventory.map((item) => {
        return (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.baseName}
            description={item.baseDescription}
            handleAddItemToCart={handleAddItemToCart}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
