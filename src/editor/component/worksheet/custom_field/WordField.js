import React from 'react'

const WordField = (props) => (
    <div key={props.word.get("id")} className="list-group-item">
        {props.word.get("en")} 
        
        <a href={"/editor/word/" + props.word.get("id")} className="btn btn-primary margin-lft-5">Edit</a> 
        
        <button id={"/words/" + props.word.get("id")} 
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
)

export default WordField
