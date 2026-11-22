"""HeDiaF · Sitio de presentación (landing) para InnovaTecNM 2026 – Etapa Nacional.

Es un sitio independiente del sistema clínico: solo muestra el proyecto y
enlaza al sistema de pruebas (DEMO_URL).
"""
import os
from flask import Flask, render_template, redirect, jsonify

app = Flask(__name__)

# ---- Configuración editable (también por variables de entorno en Render) ----
DEMO_URL = os.environ.get("DEMO_URL", "https://hediaf-sistema.onrender.com/")
GITHUB_URL = os.environ.get("GITHUB_URL", "https://github.com/Luvel0307/hediaf-sistema")
PHONE = os.environ.get("CONTACT_PHONE", "2491316259")
EMAIL = os.environ.get("CONTACT_EMAIL", "hediafgv@gmail.com")


def _logo():
    """Si existe static/img/logo.png (tu logo real), se usa; si no, logo.svg."""
    png = os.path.join(app.static_folder, "img", "logo.png")
    return "img/logo.png" if os.path.exists(png) else "img/logo.svg"


@app.context_processor
def inject_globals():
    return dict(
        demo_url=DEMO_URL,
        github_url=GITHUB_URL,
        phone=PHONE,
        phone_fmt=f"{PHONE[:3]} {PHONE[3:6]} {PHONE[6:]}",
        wa_url=f"https://wa.me/52{PHONE}?text=Hola%2C%20me%20interesa%20conocer%20HeDiaF",
        email=EMAIL,
        logo=_logo(),
    )


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/demo")
def demo():
    """Atajo corto: hediaf-web.onrender.com/demo -> sistema de pruebas."""
    return redirect(DEMO_URL, code=302)


@app.route("/health")
def health():
    return jsonify(status="ok")


@app.after_request
def headers(resp):
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    if resp.mimetype in ("text/css", "application/javascript", "image/jpeg", "image/svg+xml", "image/png"):
        resp.headers["Cache-Control"] = "public, max-age=86400"
    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)
