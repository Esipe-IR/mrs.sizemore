import React from 'react'

const Word = (props) => (
    <div key={props.word.id} className="list-group-item">
        {props.word.en} 
        
        <a href={"/editor/word/" + props.word.id} className="btn btn-primary margin-lft-5">
            Edit
        </a> 
        
        <button id={"/words/" + props.word.id} onClick={props.onDelete} className="btn btn-danger margin-lft-5">
            Delete
        </button>
    </div>
)

/*
(e) => {
e.preventDefault()
props.toggleModal(true)(e)
props.updateDeleteId(e)
}
*/

const ListWord = (props) => (
    <div className="form-group">
        <label className="col-sm-2 control-label">Words</label>

        <div className="col-sm-10">
            {props.words ? 
                <div className="list-group">
                    {props.words.map((word, key) => (
                            <Word key={word.id} word={word} />
                    ))}

                    <div className="list-group-item">
                        <button className="btn btn-primary"><i className="fa fa-plus" aria-hidden="true"></i> Add word</button>
                    </div>
                </div>
                : 
                null
            }
        </div>
    </div>
)

export default ListWord
