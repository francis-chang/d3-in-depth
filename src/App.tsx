import React from 'react';
import { data } from './data/data';
import DragSliderAnimation from './stories/components/DragSliderAnimation/DragSliderAnimation';
import Enter from './stories/components/Enter';
import { ForceGraph } from './stories/components/ForceGraph/ForceGraph';
import TimeNetwork from './stories/components/TimeNetwork';
import TimeNetwork2 from './stories/components/TimeNetwork2';
import Transition from './stories/components/Transition';

const App: React.FC = () => {
  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>     
      <b>${node.name}</b>
    </div>`;
  }, []);
  return (
    <h1>
      <DragSliderAnimation />
      {/* <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip} /> */}
    </h1>
  );
};

export default App;
