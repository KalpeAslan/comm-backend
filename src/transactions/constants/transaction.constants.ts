export enum EPeriods {
    Day,
    Week,
    Month,
    Year
}

export enum EGrow {
    Positive,
    Negative,
    Neutral
}

export enum ETransactionStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    DROPPED = 'DROPPED',
    REPLACED = 'REPLACED'
}