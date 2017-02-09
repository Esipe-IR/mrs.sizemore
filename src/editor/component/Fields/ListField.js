import React from 'react'
import { connect } from 'react-redux'
import { updateField } from '../../duck'

class ListField extends React.Component {
    render() {(
        <div className="form-group">
            <label className="col-sm-2 control-label">
                {this.props.name}
            </label>

            <div className="col-sm-10">
                {this.props.items ? 
                    <div className="list-group">
                        {this.props.items.map((item, key) => (
                                <Item item={item} key={key} {...props} />
                        ))}
                    </div>
                    : 
                    null
                }
            </div>
        </div>
    )}
}

ListField.propTypes = {
    items: React.PropTypes.object
}

const mapStateToProps = ({ editorReducer }, { name }) => ({
    items: editorReducer.getIn(["fields", name])
})

export default connect(mapStateToProps)(ListField)
