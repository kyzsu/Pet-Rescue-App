import { Component } from "react";
import { Link } from "@tanstack/react-router";

// disini kita pake legacy component "Class"
class ErrorBoundary extends Component {
  // class component tidak bisa menggunakan hooks, tapi dia punya fitur yang mirip dengan hooks yang dinamakan "lifecycle ..." lupa.

  // state ==> useState. disini kita punya props hasError dgn default value => false.
  state = { hasError: false };

  // static untuk mengubah hasError jadi true kalau terdeteksi ada error.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // ini juga sama, api dia akan menangkap error lalu menampilkan sebagai console.
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  // baru disini rendernya / fungsi render.
  render() {
    // throw new Error("lol");

    // jika hasError = true, tampilkan error boundary
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      );
    }

    // kalau gak ada error, tampilkan children.
    return this.props.children;
  }
}

export default ErrorBoundary;
