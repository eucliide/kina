# Software Requirements Specification (SRS)

**Version:** 1.0  
**Status:** Draft

---

# 1. Introduction

## Purpose

This document defines the functional and non-functional requirements for the Minimum Viable Product (MVP) of **Ki**.

It serves as the primary reference for development, testing, and future enhancements.

## Scope

Ki is a lightweight web application that facilitates structured, in-person conversations during social meetups. The application guides participants through conversation rounds using timed activities, random prompts, and partner assignments while minimizing interaction with mobile devices.

The MVP focuses exclusively on QR-code-based meetup participation and does **not** include:

- User accounts
- Event discovery
- Social networking features

---

# 2. Stakeholders

| Role | Responsibility |
|------|----------------|
| Participant | Joins and participates in meetup activities |
| Host | Starts, monitors, and manages meetup progress |
| Developer | Builds and maintains the application |
| Tester | Verifies application quality |

---

# 3. Functional Requirements

## Event Participation

### FR-001

Participants shall be able to join an event by scanning a QR code.

### FR-002

Participants shall enter a display name before joining.

### FR-003

Display names shall only be unique within the current event.

### FR-004

Participants shall automatically enter the waiting room after joining.

---

## Waiting Room

### FR-005

Participants shall see:

- Current meetup name
- Countdown until start
- Number of participants joined
- Event status

### FR-006

Participants shall remain synchronized with event updates in real time.

---

## Secret Missions

### FR-007

Each participant shall receive one random secret mission.

### FR-008

A mission shall not be assigned twice to the same participant during one event.

### FR-009

Mission content shall remain hidden until revealed.

---

## Pairing

### FR-010

Participants shall indicate they have found a partner.

### FR-011

Participants shall select their partner from the list of currently unpaired participants.

### FR-012

Partner selection shall update both participants.

### FR-013

Previously paired participants may pair again but should receive a recommendation to choose someone new.

---

## Conversation Rounds

### FR-014

Each round shall display:

- Activity title
- Partner name
- Remaining time
- Conversation prompt

### FR-015

Conversation prompts shall be selected randomly.

### FR-016

Conversation prompts shall belong to activity categories.

**Example categories:**

- Warm-up
- Story
- Reflection
- Dreams

---

## Round Management

### FR-017

Participants shall automatically receive updates when the host changes activities.

### FR-018

Round timers shall remain synchronized across all participants.

---

## Host

### FR-019

Hosts shall be able to:

- Start event
- Pause event
- Resume event
- Skip round
- End meetup

### FR-020

Hosts shall view:

- Participants
- Pairings
- Active round
- Remaining time

---

# 4. Non-functional Requirements

## Performance

- Initial page load under **2 seconds**
- Round updates under **500 ms**
- Support at least **100 concurrent participants**

## Reliability

- Participants shall recover automatically after refreshing the page.
- Event state shall persist if a participant disconnects temporarily.

## Usability

- Mobile-first interface
- Maximum of one primary action per screen
- Minimal text entry

## Accessibility

- WCAG AA color contrast
- Keyboard navigation
- Visible focus indicators
- Semantic HTML

## Security

- HTTPS only
- Server-side validation
- No sensitive information stored in browser storage

---

# 5. Business Rules

- **BR-001** — One participant belongs to one event.
- **BR-002** — A participant may only have one active partner at a time.
- **BR-003** — An event has one active round.
- **BR-004** — Questions are never repeated within the same round for the same pair.
- **BR-005** — Pair history exists only for the current meetup.

---

# 6. Constraints

- No authentication
- No user accounts
- QR-code entry only
- Mobile-first
- Internet connection required

---

# 7. User Stories

### US-001

**As a** participant,  
**I want** to join quickly,  
**So that** I can spend more time meeting people.

### US-002

**As a** participant,  
**I want** conversation prompts,  
**So that** I don't struggle to start conversations.

### US-003

**As a** host,  
**I want** to control activity timing,  
**So that** the meetup stays organized.

### US-004

**As a** participant,  
**I want** to know who my partner is,  
**So that** I don't accidentally join the wrong person.

---

# 8. Acceptance Criteria

A meetup is considered successful when:

- Participants complete every round.
- Pairing functions correctly.
- Timers remain synchronized.
- The meetup runs without constant host intervention.