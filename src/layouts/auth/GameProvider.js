import React from "react"
import Swiper from "react-id-swiper"
import {Root} from "../../authServices/rootconfig"

const params = {
    slidesPerView: 3,
    breakpoints: {
      1024: {
        slidesPerView: 9,
        spaceBetween: 40
      },
      640: {
        slidesPerView: 6,
        spaceBetween: 20
      },
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
}

class GameProvider extends React.Component {
    render() {
        return (
            <div>
                <h4>Game Providers</h4>
                <div className="gameprovider-imgs">
                    {this.props.providerimgs ? 
                        <Swiper {...params}>
                            {this.props.providerimgs.map((item,i)=>(
                                <div key={i}>
                                    <img src={ Root.imageurl+item.image} alt={"swiper "+ i}  className="img-fluid" />
                                </div>
                            ))}
                        </Swiper>
                    :null}                     
                </div>
            </div>
        )
    }
}


export default  GameProvider