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


export type AnalysisResponse = {
    id: number;
    user: number;
    pair: string;
    session: string;
    daily_bias: string;
    h4_bias: string;
    zone_type: string;
    confirmation: string;
    has_liquidity_sweep: boolean;
    rr: string;
    score: number;
    decision: string;
    reasons: string[];
    warnings: string[];
    notes: string;
    analysis_time: string;
    created_at: string;
    updated_at: string;
}