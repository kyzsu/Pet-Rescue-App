import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// devTools untuk Router.
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// devTools untuk Query.
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "../Header";
import { CartContext } from "../contexts";
import PizzaOfTheDay from "../PizzaOfTheDay";

// disini kita ngebungkus div(ini merupakan App.jsx yang dipindahkan ke __root.jsx) lalu bagian Order.jsx di ganti dengan komponen dari Tanstack Router yaitu <Outlet />.

// <Outlet /> ini semacam pintu kemana saja (doraemon). Nantinya ketika kita mengakses suatu path (example: ke localhost:5173/order) path order ini akan dikaitkan dengan komponen <Order />. <Outlet /> akan menampilkan komponen sesuai dengan path yang kita akses.
export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);
    return (
      // React Fragment < + > = <>
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
