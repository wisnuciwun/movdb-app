import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import { ErrorAlert } from '../../components/Alerts.jsx'
import Loading from '../../components/Loading.jsx'
import Axios from '../../config/axios/axios'
import { API_GET_MOVIES_DATA, API_KEY } from '../../constants/Constants'
import { MOVIE_DETAIL_QUERY } from '../../constants/QueryString.js'
import './index.scss'

class MovieDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieDetail: '',
            textsAmount: 10
        }
    }

    getDetailedData = async () => {
        let res
        let query = this.props.location.search.replace(`?${MOVIE_DETAIL_QUERY}`,'')

        try {
            res = await Axios(`${API_GET_MOVIES_DATA}apikey=${API_KEY}&t=${query}}`)
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
        const { textsAmount, movieDetail } = this.state
        let details = []
        let showDetails = []
        let first = 0
        let last = textsAmount
        const MovieDescription = React.lazy(() => import('../../components/MovieDescription.jsx'))

        for (const [key, value] of Object.entries(movieDetail)) {
            if (key != "Ratings" && key != "Poster" && key != "Title" && key != "Response") {
                details.push({ key: key, value: `: ${value}` })
            }
        }

        for (let i = 0; i < (Math.round(details.length / textsAmount)); i++) {
            const slicePartition = 1

            if (Math.round(details.length / textsAmount) <= 1)
                showDetails = <td>{details.map(x => <tr><td style={{ fontSize: '10pt' }}>{x.key}</td><td style={{ fontSize: '10pt' }}><b>{x.value}</b></td></tr>)}</td>
            else
                showDetails.push(<td>{details.slice(first, last).map(x => <tr><td style={{ fontSize: '10pt' }}>{x.key}</td><td style={{ fontSize: '10pt' }}><b>{x.value}</b></td></tr>)}</td>)

            first = last + slicePartition
            last = last + textsAmount
        }

        return (
            <div id="infinite" className="p-3">
                <Suspense fallback={<Loading/>}>
                    <MovieDescription movieDetail={movieDetail} showDetails={showDetails} />
                </Suspense>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(MovieDetail)