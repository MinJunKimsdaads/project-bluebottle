import { useEffect, useRef } from "react";
import Card from "../common/Card";
import * as d3 from 'd3'

const ScoreDetailRadar = ({data}) => {
    const svgRef = useRef(null);

    useEffect(()=>{
        if(!svgRef.current) return;

        const width = 400;
        const height = 350;
        const margin = 40;
        const radius = Math.min(width, height) / 2 - margin;

        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);
        const angleSlice = (Math.PI * 2) / data.length;

        const levels = 5;

        for (let i = 0; i < levels; i++) {
            const levelRadius = (radius / levels) * (i + 1);
            svg.append("circle")
                .attr("r", levelRadius)
                .style("fill", "none")
                .style("stroke", "#E0E0E0")
                .style("stroke-width", "1px");
        }

        // 축 선
        data.forEach((d, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            svg.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", x)
                .attr("y2", y)
                .style("stroke", "#E0E0E0")
                .style("stroke-width", "1px");

            // 라벨
            const labelRadius = radius + 25;
            const labelX = Math.cos(angle) * labelRadius;
            const labelY = Math.sin(angle) * labelRadius;

            svg.append("text")
                .attr("x", labelX)
                .attr("y", labelY)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .style("font-size", "13px")
                .style("font-weight", "600")
                .style("fill", "#1A1A1A")
                .text(d.category);
        });

        // 데이터 폴리곤
        const radarLine = d3.lineRadial()
            .angle((d, i) => angleSlice * i)
            .radius(d => (d.value / 100) * radius)
            .curve(d3.curveLinearClosed);

        svg.append("path")
            .datum(data)
            .attr("d", radarLine)
            .style("fill", "#4CAF50")
            .style("fill-opacity", 0.6)
            .style("stroke", "#2C5F7C")
            .style("stroke-width", "2px");

        // 데이터 포인트
        data.forEach((d, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const r = (d.value / 100) * radius;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;

            svg.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 4)
                .style("fill", "#2C5F7C")
                .style("stroke", "white")
                .style("stroke-width", "2px");
        });
    },[data])

    return (
        <Card>
            <h2 style={{fontSize: '24px',fontWeight: 'bold',marginBottom: '24px',color: '#2C5F7C',textAlign: 'center'}}>기본 점수</h2>
            <div style={{display: 'flex',justifyContent: 'center',overflow: 'auto',}}>
                <svg ref={svgRef}></svg>
            </div>
        </Card>
    )
}

export default ScoreDetailRadar;