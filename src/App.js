import React from "react"
import Router from "./Router"
import "./components/@vuexy/rippleButton/RippleButton"
import "./index.scss"
import "swiper/css/swiper.css"
import 'animate.css/animate.css'
import "react-toggle/style.css"
import "flatpickr/dist/themes/light.css";
import "rc-slider/assets/index.css"
import "react-toastify/dist/ReactToastify.css"
import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import "./assets/scss/pages/faq.scss"
import "./assets/scss/pages/coming-soon.scss"
import "./assets/scss/pages/data-list.scss"
import "./assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "./assets/scss/plugins/forms/switch/react-toggle.scss"
import "./assets/scss/plugins/extensions/sweet-alerts.scss"
import "./assets/scss/plugins/extensions/swiper.scss"
import "./assets/scss/plugins/extensions/react-paginate.scss"
import "./assets/scss/plugins/extensions/slider.scss"
import "./assets/scss/plugins/extensions/toastr.scss"

const App = props => {
  return <Router />
}

export default App 