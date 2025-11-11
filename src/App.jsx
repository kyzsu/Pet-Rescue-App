// hapus useState karena cartHook udah pindah ke __root.jsx
import { createRoot } from "react-dom/client";
// import RouterProvider, createRouter dan RouteTree
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Konfigurasi awal untuk router supaya dia bisa mengenali route yang kita buat.
const router = createRouter({ routeTree });

// betul.

// sampai sini ada pertanyaan?
// Fungsi tanstack yang mana?
// Router untuk routing, supaya bisa menyambung pages, bisa buka page lain dsbnya.
// Kalo Query untuk Fetching.
// Itu aja, kalo mau pake library yang lai gpp.
// Kalo routing tanstack doang yang bagus
// kalo Query ada RTK Query ==> Redux Toolkit Query.
// Outlet tau darimana gitu?

// betul, kita bikin dulu instance dari QueryClient supaya bisa dipake dalam provider. iya. Supaya bisa query di dalam setiap page yang kita bikin.
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
