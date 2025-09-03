export const ProductList = ({ products }) => (
  <ul>
    {products.map(product => (
      <li data-cy="Good" key={product}>
        {product}
      </li>
    ))}
  </ul>
);
