# Kina

Kina is a mobile-first, in-person conversation experience that helps participants meet, pair, and rotate through guided conversations with realtime coordination.

## Key features

- Event creation and join flow with event codes
- Anonymous Supabase-authenticated sessions
- Realtime lobby presence and invitations
- Timed meeting stages with authoritative round timing
- Conversation Journey prompts loaded from Supabase
- Secret missions, WNRS reflection, Gather Around, and TableTopics stages

## Architecture overview

- **Frontend:** React 19 + TypeScript + Vite
- **Routing:** React Router (SPA)
- **Data/Auth/Realtime:** Supabase (`@supabase/supabase-js`)
- **Styling:** Tailwind CSS v4 + global stylesheet entry (`client/src/styles/globals.css`)
- **Motion/UI:** framer-motion + lucide-react

### State boundaries

- **Server-authoritative:** event round/timing and shared event data (Supabase)
- **Persisted client session:** joined event/participant + local meeting session
- **UI-derived:** stage countdown, transition presentation, view-only state

## Repository structure

```text
.
├── client/                  # Web app (primary package)
│   ├── src/app/             # Router and app shell
│   ├── src/features/        # Feature-first modules
│   ├── src/lib/             # Shared client libraries
│   └── vercel.json          # SPA rewrite config
├── database/
│   └── migrations/          # SQL migrations and RPC setup
└── docs/                    # Product/architecture docs
```

## Package management

This repository uses a **single npm workspace root** (`package.json`) with `client/` as the application workspace.

- Install once at repository root.
- Use root scripts (delegating to `client`) for day-to-day development.

## Prerequisites

- Node.js 20+
- npm 10+
- Supabase project (URL + anon key)

## Environment variables

Create `client/.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_public_anon_key
```

Never commit secrets. Use only public anon keys on the client.

## Local setup

```bash
git clone <repo-url>
cd kina
npm install
npm run dev
```

Open the Vite URL shown in terminal.

## Commands

From repository root:

- `npm run dev` – start local dev server
- `npm run build` – typecheck + production build
- `npm run lint` – run ESLint
- `npm run preview` – preview production build
- `npm run format` – format files
- `npm run format:check` – check formatting

## Testing, typecheck, lint, build

Current repository scripts provide:

- Typecheck via `tsc -b` inside `npm run build`
- Lint via `npm run lint`

There is no dedicated automated test script configured in `client/package.json` at this time.

## Supabase and database workflow

Database SQL lives in `database/migrations/`, including round-management RPC setup used by meeting synchronization.

Typical flow:

1. Apply migrations to your Supabase project.
2. Ensure prompts, missions, and event tables contain required content.
3. Run the app and verify realtime subscriptions in lobby/meeting flows.

## Realtime and auth notes

- Client bootstraps anonymous auth before entering app flows.
- Lobby presence/invitation updates and meeting timing sync use Supabase Realtime channels.
- Meeting rounds are initialized/read from authoritative event state and synchronized across reconnect/reload.

## Deployment

`client/vercel.json` includes SPA rewrites to `index.html`, indicating Vercel-compatible deployment for the frontend.

High-level deployment steps:

1. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in hosting env vars.
2. Build with `npm run build`.
3. Deploy `client/` build output (Vite `dist/`) with SPA rewrites.

## Contributing

1. Create a focused branch.
2. Keep changes scoped and architectural boundaries clear.
3. Run `npm run lint` and `npm run build` before opening/updating PRs.
4. Document any known limitations or follow-ups in the PR.

## Troubleshooting

- **“Missing Supabase environment variables.”**
  - Confirm `client/.env.local` exists and includes both required `VITE_` variables.
- **Prompt missing in meeting stage**
  - Verify Supabase prompt rows exist for `activity_id=conversationJourney`, current rotation, and stage.
- **Participants not updating in lobby**
  - Check Supabase Realtime is enabled and channel subscriptions are healthy.

## Security guidance

- Do not commit Supabase service-role keys or private tokens.
- Keep all sensitive credentials in deployment/environment configuration.
- Treat prompt/content tables as production data and manage changes via reviewed migrations/content ops.

## License

MIT (see repository licensing files/history).

## Status

Active development.
