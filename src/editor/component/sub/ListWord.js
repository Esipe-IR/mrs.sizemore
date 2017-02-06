import React from 'react'

const ListWord = (props) => (
    <div className="list-group">
        {props.words.map((w, k) => (
                <div key={w.get("id")} className="list-group-item">
                    {w.get("en")} 
                    
                    <a href={"/editor/word/" + w.get("id")} className="btn btn-primary margin-lft-5">Edit</a> 
                    
                    <button id={"/words/" + w.get("id")} 
                        onClick={
                            (e) => {
                                e.preventDefault()
                                props.toggleModal(true)(e)
                                props.updateDeleteId(e)
                            }
                        } 
                        className="btn btn-danger margin-lft-5">
                        Delete
                    </button>
                </div>
        ))}
    </div>
)

export default ListWord
