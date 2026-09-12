import { DatamuseEntityBase } from '../DatamuseEntityBase';
import type { DatamuseSDK } from '../DatamuseSDK';
import type { Control } from '../types';
import type { Pet, PetLoadMatch, PetListMatch, PetCreateData, PetRemoveMatch } from '../DatamuseTypes';
declare class PetEntity extends DatamuseEntityBase<Pet> {
    constructor(client: DatamuseSDK, entopts: any);
    make(this: PetEntity): PetEntity;
    load(this: any, reqmatch?: PetLoadMatch, ctrl?: Control): Promise<PetEntity>;
    list(this: any, reqmatch?: PetListMatch, ctrl?: Control): Promise<PetEntity[]>;
    create(this: any, reqdata?: PetCreateData, ctrl?: Control): Promise<PetEntity>;
    remove(this: any, reqmatch?: PetRemoveMatch, ctrl?: Control): Promise<PetEntity>;
}
export { PetEntity };
