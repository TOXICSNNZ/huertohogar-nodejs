export default function Success() {
  const last = JSON.parse(localStorage.getItem("hh_last_order") || "{}");
  return (
    <div className="container text-center my-5">
      <h2>✅ Compra realizada con éxito</h2>
      <p>Se ha realizado la compra nro <strong>#{last?.id || "—"}</strong>.</p>
      <p>Gracias por confiar en HuertoHogar. ¡Tu pedido está en camino! 🚚</p>
    </div>
  );
}
