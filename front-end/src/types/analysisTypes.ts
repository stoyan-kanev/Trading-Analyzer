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

export type AnalysisResponse = AnalysisResult & {
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
    notes: string;
    analysis_time: string;
    created_at: string;
    updated_at: string;
};

export type DashboardStats = {
    total_analyses: number;
    trade_decisions: number;
    wait_decisions: number;
    no_trade_decisions: number;
    trade_decision_rate: number;
    avg_score: number;
    avg_rr: number;
};

export type DecisionBreakdownItem = {
    decision: string;
    count: number;
};

export type SessionPerformanceItem = {
    session: string;
    count: number;
};

export type DashboardStatsResponse = {
    stats: DashboardStats;
    decision_breakdown: DecisionBreakdownItem[];
    session_performance: SessionPerformanceItem[];
    recent_analyses: AnalysisResponse[];
};