import React, { Component } from "react"
import {Col,Row,Badge,Label} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { connect } from "react-redux"
import { ChevronDown,  ChevronLeft,  ChevronRight} from "react-feather"
import { reports_email_load, ReportPageNationChange } from "../../../redux/actions/profile"
import {selectedStyle} from "../../../configs/providerConfig"
import DatePicker from "../../lib/Datepicker"
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY/MM/DD hh:mm:ss';

const CustomHeader = props => {
  return (
      <Row>
        <Col xs="12" sm='12' md="5" className='pt-1'>
          <Row className="font-weight-bold">
            {
              props.store.result ? 
              <>
                <Col sm="12" md="3">
                  <div>
                    Total Deposit
                  </div>
                  <Label>
                    {props.store.result.totaldeposit}
                  </Label>
                </Col>
                <Col sm="12" md="3">
                  <div>
                    Total Bet
                  </div>
                  <Label>
                    {props.store.result.totalbet}
                  </Label>
                </Col>
                <Col sm="12" md="3">
                  <div>
                    Total Win
                  </div>
                  <Label>
                  {props.store.result.totalwin}
                  </Label>
                </Col>
                <Col sm="12" md="3">
                  <div>
                  Net balance 
                  </div>
                  <Label>
                  {props.store.result.currentwalletbalance}
                  </Label>
                </Col>
              </>
              :null
            }
          </Row>
        </Col>
        <Col xs="12" sm='12'  md="4" className='pt-2'>
            <DatePicker  onChange={date => { props.setDate([date.start,date.end]) }} />
          {/* <FormGroup className="font-weight-bold">
            <Label onClick={()=>props.me.toggleModal()}>
            <Moment  date={(new Date(props.me.state.selectionRange.startDate))} /> ~ 
            <Moment  date={(new Date(props.me.state.selectionRange.endDate))} />
            </Label>
          </FormGroup> */}
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
        name: "PROVIDERID",
        selector: "PROVIDERID",
        sortable: true,
        cell : row => (
          <div>
            {row.gameid.PROVIDERID}
          </div>
        )
      },
      {
        name: "NAME",
        selector: "NAME",
        sortable: true,
        cell : row => (
          <div>
            {row.gameid.NAME}
          </div>
        )
      },
      {
        name: "Previous Balance",
        selector: "AMOUNT",
        sortable: true,
        cell: row => (
            <span>
              {row.betting.prevbalance ? row.betting.prevbalance.toFixed(0) : "0"}
            </span>
        )
      },
      {
        name: "AMOUNT",
        selector: "AMOUNT",
        sortable: true,
        cell: row => (
            <span>
              {  row.AMOUNT ? row.TYPE==='BET' ?  "-"+ row.AMOUNT.toFixed(0) : row.AMOUNT.toFixed(0) : "0"}
            </span>
        )
      },
      {
        name: "Net  Balance",
        selector: "AMOUNT",
        sortable: true,
        cell: row => (
            <span>
              {row.betting.prevbalance ? row.TYPE==='BET' ? (row.betting.prevbalance - row.AMOUNT).toFixed(0) : (row.betting.prevbalance + row.AMOUNT).toFixed(0)  : "0"}
            </span>
        )
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
        name: "TYPE",
        selector: "TYPE",
        sortable: true,
        cell: row => (
          <Badge pill color={row.TYPE==='BET'?'danger':'success'}>{row.TYPE}</Badge>
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
    date : [   
      new Date(),
      new Date(new Date().valueOf() + 24 * 60 * 60 * 1000),
    ],

  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

   componentDidMount(){
      this.props.reports_email_load({ start: this.state.date[0],end: this.state.date[1],},this.props.parsedFilter)
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
    let urlPrefix = this.props.thumbView ? "/data-list/thumb-view/" : history.location.pathname;
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

  date_change = async (e) =>{
    if(e.length === 2){
      await this.setState({date : e});
      this.props.reports_email_load({ start: this.state.date[0],end: this.state.date[1],},this.props.parsedFilter)        
    }
  }


  render() {
    let { columns, data, allData, totalPages, value, rowsPerPage, totalRecords, sortIndex } = this.state;
    return (
      <>
       
        <div id="admindata_table" className={`data-list list-view`}>
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
                setDate={(e)=>this.date_change(e)}
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
  return { dataList: state.report,user : state.auth.login.values }
}

export default connect(mapStateToProps, {reports_email_load,ReportPageNationChange})(DepositStatusChild)