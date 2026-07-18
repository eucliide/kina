# API Specification

Version: 1.0

Status: Draft

---

# Overview

This document defines the REST API for Ki.

The API provides endpoints for event creation, participant management, pairing, organizer controls, and real-time synchronization.

The API follows REST principles:

- Resource-oriented URLs
- JSON request and response bodies
- Consistent HTTP status codes
- Stateless requests
- Server-authoritative event state

Realtime updates are handled separately using WebSockets (or Supabase Realtime).

---

# API Design Principles

## Consistency

Every endpoint follows a predictable structure.

Example:

GET    /events/:eventId

POST   /events

PATCH  /events/:eventId

DELETE /events/:eventId

---

## Server Authority

The server validates all requests.

Clients must never assume:

- current event phase
- partner assignments
- timer state
- organizer permissions

---

## Response Format

Successful responses

```json
{
  "success": true,
  "data": {}
}
```

Error responses

```json
{
  "success": false,
  "error": {
    "code": "EVENT_NOT_FOUND",
    "message": "The requested event does not exist."
  }
}
```

---

# Authentication

The MVP does not implement authentication.

Organizer endpoints use a temporary organizer token generated during event creation.

Future versions may replace this with authenticated user accounts.

---

# Event Endpoints

## Create Event

POST /api/events

Creates a new meetup.

Request

```json
{
  "title": "Saturday Coffee Walk",
  "location": "Nyandungu Park",
  "templateId": "template-001",
  "scheduledStart": "2026-08-15T09:00:00Z"
}
```

Response

```json
{
  "success": true,
  "data": {
    "eventId": "...",
    "joinCode": "AB12CD",
    "organizerToken": "...",
    "joinUrl": "https://ki.app/e/AB12CD"
  }
}
```

---

## Get Event

GET /api/events/{joinCode}

Returns public event information.

---

## Start Event

POST /api/events/{eventId}/start

Organizer only.

Starts the meetup.

---

## Pause Event

POST /api/events/{eventId}/pause

Organizer only.

Temporarily pauses the meetup schedule.

---

## Resume Event

POST /api/events/{eventId}/resume

Organizer only.

Resumes the meetup.

---

## Extend Current Round

POST /api/events/{eventId}/extend

Request

```json
{
  "minutes": 2
}
```

---

## End Event

POST /api/events/{eventId}/finish

Marks the meetup as completed.

---

# Participant Endpoints

## Join Event

POST /api/events/{joinCode}/participants

Request

```json
{
  "displayName": "John"
}
```

Response

```json
{
  "success": true,
  "data": {
    "participantId": "...",
    "sessionToken": "..."
  }
}
```

---

## Get Participant

GET /api/participants/{participantId}

Returns participant information.

---

## Leave Event

DELETE /api/participants/{participantId}

Marks the participant as inactive.

---

# Mission Endpoints

## Reveal Mission

GET /api/participants/{participantId}/mission

Returns the participant's assigned mission.

---

# Pairing Endpoints

## List Available Participants

GET /api/events/{eventId}/available-participants

Returns participants currently available for pairing.

---

## Create Pair

POST /api/pairings

Request

```json
{
  "participantOneId": "...",
  "participantTwoId": "..."
}
```

Response

```json
{
  "success": true,
  "data": {
    "pairingId": "...",
    "question": {
      "id": "...",
      "prompt": "What's something you're looking forward to this year?"
    }
  }
}
```

---

## Get Current Pairing

GET /api/participants/{participantId}/pairing

Returns the participant's current partner.

---

# Question Endpoints

## Get Current Question

GET /api/pairings/{pairingId}/question

Returns the active conversation prompt.

---

# Reflection Endpoints

## Get Reflection Question

GET /api/events/{eventId}/reflection

Returns the current reflection prompt.

---

# Organizer Endpoints

## Dashboard Summary

GET /api/events/{eventId}/dashboard

Returns:

- participant count
- active pairings
- current phase
- elapsed time
- remaining time

---

# Health Endpoint

GET /api/health

Response

```json
{
  "status": "UP",
  "version": "1.0.0"
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 204 | No Content |
| 400 | Invalid Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 422 | Validation Failed |
| 500 | Internal Server Error |

---

# Error Codes

| Code | Description |
|------|-------------|
| EVENT_NOT_FOUND | Event does not exist |
| EVENT_FINISHED | Event has already ended |
| EVENT_NOT_STARTED | Event has not started |
| DUPLICATE_NAME | Display name already exists |
| INVALID_PAIR | Invalid pairing request |
| PARTICIPANT_NOT_FOUND | Participant does not exist |
| ROUND_LOCKED | Pairing is currently unavailable |
| VALIDATION_ERROR | Request validation failed |

---

# API Versioning

All endpoints are versioned.

Current version:

/api/v1/

Future breaking changes must be introduced through a new API version.