# Himalayan Travels

Next.js site for HP Tourism: Home, Tour Packages, About Us and Contact Us.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact details

Phone, WhatsApp, email and office addresses live in `.env`. Copy `.env.example` if you do not have one yet. Restart the dev server after changing them.

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_PHONE=919876543210
NEXT_PUBLIC_EMAIL=northhimalayantravels@gmail.com
```

Use digits only for WhatsApp, including the country code.

## Enquiry form and Pushover

The contact form posts to `/api/enquiry`. The server sends the message to your Pushover app.

1. Create a Pushover application at [pushover.net/apps/build](https://pushover.net/apps/build) and copy the API token.
2. Copy your user key from the Pushover dashboard.
3. Put both values in `.env`:

```
PUSHOVER_API_TOKEN=your_app_token
PUSHOVER_USER_KEY=your_user_key
```

Do not commit `.env`. Those keys stay on the server.
