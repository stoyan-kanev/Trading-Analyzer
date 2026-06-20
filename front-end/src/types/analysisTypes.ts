export type Decision = "trade" | "wait" | "no_trade";

export type AnalysisFormData = {
    pair: string;
    dailyBias: string;
    h4Bias: string;
    session: string;
    zoneType: string;
    confirmation: string;
    liquiditySweep: string;
    rr: string;
    notes: string;
};

export type AnalysisResult = {
    score: number;
    decision: Decision;
    reasons: string[];
    warnings: string[];
};