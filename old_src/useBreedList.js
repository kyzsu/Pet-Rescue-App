import { useState, useEffect } from "react";

// custom hooks ==> gabungan dari beberapa hooks native untuk mengerjakan suatu hal yang spesifik. (ex: useBreedList untuk fetching list breed hewan.)

// localCache ==> gudang lokal yang berada di dalam browser (sifatnya ephemeral). Ephemeral artinya kalau browser/tabnya di refresh/close data dalam localCache akan hilang.

// dipake kalau tidak mau menggunakan Context/Global State Management. Zustand, Redux (RTK Query), useContext. untuk mengatasi yang namanya "prop-drilling".

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("kosong");

  useEffect(() => {
    if (!animal) {
      // animal = ""
      setBreedList([]);
    } else if (localCache[animal]) {
      // jika animalnya sudah pernah di search, maka kembalikan data dari gudang (localCache).
      setBreedList(localCache[animal]);
    } else {
      // jika animalnya belum pernah dicari, maka lakukan call API via RequestBreedList.
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await response.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("Loaded Successfully");
    }
  }, [animal]);

  return [breedList, status];
}
