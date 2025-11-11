import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  // disini kita pake useMutation karena kita mau POST/PUT, mau mutasikan data, bukan fetching data.
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      // kita pake formData (karena kita ga pake useState), kalau pake useState maka form kita bersifat controlled, artinya setiap input itu dikendalikan oleh hook. kalau uncontrolled sebaliknya.
      const formData = new FormData(e.target);
      // kita gunakan formData.get("nama inputan") untuk ambil valuenya.
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {/* kondisi jika kita sudah submit */}
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        // kondisi sebelum
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

// selesai
// betul

// masih lanjut kita
// sampai react 19
