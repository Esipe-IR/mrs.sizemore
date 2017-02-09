import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

const AddWord = (props) => (
    <div className="box">
        <div className="box-body">
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="en" className="col-sm-2 control-label">English</label>
                    
                    <div className="col-sm-10">
                        <Field name="en" component="input" type="text" className="form-control" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="fr" className="col-sm-2 control-label">French</label>
                    
                    <div className="col-sm-10">
                        <Field name="fr" component="input" type="text" className="form-control" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="definition" className="col-sm-2 control-label">Definition</label>
                    
                    <div className="col-sm-10">
                        <Field name="definition" component="input" type="text" className="form-control" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-primary">
                            <i className="fa fa-plus" aria-hidden="true"></i> Add word
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
)

const AddWordForm = reduxForm({
    form: 'add_word'
})(AddWord);

const mapStateToProps = ({ editorReducer }) => ({
    initialValues: editorReducer.get("word").toJS()
})

export default connect(mapStateToProps)(AddWordForm)
