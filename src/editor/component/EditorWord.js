import React from 'react'
import Info from '../../general/Info'

const Examples = ({examples, editChild, deleteChild}) => (
    <div className="list-group">
        {examples.map((e, i) => (
            <div key={"word/examples/" + i} className="list-group-item">
                <div className="input-group">
                    <input
                        id={"word/examples/" + i}
                        type="text" 
                        className="form-control"
                        placeholder="Examples" 
                        value={e}
                        onChange={editChild} 
                    />

                    <span className="input-group-btn">
                        <button data-child={"word/examples/" + i} className="btn btn-danger" onClick={deleteChild}>X</button>
                    </span>
                </div>
            </div>
        ))}
    </div>
)

const EditorWord = ({word, addChild, editChild, deleteChild, saveChild, error, errorMsg}) => (
    <form className="form-horizontal">
        <ol className="breadcrumb">
            <li><a href="/">Home</a></li>
            <li><a href={"/editor/worksheet/" + word.worksheet}>Edit worksheet</a></li>
            <li className="active">Word {word.en}</li>
        </ol>

        <Info status={!error} msg={errorMsg} />

        <div className="form-group">
            <label htmlFor="word/en" className="col-sm-2 control-label">English</label>
            
            <div className="col-sm-10">
                <input
                    id="word/en"
                    type="text" 
                    className="form-control"
                    placeholder="English" 
                    value={word.en}
                    onChange={editChild} 
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
                    value={word.fr}
                    onChange={editChild} 
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
                    value={word.definition}
                    onChange={editChild} 
                />
            </div>
        </div>

        <div className="form-group">
            <label className="col-sm-2 control-label">Examples</label>
            
            <div className="col-sm-10">
                {word.examples ? <Examples examples={word.examples} editChild={editChild} deleteChild={deleteChild} /> : null}
            </div>

            <div className="col-sm-offset-2 col-sm-10">
                 <button data-child="word/examples" data-value="" className="btn btn-app-secondary" onClick={addChild}>Add example</button>
            </div>
        </div>

        <hr />

        <div className="form-group">
            <div className="col-sm-12">
                <button type="submit" className="btn btn-app" onClick={saveChild}>Edit</button>
            </div>
        </div>
    </form>
)

export default EditorWord
