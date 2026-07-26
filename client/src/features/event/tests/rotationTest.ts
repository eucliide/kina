import { applyRotation } from "../services/rotationManager";
import { MOCK_PARTICIPANTS } from "../data/mockParticipants";

const result = applyRotation(MOCK_PARTICIPANTS);

console.log(result);
