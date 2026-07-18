# Information Architecture

Version: 1.0

---

# Overview

This document defines the information architecture of Ki.

Its purpose is to organize application content, navigation, and user journeys into a logical structure before implementation.

The architecture follows one guiding principle:

> Participants should never wonder what to do next.

Each screen has a single responsibility and presents only the information required for the current activity.

---

# Design Principles

## Single Purpose

Every screen should have exactly one primary action.

Example:

Join Screen

Primary action:

Join Meetup

---

## Minimal Navigation

Participants never navigate through menus.

Instead, screens change automatically according to the current event phase.

---

## Progressive Disclosure

Information appears only when needed.

Examples:

Secret missions remain hidden until revealed.

Conversation prompts appear only after pairing.

Reflection questions appear only during reflection rounds.

---

# Navigation Model

Landing

↓

Join

↓

Waiting Room

↓

Secret Mission

↓

Pairing

↓

Conversation

↓

Partner Switch

↓

Conversation

↓

Reflection

↓

Goodbye

---

# Public Screens

## Landing

Purpose

Introduce the meetup and allow participants to join.

Contents

- Meetup title
- Date
- Time
- Join button

Primary Action

Join Meetup

---

## Join

Purpose

Capture participant name.

Contents

- Name field
- Continue button

Primary Action

Join

---

# Participant Screens

## Waiting Room

Purpose

Prepare participants before the meetup begins.

Contents

- Event title
- Countdown
- Participant count
- Event status

Primary Action

Reveal Mission

---

## Secret Mission

Purpose

Assign one hidden objective.

Contents

- Mission
- Reminder to keep it secret

Primary Action

Continue

---

## Pairing

Purpose

Allow participants to choose a conversation partner.

Contents

- Available participants
- Search
- Confirm partner

Primary Action

Confirm Pair

---

## Conversation

Purpose

Guide one conversation round.

Contents

- Partner name
- Question
- Countdown
- Reminder to put phone away

Primary Action

None

---

## Switch

Purpose

Transition to the next conversation.

Contents

- Countdown
- Instructions

Primary Action

Find Partner

---

## Reflection

Purpose

Guide closing discussion.

Contents

- Reflection question
- Remaining time

Primary Action

None

---

## Goodbye

Purpose

End the meetup.

Contents

- Thank-you message
- Closing prompt

Primary Action

Leave

---

# Organizer Screens

Organizer access is hidden and intended only for event management.

## Dashboard

Contents

- Current phase
- Active round
- Participants
- Pairings
- Timer
- Controls

Available Actions

- Pause
- Resume
- Extend
- Skip
- End

---

# Navigation Rules

Participants cannot manually skip between screens.

The current event phase determines which screen is displayed.

This ensures every participant experiences the meetup in the same sequence.

---

# Future Screens

These are intentionally excluded from the MVP.

- Event discovery
- User profiles
- Notifications
- Messaging
- Friend lists
- Analytics
- Settings