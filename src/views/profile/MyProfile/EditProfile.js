import React from "react"
import {Button,FormGroup,Row,Col,Input,Label,CardBody,CardHeader,CardFooter,CardTitle,CustomInput} from "reactstrap"
import { connect } from "react-redux"
import { Againregister,get_userinfor,profilesave } from "../../../redux/actions/auth/ProfileActions"
// import Fileupload from "../../lib/crop"
import {toast} from "react-toastify"
import avatar from "../../../assets/avatar.png"
import { Root } from "../../../authServices/rootconfig"

class EditProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            email : '',
            user : {},
            firstname : "",
            lastname : "",
            modal : false,
            mobilenumber : "",
            avatar : "",
            imageSrc:"",
            file : null
        }
    }
    componentDidMount(){
        this.props.get_userinfor();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.users){
            if(this.props.users.profile_user){
                if(this.props.users.profile_user !== prevProps.users.profile_user){
                    var user = this.props.users;
                    this.setState({email : user.profile_user.email,avatar : user.profile_user.avatar, username : user.profile_user.username,firstname :user.profile_user.firstname,lastname :user.profile_user.lastname,mobilenumber : user.profile_user.mobilenumber})
                }
            }
        }
    }

    SaveRegister(){
        if(!this.state.file){
            this.props.Againregister(this.state);
        }else{

            const fpdata = new FormData();
            fpdata.append('fpImgFile', this.state.file);
            fpdata.append('mobilenumber',this.state.mobilenumber)
            fpdata.append('email',this.state.email)
            fpdata.append('firstname',this.state.firstname)
            fpdata.append('lastname',this.state.lastname)
            this.props.profilesave(fpdata)
            // this.props.get_userinfor(me.state.email);

            // var me  = this;
            // var xml = new XMLHttpRequest();
            // xml.open('post', Root.adminurl + "profile/profilesave");
            // xml.send(fpdata);
            // xml.onreadystatechange = function() {
            //     if (this.readyState === 4 && this.status === 200) {
            //         var rdata = JSON.parse(xml.responseText);
            //         if (rdata.status === true) {
            //             toast.success("Uploaded successfully!");
            //         }else {
            //             toast.error("Upload Faild.")
            //         }
            //     }
            // };
        }
    }

    modalflag = (bool)=>{
        this.setState({modal : bool});
    }

    async filechange(e){
        if (e.target.files && e.target.files.length) {
            let file = e.target.files[0];
            if(file.size < 512000){
                let imageDataUrl = await this.readFile(file)
                this.setState({imageSrc :imageDataUrl,file : file })
            }else{
                toast.warn("The file size is too large.")
            }
        }
       
    }

    readFile = (file)=> {
        return new Promise(resolve => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result), false)
          reader.readAsDataURL(file)
        })
    }

    render(){
        return (
            <div className='p-1' style={{margin:'auto'}}>
                <CardHeader className="d-block w-100 text-center" >
                    <CardTitle className="d-block w-100" style={{color:'#fff'}}>ACCOUNT INFORMATION</CardTitle>
                </CardHeader>
                <CardBody className="register-body"  >                        
                    <Row>
                        <Col lg='4' sm='12' xs='12'>
                            <Row>
                                <Col xs="12" sm="12" className="p-1" style={{display:'flex'}}>
                                    {
                                        this.state.avatar === "" ?
                                        <img src={avatar} alt="" style={{ margin:'auto',width:"200px", borderRadius:'50%'}} />
                                        :
                                        this.state.imageSrc !== "" ? 
                                        <img src={this.state.imageSrc} alt="" style={{ margin:'auto',width:"200px",height:"200px", borderRadius:'50%'}} /> : 
                                        <img alt="" src={Root.imageurl + this.state.avatar} style={{ margin:'auto',width:"200px", borderRadius:'50%',height:"200px"}} />
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" sm="12" className="p-1" style={{display:'flex'}}>
                                    <CustomInput bsSize="sm" label="File select"  onChange={(e)=>{this.filechange(e)}} accept="image/png, image/jpeg" id={"livecasinoimg"}  type="file" />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg='8' sm='12' xs='12' className='pt-2'>
                            <Row>
                                <Col xs="12" sm="12" md="12" className="p-1" >
                                    <FormGroup className="form-label-group">
                                        <Input type="text" name="user_name" id="username" placeholder="User Name"
                                            required
                                            disabled={true}
                                            value = {this.state.username}
                                            onChange={e=>this.setState({username : e.target.value})}
                                        />
                                        <Label>username</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs="12" sm="12" md="6" className="p-1" >
                                    <FormGroup className="form-label-group">
                                        <Input type="text" name="firstname" id="firstname" placeholder="First Name"
                                            required
                                            value = {this.state.firstname}
                                            onChange={e=>this.setState({firstname : e.target.value})}
                                        />
                                        <Label>first name</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs="12" sm="12" md="6" className="p-1" >
                                    <FormGroup className="form-label-group">
                                        <Input type="text" name="lastname" id="lastname" placeholder="Last Name"
                                            required
                                            value = {this.state.lastname}
                                            onChange={e=>this.setState({lastname : e.target.value})}
                                        />
                                        <Label>last name</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs="12" sm="12" md="12" className="p-1" >
                                    <FormGroup className="position-relative form-label-group has-icon-left input-divider-left">
                                        <Input 
                                            type="text" 
                                            placeholder="Mobile Number" 
                                            className="form-control"
                                            name="mobilenumber" 
                                            id="mobilenumber" 
                                            onChange={e=>this.setState({mobilenumber : e.target.value})}
                                            value = {this.state.mobilenumber}
                                            maxLength={10}
                                            required
                                        />
                                        <Label>mobile number</Label>
                                        <div className="form-control-position">
                                            <span style={{color:'white'}}>+91</span>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter style={{textAlign:'right'}} className='pt-1'>
                    <Button   className='igamez-button' color="primary " type="submit" onClick={()=>this.SaveRegister()}>Save</Button>
                </CardFooter>
            </div>
        )
    }
}
const getuser = state =>{
    return { users : state.auth.login ,
    user : state.auth.login.values}
}
export default connect(getuser,{Againregister,get_userinfor,profilesave})(EditProfile)
