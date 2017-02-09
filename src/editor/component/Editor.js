import React from 'react'
import Breadcrumb from '../../app/component/Breadcrumb'
import AppModal from '../../app/component/AppModal'
import WorksheetEditor from './worksheet/WorksheetEditor'

const Editor = (props) => (
    <section>
        {props.params.type === "worksheet" ? 
            <Breadcrumb elem={[]} lastElem={"Edit worksheet"}/>
            :
            <Breadcrumb elem={[{link: "/editor/worksheet/" + props.word.get("worksheet"), title: "Edit worksheet"}]} lastElem={"Edit word"}/>
        }

        <div className="panel panel-default">
            <div className="panel-heading">Edit '{props.worksheet.get("name")}'</div>

            <div className="panel-body">
                {props.params.type === "worksheet" ?
                    <WorksheetEditor {...props} onSubmit={(values) => console.log(values)} />
                    :
                    null
                }
            </div>
        </div>

        <AppModal title="Delete word" 
            content="Are you sure you want to delete this word" 
            action={<button onClick={(e) => {props.deleteWord(e); props.toggleModal(false)(e)}} className="btn btn-danger">Delete</button>} />
    </section>
)

export default Editor
