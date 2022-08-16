import * as d3 from 'd3';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createContextMenu } from './utils';
import styles from './ForceGraph.module.css';
import { LinksEntity, NodesEntity } from 'src/data/data';
import { SimulationNodeDatum } from 'd3';
import { MenuItem } from './types';

interface RunForceGraphArgs {
  container: any;
  linksData: LinksEntity[];
  nodesData: NodesEntity[];
  nodeHoverTooltip: React.ReactNode;
}

export function runForceGraph({ container, linksData, nodesData, nodeHoverTooltip }: RunForceGraphArgs) {
  const links = linksData.map((d) => Object.assign({}, d)) as (SimulationNodeDatum & LinksEntity)[];
  const nodes = nodesData.map((d) => Object.assign({}, d)) as (SimulationNodeDatum & NodesEntity)[];

  const menuItems: MenuItem[] = [
    {
      title: 'First action',
      action: (d) => {
        // TODO: add any action you want to perform
        console.log(d);
      },
    },
    {
      title: 'Second action',
      action: (d) => {
        // TODO: add any action you want to perform
        console.log(d);
      },
    },
  ];

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const color = () => {
    return '#9D00A0';
  };

  const icon = (d: NodesEntity) => {
    return d.gender === 'male' ? '\uf222' : '\uf221';
  };

  const getClass = (d: NodesEntity) => {
    return d.gender === 'male' ? styles.male : styles.female;
  };

  const drag = (simulation) => {
    // const dragstarted = (d) => {
    //   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    //   d.fx = d.x;
    //   d.fy = d.y;
    // };
    // const dragged = (d) => {
    //   d.fx = d3.event.x;
    //   d.fy = d3.event.y;
    // };
    // const dragended = (d) => {
    //   if (!d3.event.active) simulation.alphaTarget(0);
    //   d.fx = null;
    //   d.fy = null;
    // };
    // return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  };

  // Add the tooltip element to the graph
  const tooltip = document.querySelector('#graph-tooltip');
  if (!tooltip) {
    const tooltipDiv = document.createElement('div');
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = '0';
    tooltipDiv.id = 'graph-tooltip';
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select('#graph-tooltip');

  const addTooltip = (hoverTooltip, d, x, y) => {
    div.transition().duration(200).style('opacity', 0.9);
    div
      .html(hoverTooltip(d))
      .style('left', `${x}px`)
      .style('top', `${y - 28}px`);
  };

  const removeTooltip = () => {
    div.transition().duration(200).style('opacity', 0);
  };

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d) => (d as any).id)
    )
    .force('charge', d3.forceManyBody().strength(-2000))
    .force('x', d3.forceX())
    .force('y', d3.forceY());

  const svg = d3
    .select(container)
    .append('svg')
    .attr('id', 'graphSvg')
    // .attr('viewBox', [-width / 2, -height / 2, width, height])
    .call(
      d3.zoom().on('zoom', function (event) {
        svg.attr('transform', event.transform);
      })
    );

  const link = svg.append('g').attr('stroke', '#999').attr('stroke-opacity', 0.6).selectAll('line').data(links).join('line');
  // .attr('stroke-width', (d) => Math.sqrt(d.value));

  const node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .on('contextmenu', (d) => {
      createContextMenu({ data: d, menuItems, width, height, svgId: '#graphSvg' });
    })
    .attr('r', 12)
    .attr('fill', color)
    .call(drag(simulation) as any);

  const label = svg
    .append('g')
    .attr('class', 'labels')
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .on('contextmenu', (d) => {
      createContextMenu({ data: d, menuItems, width, height, svgId: '#graphSvg' });
    })
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('class', (d) => `fa ${getClass(d)}`)
    .text((d) => {
      return icon(d);
    });
  // .call(drag(simulation));

  // label
  //   .on('mouseover', (d) => {
  //     addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
  //   })
  //   .on('mouseout', () => {
  //     removeTooltip();
  //   });

  simulation.on('tick', () => {
    //update link positions
    // link
    //   .attr('x1', (d) => d.source.x)
    //   .attr('y1', (d) => d.source.y)
    //   .attr('x2', (d) => d.target.x)
    //   .attr('y2', (d) => d.target.y);

    // update node positions
    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

    // update label positions
    label
      .attr('x', (d) => {
        return d.x;
      })
      .attr('y', (d) => {
        return d.y;
      });
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
  };
}
