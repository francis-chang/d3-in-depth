/* eslint-disable @typescript-eslint/naming-convention */
import React, { useRef, useEffect, useState } from 'react';

import * as d3 from 'd3';

const TimeNetwork: React.FC = () => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
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

      var x = d3
        .scaleLinear()
        .domain([0, 10])
        .range([left_margin, slider_size + left_margin])
        .clamp(true);

      slider
        .append('line')
        .attr('class', 'track')
        .attr('x1', x.range()[0])
        .attr('x2', x.range()[1])
        .each(function () {
          return this.parentNode!.appendChild(this.cloneNode(true));
        })
        .attr('class', 'track-inset')
        .each(function () {
          return this.parentNode!.appendChild(this.cloneNode(true));
        })
        .attr('class', 'track-overlay')
        .call(
          d3
            .drag()
            .on('start.interrupt', function () {
              slider.interrupt();
            })
            .on('start drag', function () {
              return hue(x.invert(d3.event.x));
            }) as any
        );

      var years = d3.range(2010, 2016, 1);
      var dx = L / (years.length - 1);
      var xticks = d3.range(0, L + dx, dx);

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

      const hue = (h: any) => {
        handle.attr('cx', x(h));
      };

      const dragstarted = (d: any) => {
        //   if (!event.active) simulation.alphaTarget(0).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d: any) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragended = (d: any) => {
        //   if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };
    }

    /////// GRAPH ////////
    // json("graph.json", (error: any, graph: any) => {
    //     if (error) throw error;

    //     //user-defined parameters
    //     var maxDistance = 300, //max distance between two nodes
    //         minDistance = 10, //min distance betwween two nodes
    //         maxRadius = 30, //max radius of circle
    //         minRadius = 8, //min radius of circle
    //         minLinkwidth = 0, //min width of link
    //         maxLinkwidth = 6 //max width of link

    //     var [maxConnect, maxFraction] = getnetworkProp(graph);

    //     var nodes = graph.nodes
    //     let  nodeById = map(nodes, function(d) { return d.id; })
    //     let   links = graph.links
    //     let  value = links.map(function(d){return d.value})
    //     let l = [] as any[]

    //     links.forEach((link) =>{
    //         var s = nodeById.get(link.source),
    //             t = nodeById.get(link.target),
    //             v = link.value,
    //             y = link.year;

    //         l.push({source: s, target: t, year: y, value:v});
    //       });

    //     links = l

    //     simulation = d3.forceSimulation(nodes)

    //     simulation.force("charge", d3.forceManyBody())
    //         .force("link", d3.forceLink(links))
    //         .on("tick", ticked);

    //     var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + 0.45 * height + ")"),
    //         link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
    //         node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

    //       //this function calculates properties of network
    //     //(i.e., max connection between nodes, max fraction value of node)
    //     function getnetworkProp(graph){
    //         //1) max connection between nodes
    //         var maxConnect = Math.max.apply(Math,graph.links.map(function(d) {return d.value;}));   //max connection between nodes

    //         //2) max fraction value (used to draw nodes radii)
    //         var maxFraction = 0;
    //         var arr, obj, maxf;
    //         for (i=0;i<graph.nodes.length;i++){
    //             obj = graph.nodes[i].fraction
    //             arr = Object.keys( obj ).map(function (key) { return obj[key]; });
    //             maxf = Math.max.apply( null, arr );
    //             maxFraction = Math.max(maxFraction,maxf);
    //         }
    //         return [maxConnect, maxFraction];
    //      }
  }, [selection]);
  return (
    <div>
      <svg ref={svgRef} width={960} height={500}></svg>
    </div>
  );
};

export default TimeNetwork;
