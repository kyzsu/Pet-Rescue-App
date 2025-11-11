import { useContext, useEffect, useState } from "react";
// Iya, Lazy itu dari tanstack.
import { createLazyFileRoute } from "@tanstack/react-router";
import Cart from "../Cart";
import Pizza from "../Pizza";
import { CartContext } from "../contexts";

// Order.jsx dipindahkan ke folder routes. lalu di rename jadi order.lazy.jsx.

// untuk format angka menjadi bilangan kurs
const kurs = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// disini kita declare variable Route yang akan menangani path "/order". Setiap kali kita mengakses "/order", dia akan menampilkan komponen <Order />.
// Paham gak??
export const Route = createLazyFileRoute("/order")({ component: Order });

export default function Order() {
  const [cart, setCart] = useContext(CartContext);
  // state untuk pizza yang dipilih (form)
  const [pizzaType, setPizzaType] = useState("pepperoni");
  // state untuk ukuran pizza yang dipilih (form)
  const [pizzaSize, setPizzaSize] = useState("M");
  // state untuk menyimpan jenis-jenis pizza yang diperoleh dari API
  const [pizzaTypes, setPizzaTypes] = useState([]);
  // state untuk menyimpan loading state dari API.
  const [loading, setLoading] = useState(true);
  // state untuk menyimpan barang dalam cart.
  // const [cart, setCart] = useState([]);

  //   sekadar declare tanpa memberi value
  let price, selectedPizza;
  // if loading === false
  if (!loading) {
    // assign value ke selectedPizza
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    //
    price = kurs.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  //   hanya akan dijalankan saat page selesai di-render. (1x)
  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    // for testing purposes only. untuk delay selama 3 detik (menciptakan env real)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // calling API
    const response = await fetch("/api/pizzas");
    // parsing responsenya ke JSON
    const json = await response.json();
    // hasil parsing di assign ke state: pizzaTypes
    setPizzaTypes(json);
    // ubah state loading jadi false.
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCart([
            ...cart,
            { pizza: selectedPizza, size: pizzaSize, price: price },
          ]);
        }}
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              onBlur={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option value={pizza.id} key={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  id="pizza-s"
                  checked={pizzaSize === "S"}
                  value="S"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  id="pizza-m"
                  checked={pizzaSize === "M"}
                  value="M"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  id="pizza-l"
                  checked={pizzaSize === "L"}
                  value="L"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Tambahkan ke keranjang</button>
        </div>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
      {loading ? <h2>Loading...</h2> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
}
