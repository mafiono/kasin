import React, { Component } from "react"
import {UncontrolledDropdown,DropdownMenu,DropdownToggle,FormGroup,DropdownItem,Col,Row,Badge,Label, Button,Form,
  Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { connect } from "react-redux"
import { ChevronDown,  ChevronLeft,  ChevronRight} from "react-feather"
import { reports_email_load, ReportPageNationChange } from "../../../redux/actions/satta/matka"
import { DateRangePicker  } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {Bazaartype,selectedStyle} from "../../../configs/providerConfig"
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY/MM/DD hh:mm:ss';


const CustomHeader = props => {
  return (
      <Row>
        <Col xs="12" sm='12' md="3" className='pt-1'>
          <UncontrolledDropdown className="data-list-rows-dropdown d-block">
            <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50">
                  {`${props.index[0] ? props.index[0] : 0} - ${props.index[1] ? props.index[1] : 0} of ${props.total}`}
              </span>
              <ChevronDown size={15} />
            </DropdownToggle>
            <DropdownMenu tag="div" right>
              <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(7)}>
                  7
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
       
        <Col xs="12" sm='12'  md="4" className='pt-2'>
          
          <FormGroup className="font-weight-bold">
            <Label onClick={()=>props.me.toggleModal()}>
              {props.me.state.selectionRange.startDate.toLocaleString()} ~
              {props.me.state.selectionRange.endDate.toLocaleString()}
            </Label>
          </FormGroup>
        </Col>
      </Row>
  )
}

class DepositStatusChild extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ){
      return {
        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex
      }
    }
    return null;
  }

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    allData: [],
    value: "",
    rowsPerPage: 7,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    
    user:{},
    columns: [
        {
            name: "Betid",
            selector: "transactionid",
            sortable: true,
        }, 
        {
            name: "Bazaartype",
            selector: "BazaarType",
            sortable: true,
            cell: row => (
                <div>
                    {Bazaartype[row.bazaaritem.bazaartype]}
                </div>
            )
        },
        {
            name: "BazzarName",
            selector: "BazzarName",
            sortable: true,
            cell: row => (
                <div>
                    {row.bazaaritem.bazaarname}
                </div>
            )
        },
        {
            name: "Gamename",
            selector: "GameName",
            sortable: true,
            cell: row => (
                <div>
                    {row.gameitem.name}
                </div>
            )
        },
        {
            name: "betnumber",
            selector: "betnumber",
            sortable: true,
        },  
        {
            name: "type",
            selector: "type",
            sortable: true,
        },  
        {
            name: "amount",
            selector: "amount",
            sortable: true,
        },  
        {
            name: "currency",
            selector: "currency",
            sortable: true,
            cell: row => (
                <Badge pill color = "light-success">
                    INR
                </Badge>
            )
        },
        {
            name: "status",
            selector: "status",
            sortable: true,
           cell : row =>(
                <Badge pill color = { row.status === "1" ? "light-warning" :  row.status === "2" ?  "light-success" : "light-danger"}>
                 { row.status === "1" ? "Pending" :  row.status === "2" ?  "win" : "lost"}
                </Badge >
           )
        }, 
        {
            name: "DATE",
            selector: "DATE",
            sortable: true,
            cell: row => (
            <span>
               <Moment  date={(new Date(row.DATE))} />
            </span>
            )
        },
    ],
    modal: false,
    selectionRange : {
      startDate:new Date(),
      endDate: new Date(new Date().valueOf()+86400000),
      key: 'selection',
    }

  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

   componentDidMount(){
      this.props.reports_email_load({
        start: this.state.selectionRange.startDate,
        end: this.state.selectionRange.endDate,
    },this.props.parsedFilter)
  }

  handleFilter = e => {
    this.setState({ value: e.target.value })
    this.props.filterData(e.target.value)
  }

  handleRowsPerPage = value => {
    let { parsedFilter, ReportPageNationChange } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
    this.setState({ rowsPerPage: value })
    ReportPageNationChange({ page: parsedFilter.page, perPage: value })
  }

  handlePagination = page => {
    let { parsedFilter, ReportPageNationChange } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 7;
    let urlPrefix =history.location.pathname;
    history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`);
    ReportPageNationChange({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  }

  DateRange_change =(e) =>{
    this.setState({selectionRange : e.selection})
  }

  DateChange_action = (e) =>{
    e.preventDefault();
    this.toggleModal();
      this.props.reports_email_load({
          start: this.state.selectionRange.startDate,
          end: this.state.selectionRange.endDate,
      },this.props.parsedFilter)
  }

  render() {
    let { columns, data, allData, totalPages, value, rowsPerPage, totalRecords, sortIndex } = this.state;
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-dialog-centered modal-lg" >
          <Form className="" action="#" onSubmit={this.DateChange_action}>
            <ModalHeader toggle={this.toggleModal} className="bg-primary">
              Date Range
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
              <DateRangePicker ranges={[this.state.selectionRange]}   onChange={(e)=>this.DateRange_change(e)}
              showSelectionPreview={true}       moveRangeOnFirstSelection={false} months={1} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit"  className='igamez-button'>
                Accept
              </Button>{" "}
            </ModalFooter>
          </Form>
        </Modal>

        <div id="admindata_table" className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"}`}>
          <DataTable
            columns={columns}
            data={value.length ? allData : data}
            pagination
            paginationServer
            paginationComponent={() => (
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={totalPages}
                containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
                activeClassName="active"
                forcePage={
                  this.props.parsedFilter.page
                    ? parseInt(this.props.parsedFilter.page - 1)
                    : 0
                }
                onPageChange={page => this.handlePagination(page)}
              />
            )}
            noHeader
            subHeader
            responsive
            pointerOnHover
            selectableRowsHighlight
            onSelectedRowsChange={data =>
              this.setState({ selected: data.selectedRows })
            }
            customStyles={selectedStyle}
            subHeaderComponent={
              <CustomHeader
                date={this.state.date}
                setDate={(e)=>this.setState({date:e})}
                handleRowsPerPage={this.handleRowsPerPage}
                rowsPerPage={rowsPerPage}
                total={totalRecords}
                index={sortIndex}
                me={this}
                store = {this.props.dataList}
                dateLoad={(dates)=>this.props.reports_email_load({
                  start: dates[0],
                  end: dates[1],
                },this.props.parsedFilter)}
              />
            }
            sortIcon={<ChevronDown />}
          />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return { dataList: state.profile.sattas ,user: state.auth.login.values}
}

export default connect(mapStateToProps, {reports_email_load,ReportPageNationChange})(DepositStatusChild)