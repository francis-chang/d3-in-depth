import React, { useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

const TimeNetwork: React.FC = () => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      console.log('DRAW!');

      const g = selection.selectAll('g');
      /*
                  D3 joins the data with the selection
                  If there is more in joined Data than selection nodes
                      then place them in the enter selection
              */

      //   let width = +selection.attr('width');
      //   let height = +selection.attr('height');

      //   var slider = selection.append('g').attr('transform', 'translate(15,' + (height - 50) + ')');

      //   var L = 10;
      //   var slider_size = 0.75 * width;
      //   var left_margin = 0.5 * (width - slider_size);

      //   var x = scaleLinear()
      //     .domain([0, 10])
      //     .range([left_margin, slider_size + left_margin])
      //     .clamp(true);

      //   slider.append('line').attr('class', 'track').attr('x1', x.range()[0]).attr('x2', x.range()[1]);

      //   selection.append('rect').attr('x', 200).attr('y', 200).attr('fill', 'blue');
      //   selection.append('rect').attr('width', 200).attr('width', 200).attr('fill', 'blue');

      g.append('rect').attr('width', 200).attr('width', 200).attr('fill', 'blue');
      // .select(function () {
      //   return this.parentNode.appendChild(this.cloneNode(true));
      // })
      // .attr('class', 'track-inset')
      // .select(function () {
      //   return this.parentNode.appendChild(this.cloneNode(true));
      // })
      // .attr('class', 'track-overlay')
      // .call(
      //   d3
      //     .drag()
      //     .on('start.interrupt', function () {
      //       slider.interrupt();
      //     })
      //     .on('start drag', function () {
      //       return hue(x.invert(d3.event.x));
      //     })
      // );
    }
  }, [selection]);
  return (
    <div>
      <svg ref={svgRef} width={960} height={500}></svg>
    </div>
  );
};

export default TimeNetwork;
