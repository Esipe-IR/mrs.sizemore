import React from 'react'

const AddWord = ({word, editChild, addWord}) => (
    <div className="box">
        <div className="box-body">
            <div className="form-group">
                <label htmlFor="word/en" className="col-sm-2 control-label">English</label>
                
                <div className="col-sm-10">
                    <input
                        id="word/en"
                        type="text" 
                        className="form-control"
                        placeholder="English" 
                        value={word.get("en")}
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
                        value={word.get("fr")}
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
                        value={word.get("definition")}
                        onChange={editChild} 
                    />
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <button onClick={addWord} className="btn btn-app-secondary sized">
                        <i className="fa fa-plus" aria-hidden="true"></i> Add word
                    </button>
                </div>
            </div>
        </div>
    </div>
)

export default AddWord
