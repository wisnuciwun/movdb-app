import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Navbar, Row, Col, NavbarBrand, Input, Button, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'
import { ErrorAlert, WarningAlert } from '../components/Alerts.jsx'
import Axios from '../config/axios/axios'
import { getMoviesData, searchMovieKeyword, searchMovieYear } from '../config/redux/rootAction'
import { API_GET_MOVIES_DATA, API_KEY } from '../constants/Constants'
import { RequestMoviesData, RequestMoviesDataByTitle, RequestMoviesDataByYear } from '../helpers/RequestHandler'
import logo from '../public/assets/images/logo.png'
import logogif from '../public/assets/images/logo-gif.gif'
import './index.scss'
import CustomButton from '../components/CustomButton.jsx'
import { YEAR } from '../constants/Years.js'
import { MOVIE_KEYWORD_QUERY, MOVIE_YEAR_QUERY } from '../constants/QueryString.js'

class DefaultHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultKeyword: 'Batman',
      keyword: '',
      year: '',
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

  onChangeSearchKeyword = (val = '') => {
    let { keyword } = this.state
    if (keyword != null || keyword != '') {
      let filteredKeyword = this.state.keywordData.filter(x => { return (x.toLowerCase().includes(val.toLowerCase())) })
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
    }, () => this.onSearchMovie())
  }

  onSearchMovie = () => {
    const { keyword, year } = this.state
    window.location.replace(`/search?${MOVIE_KEYWORD_QUERY}${keyword}&${MOVIE_YEAR_QUERY}${year}`)
  }

  onSearchMovieByYear = (e) => {
    let values = e.target.value

    if(e.target.value == 'Erase year')
    values = ''

    this.setState({
      year: values
    })
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
    let queries = window.location.search.split('&')
    let searchKeyword = value
    let querykeyword = ''
    let queryyear = ''

    if(window.location.pathname != '/'){
      querykeyword = queries[0].replace(`?${MOVIE_KEYWORD_QUERY}`,'')
      queryyear = queries[1].replace(`${MOVIE_YEAR_QUERY}`,'')
    }

    let { dispatch } = this.props
    let res = []
    let option = ''

    if(querykeyword != '')
    searchKeyword = querykeyword

    if(queryyear != '')
    option = 'year'
    else
    option = 'keyword'

    try {

      if(option == 'keyword')
      res = await RequestMoviesData(searchKeyword, 1)
      else if(option == 'year')
      res = await RequestMoviesDataByYear(searchKeyword, queryyear)

      if (res.Response != "False" && option == 'year') {
        res = { Search: [res] }
      }
      else if(res.Response == "False"){
        res = await RequestMoviesDataByTitle(searchKeyword)
        if (res.Response != "False")
        res = { Search: [res] }
      }

    } catch (error) {
      ErrorAlert(error)
    }
    finally {
      dispatch(getMoviesData(res.Search))
      dispatch(searchMovieKeyword(searchKeyword))
      dispatch(searchMovieYear(queryyear))
      this.extractKeywordBank()
    }
  }

  onMouseHover = () => {
    this.setState({
      imglogo: logogif
    })
  }

  loadSearch = () => {
    this.setState({
      keyword: this.props.keyword.replace(/%20/g, " "),
      year: this.props.year
    })
  }

  componentDidMount = async () => {
    await this.fetchMoviesData()
    this.extractKeywordBank()
    this.loadSearch()
  }

  UNSAFE_componentWillReceiveProps() {
    this.extractKeywordBank()
  }

  render() {
    let { keyword, year, keywordFiltered, imglogo } = this.state
    const years = YEAR.slice(0, YEAR.indexOf(new Date().getUTCFullYear()))
    years.push('Erase year')
    
    console.log("object", this.props)
    return (
      <div className="header">
        <Navbar className="d-flex justify-content-between" expand="lg">
          <NavbarBrand style={{width:'120px'}} className="d-flex">
            <a onMouseOver={() => { this.setState({ imglogo: logogif }) }} onMouseLeave={() => { this.setState({ imglogo: logo }) }} className="logo" href="/"><h3><b><img className="mb-2 logo" src={imglogo} />&nbsp;MovDB</b></h3></a>
          </NavbarBrand>
          <div className="d-flex justify-content-between">
              <UncontrolledDropdown className="d-flex justify-content-between align-items-center">
                <DropdownToggle className="d-flex justify-content-between custom-navbar" nav>
                  <Input onClick={(e) => this.onChangeSearchKeyword('')} onKeyPress={this.onSearchKeypress} value={keyword} onChange={(e) => this.onChangeSearchKeyword(e.target.value)} className="custom-search margin-right" type="text" />
                </DropdownToggle>
                <div>
                  <DropdownMenu className="custom-dropdown">
                    {
                      keywordFiltered.map((x, id) => {
                        return (<DropdownItem onClick={() => this.onSearchByFilterClick(x)} style={{ width: '100%' }} key={id}>{x}</DropdownItem>)
                      })
                    }
                  </DropdownMenu>
                </div>
              </UncontrolledDropdown>
              <div style={{marginLeft: '-20px'}} className="d-flex align-items-center">
              <UncontrolledDropdown direction='left'>
                <DropdownToggle>
                  {year ? year : <i className="fas fa-filter"></i>}
                </DropdownToggle>
                <DropdownMenu className="custom-dropdown">
                  {years.reverse().map(x => {
                    return (<DropdownItem value={x} onClick={this.onSearchMovieByYear}>{x}</DropdownItem>)
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>&nbsp;
              <CustomButton width='50px' icon={<i className="fas fa-search"></i>} onClick={this.onSearchMovie} />
              </div>
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
