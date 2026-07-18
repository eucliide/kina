# System Architecture

Version: 1.0

---

# Overview

Ki follows a client-server architecture designed for real-time event synchronization.

Participants interact through a lightweight web application while a central backend maintains the authoritative state of each meetup.

The architecture prioritizes simplicity, reliability, and maintainability.

---

# Architecture Principles

## Single Source of Truth

The backend owns all event state.

Clients never determine the current meetup phase independently.

---

## Event Driven

The current event phase determines what every participant sees.

Participant interfaces react to event updates instead of controlling application flow.

---

## Stateless Clients

Clients should contain only temporary UI state.

Refreshing the page should reconstruct the interface from the server.

---

## Thin Frontend

The frontend focuses on:

- rendering UI
- user interaction
- animations

Business logic belongs on the server.

---

# High-Level Architecture

                   Browser
                      │
                      │ HTTPS / WebSocket
                      ▼
              API + Realtime Server
                      │
              Business Services
                      │
                 PostgreSQL

---

# Frontend Responsibilities

The frontend is responsible for:

- Rendering screens
- Collecting user input
- Displaying timers
- Receiving realtime updates
- Showing conversation prompts
- Handling animations

The frontend must not:

- Decide event phases
- Generate pairings
- Manage timers
- Store business state

---

# Backend Responsibilities

The backend is responsible for:

- Event lifecycle
- Current phase
- Pair validation
- Question assignment
- Mission assignment
- Round scheduling
- Realtime synchronization

---

# Services

The backend is divided into independent services.

## Event Service

Responsibilities

- Create events
- Start events
- Finish events
- Maintain current phase

---

## Participant Service

Responsibilities

- Join event
- Leave event
- Validate names
- Maintain participant status

---

## Pairing Service

Responsibilities

- Create pairings
- Prevent duplicate pairing
- Track pairing history

---

## Question Service

Responsibilities

- Select conversation prompts
- Prevent repetition
- Filter by category

---

## Mission Service

Responsibilities

- Assign missions
- Ensure uniqueness
- Reveal missions

---

## Round Service

Responsibilities

- Determine current round
- Manage schedule
- Transition between phases

---

# Realtime Communication

Realtime updates are used for:

- Current phase
- Timer changes
- New pairings
- Participant joins
- Organizer actions

Clients subscribe after joining an event.

---

# Event Lifecycle

Draft

↓

Scheduled

↓

Waiting

↓

Active

↓

Finished

↓

Archived

---

# Meetup Phase State Machine

WAITING

↓

MISSION

↓

PAIRING

↓

CONVERSATION

↓

SWITCH

↓

PAIRING

↓

...

↓

REFLECTION

↓

FINISHED

Only valid transitions are permitted.

---

# Error Recovery

If a participant refreshes the page:

1. Restore participant
2. Retrieve event
3. Determine current phase
4. Render appropriate screen

No participant should lose their place because of a page refresh.

---

# Security

- HTTPS only
- Server-side validation
- Input sanitization
- Event-specific participant isolation
- Rate limiting
- Secure QR identifiers

---

# Scalability

The architecture supports:

- Multiple simultaneous events
- Hundreds of participants
- Future recurring events
- Additional meetup templates

without requiring architectural changes.