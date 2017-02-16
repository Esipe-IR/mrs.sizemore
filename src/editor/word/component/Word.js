import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Examples from './Examples'
import Tips from './Tips'
import Breadcrumb from '../../../app/component/Breadcrumb'

const Word = (props) => (
    <section>
        <Breadcrumb items={[{title: "Edit Worksheet", link: "/edit/worksheet/" + props.initialValues.worksheet}]} lastItem={"Edit Word"} />

        <div className="panel panel-default">
            <div className="panel-heading">Edit Word</div>

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
                            <div className="input-group">
                                <Field name="definition" component="input" type="text" className="form-control" />

                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-success" onClick={() => props.fetchDefinitions(props.mutable_en)}>
                                        <i className="fa fa-question-circle"></i> Help
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Examples</label>
                        
                        <div className="col-sm-10">
                            <em>(word = "World") => "Hey Hello [x]"</em><br />
                            <em>(word = "English") => "My favourite subject is by far [x]"</em>

                            <FieldArray name="examples" component={Examples} fetchExamples={props.fetchExamples} mutable_en={props.mutable_en}/>
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

        {props.tips ? <Tips modal={props.tips} onHide={() => props.updateTips(props.tips.set("show", false))} onSubmit={props.submitTips} /> : null}
    </section>
)

const WordForm = reduxForm({
    form: 'word_editor'
})(Word);

export default WordForm
