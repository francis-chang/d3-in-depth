import React, { useRef, useEffect, useState } from 'react';
// import { BaseType, Selection } from 'd3-selection';
// import { scaleLinear } from 'd3-scale';
// import { drag } from 'd3-drag';
// import { interpolate } from 'd3-interpolate';
import * as d3 from 'd3';
import './DragSliderAnimation.css';

const DragSlider2: React.FC = () => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [svg, setSvg] = useState<null | d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  const [moving, setMoving] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [timer, setTimer] = useState(null);

  const [handle, setHandle] = useState(null);
  const [x, setX] = useState(null);

  const margin = { right: 50, left: 50 };

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }
    // svg.append('rect').attr('width', 200).attr('height', 200).attr('fill', 'blue');

    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height');

    const targetValue = width;
    let currentValue = 0;

    let x = d3.scaleLinear().domain([0, 180]).range([0, width]).clamp(true);
    setX(() => x);

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
          setCurrentValue(x(x.invert(event.x)));
          setMoving(false);
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
        return d;
      });

    const handleInternal = slider.insert('circle', '.track-overlay').attr('class', 'handle').attr('r', 9);

    setHandle(handleInternal);

    var label = slider
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .text('0')
      .attr('transform', 'translate(0,' + -25 + ')');

    slider
      .transition() // Gratuitous intro!
      .duration(750)
      .tween('hue', function () {
        var i = d3.interpolate(0, 0);
        return function (t) {
          hue(i(t));
        };
      });

    const hue = (h: any) => {
      handleInternal.attr('cx', x(h));
      label.attr('x', x(h)).text(Math.floor(h));
      svg.style('background-color', d3.hsl(h, 0.8, 0.8) as any);
    };
  }, [svg]);

  useEffect(() => {
    if (!svg) return;

    const update = (h: number) => {
      // update position and text of label according to slider scale
      handle.attr('cx', x(h));
      svg.style('background-color', d3.hsl(h, 0.8, 0.8) as any);
    };

    let currValInternal: number = currentValue;
    let targetValue = +svg.attr('width') - margin.left - margin.right;

    const step = () => {
      console.log('step');
      update(x.invert(currValInternal));
      currValInternal = currValInternal + targetValue / 151;
      if (currValInternal > targetValue) {
        setMoving(false);
        currValInternal = 0;
        clearInterval(timer);
        console.log('Slider moving: ' + moving);
      }
      setCurrentValue(currValInternal);
    };

    if (moving) {
      setTimer(setInterval(step, 100));
      console.log('set interval');
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }, [moving]);

  return (
    <div>
      <svg ref={svgRef} width='960' height='500'></svg>
      <button
        id='play-button'
        onClick={() => {
          setMoving((prevValue) => !prevValue);
        }}>
        {moving ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default DragSlider2;
