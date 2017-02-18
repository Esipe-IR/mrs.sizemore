import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Sentences from './Sentences'
import Tips from './Tips'
import Breadcrumb from '../../../app/component/Breadcrumb'

const Word = (props) => (
    <section>
        <Breadcrumb items={[{title: "Edit worksheet", link: "/edit/worksheet/" + props.initialValues.worksheet}]} lastItem={"Edit word"} />

        <div className="panel panel-default">
            <div className="panel-heading">Edit word</div>

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
                                        <i className="fa fa-question-circle"></i> Example
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Sentences</label>
                        
                        <div className="col-sm-10">
                            <p>
                                <b>Replace the word you want to put in the sentence by : [x].</b><br/> 
                                Ex. with the word "school" : <i>I don't want to go to [x].</i>
                            </p>

                            <FieldArray name="sentences" component={Sentences} fetchSentences={props.fetchSentences} mutable_en={props.mutable_en}/>
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
