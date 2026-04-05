# Pokédex for Real Life

Ein Pokédex für das echte Leben – scanne Objekte mit deiner Kamera und erhalte Pokédex-Einträge mit Stats und Fun Facts.

Basiert auf dem Projekt von [Adrian Twarog](https://www.youtube.com/@AdrianTwarog) ([Original-Repo](https://github.com/adriantwarog/Pokedex-RL)).

![Pokedex for Real Life](preview.gif)

## Tech Stack

- **Frontend/Backend:** Next.js 14
- **KI:** Google Gemini (Bilderkennung + Textgenerierung)
- **Sprache:** ElevenLabs (Text-to-Speech)
- **Datenbank:** MongoDB
- **Auth:** Nextcloud OIDC

## Setup

### Voraussetzungen

- Node.js 18+ oder Docker
- MongoDB-Instanz
- API-Keys (siehe `.env.example`)

### Mit Docker

```bash
cp .env.example .env
# .env ausfüllen (MONGODB_URI=mongodb://mongo:27017)
docker compose up --build
```

### Ohne Docker

```bash
cp .env.example .env
# .env ausfüllen
npm install
npm run dev
```

App läuft auf [http://localhost:3000](http://localhost:3000).

## Umgebungsvariablen

Siehe `.env.example` für alle benötigten Variablen:

| Variable | Beschreibung |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key |
| `MONGODB_URI` | MongoDB Connection String |
| `ELEVENLABS_API_KEY` | ElevenLabs TTS API Key |
| `ELEVENLABS_VOICE_ID` | ElevenLabs Voice ID |
| `NEXTCLOUD_ISSUER` | Nextcloud OIDC Issuer URL |
| `NEXTCLOUD_CLIENT_ID` | Nextcloud OAuth Client ID |
| `NEXTCLOUD_CLIENT_SECRET` | Nextcloud OAuth Client Secret |
| `NEXTAUTH_SECRET` | NextAuth Session Secret |
| `NEXTAUTH_URL` | App URL (z.B. http://localhost:3000) |
