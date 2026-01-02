function ProductCard({ name, description, id, handleAddItemToCart }) {
  return (
    <li>
      <div className="itemCard">
        <h2>{name}</h2>
        <p>{description}</p>
        <button onClick={() => handleAddItemToCart(id)}>Add to Cart</button>
      </div>
    </li>
  );
}

export default ProductCard;
