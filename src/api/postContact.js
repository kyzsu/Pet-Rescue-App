// function postContact menerima 3 parameter (name, email dan message)
export default async function postContact(name, email, message) {
  // ngepost ke api contact.
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  // jika response tidak ok, maka error.
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // jika response ok, parsing json.
  return response.json();
}
