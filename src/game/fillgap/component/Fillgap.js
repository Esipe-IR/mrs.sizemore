import React from 'react'
import reactStringReplace from 'react-string-replace'

const Examples = (props) => {
    if (!props.item) return null

    return (
        <div className="form-group" key={props.itemKey}>
            <p>
                {reactStringReplace(props.item.get(props.random), '[x]', (match, i) => (
                    <input key={i} type="text" data-index={props.itemKey - 1} onChange={props.onChange} value={props.userWord ? props.userWord : ''}/>
                ))}

                <i className="fa fa-info-circle" onClick={() => (props.onClickHelp(props.definition))}></i>
            </p>
        </div>
    )
}

const ListExamples = (props) => (
    <div>
        {props.words.map((w, i) => (
            <Examples key={w.get("id")} 
                item={w.get("examples")} 
                itemKey={i} 
                definition={w.get("definition")} 
                onChange={props.onChange}
                userWord={props.userWords.get(i - 1)}
                random={props.random(w.get("examples"))} />
        ))}
    </div>
)

const Fillgap = (props) => (
    <div className="text">
        <p>Count: {props.userWords.size}/{props.fullCount}</p>

        <form onSubmit={props.onSubmit}>
            <ListExamples words={props.words} onChange={props.onChange} userWords={props.userWords} random={props.random} />

            <input className="btn btn-app" type="submit" value="Submit" />
        </form>
    </div>
)

export default Fillgap
