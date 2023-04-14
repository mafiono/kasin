import React from "react"
import Loader from 'react-loader-spinner'

class ComponentSpinner extends React.Component {
  componentDidMount(){

  }
  render() {
    return (
      <div className='websit-loading-firstpage'> 
        <style dangerouslySetInnerHTML={{__html: `body{overflow:hidden;}`}}></style>
        <Loader type="Oval"/>
      </div>
    )
  }
}

export default ComponentSpinner