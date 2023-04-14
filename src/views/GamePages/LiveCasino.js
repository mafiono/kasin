import React from "react"
import { Col, Row} from "reactstrap"
import { connect } from "react-redux";
import {LiveCasinoItem, CasinoSearch, CasinoSlider} from "./CasinoComponents"
import {providerconfig} from "../../configs/providerConfig"
import {providerchange,gametypechange,filterData,data_load,get_scrollevent_load} from "../../redux/actions/casino" 
import {playsaccount,setloginpage,playsaccountguest} from "../../redux/actions/auth/loginActions"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

class LiveCasino extends React.Component {

    // static getDerivedStateFromProps(props, state) {
    //     if (props.dataList.data.length !== state.data.length || props.allData !== props.dataList.filteredData) {
    //         return {
    //         data: props.dataList.data,
    //         allData: props.dataList.filteredData,
    //     }
    //   }
    //   return null;
    // }
    state = {
        livecasinoitems : [],
        index : 1,
        data: [],
        allData: [],
        value: "",
        typesactive: 0,
        bool : false,
        scrollevent : true,
        select : 0
    }

    // gameplay = () =>{
    //     if(!this.props.user.values){
    //         this.props.setloginpage({login : true, register : false});
    //     }else{
    //         this.props.playsaccount({gameType : "Roulette"})
    //     }
    // }

    componentDidMount(){
        this.props.data_load(providerconfig.LIVECASINO,"4","LIVECASINOSLIDERIMGS")
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }
    
  
    listenToScroll = async () => {
        if(this.state.scrollevent){
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll+350) / height;
          if(scrolled>=1){
            var index1 = (this.state.index + 1) * 24;
            if(this.state.data.length < index1){                 
              await this.setState({scrollevent : false,select : this.state.select + 1});
              this.props.get_scrollevent_load(this.props.setprovider[this.state.select],this.props.dataList.allData);
              this.setState({scrollevent : true,index : this.state.index + 1});
            }else{
              this.setState({index : this.state.index+1});
            }
          }
        }
    }

    handleFilter(e){
        this.setState({ value: e.target.value,index : 1 })
        this.props.filterData(e.target.value);
    }
    
    typesActive = value => {
        this.props.gametypechange(value,providerconfig.LIVECASINO)
    }

    provider_change = value =>{
        this.props.providerchange(value,providerconfig.LIVECASINO)
    }

    render() {
        let { data } = this.props.dataList;
        let indata =  data.slice(0,this.state.index*24);
        if( this.state.bool === false && this.state.index*24 > indata.length){
            this.setState({bool : true});
        }
        return(
            <React.Fragment>
                <CasinoSlider slider_images={this.props.livecasinoSlider_images} {...this.props}/>
                <Row className="casino-select-picker">
                    <CasinoSearch
                        types={this.props.types}
                        provider={this.props.provider} 
                        setprovider={this.props.setprovider}
                        providerchange={this.provider_change}  
                        typesactive = {this.props.settype.value  }
                        typesActive={this.typesActive}
                        handleFilter={(e)=>this.handleFilter(e)}
                    />
                </Row>
                {
                    indata.length > 0 ?
                        <div style={{minHeight:"25rem"}}>                
                            <Row className="casino-item-group">
                                { indata.map((item,i) => (
                                    <Col key={i} className="col-2-4 item" xs="4" sm="4" md="3" lg="2">
                                    <LiveCasinoItem data={item} me={this.props} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        : 
                    <SkeletonTheme  color="#202020" highlightColor="#444">
                        <Skeleton count={15} />
                    </SkeletonTheme>
                }
            </React.Fragment>
        )
    }
}

const get_game  = (state) =>{
    return { 
        user : state.auth.login,
        livecasinoSlider_images : state.auth.login.livecasino_images,
        dataList: state.casinolist,
        provider : state.casinolist.providerData,
        types : state.casinolist.types,
        settype : state.casinolist.settype,
        setprovider : state.casinolist.setprovider
    }
}

export default connect(get_game,{playsaccount,setloginpage,providerchange,gametypechange,filterData,data_load,get_scrollevent_load,playsaccountguest})(LiveCasino)