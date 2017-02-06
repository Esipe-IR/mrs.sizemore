import React from 'react'
import reactStringReplace from 'react-string-replace'

const Examples = (props) => {
    if (!props.item) return null

    return (
        <div className="form-group" key={props.itemKey}>
                {reactStringReplace(props.item.get("example"), '[x]', (match, i) => (
                    <div key={i} className="input-group">
                        <input type="text" 
                            className="form-control" 
                            data-index={props.itemKey} 
                            onChange={props.onChange} 
                            value={props.userWord ? props.userWord : ''}
                            placeholder="english word"
                            readOnly={props.mode === 1 ? true : false}/>

                            {props.mode === 1 ?
                            (
                                 <span className="input-group-btn">
                                    <button className="btn btn-default" onClick={(e) => {e.preventDefault(); return props.onClick(props.itemKey)}}>
                                        <i className="fa fa-info-circle"></i>
                                    </button>

                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Word <span className="caret"></span>
                                    </button>
                                
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        {props.words.map(w => (
                                            <li><a href="#">{w.get("en")}</a></li>
                                        ))}

                                        <li role="separator" className="divider"></li>
                                        <li><a href="#">Null</a></li>
                                    </ul>
                                </span>
                            ) : null }
                    </div>
                ))}.
        </div>
    )
}

const ListExamples = (props) => (
    <div>
        {props.words.map((w, i) => (
            <Examples
                {...props}
                key={w.get("id")} 
                item={w} 
                itemKey={i} 
                userWord={props.userWords.get(i)}
            />
        ))}
    </div>
)

const Fillgap = (props) => (
    <div className="text">
        <p>Count: {props.userWords.size}/{props.words.size}</p>

        <form onSubmit={props.onSubmit} className="form-inline">
            <ListExamples {...props} />

            <input className="btn btn-app" type="submit" value="Submit" />
        </form>
    </div>
)

export default Fillgap
