import React from 'react'
import { storiesOf } from '@storybook/react'
import Selection from './components/Selection'
import DataJoin from './components/DataJoin'
import Enter from './components/Enter'
import Scales from './components/Scales'
import Group from './components/Groups'

storiesOf('D3, React tutorial', module)
    .add('1 - selections', () => <Selection />)
    .add('2 - data joins', () => <DataJoin />)
    .add('2.5 - enter selection', () => <Enter />)
    .add('3 - scales', () => <Scales />)
    .add('4 - groups and margins', () => <Group />)
