import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import routes from '../routes'
import DefaultHeader from './DefaultHeader'

class DefaultLayout extends Component {
    render() {
        return (
            <div>
                <DefaultHeader />
                <Container fluid className="App lg animated fadeIn">
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                        <route.component {...props} />
                                    )}
                                />
                            )
                                :
                                null
                        })
                        }
                    </Switch>
                </Container>
            </div>
        )
    }
}

export default DefaultLayout
