# Table Topics Question Limit - Manual Testing Guide

## Implementation Verification

The `getMaxQuestions()` function in `tableTopicsService.ts` implements:

```typescript
export function getMaxQuestions(participantCount: number): number {
  // Defensive: handle invalid counts
  if (!participantCount || participantCount < 1) {
    return 1; // Safe default
  }

  if (participantCount < 5) {
    return 2;
  }

  if (participantCount >= 5 && participantCount <= 10) {
    return 1;
  }

  // participantCount > 10
  return 7;
}
```

## Manual Test Instructions

### Setup
1. Create test events with different participant counts
2. Join as each participant
3. Navigate to Table Topics page
4. Click "Next topic" multiple times to observe question rotation

### Required Boundary Tests

| Test Case | Participant Count | Expected Behavior | Verification Steps |
|-----------|-------------------|-------------------|-------------------|
| **Test 1** | 4 members | Max 2 unique questions | Click "Next topic" 5+ times. Should cycle between only 2 different questions. |
| **Test 2** | 5 members | Max 1 question | Click "Next topic" 5+ times. Should show the same question repeatedly. |
| **Test 3** | 6 members | Max 1 question | Click "Next topic" 5+ times. Should show the same question repeatedly. |
| **Test 4** | 10 members | Max 1 question | Click "Next topic" 5+ times. Should show the same question repeatedly. |
| **Test 5** | 11 members | Max 7 unique questions | Click "Next topic" 10+ times. Should cycle between up to 7 different questions. |
| **Test 6** | 12 members | Max 7 unique questions | Click "Next topic" 10+ times. Should cycle between up to 7 different questions. |

### Additional Edge Cases

| Edge Case | Participant Count | Expected | Notes |
|-----------|-------------------|----------|-------|
| Very small group | 1-3 members | 2 questions | Should still work |
| Mid-range | 7-9 members | 1 question | Within 5-10 range |
| Large group | 15-20 members | 7 questions | Above 10 threshold |
| Edge of ranges | Exactly 5, exactly 10 | 1 question | Boundary precision |

### Defensive Behavior Test

To verify defensive defaults (requires manual code check or console logging):
- No participants loaded yet (0 count) → should default to 1 question
- Database error preventing participant load → should default to 1 question

### Database Query Verification

Check browser DevTools Network tab:
1. Open Network tab
2. Filter for "prompts" requests
3. Load a topic
4. Verify the Supabase query includes correct limit:
   - 4 participants → `limit=2`
   - 6 participants → `limit=1`
   - 12 participants → `limit=7`

## Expected Results Summary

✓ **1-4 members**: Questions repeat after seeing 2 unique ones
✓ **5-10 members**: Same question shows repeatedly (only 1 available)
✓ **11+ members**: Questions repeat after seeing 7 unique ones
✓ **Invalid counts**: System defaults to 1 question (safe fallback)

## Logic Verification Table

| Participant Count | Range Check | Result | ✓ |
|-------------------|-------------|--------|---|
| 1                 | < 5         | 2      | ✓ |
| 2                 | < 5         | 2      | ✓ |
| 3                 | < 5         | 2      | ✓ |
| **4**             | **< 5**     | **2**  | ✓ |
| **5**             | **>= 5 && <= 10** | **1** | ✓ |
| 6                 | >= 5 && <= 10 | 1    | ✓ |
| 7                 | >= 5 && <= 10 | 1    | ✓ |
| 8                 | >= 5 && <= 10 | 1    | ✓ |
| 9                 | >= 5 && <= 10 | 1    | ✓ |
| **10**            | **>= 5 && <= 10** | **1** | ✓ |
| **11**            | **> 10**    | **7**  | ✓ |
| **12**            | **> 10**    | **7**  | ✓ |
| 15                | > 10        | 7      | ✓ |
| 100               | > 10        | 7      | ✓ |

## Console Verification (Optional)

Add temporary logging to verify limits:

```typescript
const maxQuestions = getMaxQuestions(participantCount);
console.log(`Participants: ${participantCount}, Max Questions: ${maxQuestions}`);
```

Check browser console when loading topics to confirm correct limits are calculated.

## Integration Flow

```
User opens Table Topics
    ↓
Load participants from database
    ↓
participants.length passed to getTableTopicsPrompt(count)
    ↓
getMaxQuestions(count) calculates limit
    ↓
Supabase query with .limit(maxQuestions)
    ↓
Random selection from limited pool
    ↓
Display question to user
```

## Success Criteria

✅ All 6 required boundary tests pass
✅ Questions properly limited based on participant count
✅ No TypeScript compilation errors
✅ No runtime errors in browser console
✅ Existing Table Topics functionality preserved
✅ UI/UX unchanged

