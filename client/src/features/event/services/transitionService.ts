import type {
  Transition,
  TransitionStep,
} from "../types/transition";

/**
 * Returns the first step
 * of a transition.
 */
export function getFirstTransitionStep(
  transition: Transition,
): TransitionStep {
  return transition.steps[0];
}

/**
 * Returns the next step
 * in the transition.
 */
export function getNextTransitionStep(
  transition: Transition,
  currentStepId: string,
): TransitionStep | null {
  const index = transition.steps.findIndex(
    (step) => step.id === currentStepId,
  );

  if (index === -1) {
    return null;
  }

  return (
    transition.steps[index + 1] ??
    null
  );
}
