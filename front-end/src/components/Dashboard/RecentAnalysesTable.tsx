import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {AnalysisService} from "../../services/analysisService.ts";
import type {AnalysisResponse} from "../../types/analysisTypes.ts";
import {formatDate} from "../../helpers/formatDate.tsx";
import {formatSession} from "../../helpers/formatSession.tsx";


export function RecentAnalysesTable() {
    const [analyses, setAnalyses] = useState<AnalysisResponse[]>([])
    const [recentAnalyses, setRecentAnalyses] = useState<AnalysisResponse[]>([])

    useEffect(() => {

        const fetchAnalysis = async() => {
            try{
                const result = await AnalysisService.getAnalysis()
                setAnalyses(result.data.results);

                // TODO:
                // Dashboard should eventually use dedicated endpoints:
                // - /dashboard/stats
                // - /dashboard/recent
                //
                // Currently we load all analyses and derive the statistics on the client.
                // This is acceptable for MVP but should be moved to the backend
                // as the dataset grows.

                setRecentAnalyses(result.data.results.slice(0,5));
                console.log(result.data.results)
            }catch (err){
                console.log(err)
            }

        }



        fetchAnalysis();




    }, []);


    return (
        <section className="dashboard-card">
            <div className="section-header">
                <h2>Recent Analyses</h2>
                <Link className="secondary-btn" to={"/history"}>View All</Link>
            </div>

            <table className="analyses-table">
                <thead>
                <tr>
                    <th>Pair</th>
                    <th>Score</th>
                    <th>Decision</th>
                    <th>Session</th>
                    <th>Date</th>
                </tr>
                </thead>

                <tbody>
                {recentAnalyses.map((analysis) => (
                    <tr key={`${analysis.pair}-${analysis.created_at}`}>
                        <td>{analysis.pair}</td>
                        <td>{analysis.score}/10</td>
                        <td>{analysis.decision.toUpperCase()}</td>
                        <td>{formatSession(analysis.session)}</td>
                        <td>{formatDate(analysis.created_at)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}