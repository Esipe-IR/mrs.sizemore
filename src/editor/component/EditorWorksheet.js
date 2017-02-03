import React from 'react'
import AddWord from './AddWord'

const EditorWorksheet = (props) => (
    <form className="form-horizontal">
        <ol className="breadcrumb">
            <li><a href="/">Home</a></li>
            <li className="active">Edit {props.worksheet.get("name")}</li>
        </ol>

        <div className="form-group">
            <label htmlFor="worksheet/name" className="col-sm-2 control-label">Name</label>
            
            <div className="col-sm-10">
                <input
                    id="worksheet/name"
                    type="text" 
                    className="form-control"
                    placeholder="Name" 
                    value={props.worksheet.get("name")}
                    onChange={props.editChild} 
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="worksheet/img" className="col-sm-2 control-label">Image</label>
            
            <div className="col-sm-10">
                <input
                    id="worksheet/img"
                    type="text"
                    className="form-control"
                    placeholder="Img"
                    value={props.worksheet.get("img")}
                    onChange={props.editChild} 
                />
            </div>
        </div>
        
        <div className="form-group">
            <label htmlFor="worksheet/description" className="col-sm-2 control-label">Description</label>
            
            <div className="col-sm-10">
                <textarea 
                    id="worksheet/description"
                    className="form-control"
                    rows="3"
                    value={props.worksheet.get("description")}
                    onChange={props.editChild}>
                </textarea>
            </div>
        </div>

        <div className="form-group">
            <label className="col-sm-2 control-label">Words</label>

            <div className="col-sm-10">
                <div className="list-group">
                    {props.worksheet.get("words") ? props.worksheet.get("words").map(w => (
                            <a key={w.get("id")} href={"/editor/word/" + w.get("id")} className="list-group-item">{w.get("en")} <span className="label label-primary">Edit</span></a>
                    )) : null}
                </div>
            </div>
        </div>

        <div className="form-group">
            <label className="col-sm-2 control-label">Add word</label>

            <div className="col-sm-10">
                {props.word ? <AddWord word={props.word} editChild={props.editChild} addWord={props.addWord} /> : null}
            </div>
        </div>

        <div className="form-group">
            <div className="col-sm-12">
                <button type="submit" className="btn btn-app" onClick={props.saveChild}>Edit</button>
            </div>
        </div>
    </form>
)

export default EditorWorksheet
