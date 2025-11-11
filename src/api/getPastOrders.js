export default async function getPastOrders(page) {
  // fetching data riwayat order.
  const response = await fetch(`/api/past-orders?page=${page}`);
  // parsing responsenya.
  const json = await response.json();
  return json;
}

// jadi, json itu bakal dianggap sebagai property "data" dari useQuery.

// iyaa.
// maksudnya gmn tu?
// oh pas fetching past ordernya keliatan order sebelumnya?
// karena setiap order itu bakal kecatat dalam dbnya. makanya tampil orderan kalian di hari sebelumnya. descending? iya. latest -> earliest. terbaru ke terlama.
