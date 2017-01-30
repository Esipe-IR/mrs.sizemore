import React from 'react'
import AddWord from './AddWord'
import Info from '../../general/Info'

const EditorWorksheet = ({worksheet, words, word, addWord, editChild, saveChild, error, errorMsg}) => (
    <form className="form-horizontal">
        <ol className="breadcrumb">
            <li><a href="/">Home</a></li>
            <li className="active">Edit {worksheet.name}</li>
        </ol>

        <Info status={!error} msg={errorMsg} />

        <div className="form-group">
            <label htmlFor="worksheet/name" className="col-sm-2 control-label">Name</label>
            
            <div className="col-sm-10">
                <input
                    id="worksheet/name"
                    type="text" 
                    className="form-control"
                    placeholder="Name" 
                    value={worksheet.name}
                    onChange={editChild} 
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
                    value={worksheet.img}
                    onChange={editChild} 
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
                    value={worksheet.description}
                    onChange={editChild}>
                </textarea>
            </div>
        </div>

        <div className="form-group">
            <label className="col-sm-2 control-label">Words</label>

            <div className="col-sm-10">
                <div className="list-group">
                    {words.map(w => (
                        <a key={w.id} href={"/editor/word/" + w.id} className="list-group-item">{w.en} <span className="label label-primary">Edit</span></a>
                    ))}
                </div>
            </div>
        </div>

        <div className="form-group">
            <label className="col-sm-2 control-label">Add word</label>

            <div className="col-sm-10">
                <AddWord word={word} editChild={editChild} addWord={addWord} />
            </div>
        </div>

        <div className="form-group">
            <div className="col-sm-12">
                <button type="submit" className="btn btn-app" onClick={saveChild}>Edit</button>
            </div>
        </div>
    </form>
)

export default EditorWorksheet
