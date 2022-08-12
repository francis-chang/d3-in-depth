import React, { useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';

const data = [
  {
    name: 'foo',
    units: 100,
    color: 'red',
  },
  {
    name: 'bar',
    units: 200,
    color: 'blue',
  },
  {
    name: 'baz',
    units: 300,
    color: 'orange',
  },
];

const Enter: React.FC = () => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      selection
        .append('rect')
        .attr('width', (d) => 100)
        .attr('height', (d) => 100)
        .attr('fill', (d) => 'blue');
    }
  }, [selection]);
  return (
    <div>
      <svg ref={svgRef} width={300} height={300} />
    </div>
  );
};

export default Enter;
