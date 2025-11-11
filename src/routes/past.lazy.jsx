import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";

// masuk ke past.lazy, kita import Modal.

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// buat routenya.
export const Route = createLazyFileRoute("/past")({
  component: PastOrdersRoute,
});

function PastOrdersRoute() {
  // untuk simpan id order yang sedang aktif.
  const [focusedOrder, setFocusedOrder] = useState();
  // usestate untuk pagination
  const [page, setPage] = useState(1);

  // useQuery buat manggil fungsi getPastOrders.
  // useQuery menerima sebuah object. atribut wajib adalah queryKey dan queryFn(function).
  // QueryKey itu menerima dua element. element pertama adalah label Query (nama query yang kita eksekusi) dan kedua adalah payload, dalam hal ini adalah page. karena nantinya kita bakal buat pagination, maka kita perlu atur page mana yang mau kita akses. Defaultnya adalah "page 1" sesuai useState page diatas.
  // staleTime: untuk menunda fetching berikutnya. eh bentar. oh sama ternyata. Jadi staleTime itu untuk menunda fetching kedua ketiga dan sebagainya. dia bakal re-fetch only every 30secs. mau gagal or berhasil. Menghindari spamming semisal hacker mau DDOS dengan cara re-fetch setiap pagenya di-refresh.

  // iya destructure. property. iya. useQuery itu mempermudah dalam penanganan statenya. Jadi semisal dia lagi fetching, kita bisa gunakan "isLoading" untuk menampilkan tampilan loadingnya. Kalo fetching gagal, pake "isError" untuk menampilkan error pagenya, dsbnya. Banyak manfaatnya.
  // useQuery juga menyimpan hasil querynya. Makanya ketika kita pindah ke page yang belum di buka, dia akan fetching, namun ke page yang sudah pernah dipanggil, dia tidak akan nge-fetch/call API lagi. Kecuali sudah lewat dari 30 detik. Betul. Ga harus 30.
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  // ada apa dengan strictmode? strictmode bikin app render dua kali. matiin strict mode.

  // karena di useQuery diatas sudah pake isLoading dan data, maka kita declare pake nama yang berbeda (ex: isLoadingPastOrder, pastOrderData).
  // queryKey dan queryFn fungsinya sama.
  // prop enabled ini maksudnya kalo focusedOrder ada isinya baru dia di query-in.
  // jadi kan kita punya yang namanya focusedOrder, defaultnya apa? kosong kan. focusedOrder ada isinya ketika kita ngeclick button yang ada pada masing-masing row.
  // staleTime dibikin 1 hari. karena past order sangat jarang berubah valuenya. ga ada staletime dia akan fetching terus.
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>Loading …</h2>
      </div>
    );
  }

  // ini default returnnya. Jadi kalo "isLoading" sudah gak true, maka default return yang dikembalikan.

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {/* kemudian datanya di-mapping. */}
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {/* sebelum div terakhir, betul. */}
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{intl.format(pizza.price)}</td>
                    <td>{intl.format(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}
          <button onClick={() => setFocusedOrder()}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
