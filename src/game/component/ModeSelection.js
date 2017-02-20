import React from 'react'
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import TranslatorContainer from '../translator/TranslatorContainer'
import FillgapContainer from '../fillgap/FillgapContainer'

const ModeSelection = (props) => (
    <div className="mode-selection margin-btm-20">
        <Tabs justified={true} defaultSelectedIndex={props.mode} onChange={(m) => typeof(m) !== "object" ? props.updateMode(m) : null}>
            <Tab value={0} label="Translator" onClick={() => props.updateMode(0)}>
                <TranslatorContainer words={props.worksheet.get("words")} /> 
            </Tab>
            <Tab value={1} label="Fillgap" onClick={() => props.updateMode(0)}>
                <FillgapContainer words={props.worksheet.get("words")} />
            </Tab>
        </Tabs>
    </div>
)

export default ModeSelection
