import React from "react"
import SportsBet from "./SportsBet"
import Swiper from "react-id-swiper"
import Media from 'react-media';
import { Button, Row } from "reactstrap";
import { ChevronRight } from "react-feather";
import {TapChange } from "../../../redux/actions/exchg/index";
import { connect } from "react-redux"
import sportConfig from "../../../configs/sportsconfig"

const params = {
	spaceBetween: 60,
	centeredSlides: true,
	autoplay: {
	  delay: 5000,
	  disableOnInteraction: false
	},
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true
	},
}

class SportsTab extends React.Component {

    activeTab = async (Item) => {
        await this.props.TapChange(Item);
    }

    render() {
        return(
            <div style={{height:'calc(100% - 145px)', marginBottom:'15px'}}>
                {this.props.currentHeader.Id ? (
                    <>
                    <div className='pt-2 sports-background1' style={{borderRadius:'25px 25px 0px 0px'}}>
                        <div className='sports-tab-title'>
                            <svg style={{color:this.props.currentHeader.color, margin:'1.2rem'}} width="22" height="22" viewBox={this.props.currentHeader.viewBox}>
                                <path d={this.props.currentHeader.icon} fill="currentColor"/>
                            </svg>
                            <span>{this.props.currentHeader.Name}
                                {/* {this.props.current_tap.title ? " : " + this.props.current_tap.title : ''} */}
                            </span>
                        </div>
                        {/* {
                            sportConfig.tab.map((Item, i)=>(
                                <div key={i}
                                    className = {
                                        'p-0 pl-1 pr-1 children-tab ' + 
                                        (Item.index === this.props.current_tap.index ? 'children-tab-active':'')
                                    }
                                    onClick = {()=>this.activeTab(Item)}
                                >
                                    {Item.title}
                                    <div className='mr-auto ml-auto' style={{marginTop:'3px'}}></div>
                                </div>
                            ))
                        } */}
                    </div>
                    <div className='sports-featured-back'>
                        <span className='sports-featured-home'>Home &nbsp;&nbsp;&nbsp;<ChevronRight size={15} />&nbsp;&nbsp;&nbsp;</span>
                        <span className='sports-featured-active-button'>{"All " + this.props.currentHeader.Name}</span>
                    </div>
                    <div className='sports-event'>
                        {
                            this.props.dataList&&this.props.dataList.length ? this.props.dataList.map((BetItem , i)=>(
                                <SportsBet key={i} BetItem={BetItem}/>
                            )):null
                        }
                    </div>
                    </>
                ):(
                    <>
                    <div className='pt-2 pb-2 sports-background' style={{height:'100%', overflow:'auto'}}>
                        <Media queries={{
                            small: "(max-width: 1219px)",
                            medium: "(min-width: 1220px) and (max-width: 1499px)",
                            large: "(min-width: 1500px)"
                            }}>
                            {matches => (
                                <React.Fragment>
                                {matches.small && 
                                    <div id='sports-slider' style={{margin:'auto',padding:'10px'}}>
                                        <Swiper {...params}>
                                            {
                                                sportConfig.firstPageImage.map((item, i) => (
                                                    <div key={i}>
                                                        <img src={item} alt="swiper 1" className="img-fluid" />
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                }
                                {matches.medium && 
                                    <div id='sports-slider' style={{width:'auto',margin:'auto'}}>
                                        <Swiper {...params}>
                                            {
                                                sportConfig.firstPageImage.map((item, i) => (
                                                    <div key={i}>
                                                        <Row>
                                                            <div className='sports-background1' style={{width:'45%'}}>
                                                                <div className='p-2 pl-4'>
                                                                    <h4>Brett Lee's Weekly Casino Cashback</h4>
                                                                    <p>Sportsbet.io has got you covered with up to 250,000 INR weekly cashback on your net Casino losses with Brett Lee's special Weekly Casino Cashback.</p>
                                                                    <Button className='sports-read-me igamez-button'>Read more</Button>
                                                                </div>
                                                            </div>
                                                            <div style={{width:'55%'}}>
                                                                <img src={item} alt="swiper 1" className="img-fluid" />
                                                            </div>
                                                        </Row>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                }
                                {matches.large &&
                                    <div id='sports-slider' style={{width:'auto', margin:'auto'}}>
                                        <Swiper {...params}>
                                            {
                                                sportConfig.firstPageImage.map((item, i) => (
                                                    <div key={i}>
                                                        <Row>
                                                            <div className='sports-background1' style={{width:'40%'}}>
                                                                <div className='p-5'>
                                                                    <h3>Brett Lee's Weekly Casino Cashback</h3>
                                                                    <p className='mt-2' style={{lineHeight:'2'}}>Sportsbet.io has got you covered with up to 250,000 INR weekly cashback on your net Casino losses with Brett Lee's special Weekly Casino Cashback.</p>
                                                                    <Button className='sports-read-me igamez-button'>Read more</Button>
                                                                </div>
                                                            </div>
                                                            <div style={{width:'60%'}}>
                                                                <img src={item} alt="swiper 1" className="img-fluid" />
                                                            </div>
                                                        </Row>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                }
                                </React.Fragment>
                            )}
                        </Media>
                    </div>
                    </>
                )}
            </div>
        )
    }
}

const load_fp_data = (state) => {
    return {
        currentHeader : state.exchgange.current_header_sport,
        dataList : state.exchgange.dataList,
        current_tap : state.exchgange.current_tap
	}
}

const mapDispatchToProps = {
    TapChange,
}

export default connect(load_fp_data,mapDispatchToProps)(SportsTab)