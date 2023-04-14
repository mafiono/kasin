import React from "react"
import { Row, Col, Input, Button, FormGroup } from "reactstrap"
import { Star } from "react-feather"
import { GiRetroController } from "react-icons/gi"
// import {Maxbet,Minbet} from "../../configs/providerConfig"
import { Root } from "../../authServices/rootconfig";
import Swiper from "react-id-swiper"
import MultiSelect from "react-multi-select-component";
import { Search } from "react-feather"
import classnames from "classnames"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const LiveCasinoItem = (props) =>{

    const play=(item)=>{
        if(!props.me.user.values){
            if(props.data.LAUNCHURL  === "7"){
                props.me.playsaccountguest(props.data);
            }else{
                props.me.setloginpage({login : true, register : false});
            }
        }else{
            props.me.playsaccount(props.data,item);
        }
    }

    let imageuri = "";
    if(props.data){
        var params = props.data;
        imageuri =  params.image ? params.image.length > 0 ? params.image.slice(0,5) === "https" ? params.image : Root.imageurl + params.image : "" : ""
    }


    return (
        <React.Fragment>
            <div className='background' style={{backgroundImage:`url(${imageuri})`}}></div>
            <div className="heart">

            </div>
            <div className="casino-innor">
                <div className="button-group">
                    <div>
                        {
                            props.data.WITHOUT.limits && props.data.WITHOUT.limits.length > 0 ?
                            <>
                                {
                                    props.data.WITHOUT.limits.slice(0,1).map((item,key)=>(
                                        <Button className="real-play igamez-button" key={key} color="success" onClick={()=>play(item)} > 
                                        Real - Play
                                            {/* INR {item.limitMin && item.limitMin > 50  ?item.limitMin : Minbet } -  {item.limitMax && item.limitMax > Minbet  ?item.limitMax : Maxbet } */}
                                            {/* INR {item.limitMin } -  {item.limitMax } */}
                                        </Button>
                                    ))
                                    
                                }
                            </>
                                : 
                            <Button className="real-play igamez-button" color="success" onClick={()=>play(null)} >
                                Real-Play
                                {/* INR { Minbet} - {Maxbet} */}
                            </Button>
                            
                        }
                    </div>
                </div>
                <div className="live-title-group">
                    <span className="left">
                        {props.data.TYPE}<br/>
                        <small>
                            {props.data.NAME && props.data.NAME !== "undefined" ? props.data.NAME : "Dealer" }
                        </small>
                    </span>
                    <span className="right">
                        {props.data.star}
                        <Star size={12} color='yellow'/>
                    </span>
                </div>
            </div>
            <GiRetroController className='prev-icon' size={50}/>
        </React.Fragment>
    )
}

export const CasinoItem = (props) =>{
    
    const gettoken=()=>{
        props.me.playsaccountguest(props.data);
    }

    const gettokenreal=()=>{
        if(!props.me.user.values){
            props.me.setloginpage({login : true, register : false});
        }else{
            props.me.playsaccount(props.data,true);
        }
    }
    let imageuri = "";
    if(props.data){
        var params = props.data;
        imageuri =  params.image ? params.image.length > 0 ? params.image.slice(0,5) === "https" ? params.image : Root.imageurl + params.image : "" : ""
    }
    return (
        <React.Fragment>
            <div className='background' style={{backgroundImage:`url(${imageuri})`}}></div>
            <div className="casino-innor">
                <div className="button-group">
                    <div>
                        <Button className="real-play igamez-button" color="success" onClick={gettokenreal} >
                            PLAY FOR REAL
                        </Button>
                        {!props.free?
                            <Button className="play igamez-button" color="success" onClick={gettoken}>
                                PRACTICE
                            </Button>
                        :null}
                    </div>
                </div>
                <div className="title-group">
                    <span className="left text-uppercase">
                        {props.data.TYPE}
                    </span>
                    <span className="right">
                        {props.data.star}
                        <Star size={12} color='yellow'/>
                    </span>
                </div>
            </div>
            <GiRetroController className='prev-icon' size={50}/>
        </React.Fragment>
    )
}

export const CasinoSlider = (props) =>{
    const params = {
        spaceBetween: 60,
        effect: "fade",
    
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
    }

    const play = (item) =>{
        console.log(item)
        if(!props.user.values){
          props.setloginpage({login : true, register : false});
        }else{
          props.playsaccount(item,true);
        }
    }
    
    return (
        <React.Fragment>
            {
                props.slider_images ?
                    <Row className="casino-header-slider">
                        <Swiper {...params}>
                            {
                                props.slider_images.map((item, i) => (
                                    <div key={i}>
                                        <img src={Root.imageurl+item.image} alt="swiper 1"/>
                                        <div style={{zIndex:50}} className="casino-header-slider-def">
                                            {
                                                props.bool ? 
                                                <div className='casino-header-slider-def-h'>
                                                    <h1><strong>{item.data.text1}</strong></h1>
                                                </div> : null
                                            }
                                            <div className="casino-header-slider-def-c" style={{top:'65%', right: '3vw'}}>
                                                <Button.Ripple className='igamez-button' color="success"  onClick={()=>play(item.gameid)}>&nbsp;Play&nbsp;Now</Button.Ripple>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Swiper>
                    </Row>
                :
                <SkeletonTheme  color="#202020" highlightColor="#444">
                    <Skeleton count={20} />
                </SkeletonTheme>
            }								

        </React.Fragment>
    )
}

export const CasinoSearch = (props) =>{
    return (
        <React.Fragment>
          <Col sm="12" md='9' className='d-flex align-items-center m-0 mt-1'>
            <Row className="menu">
              <Col md="9" sm="12" className='d-flex align-items-center'>
                <ul>
                  {props.types ? (
                    props.types.map((item, i) => (
                        <li 
                            key={i} 
                            value={item.value} 
                            label={item.label} 
                            onClick={() => props.typesActive(item.value)}
                            className={classnames({'selected':item.value === props.typesactive})}
                        >
                            {item.label}
                        </li>
                    ))
                  ):null}
                </ul>
              </Col>
              <Col md="3" sm="12">
                <FormGroup className="position-relative has-icon-left m-1">
                  <Input id='search-game' type="text" placeholder='Search games here...' style={{borderRadius:'20px'}} onChange={e => props.handleFilter(e)} />
                  <div className="form-control-position">
                    <Search size={15} />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col  md="3" sm="12" className='m-0  mt-1'>
            <div className="React casino-game-show-select">
              <MultiSelect
                options={props.provider}
                className="multi-select"
                classNamePrefix="select"
                selectAllLabel="ALL PROVIDER"
                hasSelectAll="All"
                shouldToggleOnHover={true}
                value={props.setprovider}
                focusSearchOnOpen={true}
                onChange={(e)=>props.providerchange(e)}
                labelledBy={"Select Provider"}
              />
            </div>
          </Col>
        </React.Fragment>
    )
}
