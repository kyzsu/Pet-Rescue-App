import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// sekarang kita masuk ke Modal.jsx

// Modal menerima 1 parameter yaitu children.
const Modal = ({ children }) => {
  // kita declare elRef. useRef ini memiliki property
  // .current. kita set default valuenya null.
  const elRef = useRef(null);

  // check, apakah elRef.current itu bernilai falsy atau belum ada isinya.
  if (!elRef.current) {
    // jika falsy, maka ketika elRef.current dipanggil akan membuat sebuah "div".
    elRef.current = document.createElement("div");
  }

  // disini kita pake useEffect yang berjalan sekali setelah page selesai di render.
  useEffect(() => {
    // modalRoot merupakan referensi/instance dari div#modal.
    const modalRoot = document.getElementById("modal");
    // div#modal kemudian di append dengan div yang berasal dari elRef.current.
    modalRoot.appendChild(elRef.current);
    // return ini merupakan clean up callback function, yang akan dijalankan ketika modal ditutup.
    return () => modalRoot.removeChild(elRef.current);
    // kenapa dia jalan pas ditutup?
    // karena itu tugasnya. Jadi returnnya itu jalan hanya kalo selesai dipake aja. dan close salah satu kondisi ditutup.
  }, []);

  // ketika modal dipakai, dia akan memanggil fungsi createPortal yang akan menghasilkan div baru berisi children dari argumen diatas. "div" dari createPortal akan di bungkus dengan "div" dari elRef.current. Berikut visualisasinya, sehabis nyatet. udah? liat visualisasi biar paham ya
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
