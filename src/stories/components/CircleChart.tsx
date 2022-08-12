import { select } from 'd3-selection';
import React, { useEffect } from 'react';

export default function CircleChart() {
  useEffect(() => {
    const width = 400;
    const height = 400;
    const data = [10, 28, 35];
    const colors = ['green', 'lightblue', 'yellow'];

    const svg = select('body').append('svg').attr('width', width).attr('height', height);

    const g = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,0)';
      });

    g.append('circle')
      .attr('cx', function (d, i) {
        return i * 75 + 50;
      })
      .attr('cy', function (d, i) {
        return 75;
      })
      .attr('r', function (d) {
        return d * 1.5;
      })
      .attr('fill', function (d, i) {
        return colors[i];
      });

    g.append('text')
      .attr('x', function (d, i) {
        return i * 75 + 25;
      })
      .attr('y', 80)
      .attr('stroke', 'teal')
      .attr('font-size', '10px')
      .attr('font-family', 'sans-serif')
      .text((d) => {
        return d;
      });
  }, []);

  return (
    <div className='App'>
      <div id='svgcontainer'></div>
    </div>
  );
}
