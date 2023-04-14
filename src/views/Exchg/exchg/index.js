import React from "react"
import { connect } from "react-redux"
import { FormGroup, Input } from "reactstrap"
import { Search } from "react-feather"
import { getExchgHeaderData , currentSelectSports,getExchgData} from "../../../redux/actions/exchg/index"
import SportsTab from '../InsideItems/SportsTab';
// import { history } from "../../../history"

class Sports extends React.Component{

    state = { value : "" }

    componentDidMount(){
        this.props.getExchgHeaderData();
    }

    position(Item){
        this.props.currentSelectSports(Item);
        var sendData = {
            Id : Item.Id
        }
        this.props.getExchgData(sendData);
    }

    render(){
        return(
            <div className='sports-background height-100'>
                <FormGroup className="position-relative has-icon-left m-1">
                    <Input type="text"className="round"  placeholder='Search' value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                    <div className="form-control-position">
                        <Search size={15} />
                    </div>
                </FormGroup>
                <div className = "overflow-auto">
                    <div className = "sport-1">
                        {this.props.allHeaderData && this.props.allHeaderData.length > 0 ? this.props.allHeaderData.map( (Item,i) => (
                            <div key={i} onClick={()=>this.position(Item)} className = "sport-2">
                                {
                                    Item.Id === this.props.currentHeader.Id ? ( <div className='sports-tab-active-background'></div> ) : null
                                }
                                <div className='sports-tab-background sport-3'>
                                    <svg style={{color:Item.color, margin:'1.2rem'}} width="22" height="22" viewBox={Item.viewBox}>
                                        <path d={Item.icon} fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className = 'sport-4 font-color-1'>
                                    {Item.Name}
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
                <SportsTab />
            </div>
        )
    }
}

const load_data = (state) => {
	return {
        allHeaderData : state.exchgange.exchg_header_data,
        currentHeader : state.exchgange.current_header_sport,
	}
}

const mapDispatchToProps = {
    getExchgHeaderData,
    currentSelectSports,
    getExchgData
}

export default connect(load_data,mapDispatchToProps)(Sports);