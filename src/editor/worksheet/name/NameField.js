import React from 'react'
import { connect } from 'react-redux'

class NameField extends React.Component {
    edit() {
        let value = e.target.value
        this.props.update(value)
    }

    render() {
        <div className="form-group">
            <label htmlFor="worksheet/name" className="col-sm-2 control-label">Name</label>
            
            <div className="col-sm-10">
                <input
                    id="worksheet/name"
                    type="text" 
                    className="form-control"
                    placeholder="Name" 
                    value={this.props.name}
                    onChange={this.edit.bind(this)} 
                />
            </div>
        </div>
    }
}

NameField.propTypes = {
    name: React.PropType.string
}

const mapStateToProps = ({ editorReducer }) => ({
    name: editorReducer.get("fields").get("name")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (newName) => dispatch()
})

export default connect(mapStateToProps, mapDispatchToProps)(NameField)
