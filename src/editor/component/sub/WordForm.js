import React from 'react'
import ListExamples from './ListExamples'

const WordForm = (props) => (
    <form className="form-horizontal">
        <div className="form-group">
            <label htmlFor="word/en" className="col-sm-2 control-label">English</label>
            
            <div className="col-sm-10">
                <input
                    id="word/en"
                    type="text" 
                    className="form-control"
                    placeholder="English" 
                    value={props.word.get("en")}
                    onChange={props.editChild} 
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="word/fr" className="col-sm-2 control-label">French</label>
            
            <div className="col-sm-10">
                <input
                    id="word/fr"
                    type="text" 
                    className="form-control"
                    placeholder="French" 
                    value={props.word.get("fr")}
                    onChange={props.editChild} 
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="word/definition" className="col-sm-2 control-label">Definition</label>
            
            <div className="col-sm-10">
                <input
                    id="word/definition"
                    type="text" 
                    className="form-control"
                    placeholder="Definition" 
                    value={props.word.get("definition")}
                    onChange={props.editChild} 
                />
            </div>
        </div>

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

        <div className="form-group">
            <div className="col-sm-12">
                <button type="submit" className="btn btn-app" onClick={props.saveChild}>Edit</button>
            </div>
        </div>
    </form>
)

export default WordForm
