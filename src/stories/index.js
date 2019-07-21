import React from 'react'
import { storiesOf } from '@storybook/react'
import Selection from './components/Selection'
import DataJoin from './components/DataJoin'
import Enter from './components/Enter'

storiesOf('D3, React tutorial', module)
    .add('1 - selections', () => <Selection />)
    .add('2 - data joins', () => <DataJoin />)
    .add('3 - enter selection', () => <Enter />)
