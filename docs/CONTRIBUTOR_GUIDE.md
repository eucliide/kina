# Kina Contributor Guide

Version: 1.0

Welcome to Kina.

This document explains how we build Kina, how decisions are made, and how contributors can work together without introducing unnecessary complexity.

If you are new to the project, read this document before writing code.

---

# What is Kina?

Kina is a mobile-first web application that helps people build meaningful friendships through guided, in-person conversations.

Kina is not a social media platform.

Kina is not a messaging app.

Kina exists to help people spend less time on their phones and more time connecting face-to-face.

Everything we build should reinforce that mission.

---

# Core Vision

Our objective is not to maximize screen time.

Our objective is to maximize meaningful human interaction.

Whenever making a design or engineering decision, ask:

> Does this help people connect more naturally?

If the answer is no, reconsider the solution.

---

# Engineering Constitution

Every contributor is expected to follow these principles.

1. Documentation before implementation.
2. Architecture before code.
3. Server is the source of truth.
4. Derive state instead of storing it.
5. One responsibility per module.
6. Mobile-first design.
7. Calm interfaces over flashy interfaces.
8. People before phones.
9. Accessibility is a requirement.
10. Simplicity beats cleverness.

---

# Project Structure

docs/

Contains all project documentation.

Read documentation before implementation.

---

client/

Frontend application.

Responsible only for user interaction and presentation.

Business logic should remain on the server.

---

server/

Backend application.

Responsible for:

- events
- LiveMeeting
- participants
- pairings
- questions
- missions

---

# Module Ownership

Every module owns its own files.

Example

modules/

event/

participant/

pairing/

question/

mission/

livemeeting/

Do not place unrelated code inside another module.

---

# Before You Build Anything

Read the following documents.

1. Product Vision
2. Requirements
3. User Flows
4. Information Architecture
5. System Architecture
6. Database Design
7. API Specification

Only after understanding these documents should implementation begin.

---

# Development Workflow

Every feature follows the same process.

Understand

↓

Discuss

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

Commit

↓

Push

Skipping steps is discouraged.

---

# Current Project Status

Before beginning work, identify the current milestone.

Milestones determine project priorities.

Do not implement features from future milestones unless agreed by the team.

---

# Branch Strategy

Never develop directly on main.

Workflow

main

↓

develop

↓

feature/your-feature

Each feature should have its own branch.

---

# Commit Messages

Use Conventional Commits.

Examples

feat:

fix:

docs:

refactor:

style:

test:

Avoid vague commit messages.

---

# Definition of Done

A feature is complete only when:

✓ Requirements satisfied

✓ Responsive

✓ Accessible

✓ Tested

✓ Documentation updated

✓ Code reviewed

✓ Ready for deployment

---

# Code Standards

Always follow

- Coding Conventions
- Development Standards
- Design System

Do not invent new patterns if an existing one already exists.

---

# Pull Request Checklist

Before requesting review, verify

- No TypeScript errors
- No ESLint errors
- Project builds successfully
- Documentation updated
- Tests completed
- Naming is consistent

---

# Architecture Rules

The backend owns application state.

Clients render server state.

Never duplicate business logic between frontend and backend.

Prefer derived state whenever possible.

---

# UI Principles

The interface should be

- calm
- minimal
- intentional
- predictable

Participants should always know what to do next.

Avoid unnecessary animations or distractions.

---

# If You Are Unsure

Do not guess.

Consult

1. Product Vision
2. Architecture Documents
3. ADRs

If uncertainty remains, discuss the change before implementation.

---

# What Success Looks Like

Kina should feel effortless.

Participants should spend their time talking to people—not learning how to use the application.

Every line of code should move the product closer to that goal.
