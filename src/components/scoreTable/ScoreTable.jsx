import { calRadarScore } from "../../services/services";
import Card from "../common/Card"
import Number from "../common/Number";

const ScoreTable = ({data = [], setDetail}) => {
    return(
        <Card>
            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '24px',
                color: '#2C5F7C',
            }}>종목 리스트</h2>
            <div style={{overflowX:'auto'}}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: '#F0F4F8',
                        }}>
                            <th style={{
                                padding: '12px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#1A1A1A',
                            }}>순위</th>
                            <th style={{
                                padding: '12px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#1A1A1A',
                            }}>종목</th>
                            <th style={{
                                padding: '12px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#1A1A1A',
                            }}>점수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((i,idx)=>(
                            <tr key={i.code} style={{
                                borderBottom: '1px solid #F0F4F8',
                                transition: 'background-color 0.2s',
                                cursor:'pointer',
                            }} onClick={()=>{
                                // console.log(i)
                                // console.log({ category: '시장', value: calRadarScore(i.marketScore,25) });
                                // console.log({ category: '섹터', value: calRadarScore(i.sectorScore,15) });
                                // console.log({ category: '가격', value: calRadarScore(i.pricePositionScore,15) });
                                // console.log({ category: '추세', value: calRadarScore(i.upCountScore,20) });
                                // console.log({ category: '거래량', value: calRadarScore(i.amountScore,10) });
                                // console.log({ category: '수급', value: calRadarScore(i.tradingScore,15) });
                                setDetail([
                                    { category: '시장', value: calRadarScore(i.marketScore,25) },
                                    { category: '섹터', value: calRadarScore(i.sectorScore,15) },
                                    { category: '가격', value: calRadarScore(i.pricePositionScore,15) },
                                    { category: '추세', value: calRadarScore(i.upCountScore,20) },
                                    { category: '거래량', value: calRadarScore(i.amountScore,10) },
                                    { category: '수급', value: calRadarScore(i.tradingScore,15) }
                                ]);
                            }}>
                                <td style={{fontWeight: 'bold',padding: '16px'}}>{idx+1}</td>
                                <td style={{padding: '16px'}}>
                                    <div style={{fontWeight: 'bold',color: '#1A1A1A'}}>{i.code}</div>
                                    <div style={{fontSize: '14px',color: '#666666',marginTop: '4px'}}>{i.name}</div>
                                </td>
                                <td style={{padding: '16px'}}>
                                    <Number number={i.totalScore} isChange={false}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

export default ScoreTable;