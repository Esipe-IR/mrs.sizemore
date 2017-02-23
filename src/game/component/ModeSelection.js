import React from 'react'
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

const ModeSelection = (props) => (
    <div className="mode-selection margin-btm-20">
        <Tabs justified={true} defaultSelectedIndex={props.mode} onChange={(m) => props.updateMode(m)}>
            <Tab value={0} label="Translator" onClick={() => props.updateMode(0)}>    
            </Tab>
            <Tab value={1} label="Fillgap" onClick={() => props.updateMode(0)}>
            </Tab>
        </Tabs>
    </div>
)

export default ModeSelection
