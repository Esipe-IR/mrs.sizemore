import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Word = (props) => (
    <section>
        <div className="panel panel-default">
            <div className="panel-heading">Edit</div>

            <div className="panel-body">
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
                        <label className="col-sm-2 control-label">Examples</label>
                        
                        <div className="col-sm-10">
                        </div>

                        <div className="col-sm-offset-2 col-sm-10">
                            <button data-child="word/examples" className="btn btn-primary">
                                <i className="fa fa-plus" aria-hidden="true"></i> Add example
                            </button>
                        </div>
                    </div>

                    <hr />

                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-app">Edit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
)

const WordForm = reduxForm({
    form: 'word'
})(Word);

export default WordForm
