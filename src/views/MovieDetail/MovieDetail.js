import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ErrorAlert } from '../../components/Alerts.jsx'
import Axios from '../../config/axios/axios'
import { API_GET_MOVIES_DATA, API_KEY } from '../../constants/Constants'

class MovieDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieDetail: '',
        }
    }

    getDetailedData = async () => {
        let res
        try {
            res = await Axios(`${API_GET_MOVIES_DATA}apikey=${API_KEY}&t=${this.props.location.state}`)
        } catch (error) {
            ErrorAlert(error)
        }
        finally {
            this.setState({
                movieDetail: res.data,
            })
        }

    }

    componentDidMount = async () => {
        await this.getDetailedData()
    }

    render() {
        var details = []
        for (const [key, value] of Object.entries(this.state.movieDetail)) {
            if (key != "Ratings" && key != "Poster" && key != "Title" && key != "Response") {
                details.push({ key: key, value: value })
            }
        }

        return (
            <div style={{ padding: '10px' }}>
                <h3>{this.state.movieDetail.Title}</h3><br />
                <div className="d-flex justify-content-start">
                    <img style={{height:'400px', width: 'auto'}} src={this.state.movieDetail.Poster} className="margin-right" />
                    <div style={{ width: '300px' }}>
                        <b>Descriptions :</b><br />
                        <table>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                {details.map(x => <tr><td style={{ fontSize: '10pt' }}>{x.key}</td><td style={{ fontSize: '10pt' }}><b>{x.value}</b></td></tr>)}
                            </tr>
                        </table>
                        <p >
                            <b>Ratings :</b><br />
                            {
                                this.state.movieDetail ?
                                    this.state.movieDetail.Ratings.map(x => {
                                        return (<span style={{ fontSize: '10pt' }}>{`${x.Source} (Ratings: ${x.Value})`}<br /></span>)
                                    })
                                    :
                                    null
                            }
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(MovieDetail)