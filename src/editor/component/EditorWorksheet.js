import React from 'react'

const EditorWorksheet = ({worksheet, words, editChild, saveChild}) => (
    <form className="form-horizontal">
        <ol className="breadcrumb">
            <li><a href="/">Home</a></li>
            <li className="active">Edit {worksheet.name}</li>
        </ol>

        <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
            
            <div className="col-sm-10">
                <input
                    id="name"
                    type="text" 
                    className="form-control"
                    placeholder="Name" 
                    value={worksheet.name}
                    onChange={editChild} 
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="img" className="col-sm-2 control-label">Image</label>
            
            <div className="col-sm-10">
                <input
                    id="img"
                    type="text"
                    className="form-control"
                    placeholder="Img"
                    value={worksheet.img}
                    onChange={editChild} 
                />
            </div>
        </div>
        
        <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Description</label>
            
            <div className="col-sm-10">
                <textarea 
                    id="description"
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

            <div className="col-sm-offset-2 col-sm-10">
                 <a href="" className="btn btn-app-secondary">Add word</a>
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

export default EditorWorksheet
