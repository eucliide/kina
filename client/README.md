# Kina

Kina is a cinematic, in-person conversation experience designed to help people have meaningful conversations without becoming glued to their phones.

Kina is not a social network, messaging app, dating app, or productivity tool.

Its purpose is simple:

> Bring people together, give them a reason to talk, and then get the phone out of the way.

---

## Product Vision

Kina creates a guided social experience where participants:

1. Join an event.
2. Enter their name.
3. Receive a private secret mission.
4. Enter the lobby.
5. Choose conversation partners.
6. Have timed conversations guided by meaningful prompts.
7. Rotate through different partners.
8. Complete a shared WNRS-style reflection.
9. Gather around.
10. Continue into table conversation topics.
11. Finish the experience without ratings, scores, likes, or social-performance pressure.

The experience should feel:

- cinematic
- intentional
- warm
- premium
- minimal
- human
- playful without being childish
- technologically polished without feeling like "an app"

---

# Core Experience Principle

Technology should facilitate the gathering, not dominate it.

Avoid:

- excessive UI
- unnecessary dashboards
- gamification for its own sake
- points
- leaderboards
- ratings
- likes
- social feeds
- notification-heavy interactions
- unnecessary forms
- generic SaaS layouts
- excessive animations
- "AI-looking" interfaces

The participant should spend most of the experience talking to another human.

---

# Technical Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion / Motion Primitives where appropriate

## Backend / Data

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime

## Architecture

Feature-based React architecture.

Example:

src/
app/
components/
features/
activity/
create/
event/
gather-around/
join/
lobby/
meeting/
mission/
passport/
reflection/
table-topics/
wnrs/
lib/
types/

Business logic belongs in feature services/hooks rather than being duplicated inside pages.

---

# Data Ownership

Dynamic event content belongs in Supabase.

This includes:

- conversation prompts
- WNRS prompts
- TableTopics prompts
- secret missions
- event participants
- invitations
- mission assignments
- event configuration

Do NOT introduce static prompt arrays when equivalent content already exists in the database.

Database content should be retrieved through service functions.

---

# Conversation Journey

The Conversation Journey currently consists of four partner rotations:

1. Getting Comfortable
2. Sharing Stories
3. Discovering Values
4. Looking Forward

Each partner rotation contains conversation stages.

The current conversation prompt is loaded from:

prompts

using:

- activity_id
- partner_rotation
- stage_id
- is_active

The UI must never hard-code production conversation prompts.

---

# Partner Rotation

Partner rotation is currently four conversations.

The system does NOT automatically force arbitrary pairings.

The intended experience is:

- participants see available people
- a participant chooses someone
- the other participant accepts
- the conversation begins
- the completed conversation returns the participant to the lobby
- the next partner rotation advances
- participants should naturally meet different people

The system must avoid repeatedly pairing the same people where possible.

Partner rotation state is currently represented by:

MeetingSession.partnerRotation

Do not introduce another competing rotation system without first reconciling it with MeetingSession.

---

# Secret Missions

Secret missions are private.

Each participant receives one mission for the event.

Mission assignments are stored in:

mission_assignments

Mission content is stored in:

missions

Canonical activity ID:

secretMission

Missions must not be hard-coded into the UI.

The mission should feel like a subtle social invitation rather than a competitive challenge.

---

# WNRS

WNRS is a shared reflection stage.

WNRS prompts are stored in:

prompts

Canonical activity ID:

wnrs

The experience should provide one shared question and encourage participants to reflect together.

It should NOT become a survey.

No:

- ratings
- scoring
- answer submission requirements
- public responses

---

# Gather Around

Gather Around is NOT a game.

It is a transition screen/message.

Its purpose is simply to tell participants to assemble before moving into TableTopics.

It should be brief.

Example intent:

"Gather around."

"Find your table. The next conversation starts together."

Do not add unnecessary interaction.

---

# TableTopics

TableTopics is a group conversation stage.

Topics are stored in Supabase.

Canonical activity ID:

tabletopics

The system loads a topic from the database.

The experience includes a lightweight random nudge encouraging one participant to read the next topic.

Example:

"Sarah, read the next one."

The nudge must:

- feel playful
- remain subtle
- avoid creating a competitive mechanic
- rotate fairly
- avoid repeatedly selecting the same participant until everyone has had a chance

---

# Lobby

The lobby is the participant's social staging area.

Presence:

- available
- inConversation

The lobby should clearly communicate who can currently be invited.

The participant should be able to:

- select an available participant
- send an invitation
- see a pending invitation
- accept an incoming invitation
- decline an invitation

Realtime updates should keep the participant list and invitations synchronized.

---

# Meeting

A meeting is a timed conversation.

