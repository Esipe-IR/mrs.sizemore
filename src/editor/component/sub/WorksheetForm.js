import React from 'react'
import AddWord from './AddWord'
import ListWord from './ListWord'

const WorksheetForm = (props) => (
    <form className="form-horizontal">
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
                {props.worksheet.get("words") ? <ListWord {...props} words={props.worksheet.get("words")} /> : null}
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
                <button type="submit" className="btn btn-app-secondary" onClick={props.saveChild}>Edit</button>
            </div>
        </div>
    </form>
)

export default WorksheetForm
