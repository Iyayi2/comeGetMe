import Product from '../../models/Product';

export default function Products({ products }: { products: Product[] }) {
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <img
              src={`http://localhost:3000/${product.imageUrl}`}
              alt='product'
              style={{ width: '10rem' }}
            />
          </div>
        );
      })}
    </div>
  );
}
