import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMoviesData } from '../../config/redux/rootAction'
import InfiniteHome from '../../components/InfiniteHome.jsx';
import { RequestMoviesData } from '../../helpers/RequestHandler';
import { ErrorAlert } from '../../components/Alerts.jsx';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 1,
            endResult: false,
        }
    }

    modalImageToggle = () => {
        this.setState({
            toggleImgModal: !this.state.toggleImgModal
        })
    }

    onChangeImgPoster = (link, title) => {
        this.setState({
            imgPosterLink: {
                title: title,
                link: link
            }
        })
    }

    handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
        if (scrollHeight - scrollTop <= clientHeight) {
            this.setState({ page: this.state.page + 1 }, () => this.handleNewListData())
        }
    }

    handleNewListData = async () => {
        let { dispatch } = this.props
        let res

        try {
            res = await RequestMoviesData(this.props.keyword, this.state.page)
        } catch (error) {
            ErrorAlert(error)
        }

        if(res.Search != undefined)
        {
            dispatch(getMoviesData([...this.props.movies, ...res.Search]))
            this.setState({endResult: false})
        }
        else
        {
            this.setState({
                endResult: true
            })
        }
    }

    UNSAFE_componentWillReceiveProps(props){
        if(props.keyword != this.props.keyword)
        {
            this.setState({
                page: 1
            })
            document.getElementById('infinite').scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    render() {
        let { endResult } = this.state

        return (
            <div id="infinite" onScroll={this.handleScroll} className="d-flex justify-content-center">
                <div style={{padding: '20px'}}>
                    <InfiniteHome end={endResult} props={this.props} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Home)