/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const data = [
  {
    name: 'foo',
    units: 32,
  },
  {
    name: 'bar',
    units: 67,
  },
  {
    name: 'baz',
    units: 81,
  },
  {
    name: 'hoge',
    units: 38,
  },
  {
    name: 'piyo',
    units: 28,
  },
  {
    name: 'hogera',
    units: 59,
  },
];

const Axis: React.FC = () => {
  const dimensions = {
    width: 600,
    height: 600,
    marginLeft: 100,
    marginBottom: 100,
    chartHeight: 500,
    chartWidth: 500,
  };
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.units)!])
    .range([dimensions.width - dimensions.marginBottom, 0]);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimensions.width - dimensions.marginLeft])
    .padding(0.1);

  /**
   * generates axis functions for the given scales
   * when called, axis are rendered at the origin
   * appy transforms to place the axis where they need to be
   * modifications can be aplied to the functions to style the axis
   */
  const xAxis = d3.axisBottom(x);
  const yAxis = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `${d} units`);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      /**
       * we need to call so we can pass in the current selection
       * calling an axis will return the current seleciton
       * i have separated the groups and put them into variables
       * for readability
       */
      const xAxisGroup = selection.append('g').attr('transform', `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`).call(xAxis);
      /**
       * you can grab the selection of texts
       * in the xAxisGroup to style them
       */
      xAxisGroup.selectAll('text').attr('transform', 'rotate(-40)').attr('text-anchor', 'end').attr('font-size', '15px');

      const yAxisGroup = selection.append('g').attr('transform', `translate(${dimensions.marginLeft}, 0)`).call(yAxis);

      const charts = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', (d) => dimensions.chartHeight - y(d.units))
        .attr('x', (d) => x(d.name)!)
        //translate the bars
        .attr('y', (d) => y(d.units));
    }
  }, [selection]);
  return <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />;
};

export default Axis;
