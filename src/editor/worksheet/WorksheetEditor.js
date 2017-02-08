import React from 'react'
import { connect } from 'react-redux'

class WorksheetEditor extends React.Component {
    render() {(
        <form className="form-horizontal">
            <TextField id="worksheet/name" name="name" />
            <TextField id="worksheet/img" name="image" />
            <TextAreaField id="worksheet/description" name="description" />
            <ListField name="words" item={<WordField />} />

            <div className="form-group">
                <label className="col-sm-2 control-label">Add word</label>

                <div className="col-sm-10">
                    {props.word ? <AddWord word={props.word} editChild={props.editChild} addWord={props.addWord} /> : null}
                </div>
            </div>

            <SubmitField />
        </form>
    )}
}

export default connect()(WorksheetEditor)
