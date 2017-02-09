import React from 'react'
import { Field, reduxForm } from 'redux-form'

const WorksheetEditor = (props) => (
    <form className="form-horizontal" onSubmit={props.handleSubmit}>
        <div className="form-group">
            <label htmlFor="worksheet/name" className="col-sm-2 control-label">Name</label>
            
            <div className="col-sm-10">
                <Field name="worksheet/name" component="input" type="text" className="form-control" />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="worksheet/img" className="col-sm-2 control-label">Image</label>

            <div className="col-sm-10">
                <Field name="worksheet/img" component="input" type="text" className="form-control" />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="worksheet/description" className="col-sm-2 control-label">Description</label>

            <div className="col-sm-10">
                <Field name="worksheet/description" component="textarea" className="form-control"/>
            </div>
        </div>

        {/*
        <TextAreaField id="worksheet/description" name="description" />
        <ListField name="words" item={<WordField />} />

        <div className="form-group">
            <label className="col-sm-2 control-label">Add word</label>

            <div className="col-sm-10">
                {props.word ? <AddWord word={props.word} editChild={props.editChild} addWord={props.addWord} /> : null}
            </div>
        </div>
        */
        }

        <div className="form-group">
            <div className="col-sm-12">
                <button type="submit" className="btn btn-app">Edit</button>
            </div>
        </div>
    </form>
)

export default reduxForm({
    form: 'worksheet'
})(WorksheetEditor);
