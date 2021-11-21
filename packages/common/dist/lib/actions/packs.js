"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKS_SCHEMA = exports.ActivatePackArgs = exports.AddVoucherToPackArgs = exports.AddCardToPackArgs = exports.InitPackSetArgs = exports.findPackVoucherProgramAddress = exports.findPackCardProgramAddress = exports.getProgramAuthority = exports.VOUCHER_PREFIX = exports.CARD_PREFIX = exports.PACKS_PREFIX = void 0;
const web3_js_1 = require("@solana/web3.js");
const programIds_1 = require("../utils/programIds");
const utils_1 = require("../utils");
exports.PACKS_PREFIX = 'packs';
exports.CARD_PREFIX = 'card';
exports.VOUCHER_PREFIX = 'voucher';
async function getProgramAuthority() {
    const PROGRAM_IDS = programIds_1.programIds();
    return (await utils_1.findProgramAddress([
        Buffer.from(exports.PACKS_PREFIX),
        utils_1.toPublicKey(PROGRAM_IDS.pack_create).toBuffer(),
    ], utils_1.toPublicKey(PROGRAM_IDS.pack_create)))[0];
}
exports.getProgramAuthority = getProgramAuthority;
async function findPackCardProgramAddress(pack, index) {
    return findProgramAddressByPrefix(pack, index, exports.CARD_PREFIX);
}
exports.findPackCardProgramAddress = findPackCardProgramAddress;
async function findPackVoucherProgramAddress(pack, index) {
    return findProgramAddressByPrefix(pack, index, exports.VOUCHER_PREFIX);
}
exports.findPackVoucherProgramAddress = findPackVoucherProgramAddress;
async function findProgramAddressByPrefix(packSetKey, index, prefix) {
    const PROGRAM_IDS = programIds_1.programIds();
    const numberBuffer = Buffer.allocUnsafe(4);
    numberBuffer.writeUInt16LE(index);
    return (await utils_1.findProgramAddress([Buffer.from(prefix), new web3_js_1.PublicKey(packSetKey).toBuffer(), numberBuffer], utils_1.toPublicKey(PROGRAM_IDS.pack_create)))[0];
}
class InitPackSetArgs {
    constructor(args) {
        this.instruction = 0;
        this.name = args.name;
        this.description = args.description;
        this.uri = args.uri;
        this.mutable = args.mutable;
        this.distributionType = args.distributionType;
        this.allowedAmountToRedeem = args.allowedAmountToRedeem;
        this.redeemStartDate = args.redeemStartDate;
        this.redeemEndDate = args.redeemEndDate;
    }
}
exports.InitPackSetArgs = InitPackSetArgs;
class AddCardToPackArgs {
    constructor(args) {
        this.instruction = 1;
        this.maxSupply = args.maxSupply;
        this.weight = args.weight;
        this.index = args.index;
    }
}
exports.AddCardToPackArgs = AddCardToPackArgs;
class AddVoucherToPackArgs {
    constructor() {
        this.instruction = 2;
    }
}
exports.AddVoucherToPackArgs = AddVoucherToPackArgs;
class ActivatePackArgs {
    constructor() {
        this.instruction = 3;
    }
}
exports.ActivatePackArgs = ActivatePackArgs;
exports.PACKS_SCHEMA = new Map([
    [
        InitPackSetArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['name', [32]],
                ['description', 'string'],
                ['uri', 'string'],
                ['mutable', 'u8'],
                ['distributionType', 'u8'],
                ['allowedAmountToRedeem', 'u32'],
                ['redeemStartDate', { kind: 'option', type: 'u64' }],
                ['redeemEndDate', { kind: 'option', type: 'u64' }],
            ],
        },
    ],
    [
        AddCardToPackArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['maxSupply', 'u32'],
                ['weight', 'u16'],
                ['index', 'u32'],
            ],
        },
    ],
    [
        AddVoucherToPackArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        ActivatePackArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
]);
//# sourceMappingURL=packs.js.map