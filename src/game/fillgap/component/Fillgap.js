import React from 'react'
import reactStringReplace from 'react-string-replace'

const Examples = (props) => (
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
                            
                                <select data-index={props.itemKey} className="btn btn-default" onChange={props.onChange} defaultValue="">
                                    <option></option>

                                    {props.words.map((w, i) => (
                                        <option key={w.get("en")}>{w.get("en")}</option>
                                    ))}
                                </select>
                            </span>
                        ) : null }
                </div>
            ))}.
    </div>
)

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
        <p>Count: {props.count}/{props.words.size}</p>

        <form onSubmit={props.onSubmit} className="form-inline">
            <ListExamples {...props} />

            <input className="btn btn-app-secondary" type="submit" value="Submit" />
        </form>
    </div>
)

export default Fillgap
