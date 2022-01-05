import React from 'react';
declare type Props = {
    name: string;
    value: number;
    min: number;
    max: number;
    currency: string;
    step: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};
export declare const CustomDonationInput: ({ name, value, min, max, currency, step, onChange, className, }: Props) => JSX.Element;
export {};
//# sourceMappingURL=CustomDonationInput.d.ts.map