import React from 'react'
import { connect } from 'react-redux'
import { fetchWorksheets } from '../../actions'

import Header from '../app/Header'
import Thumbnail from '../app/Thumbnail'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchWorksheets())
    }

    render() {
        return (
            <div>
                <Header />
                
                <hr />

                <div className="row">
                    <div className="col-lg-12">
                        <h3>Official worksheets: </h3>
                    </div>
                </div>

                <div className="row text-center">
                    {this.props.worksheets.map((w) => (
                        <Thumbnail key={w.id} item={w}/>
                    ))}
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h3>Community worksheets: </h3>
                    </div>
                </div>

                <div className="row text-center">
                    {this.props.worksheets.map((w) => (
                        <Thumbnail key={w.id} item={w}/>
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { firebaseReducer } = state

    return {
        worksheets: firebaseReducer.worksheets
    }
}

export default connect(mapStateToProps)(Home)
