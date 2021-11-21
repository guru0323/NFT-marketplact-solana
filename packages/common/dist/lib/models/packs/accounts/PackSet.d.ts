/// <reference types="node" />
import { Connection, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { PackKey, PackDistributionType, PackSetState } from '..';
import { AccountAndPubkey, StringPublicKey } from '../../..';
export declare class PackSet {
    key: PackKey;
    store: StringPublicKey;
    authority: StringPublicKey;
    description: string;
    uri: string;
    name: string;
    packCards: number;
    packVouchers: number;
    totalEditions?: BN;
    mutable: boolean;
    packState: PackSetState;
    distributionType: PackDistributionType;
    allowedAmountToRedeem: number;
    redeemStartDate: BN;
    redeemEndDate?: BN;
    constructor(args: {
        key: PackKey;
        store: StringPublicKey;
        authority: StringPublicKey;
        description: string;
        uri: string;
        name: Uint8Array;
        packCards: number;
        packVouchers: number;
        totalEditions?: BN;
        mutable: number;
        packState: PackSetState;
        distributionType: PackDistributionType;
        allowedAmountToRedeem: number;
        redeemStartDate: BN;
        redeemEndDate?: BN;
    });
}
export declare const PACK_SET_SCHEMA: Map<any, any>;
export declare const decodePackSet: (buffer: Buffer) => PackSet;
export declare const getPackSets: ({ connection, storeId, }: {
    connection: Connection;
    storeId?: PublicKey | undefined;
}) => Promise<AccountAndPubkey[]>;
//# sourceMappingURL=PackSet.d.ts.map