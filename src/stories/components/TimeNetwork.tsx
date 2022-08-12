import React, { useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { drag } from 'd3';
import { range } from 'd3-array';

const TimeNetwork: React.FC = () => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      console.log('DRAW!');

      //   const g = selection.selectAll('g');
      /*
                  D3 joins the data with the selection
                  If there is more in joined Data than selection nodes
                      then place them in the enter selection
              */

      let width = +selection.attr('width');
      let height = +selection.attr('height');

      console.log('width', width);

      var slider = selection.append('g').attr('transform', 'translate(15,' + (height - 50) + ')');

      var L = 10;
      var slider_size = 0.75 * width;
      var left_margin = 0.5 * (width - slider_size);

      var x = scaleLinear()
        .domain([0, 10])
        .range([left_margin, slider_size + left_margin])
        .clamp(true);

      slider
        .append('line')
        .attr('class', 'track')
        .attr('x1', x.range()[0])
        .attr('x2', x.range()[1])
        // .select(function () {
        //   return this.parentNode.appendChild(this.cloneNode(true));
        // })
        .attr('class', 'track-inset')
        // .select(function () {
        //   return this.parentNode.appendChild(this.cloneNode(true));
        // })
        .attr('class', 'track-overlay');
      // .call(
      //   drag()
      //     .on('start.interrupt', function () {
      //       slider.interrupt();
      //     })
      //     .on('start drag', function () {
      //       return hue(x.invert(d3.event.x));
      //     })
      // );

      var years = range(2010, 2016, 1);
      var dx = L / (years.length - 1);
      var xticks = range(0, L + dx, dx);

      slider
        .insert('g', '.track-overlay')
        .attr('class', 'ticks')
        .attr('transform', 'translate(0,' + 25 + ')')
        .selectAll('text')
        .data(xticks)
        .enter()
        .append('text')
        .attr('x', x)
        .attr('text-anchor', 'middle')
        .text(function (d, i) {
          return years[i];
        });

      var handle = slider.insert('circle', '.track-overlay').attr('class', 'handle').attr('r', 9).attr('cx', x.range()[0]); //initial position to zero

      //   function hue(h) {
      //     handle.attr('cx', x(h));
      //   }

      //   function dragstarted(d) {
      //     if (!d3.event.active) simulation.alphaTarget(0).restart();
      //     d.fx = d.x;
      //     d.fy = d.y;
      //   }

      //   function dragged(d) {
      //     d.fx = d3.event.x;
      //     d.fy = d3.event.y;
      //   }

      //   function dragended(d) {
      //     if (!d3.event.active) simulation.alphaTarget(0);
      //     d.fx = null;
      //     d.fy = null;
      //   }
    }
  }, [selection]);
  return (
    <div>
      <svg ref={svgRef} width={960} height={500}></svg>
    </div>
  );
};

export default TimeNetwork;
