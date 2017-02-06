import React from 'react'
import Breadcrumb from '../../general/Breadcrumb'
import WordForm from './sub/WordForm'

const EditorWord = (props) => (
    <section>
         <Breadcrumb elem={[{link: "/editor/worksheet/" + props.word.get("worksheet"), title: "Edit worksheet"}]} lastElem={"Edit word"}/>

         <div className="panel panel-default">
            <div className="panel-heading">Edit '{props.word.get("en")}'</div>

            <div className="panel-body">
                <WordForm {...props} />
            </div>
        </div>
    </section>
)

export default EditorWord
