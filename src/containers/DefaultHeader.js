import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Navbar, Row, Col, NavbarBrand, Input, Button, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'
import { ErrorAlert } from '../components/Alerts.jsx'
import Axios from '../config/axios/axios'
import { getMoviesData, searchMovieKeyword } from '../config/redux/rootAction'
import { API_GET_MOVIES_DATA, API_KEY } from '../constants/Constants'
import { RequestMoviesData } from '../helpers/RequestHandler'
import logo from '../public/assets/images/logo.png'
import logogif from '../public/assets/images/logo-gif.gif'
import './index.scss'
import CustomButton from '../components/CustomButton.jsx'

class DefaultHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: '',
      keywordData: [],
      keywordFiltered: [],
      imglogo: logo
    }
  }

  onSearchKeypress = (e) => {
    if (e.key == 'Enter') {
      this.onSearchMovie()
    }
  }

  onChangeSearchKeyword = (val) => {
    let { keyword } = this.state
    if (keyword != null || keyword != '') {
      let filteredKeyword = this.state.keywordData.filter(x => { return (x.toLowerCase().includes((val).toLowerCase())) })
      this.setState({
        keywordFiltered: filteredKeyword
      })
    }
    this.setState({
      keyword: val
    })
  }

  onSearchByFilterClick = (value) => {
    this.setState({
      keyword: value
    }, () => this.fetchMoviesData(this.state.keyword))
  }

  onSearchMovie = () => {
    this.fetchMoviesData(this.state.keyword)
  }

  keywordBank = (val) => {
    this.setState({
      keywordData: val
    })
  }

  extractKeywordBank = () => {
    let values = []
    if (this.props.movies != undefined) {
      this.props.movies.forEach(x => {
        values.push(x.Title)
      })
      this.keywordBank(values)
    }
  }

  fetchMoviesData = async (value = 'Batman') => {
    let { dispatch } = this.props
    let res = []
    let searchKeyword = value

    try {
      res = await RequestMoviesData(searchKeyword, 1)
    } catch (error) {
      ErrorAlert(error)
    }
    finally {
      dispatch(getMoviesData(res.Search))
      dispatch(searchMovieKeyword(searchKeyword))
      this.extractKeywordBank()
    }
  }

  onMouseHover = () => {
    this.setState({
      imglogo: logogif
    })
  }

  componentDidMount = async () => {
    await this.fetchMoviesData()
    this.extractKeywordBank()
  }

  UNSAFE_componentWillReceiveProps() {
    this.extractKeywordBank()
  }

  render() {
    let { keyword, keywordFiltered, imglogo } = this.state

    return (
      <div className="header">
        <Navbar className="d-flex justify-content-between" expand="lg">
          <NavbarBrand className="d-flex">
            <a onMouseOver={() => {this.setState({imglogo: logogif})}} onMouseLeave={() => {this.setState({imglogo: logo})}} className="logo" href="/home"><h3><b><img style={{marginBottom: '10px'}} className="logo" src={imglogo} />&nbsp;MovDB</b></h3></a>
          </NavbarBrand>
          <div className="d-flex justify-content-between">
              <UncontrolledDropdown className="d-flex justify-content-between align-items-center">
                <DropdownToggle className="d-flex justify-content-between" nav style={{ backgroundColor: 'gray', border: '0px' }}>
                  <Input onClick={(e) => this.onChangeSearchKeyword('')} onKeyPress={this.onSearchKeypress} value={keyword} onChange={(e) => this.onChangeSearchKeyword(e.target.value)} className="custom-search margin-right" type="text" />
                  <CustomButton icon={<i class="fas fa-search"></i>} title="Search" onClick={this.onChangeSearchKeyword} />
                </DropdownToggle>
                <div style={{ width: '50%' }}>
                  <DropdownMenu style={{ width: '100%', overflowY: 'auto', maxHeight: '200px' }}>
                    {
                      keywordFiltered.map((x, id) => {
                        return (<DropdownItem onClick={() => this.onSearchByFilterClick(x)} style={{ width: '100%' }} key={id}>{x}</DropdownItem>)
                      })
                    }
                  </DropdownMenu>
                </div>
              </UncontrolledDropdown>
          </div>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(DefaultHeader)
