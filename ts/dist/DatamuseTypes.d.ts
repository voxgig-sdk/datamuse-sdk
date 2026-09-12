export interface Pet {
    id: number;
    name: string;
    tag?: string;
}
export interface PetLoadMatch {
    id: string;
}
export interface PetListMatch {
    limit?: number;
    tag?: any;
}
export interface PetCreateData {
    pet: Record<string, any>;
    id: number;
    name: string;
    tag?: string;
}
export interface PetRemoveMatch {
    id: string;
}
