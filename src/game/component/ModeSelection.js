import React from 'react'
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

const ModeSelection = (props) => (
    <div className="mode-selection margin-btm-20">
        <Tabs justified={true} onChange={props.updateMode} defaultSelectedIndex={props.mode}>
            <Tab value={0} label="Translator">
            </Tab>
            <Tab value={1} label="Fillgap">
            </Tab>
        </Tabs>
    </div>
)

export default ModeSelection
