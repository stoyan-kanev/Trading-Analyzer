import type { TradeFormData, TradeResponse } from "../types/tradeTypes.ts";
import { api } from "./api.ts";

export const TradeService = {
    createTrade(data: TradeFormData) {
        return api.post<TradeResponse>("/api/trades/", data);
    },

    getTrades() {
        return api.get<TradeResponse[]>("/api/trades/");
    },

    getTradeById(id: string | number) {
        return api.get<TradeResponse>(`/api/trades/${id}/`);
    },

    getTradeByAnalysisId(analysisId: string | number) {
        return api.get<TradeResponse>(`/api/trades/by-analysis/${analysisId}/`);
    },
};