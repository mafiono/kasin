import React, { Component } from 'react'
import classnames from "classnames"
import { connect } from 'react-redux'
import { Row , Input , NavItem, NavLink, TabContent, TabPane, Nav, FormGroup } from "reactstrap"
import { get_bet_history , get_all_sports_list } from "../../../redux/actions/sports/index"
import sportsConfig from "../../../configs/sportsconfig";
import History from "./history"
import { Search } from 'react-feather'

export class Events extends Component {

    state = {
        selectId : 1,
        betId : ""
    }

    async componentDidMount(){
        var sendData = {
            selectId : this.state.selectId
        }
        await this.props.get_all_sports_list();
        await this.props.get_bet_history(sendData);
    }

    tabChange(item){
        this.setState({selectId : item.index})
        var sendData = {
            // user : this.props.user._id,
            selectId : item.index
        }
        this.props.get_bet_history(sendData);
    }

    search(e){
        var sendData = {
            // user : this.props.user._id,
        }
        if(e){
            sendData.betId = e
        }else{
            sendData.selectId = 3
        }
        this.props.get_bet_history(sendData);
    }

    render() {
        const {bet_history_list, all_sports_list} =this.props;
        const {selectId} =this.state;
        return (
            <div>
                <Nav tabs className="nav-justified">
                    {
                        sportsConfig.historytab.map( (item , id) => (
                            <NavItem key={id} >
                                <NavLink className={classnames({ active: selectId === item.index })} onClick = {() => this.tabChange(item)} >
                                {item.title}
                                </NavLink>
                            </NavItem>
                        ))
                    }
                </Nav>
                <TabContent activeTab={this.state.active}>
                    <TabPane style={{maxHeight:'900px', overflowY:'auto', overflowX:'hidden'}}>
                        {
                            selectId === 3 ?
                                <FormGroup className="position-relative has-icon-left mb-0 ml-2 mr-2 mt-2">
                                    <Input type="text" className="round" placeholder='Search' onChange={e =>this.search(e.target.value)} />
                                    <div className="form-control-position px-1">
                                        <Search size={15} />
                                    </div>
                                </FormGroup>
                                : ""
                        }
                        <Row className="pb-2 pl-2 pr-2 pt-1" style = {{ borderRadius : '2vh' , marginTop : '-3px'}}>
                            {
                                bet_history_list.length ? (
                                    bet_history_list.map((item , id) => (
                                        <History selectId={selectId} key={id} data = {item} id={id} all_sports_list={all_sports_list} />
                                    ))
                                ) : <div className='text-white w-100 text-center'>There are not exist any bets.</div>
                            }
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.auth.login.values,
        bet_history_list : state.sports.bet_history_list,
        all_sports_list : state.sports.all_sports_list
    }
}

const mapDispatchToProps = {
    get_bet_history , get_all_sports_list
}

export default connect(mapStateToProps, mapDispatchToProps )(Events)
