import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { Candidate } from './Analytics';

interface Props {
  candidates: Candidate[];
}

export const MetricCosmos: React.FC<Props> = ({ candidates }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !candidates.length) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Extract unique skills and their frequencies
    const skillsMap = new Map();
    candidates.forEach(candidate => {
      candidate.skills.forEach(skill => {
        skillsMap.set(skill, (skillsMap.get(skill) || 0) + 1);
      });
    });

    const nodes = Array.from(skillsMap.entries()).map(([skill, count]) => ({
      id: skill,
      value: count,
      group: skill.toLowerCase().includes('react') || skill.toLowerCase().includes('vue') ? 'frontend' :
             skill.toLowerCase().includes('python') || skill.toLowerCase().includes('ml') ? 'ai' : 'backend'
    }));

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.value) * 4));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => Math.sqrt(d.value) * 3)
      .attr('fill', d => d.group === 'frontend' ? '#60A5FA' : 
                        d.group === 'backend' ? '#A78BFA' : '#5EEAD4')
      .attr('class', 'transition-all duration-300 hover:opacity-80')
      .call(drag(simulation));

    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id)
      .attr('class', 'text-xs fill-white opacity-80')
      .attr('dy', -10);

    simulation.on('tick', () => {
      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, [candidates]);

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gray-900 rounded-xl overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
      <svg ref={svgRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-semibold mb-2">Top Skills Distribution</h3>
        <div className="space-y-2">
          {Array.from(new Set(candidates.flatMap(c => c.skills)))
            .slice(0, 5)
            .map(skill => (
              <div key={skill} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm text-gray-300">{skill}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};