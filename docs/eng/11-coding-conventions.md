# Coding Conventions

Version: 1.0

Status: Draft

---

# Overview

This document defines the coding conventions used throughout Ki.

Its purpose is to ensure consistency, readability, and maintainability across the codebase.

Every contributor is expected to follow these conventions.

---

# General Principles

## Readability First

Code should be written for humans first and computers second.

Choose clarity over cleverness.

---

## Consistency

Follow existing patterns.

Avoid introducing new styles when an established pattern already exists.

---

## Simplicity

Prefer the simplest implementation that satisfies the requirement.

---

# Naming Conventions

## Files

Components

ConversationCard.tsx

MissionCard.tsx

OrganizerDashboard.tsx

---

Hooks

useCountdown.ts

useParticipant.ts

usePairing.ts

---

Services

event.service.ts

question.service.ts

pairing.service.ts

---

Repositories

event.repository.ts

participant.repository.ts

---

Schemas

participant.schema.ts

event.schema.ts

---

Types

participant.types.ts

event.types.ts

---

Utilities

time.util.ts

validation.util.ts

---

Constants

event.constants.ts

question.constants.ts

---

# Variables

Use descriptive names.

Good

participant

remainingTime

currentRound

availableParticipants

Bad

x

obj

temp

arr

data

---

# Boolean Variables

Begin with

is

has

can

should

Examples

isPaused

hasJoined

canPair

shouldRotate

---

# Functions

Function names should describe actions.

Examples

createEvent()

joinEvent()

assignMission()

calculateCurrentRound()

findAvailablePartners()

Avoid

handleStuff()

process()

execute()

run()

---

# Components

Each component should have one responsibility.

If a component exceeds approximately 200 lines, evaluate whether it should be split into smaller components.

---

# Props

Prefer explicit props.

Avoid passing large objects when only a few properties are required.

Good

<QuestionCard
question={question}
remainingTime={remainingTime}
/>

Avoid

<QuestionCard
data={event}
/>

---

# State

Store only state that cannot be derived.

Good

selectedPartner

Bad

currentPhase

Current phase should come from the server.

---

# Comments

Code should be self-explanatory.

Use comments only when explaining

- business rules
- architectural decisions
- non-obvious logic

Avoid comments that describe obvious code.

---

# Imports

Import order

1. External packages
2. Internal modules
3. Components
4. Utilities
5. Styles

Example

React

React Router

UI Components

Hooks

Utilities

CSS

---

# TypeScript

Do not use

any

Prefer

unknown

or strongly typed interfaces.

Enable strict mode.

---

# Error Handling

Never swallow errors.

Always provide meaningful messages.

Throw domain-specific errors when appropriate.

---

# Async Code

Use async/await.

Avoid nested promise chains.

---

# Magic Numbers

Avoid unexplained numeric values.

Bad

if (count > 7)

Good

const MAX_PARTICIPANTS = 7

---

# Constants

Shared constants belong in dedicated files.

Avoid duplicating values throughout the application.

---

# Styling

Use Tailwind utility classes.

Avoid inline styles unless absolutely necessary.

---

# Accessibility

Every interactive element must

- be keyboard accessible
- have a visible focus state
- include accessible labels where appropriate

---

# Logging

Development

Console logging permitted.

Production

Use structured logging only.

Remove debugging logs before release.

---

# Folder Ownership

Each module owns its files.

Do not place unrelated code inside another module.

---

# Code Review Checklist

Before merging

- Naming is clear
- Functions are small
- No duplicated logic
- Types are explicit
- Documentation updated
- Tests completed

---

# Coding Philosophy

Write code that future developers will immediately understand.

The best code is often the simplest.
