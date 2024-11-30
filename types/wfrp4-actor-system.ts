interface Wfrp4ActorSystem {
    characteristics: {
        ws: Characteristic;
        bs: Characteristic;
        s: Characteristic;
        t: Characteristic;
        i: Characteristic;
        ag: Characteristic;
        dex: Characteristic;
        int: Characteristic;
        wp: Characteristic;
        fel: Characteristic;
    };
    status: {
        wounds: StatusValue;
        advantage: StatusValue;
        criticalWounds: StatusValue;
        sin: { value: number };
        corruption: StatusValue;
        encumbrance: { max: number; current: number };
        mount: {
            id: string;
            mounted: boolean;
            isToken: boolean;
            tokenData: {
                scene: string;
                token: string;
            };
        };
        fate: { value: number };
        fortune: { value: number };
        resilience: { value: number };
        resolve: { value: number };
        ward: { value: number };
    };
    details: {
        species: { value: string; subspecies: string };
        gender: { value: string };
        biography: { value: string };
        gmnotes: { value: string };
        size: { value: string };
        move: { value: number; walk: string; run: string };
        god: { value: string };
        status: { value: string; standing: string; tier: number; modifier: number };
        hitLocationTable: { value: string };
        experience: { total: number; spent: number; log: any[] };
        "personal-ambitions": Ambitions;
        "party-ambitions": PartyAmbitions;
        motivation: { value: string };
        class: { value: string };
        career: { value: string };
        careerlevel: { value: string };
        age: { value: string };
        height: { value: string };
        weight: { value: string };
        haircolour: { value: string };
        eyecolour: { value: string };
        distinguishingmark: { value: string };
        starsign: { value: string };
        mainHand: string;
    };
}

interface Characteristic {
    initial: number;
    modifier: number;
    advances: number;
    bonusMod: number;
    calculationBonusModifier: number;
}

interface StatusValue {
    value: number;
    max: number | null;
}

interface Ambitions {
    "short-term": string;
    "long-term": string;
}

interface PartyAmbitions extends Ambitions {
    name: string;
}
