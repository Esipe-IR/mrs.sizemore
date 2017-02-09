import React from 'react'
import ListExamples from './ListExamples'

const WordEditor = (props) => (
    <form className="form-horizontal">
        <TextField id="word/en" name="en" label="English" />
        <TextField id="word/fr" name="fr" label="French" />
        <TextField id="word/definition" name="definition" label="Definition" />

        <div className="form-group">
            <label className="col-sm-2 control-label">Examples</label>
            
            <div className="col-sm-10">
                {props.word.get("examples") ? <ListExamples examples={props.word.get("examples")} editChild={props.editChild} deleteChild={props.deleteChild} /> : null}
            </div>

            <div className="col-sm-offset-2 col-sm-10">
                 <button data-child="word/examples" className="btn btn-primary" onClick={props.addChild}><i className="fa fa-plus" aria-hidden="true"></i> Add example</button>
            </div>
        </div>

        <hr />

        <SubmitField />
    </form>
)

export default WordEditor
