import { useEffect, useRef, useState } from "react";
import Card from "../common/Card";
import * as d3 from 'd3'

const SectorBox = ({title, data, columns = 8}) => {
    const svgRef = useRef(null);
    useEffect(()=>{
        if (!svgRef.current) return;
        if(!data.length) return;

        const cellSize = 100;
        const gap = 4;
        const rows = Math.ceil(data.length / columns);
        const width = columns * (cellSize + gap);
        const height = rows * (cellSize + gap);

        d3.select(svgRef.current).selectAll("*").remove();
        
        const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
        
        const colorScale = d3.scaleLinear().domain([-3,3]).range(['#EF5350',  '#4CAF50']);

        const cells = svg.selectAll("g").data(data).enter().append("g").attr("transform", (d, i) => {
            const row = Math.floor(i / columns);
            const col = i % columns;
            return `translate(${col * (cellSize + gap)},${row * (cellSize + gap)})`;
        });

        cells.append("rect")
            .attr("width",cellSize)
            .attr("height",cellSize)
            .attr("rx",8)
            .style("fill", d => colorScale(parseFloat(d.value)))
            .style("cursor", "pointer")
            .style("opacity", 0)
            .on("mouseover",(event,d)=>{
                d3.select(this)
                .transition()
                .duration(200)
                .style("opacity",0.8)
                .attr("transform","scale(1.05)");
            })
            .on("mouseout",()=>{
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity",1)
                    .attr("transform","scale(1)");
            })
            .transition()
            .duration(800)
            .delay((d, i) => i * 30)
            .style("opacity", 1);

        cells.append("text")
            .attr("x", cellSize / 2)
            .attr("y", cellSize / 1.5)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("font-size", "13px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .style("opacity", 0)
            .text(d => {
                if(d.name.length > 6){
                    return `${d.name.slice(0,5)}...`; 
                }else{
                    return `${d.name}`; 
                }
            })
            .transition()
            .duration(800)
            .delay((d, i) => i * 30)
            .style("opacity", 1);

        cells.append("text")
            .attr("x", cellSize / 2)
            .attr("y", cellSize / 3)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("font-size", "13px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .style("opacity", 0)
            .text(d => `${d.value}%`)
            .transition()
            .duration(800)
            .delay((d, i) => i * 30)
            .style("opacity", 1);
    },[data, columns]);

    return(
        <Card>
            <h2 style={{fontSize:'24px',fontWeight: 'bold',marginBottom: '24px',color: '#2C5F7C',}}>{title}</h2>
            <div style={{display: 'flex',justifyContent: 'center',overflow: 'auto',}}>
                <svg ref={svgRef}></svg>
            </div>
        </Card>
    )
}

export default SectorBox;