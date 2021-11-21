import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { StringPublicKey } from '../utils';
import { PackDistributionType } from '../models/packs/types';
import { AddCardToPackParams, InitPackSetParams } from '../models/packs/interface';
export declare const PACKS_PREFIX = "packs";
export declare const CARD_PREFIX = "card";
export declare const VOUCHER_PREFIX = "voucher";
export declare function getProgramAuthority(): Promise<StringPublicKey>;
export declare function findPackCardProgramAddress(pack: PublicKey, index: number): Promise<StringPublicKey>;
export declare function findPackVoucherProgramAddress(pack: PublicKey, index: number): Promise<StringPublicKey>;
export declare class InitPackSetArgs {
    instruction: number;
    name: Uint8Array;
    description: string;
    uri: string;
    mutable: boolean;
    distributionType: PackDistributionType;
    allowedAmountToRedeem: BN;
    redeemStartDate: BN | null;
    redeemEndDate: BN | null;
    constructor(args: InitPackSetParams);
}
export declare class AddCardToPackArgs {
    instruction: number;
    maxSupply: BN | null;
    weight: BN | null;
    index: number;
    constructor(args: AddCardToPackParams);
}
export declare class AddVoucherToPackArgs {
    instruction: number;
    constructor();
}
export declare class ActivatePackArgs {
    instruction: number;
    constructor();
}
export declare const PACKS_SCHEMA: Map<any, any>;
//# sourceMappingURL=packs.d.ts.map