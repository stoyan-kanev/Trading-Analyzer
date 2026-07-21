export type TradeResult = "win" | "loss" | "breakeven";

export type TradeFormData = {
    analysis: number;
    entry_price: string;
    stop_loss: string;
    take_profit: string;
    result: TradeResult;
    profit_loss_r: string;
    notes: string;
};

export type TradeResponse = {
    id: number;
    user: number;
    analysis: number;
    entry_price: string;
    stop_loss: string;
    take_profit: string;
    result: TradeResult;
    profit_loss_r: string;
    notes: string;
    created_at: string;
    updated_at: string;
};