# HeDiaF · Sitio de presentación (InnovaTecNM 2026)

Sitio Flask independiente del sistema clínico. Muestra el proyecto y enlaza al sistema de pruebas.

## Local
    pip install -r requirements.txt
    python app.py        # http://localhost:5000

## Render
Build: `pip install -r requirements.txt` · Start: `gunicorn app:app --bind 0.0.0.0:$PORT`
Variables opcionales: DEMO_URL, GITHUB_URL, CONTACT_PHONE, CONTACT_EMAIL

## Logo propio
Copia tu logo como `static/img/logo.png` (se usa automáticamente en lugar de logo.svg).
