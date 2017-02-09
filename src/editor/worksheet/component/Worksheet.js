import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import ListWord from './ListWord'

const renderWords = ({ fields, meta: { touched, error } }) => (
    <ul className="list-group">
        {fields.map((member, index) =>
            <li key={index} className="list-group-item">
                <Field
                    name={`${member}.en`}
                    type="text"
                    component="input"/>

                <Field
                    name={`${member}.fr`}
                    type="text"
                    component="input"/>

                <button title="Remove Member" onClick={() => fields.remove(index)} className="btn btn-danger">
                    Delete
                </button>
            </li>
        )}

        <li className="list-group-item">
            <button type="button" onClick={() => fields.push({})} className="btn btn-primary">Add Word</button>
            {touched && error && <span>{error}</span>}
        </li>
    </ul>
)

const Worksheet = (props) => (
    <form className="form-horizontal" onSubmit={props.handleSubmit}>
        <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
            
            <div className="col-sm-10">
                <Field name="name" component="input" type="text" className="form-control" />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="img" className="col-sm-2 control-label">Image</label>

            <div className="col-sm-10">
                <Field name="img" component="input" type="text" className="form-control" />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="description" className="col-sm-2 control-label">Description</label>

            <div className="col-sm-10">
                <Field name="description" component="textarea" className="form-control"/>
            </div>
        </div>

        <ListWord words={props.initialValues.words} />

        <FieldArray name="words" component={renderWords}/>

        <div className="form-group">
            <div className="col-sm-12">
                <button type="submit" className="btn btn-app">Edit</button>
            </div>
        </div>
    </form>
)

const WorksheetForm = reduxForm({
    form: 'worksheet'
})(Worksheet);

export default WorksheetForm
