import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Email: contacto@huertohogar.cl</p>
          <p>Tel: +56 9 1234 5678</p>
        </div>

        <div className="footer-col footer-social">
          <h4>Síguenos</h4>
          <a href="https://www.youtube.com/@Huertohogar">YouTube</a>
          <a href="https://www.x.com/@Huertohogar">Twitter</a>
          <a href="https://www.instagram.com/Huertohogar/">Instagram</a>
        </div>

        <div className="footer-col footer-map">
          <h4>Encuéntranos</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13280.673431944697!2d-71.22780159999999!3d-33.67870455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scl!4v1757370450071!5m2!1ses-419!2scl"
            width="250"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación HuertoHogar"
          ></iframe>
        </div>
      </div>
      <p>© HuertoHogar</p>
    </footer>
  );
}
