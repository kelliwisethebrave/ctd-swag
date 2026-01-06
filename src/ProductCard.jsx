import ProductCardVariants from './ProductCardVariants';
import placeholder from './assets/placeholder.png';
import { useState } from 'react';

function ProductCard({ product, handleAddItemToCart }) {
  const [areVariantsShown, setAreVariantsShown] = useState(false);

  return (
    <li className="productCard">
      <div className="itemCard">
        <div className="productPreview">
          <img src={placeholder} alt=" " />
        </div>
        <div className="productCopy">
          <h2>{product.baseName}</h2>
          <p>{product.baseDescription}</p>
        </div>
        <div className="productButtons">
          {product.variants.length > 1 ? (
            <button onClick={() => setAreVariantsShown(true)}>
              Show Options
            </button>
          ) : (
            <button onClick={() => handleAddItemToCart(product.variants[0].id)}>
              Add to Cart
            </button>
          )}
        </div>
        {areVariantsShown && (
          <ProductCardVariants
            handleAddItemToCart={handleAddItemToCart}
            variants={product.variants}
            closeVariants={() => setAreVariantsShown(false)}
          />
        )}
      </div>
    </li>
  );
}

export default ProductCard;
