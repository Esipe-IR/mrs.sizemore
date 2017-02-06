import React from 'react'
import WorksheetForm from './sub/WorksheetForm'
import Breadcrumb from '../../general/Breadcrumb'
import AppModal from '../../general/AppModal'

const EditorWorksheet = (props) => (
    <section>
        <Breadcrumb elem={[]} lastElem={"Edit worksheet"}/>

        <div className="panel panel-default">
            <div className="panel-heading">Edit '{props.worksheet.get("name")}'</div>

            <div className="panel-body">
                <WorksheetForm {...props} />
            </div>
        </div>

        <AppModal title="Delete word" 
            content="Are you sure you want to delete this word" 
            action={<button onClick={(e) => {props.deleteWord(e); props.toggleModal(false)(e)}} className="btn btn-danger">Delete</button>} 
            show={props.modal} 
            onHide={props.toggleModal(false)} />
    </section>
)

export default EditorWorksheet
