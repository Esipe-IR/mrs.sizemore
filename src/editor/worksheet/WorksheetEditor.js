import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Worksheet from './component/Worksheet'
import { updatePage } from '../duck'
import { fetchWorksheet, editWorksheet } from '../../firebase/duck'

class WorksheetEditor extends React.Component {
    componentDidMount() {
         this.props.fetchWorksheet(this.props.params.id)
    }

    onSubmit(value) {
        let worksheet = Object.assign({}, value, {})
        delete worksheet.words
        this.props.editWorksheet(worksheet)
    }

    render() {
        return this.props.worksheet ? 
            <Worksheet
                updatePage={this.props.updatePage}
                page={this.props.page}
                router={this.props.router}
                onSubmit={this.onSubmit.bind(this)}
                initialValues={this.props.worksheet.toJS()} /> 
            : 
            null
    }
}

WorksheetEditor.propTypes = {
    worksheet: PropTypes.object,
    page: PropTypes.number
}

const mapStateToProps = ({ editor }) => ({
    worksheet: editor.get("worksheet"),
    page: editor.get("page")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheet: (id) => dispatch(fetchWorksheet(id)),
    editWorksheet: (worksheet) => dispatch(editWorksheet(worksheet)),
    updatePage: (page) => dispatch(updatePage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorksheetEditor)
