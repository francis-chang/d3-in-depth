import * as d3 from 'd3';
import { Data, NodesEntity } from 'src/data/data';
import styles from './ForceGraph.module.css';
import { MenuItem } from './types';

interface MenuFactoryArgs {
  x: number;
  y: number;
  data: NodesEntity;
  svgId: string;
  menuItems: MenuItem[];
}

export const menuFactory = ({ x, y, menuItems, data, svgId }: MenuFactoryArgs) => {
  d3.select(`.${styles.contextMenu}`).remove();

  // Draw the menu
  d3.select(svgId).append('g').attr('class', styles.contextMenu).selectAll('tmp').data(menuItems).enter().append('g').attr('class', styles.menuEntry);
  // .style({ cursor: 'pointer' });

  // Draw menu entries
  d3.selectAll(`.${styles.menuEntry}`)
    .append('rect')
    .attr('x', x)
    .attr('y', (d, i) => {
      return y + i * 30;
    })
    .attr('rx', 2)
    .attr('width', 150)
    .attr('height', 30)
    .on('click', (d: MenuItem) => {
      d.action(data);
    });

  d3.selectAll(`.${styles.menuEntry}`)
    .append('text')
    .text((d: MenuItem) => {
      return d.title;
    })
    .attr('x', x)
    .attr('y', (d, i) => {
      return y + i * 30;
    })
    .attr('dy', 20)
    .attr('dx', 45)
    .on('click', (d: MenuItem) => {
      d.action(data);
    });

  // Other interactions
  d3.select('body').on('click', () => {
    d3.select(`.${styles.contextMenu}`).remove();
  });
};

interface CreateContextMenuArgs {
  width: number;
  height: number;
  data: NodesEntity;
  svgId: string;
  menuItems: any[];
}

export const createContextMenu = ({ data, menuItems, width, height, svgId }: CreateContextMenuArgs) => {
  //   menuFactory(d3.event.pageX - width / 2, d3.event.pageY - height / 1.5, menuItems, d, svgId);
  //   menuFactory({ x: d3.event.pageX - width / 2, y: d3.event.pageY - height / 1.5, menuItems, data, svgId });
  //   d3.event.preventDefault();
};
