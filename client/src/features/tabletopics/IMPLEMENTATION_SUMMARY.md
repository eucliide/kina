# Table Topics Question Limit Implementation

## Summary

Implemented participant-count-based question limits for Table Topics feature.

## Changes Made

### 1. `tableTopicsService.ts` - Core Logic
**File**: `src/features/tabletopics/services/tableTopicsService.ts`

**Changes**:
- Added `getMaxQuestions(participantCount: number): number` function
- Modified `getTableTopicsPrompt()` to accept `participantCount` parameter
- Applied `.limit(maxQuestions)` to Supabase query

**Logic**:
```typescript
if (participantCount < 5)               → max 2 questions
if (participantCount >= 5 && <= 10)     → max 1 question
if (participantCount > 10)              → max 7 questions
```

**Defensive handling**:
- Invalid/null/undefined/negative counts → defaults to 1 question

### 2. `TableTopicsPage.tsx` - Integration
**File**: `src/features/tabletopics/pages/TableTopicsPage.tsx`

**Changes**:
- Updated `loadTopic()` to pass `participants.length` to `getTableTopicsPrompt()`
- No UI changes

**Flow**:
```
Load participants from database
    ↓
Count participants
    ↓
Pass count to getTableTopicsPrompt(count)
    ↓
Service limits query to max questions
    ↓
Random selection from limited pool
```

### 3. Test Coverage
**File**: `src/features/tabletopics/services/tableTopicsService.test.ts`

**Coverage**:
- All 6 required boundary cases
- Additional edge cases (1, 2, 3, 7, 9, 15, 100 members)
- Defensive cases (0, -1, undefined, null, NaN)

## Boundary Verification

| Members | Max Questions | ✓ |
|---------|---------------|---|
| 4       | 2             | ✓ |
| 5       | 1             | ✓ |
| 6       | 1             | ✓ |
| 10      | 1             | ✓ |
| 11      | 7             | ✓ |
| 12      | 7             | ✓ |

## Architecture Decisions

### Why limit at database query level?
- Prevents loading unnecessary data
- Applies limit before random selection
- More efficient than fetching all and filtering
- Deterministic behavior

### Why not track session state?
- Current UI shows one question at a time with "Next topic" button
- No concept of "session" or "round" in current implementation
- Limit applies per query, not per session
- Simpler implementation without state management

### Why make getMaxQuestions() exported?
- Allows direct unit testing without mocking Supabase
- Makes logic testable in isolation
- Marked as `@internal` to indicate testing-only export

## Impact Analysis

### What changed:
- Database queries now include `.limit()` clause
- Question pool size varies by participant count
- Random selection from smaller pool

### What didn't change:
- UI/UX remains identical
- Question content unchanged
- Randomization behavior preserved
- No new dependencies
- No session tracking added
- No impact on other Ki activities

## Testing Instructions

### Manual testing:
1. Join table topics with different participant counts
2. Click "Next topic" multiple times
3. Verify questions cycle within expected limits:
   - 4 participants → should see max 2 different questions
   - 6 participants → should see only 1 question repeated
   - 12 participants → should see max 7 different questions

### Unit testing:
```bash
npm test tableTopicsService.test.ts
```

## Files Modified

1. `src/features/tabletopics/services/tableTopicsService.ts` - Core logic
2. `src/features/tabletopics/pages/TableTopicsPage.tsx` - Integration

## Files Created

1. `src/features/tabletopics/services/tableTopicsService.test.ts` - Unit tests
2. `src/features/tabletopics/services/BOUNDARY_VERIFICATION.md` - Verification doc
3. `src/features/tabletopics/IMPLEMENTATION_SUMMARY.md` - This file

## Potential Issues & Mitigations

### Issue: Participant count changes during session
**Mitigation**: Count is captured at `loadTopic()` time. If participants join/leave mid-session, next topic load will reflect new count.

### Issue: Database has fewer questions than limit
**Mitigation**: Supabase `.limit()` returns all available if fewer than limit exist. Random selection still works.

### Issue: No participants loaded yet
**Mitigation**: `participants.length` would be 0, triggering defensive default of 1 question.

## Performance Considerations

- Reduced database payload when limits are small (1-2 questions)
- Slightly increased for large groups (7 questions vs potentially unlimited)
- Net positive: prevents loading 100+ questions for small groups
