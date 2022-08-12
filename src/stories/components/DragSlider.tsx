import React, { useRef, useEffect, useState } from 'react';
// import { BaseType, Selection } from 'd3-selection';
// import { scaleLinear } from 'd3-scale';
// import { drag } from 'd3-drag';
// import { interpolate } from 'd3-interpolate';
import * as d3 from 'd3';
import './DragSlider.css';

const DragSlider: React.FC = () => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [svg, setSvg] = useState<null | d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
    } else {
      // svg.append('rect').attr('width', 200).attr('height', 200).attr('fill', 'blue');

      const margin = { right: 50, left: 50 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height');

      let x = d3.scaleLinear().domain([0, 180]).range([0, width]).clamp(true);

      let slider = svg
        .append('g')
        .attr('class', 'slider')
        .attr('transform', 'translate(' + margin.left + ',' + height / 2 + ')');

      slider
        .append('line')
        .attr('class', 'track')
        .attr('x1', x.range()[0])
        .attr('x2', x.range()[1])
        .select(function () {
          // ToDo: fix any
          return this!.parentNode.appendChild(this.cloneNode(true)) as any;
        })
        .attr('class', 'track-inset')
        .select(function () {
          return this!.parentNode.appendChild(this.cloneNode(true));
        })
        .attr('class', 'track-overlay')
        .call(
          d3.drag().on('drag', function (event) {
            const me = d3.select(this);
            hue(x.invert(event.x));
          })
        );

      slider
        .insert('g', '.track-overlay')
        .attr('class', 'ticks')
        .attr('transform', 'translate(0,' + 18 + ')')
        .selectAll('text')
        .data(x.ticks(10))
        .enter()
        .append('text')
        .attr('x', x)
        .attr('text-anchor', 'middle')
        .text(function (d) {
          return d + '°';
        });

      slider
        .transition() // Gratuitous intro!
        .duration(750)
        .tween('hue', function () {
          var i = d3.interpolate(0, 70);
          return function (t) {
            hue(i(t));
          };
        });

      const hue = (h: any) => {
        handle.attr('cx', x(h));
        svg.style('background-color', d3.hsl(h, 0.8, 0.8) as any);
      };

      let handle = slider.insert('circle', '.track-overlay').attr('class', 'handle').attr('r', 9);
    }
  }, [svg]);
  return (
    <div>
      <svg ref={svgRef} width='960' height='500'></svg>
    </div>
  );
};

export default DragSlider;
