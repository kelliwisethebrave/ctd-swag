import ProductCard from './ProductCard';

function ProductList({ inventory, children }) {
  return (
    <ul>
      {children} {/*this location guarantees that this list item will be first*/}
      {inventory.map((item) => {
        return (
          <ProductCard
            key={item.id}
            name={item.baseName}
            description={item.baseDescription}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;