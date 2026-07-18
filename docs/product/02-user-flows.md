# User Flows

---

# User Flow 1 — Joining a Meetup

```text
Scan QR Code
      │
      ▼
Landing Page
      │
      ▼
Enter Name
      │
      ▼
Join Event
      │
      ▼
Waiting Room
```

---

# User Flow 2 — Secret Mission

```text
Waiting Room
      │
      ▼
Reveal Mission
      │
      ▼
Read Mission
      │
      ▼
Lock Phone
```

> **Note:**  
> The app intentionally ends here for the participant. They shouldn't need to interact with their phone again until the next activity begins.

---

# User Flow 3 — Partner Pairing

```text
Round Starts
      │
      ▼
Find Partner
      │
      ▼
Press "We're Together"
      │
      ▼
Choose Partner
      │
      ▼
Partner Confirmed
      │
      ▼
Conversation Screen
```

---

# User Flow 4 — Conversation Round

```text
Conversation Screen
        │
        ▼
Read Prompt
        │
        ▼
Put Phone Away
        │
        ▼
Walk & Talk
        │
        ▼
Timer Ends
```

> **Important:**  
> This is the most important flow in the application. The participant only interacts with their phone for the first few seconds before focusing entirely on the in-person conversation.

---

# User Flow 5 — Switching Partners

```text
Timer Ends
      │
      ▼
Switch Screen
      │
      ▼
Find New Partner
      │
      ▼
Choose Partner
      │
      ▼
Next Conversation
```

---

# User Flow 6 — Reflection

```text
Reflection Activity
        │
        ▼
Read Question
        │
        ▼
Discuss
        │
        ▼
Next Round
```

---

# User Flow 7 — Meetup Ends

```text
Final Reflection
        │
        ▼
Thank You Screen
        │
        ▼
Leave Meetup
```

---

# Host Flow

```text
Open Host Dashboard
        │
        ▼
Start Meetup
        │
        ▼
Monitor Participants
        │
        ▼
Monitor Pairings
        │
        ▼
Pause / Resume
        │
        ▼
Next Round
        │
        ▼
End Meetup
```

---

# Error Flows

A mature product plans for failure.

## Invalid QR Code

```text
Scan QR
   │
   ▼
Event Not Found
   │
   ▼
Return
```

## Connection Lost

```text
Conversation
      │
      ▼
Connection Lost
      │
      ▼
Reconnecting...
      │
      ▼
Continue
```

## Partner Leaves

```text
Conversation
      │
      ▼
Partner Disconnects
      │
      ▼
Find New Partner
```

---

# Screen Inventory

This section helps prevent "surprise screens" from appearing midway through development by defining every screen required for the MVP.

| Screen | Purpose |
|---------|---------|
| Landing | Event entry and introduction |
| Join | Capture participant name |
| Waiting Room | Event status before the meetup starts |
| Secret Mission | Reveal the participant's personal mission |
| Pair Partner | Select a conversation partner |
| Conversation | Display prompt, timer, and partner information |
| Switch | Transition between conversation rounds |
| Reflection | Guided discussion activity |
| Goodbye | End-of-meetup screen |
| Event Not Found | Handle invalid or expired QR codes |
| Connection Lost | Recovery state during connectivity issues |
| Host Dashboard | Meetup management and event controls |