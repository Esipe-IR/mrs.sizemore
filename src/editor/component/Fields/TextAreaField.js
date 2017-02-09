import React from 'react'
import { connect } from 'react-redux'
import { updateField } from '../../duck'

class DescriptionField extends React.Component {
    edit(e) {
        let value = e.target.value
        this.props.update(value)
    }

    render() {(
        <div className="form-group">
            <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.name.toUpperCase()}</label>
            
            <div className="col-sm-10">
                <textarea 
                    id={this.props.id}
                    className="form-control"
                    rows="3"
                    value={this.props.field ? this.props.field : ""}
                    onChange={this.edit.bind(this)}>
                </textarea>
            </div>
        </div>
    )}
}

TextAreaField.propTypes = {
    field: React.PropTypes.string
}

const mapStateToProps = ({ editorReducer }, { name }) => ({
    field: editorReducer.getIn(["fields", name])
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (newField) => dispatch(updateField(newField, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaField)