The meeting contains stages.

Each stage has:

- stage ID
- title
- chapter
- duration

The timer belongs to the stage.

When a stage completes:

1. complete the current passport chapter
2. show transition state
3. advance to the next stage
4. reset the timer
5. load the next prompt

When the partner conversation completes:

- rotations 1–3 return to the lobby
- rotation 4 proceeds to WNRS

---

# Passport

The Conversation Passport visually represents progress through the Conversation Journey.

It should feel like a subtle journey indicator rather than a progress bar in a productivity application.

It should reinforce:

> "You are moving through an experience."

Not:

> "Complete your tasks."

---

# Reflection

Reflection happens after a completed conversation.

The current reflection experience should remain lightweight.

It may include:

- acknowledgement of the conversation
- one final invitation/question
- continuation back into the experience

Do not turn reflection into a form.

---

# Routing

Current major routes:

/
/create
/join
/join/name
/secret-mission
/lobby
/meeting
/wnrs
/reflection
/gather-around
/table-topics

Before introducing a new route:

1. verify whether an existing route already serves the purpose
2. reuse the existing route if possible
3. avoid changing URLs unnecessarily because the application is currently undergoing integration testing

---

# UI Direction

Kina should NOT look like a generic AI-generated SaaS dashboard.

Avoid:

- giant rounded cards everywhere
- excessive gradients
- excessive glassmorphism
- excessive shadows
- generic purple/blue AI aesthetics
- oversized buttons
- excessive text
- unnecessary icons
- dense dashboards
- default Tailwind-looking layouts

Use:

- strong typography
- intentional spacing
- restrained borders
- subtle depth
- cinematic dark navy
- small amounts of glow
- elegant transitions
- purposeful motion
- concise copy

---

# Motion

Motion should communicate:

- transition
- arrival
- progress
- attention
- connection
- completion

Motion should NOT exist merely because animation is possible.

Use Motion Primitives where they genuinely improve the experience.

Preferred areas:

- page transitions
- prompt transitions
- lobby participant appearance/disappearance
- invitation state changes
- meeting stage transitions
- WNRS reveal
- Gather Around transition
- TableTopics topic changes
- subtle hero/landing motion

Motion Primitives should complement the existing component system rather than replace it wholesale.

Reference:

https://motion-primitives.com/

---

# Component Discipline

Prefer reusable components.

Do not duplicate:

- buttons
- headings
- cards
- containers
- timers
- participant rows
- invitation states
- transition UI

Existing shared UI components should be reused before creating new variants.

---

# Database Discipline

Before adding a new database table:

1. verify whether an existing table can represent the requirement
2. inspect existing schema
3. inspect existing services
4. preserve existing relationships
5. avoid duplicate sources of truth

Do not move production content back into local arrays.

---

# TypeScript Discipline

The project must build cleanly.

Do not solve TypeScript errors by:

- using `any`
- disabling strict checks
- suppressing errors with `@ts-ignore`
- deleting functionality
- commenting out failing code
- weakening interfaces without understanding the architecture

Fix the underlying contract.

---

# Build Requirement

Before any feature is considered complete:

npm run build

must succeed.

Also verify:

npm run lint

when applicable.

No sprint is complete while the production build is broken.

---

# Agent Rules

Any coding agent working on Kina must:

1. Inspect existing architecture before changing it.
2. Reuse existing services/types/components.
3. Avoid speculative refactors.
4. Avoid creating duplicate state systems.
5. Avoid changing routes unnecessarily.
6. Avoid replacing working Supabase logic.
7. Avoid hard-coded production content.
8. Make the smallest safe change.
9. Run the build after changes.
10. Report exactly what changed.
11. Report what was tested.
12. Report remaining issues.
13. Never claim success without verification.

---

# Current Priority

The immediate priority is NOT adding another feature.

The immediate priority is:

1. restore a clean TypeScript build
2. verify routing
3. verify Supabase integration
4. verify the complete participant flow
5. verify multi-participant rotation
6. verify WNRS
7. verify Gather Around
8. verify TableTopics
9. polish UI
10. deploy and perform realistic event testing

---

# Definition of Done

Kina is ready for event testing when:

- npm run build passes
- npm run lint passes or known lint exceptions are documented
- all production routes resolve
- Supabase content loads correctly
- secret missions load and assign correctly
- invitations work
- lobby presence updates
- conversations start correctly
- stage timers work
- partner rotation advances correctly
- participants return to the lobby correctly
- WNRS loads database content
- Gather Around transitions correctly
- TableTopics loads database content
- random reader nudges work
- no participant is permanently blocked by another participant's state
- no production prompt content is hard-coded
- UI remains coherent across the full flow
