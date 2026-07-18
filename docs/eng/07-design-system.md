# Design System

Version: 1.0

Status: Draft

---

# Overview

The Ki Design System establishes a consistent visual language for the application.

Its purpose is to ensure every screen feels like part of the same product while minimizing design decisions during development.

The design philosophy is based on four principles:

- Calm
- Minimal
- Intentional
- Human

The interface should support real-world conversations rather than compete for attention.

---

# Design Principles

## Calm First

The interface should never overwhelm participants.

Avoid excessive animations, bright colors, and unnecessary UI elements.

---

## One Primary Action

Every screen should have only one primary action.

Examples

Join

Reveal Mission

Confirm Partner

Continue

---

## Mobile First

Ki is designed primarily for smartphones.

Desktop layouts are secondary and intended mainly for organizers.

---

## Consistency

Identical actions should always look identical.

Buttons, cards, spacing, typography, and colors should never change unexpectedly.

---

# Color Palette

## Marketing Website

Background

#07111F

Surface

#0D1B2A

Card

#132238

Primary

#4F8CFF

Accent

#7C9EFF

Text

#FFFFFF

Muted

#9AA8BC

---

## Participant Interface

Background

#F7F8F5

Surface

#FFFFFF

Border

#E7E9ED

Primary

#2346D8

Success

#18A957

Warning

#F2A900

Danger

#D64545

Text

#1A1F2C

Muted

#737C8C

---

# Typography

Primary Font

Plus Jakarta Sans

Fallback

system-ui

Font Scale

Display

48px

Heading 1

36px

Heading 2

30px

Heading 3

24px

Body

16px

Small

14px

Caption

12px

---

# Spacing Scale

Use an 8-point spacing system.

4

8

12

16

24

32

40

48

64

80

96

Avoid arbitrary spacing values.

---

# Border Radius

Buttons

16px

Cards

24px

Inputs

14px

Badges

999px

---

# Shadows

Use subtle elevation only.

Avoid heavy shadows.

Primary card shadow

0 8px 24px rgba(0,0,0,0.08)

---

# Icons

Preferred Library

Lucide React

Guidelines

- Outline icons only
- Consistent stroke width
- Avoid filled icons

---

# Buttons

Primary

Filled

Secondary

Outlined

Ghost

Text only

Danger

Used sparingly

---

# Inputs

Every input includes

- label
- placeholder
- helper text
- error state

---

# Cards

Cards are the primary information container.

Examples

- Question Card
- Mission Card
- Participant Card
- Organizer Card

---

# Motion

Animation Principles

- Fast
- Calm
- Predictable

Allowed Animations

Fade

Slide

Scale (0.98 → 1)

Blur

Avoid

Bounce

Spin

Flash

Elastic animations

---

# Responsive Breakpoints

Mobile

0–639px

Tablet

640–1023px

Desktop

1024px+

---

# Accessibility

Minimum contrast ratio

WCAG AA

Keyboard navigation

Required

Visible focus states

Required

Semantic HTML

Required

Animations should respect reduced-motion preferences.

---

# Empty States

Every screen should gracefully handle:

- No participants
- No questions
- No connection
- Event ended

---

# Loading States

Use skeleton loaders where appropriate.

Avoid unnecessary spinners.

---

# Notifications

Notifications should be minimal.

Only notify users when action is required.

---

# Design Philosophy

Participants should spend more time looking at people than looking at screens.

Every design decision should reinforce this goal.