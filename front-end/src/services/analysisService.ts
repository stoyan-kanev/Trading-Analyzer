import type {AnalysisFormData} from "../types/analysisTypes.ts";
import {api} from "./api.ts";


const mapDataForAnalysis = (data: AnalysisFormData) => {
    let isLiquiditySweep = false;

    if (data.liquiditySweep == 'true') {
        isLiquiditySweep = true;
    }


    return {
        pair: data.pair,

        daily_bias: data.dailyBias,
        h4_bias: data.h4Bias,
        session: data.session,
        zone_type: data.zoneType,
        confirmation: data.confirmation,
        has_liquidity_sweep: isLiquiditySweep,
        rr: data.rr,
        notes: data.notes

    };
}


export const AnalysisService = {

    evaluateAnalysis: (evaluate: AnalysisFormData) => {

        const data = mapDataForAnalysis(evaluate);

        return api.post('/api/analysis/evaluate/', data);
    },

    saveAnalysis(evaluate: AnalysisFormData) {
        const data = mapDataForAnalysis(evaluate);

        return api.post('/api/analysis/', data);
    },

    getAnalysis(){
        return api.get('/api/analysis/');
    },

    getAnalysisById(id: string) {
        return api.get(`/api/analysis/${id}/`);
    },
    getAnalysisStats(){
        return api.get('/api/analysis/get-stats');
    }

}