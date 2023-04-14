import {FIRSTPAGESLIDER,FIRSTPAGEDATA,FIRSTPAGEGAMELIST,FIRSTPAGEGETSIDEBAR} from "../../types"
var initdata = {

}
export const register = (state = initdata, action) => {
  switch (action.type) {
    
    case FIRSTPAGEDATA :
      return {
        ...state,
        firstmenu : action.data.firstmenu,
        contactus : action.data.contactus,
        firstquick : action.data.firstquick,
        privacypolicy : action.data.privacypolicy,
        faqpage : action.data.faqpage,
        newtext : action.data.newtext,
        sociallink : action.data.sociallink,
        aboutus : action.data.aboutus,
        paymentimgs : action.data.paymentimgs,
        providerimgs : action.data.providerimgs,
        trackcode : action.data.trackcode,
        title : action.data.title,
        logoimg : action.data.logoimg,
        footertext : action.data.footertext,
        favicon : action.data.favicon,

      }
    case FIRSTPAGESLIDER :
      return {
        ...state , 
        firstpages1 : action.data.firstpages1,
        firstpages2 : action.data.firstpages2,
        firstpages3 : action.data.firstpages3,
      }

      case FIRSTPAGEGAMELIST :
        return {
          ...state , 
          livecasinoitems : action.data.livecasinoitems,
          casinoitems : action.data.casinoitems,
        }
      case FIRSTPAGEGETSIDEBAR : 
      return {
        ...state , 
        sidebar : action.data.sidebar,
      }
    default: {
      return state
    }
  }
}
