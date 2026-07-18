# Database Design

Version: 1.0

---

# Overview

Ki uses PostgreSQL as its primary relational database.

The database stores event configuration, participant information, meetup progress, conversation content, and pairing history.

The design follows normalization principles while keeping the schema simple and extensible.

---

# Design Principles

- Single responsibility per table
- UUID primary keys
- Foreign key constraints
- Soft deletion where appropriate
- Audit timestamps on every table

---

# Core Entities

Template

↓

Event

↓

Round

↓

Participant

↓

Pairing

↓

Question

↓

Mission

---

# Tables

## templates

Stores reusable meetup templates.

Fields

- id
- name
- description
- created_at

---

## template_rounds

Defines the sequence of rounds belonging to a template.

Fields

- id
- template_id
- order_index
- phase
- duration_seconds
- question_category

---

## events

Represents a scheduled meetup.

Fields

- id
- template_id
- title
- location
- join_code
- scheduled_start
- actual_start
- status
- created_at

---

## event_sessions

Stores live execution state.

Fields

- id
- event_id
- current_round
- current_phase
- phase_started_at
- paused_at
- ended_at

Only one active session exists per event.

---

## participants

Stores event participants.

Fields

- id
- event_id
- display_name
- joined_at
- disconnected_at

---

## pairings

Stores active and historical pairings.

Fields

- id
- event_id
- round_number
- participant_one
- participant_two
- started_at
- ended_at

---

## questions

Stores conversation prompts.

Fields

- id
- category
- difficulty
- prompt

---

## question_assignments

Tracks which question each pairing receives.

Fields

- id
- pairing_id
- question_id
- assigned_at

---

## missions

Stores secret missions.

Fields

- id
- text

---

## mission_assignments

Stores participant mission assignments.

Fields

- id
- participant_id
- mission_id
- revealed_at

---

# Relationships

Template

1 → Many

Template Rounds

---

Template

1 → Many

Events

---

Event

1 → 1

Event Session

---

Event

1 → Many

Participants

---

Event

1 → Many

Pairings

---

Pairing

1 → 1

Question Assignment

---

Question

1 → Many

Question Assignments

---

Participant

1 → Many

Mission Assignments

---

Mission

1 → Many

Mission Assignments

---

# Indexing

Indexes should exist on:

- join_code
- event_id
- participant_id
- current_phase
- scheduled_start

---

# Data Retention

Completed events are archived.

Participants remain linked to historical events.

No personal accounts are retained beyond display names.

---

# Future Extensions

The schema supports future additions such as:

- recurring meetups
- event analytics
- organizations
- multiple organizers
- custom question packs

without requiring major restructuring.