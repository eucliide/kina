# Architecture Decision Records (ADR)

Version: 1.0

Status: Living Document

---

# Overview

This document records important architectural decisions made during the development of Ki.

Each decision explains

- Context
- Decision
- Consequences

New decisions should be appended rather than modifying previous records.

---

# ADR-001

## Title

No User Accounts

### Status

Accepted

### Context

Ki is designed for quick participation during in-person meetups.

User registration introduces unnecessary friction.

### Decision

Participants join using

- QR Code
- Display Name

No authentication is required for the MVP.

### Consequences

Advantages

- Fast onboarding
- Simpler backend
- Lower maintenance
- Better participant experience

Disadvantages

- Anonymous users
- No persistent identity
- No participant history

---

# ADR-002

## Title

Server Authoritative State

### Status

Accepted

### Context

Allowing clients to manage event progress can result in inconsistent states.

### Decision

The backend owns the current event state.

Clients render UI based entirely on server responses.

### Consequences

Advantages

- Consistent synchronization
- Simpler frontend
- Easier debugging

Disadvantages

- Requires realtime communication

---

# ADR-003

## Title

Automatic Event Progression

### Status

Accepted

### Context

Organizers should participate rather than constantly manage the meetup.

### Decision

Events automatically progress according to their predefined schedule.

Organizers may only intervene when necessary.

Available interventions

- Pause
- Resume
- Extend
- Skip
- End

### Consequences

Advantages

- Less organizer workload
- Consistent experience
- Better participant engagement

Disadvantages

- Requires careful schedule planning

---

# ADR-004

## Title

Configuration and Execution Separation

### Status

Accepted

### Context

Event configuration should remain unchanged while the meetup is running.

### Decision

Separate

Template

↓

Event

↓

Live Meeting

Configuration is immutable.

Execution is mutable.

### Consequences

Advantages

- Cleaner architecture
- Easier recurring events
- Safer updates

---

# ADR-005

## Title

Participant-Centered Interface

### Status

Accepted

### Context

Participants should spend minimal time interacting with their phones.

### Decision

Every participant screen has one primary action.

The application should disappear into the background once interaction is complete.

### Consequences

Advantages

- More face-to-face conversation
- Less distraction
- Clearer interface

---

# ADR-006

## Title

Vertical Slice Backend Architecture

### Status

Accepted

### Context

Traditional layered architectures become harder to navigate as projects grow.

### Decision

Backend modules are organized by business domain.

Example

event/

participant/

pairing/

question/

mission/

round/

Each module contains its own

- controller
- service
- repository
- routes
- validation
- types

### Consequences

Advantages

- Easier navigation
- Better scalability
- Improved ownership

Disadvantages

- Slight duplication between modules

---

# ADR-007

## Title

Backend for Frontend (BFF)

### Status

Accepted

### Context

Participants should not make multiple API requests to assemble one screen.

### Decision

Expose a participant session endpoint that returns all information required for the current phase.

### Consequences

Advantages

- Simpler frontend
- Fewer API calls
- Faster screen rendering

---

# ADR-008

## Title

Documentation Before Implementation

### Status

Accepted

### Context

Many projects accumulate technical debt because architecture evolves only after coding begins.

### Decision

Every major feature follows the workflow

Think

↓

Document

↓

Design

↓

Implement

↓

Review

↓

Test

↓

Deploy

### Consequences

Advantages

- Better planning
- Fewer rewrites
- Higher quality documentation
- Cleaner implementation

---

# Future ADRs

Future architectural decisions should follow the same format.

Existing ADRs should never be rewritten.

New decisions should be appended to preserve historical context.
