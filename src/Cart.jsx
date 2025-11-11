const kurs = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Cart({ cart, checkout }) {
  let total = 0;

  // iterasi untuk menghitung total harga yang perlu dibayar karena cart kita dapat menampung lebih dari satu pizza.
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> |
            <span className="type">{item.pizza.name}</span> |
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total price: {kurs.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
