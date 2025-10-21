export default function Fail() {
  const last = JSON.parse(localStorage.getItem("hh_last_order") || "{}");
  return (
    <div className="container text-center my-5">
      <h2>❌ No se ha realizado la compra</h2>
      <p>Intento nro <strong>#{last?.id || "—"}</strong>. Por favor, intenta nuevamente.</p>
    </div>
  );
}
