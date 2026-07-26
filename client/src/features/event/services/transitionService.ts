import type {
  Transition,
  TransitionScene,
} from "../types/transition";

/**
 * Returns the first scene
 * in a transition.
 */
export function getFirstScene(
  transition: Transition,
): TransitionScene {
  return transition.scenes[0];
}

/**
 * Returns the next scene.
 */
export function getNextScene(
  transition: Transition,
  currentSceneId: string,
): TransitionScene | null {
  const currentIndex =
    transition.scenes.findIndex(
      (scene) =>
        scene.id === currentSceneId,
    );

  if (currentIndex === -1) {
    return null;
  }

  return (
    transition.scenes[currentIndex + 1] ??
    null
  );
}

/**
 * Determines whether the
 * current scene is the last.
 */
export function isFinalScene(
  transition: Transition,
  currentSceneId: string,
): boolean {
  return (
    getNextScene(
      transition,
      currentSceneId,
    ) === null
  );
}
