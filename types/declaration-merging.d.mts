import BaseActor from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents/actor";

declare global {
    interface Actor {
        system: BaseActor & Wfrp4ActorSystem;
    }

    interface User {
        character: Actor;
    }
}