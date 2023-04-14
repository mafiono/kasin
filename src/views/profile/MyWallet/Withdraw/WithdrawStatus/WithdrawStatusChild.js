import React, { Component } from "react"
import {Col,Row,Input} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../../../history"
import { connect } from "react-redux"
import { ChevronDown,  ChevronLeft,  ChevronRight} from "react-feather"
import { WithdrawHistoryLoad, Withdrawpagenationchange} from "../../../../../redux/actions/paymentGateWay"
import {selectedStyle} from "../../../../../configs/providerConfig"
import DatePicker from "../../../../lib/Datepicker"
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY/MM/DD hh:mm:ss';
const CustomHeader = props => {
  return (
    <div>
      <Row>
        <Col xs="12" sm='4' className='pt-2'>
          <DatePicker  onChange={date => { props.setDate([date.start,date.end]) }} />
          {/* <FormGroup>
            <Flatpickr value={props.date} className="form-control" options={{  mode: "range"  }} onChange={date => { props.setDate(date) }} />
          </FormGroup> */}
        </Col>
      </Row>
    </div>
  )
}

class DepositStatusChild extends Component {
    static getDerivedStateFromProps(props, state) {
        if ( props.dataList.data.length !== state.data.length || state.currentPage !== props.parsedFilter.page ) {
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
        columns: [
         
          {
            name: "amount",
            selector: "amount",
            minWidth:  "100px",
            sortable: true,
          },
          {
            name: "status",
            selector: "status",
            minWidth:  "100px",
            sortable: true
          },
          {
            name: "Comment",
            selector: "type",
            sortable: true,
            minWidth:  "100px",
            cell : row =>(
              <div>
                <Input type="textarea" readOnly={true}  value={row.comment ? row.comment : "comment"} />
              </div>
            )
          },
          {
            name: "paymentType",
            minWidth:  "100px",
            selector: "type",
            sortable: true,
          },
          // {
          //   name: "Bank Name",
          //   minWidth:  "100px",
          //   selector: "ps_name",
          //   sortable: true,
          // },
          {
            minWidth:  "100px",
            name: "lastbalance",
            selector: "lastbalance",
            sortable: true,
            cell : row=>(
              <div>
                {row.lastbalance.toFixed(0)}
              </div>
            )
          },
          {
            name: "updatedbalance",
            minWidth:  "100px",
            selector: "updatedbalance",
            sortable: true,
            cell : row=>(
              <div>
                {row.updatedbalance.toFixed(0)}
              </div>
            )
          },
          {
            name: "createDate",
            minWidth:  "100px",
            selector: "createDate",
            sortable: true,
            cell: row => (
                <span>
                  <Moment  date={(new Date(row.createDate))} />
                </span>
            )
          },
        ],
        allData: [],
        value: "",
        rowsPerPage: 7,
        sidebar: false,
        currentData: null,
        selected: [],
        totalRecords: 0,
        sortIndex: [],
        addNew: "",
        modal: false,
        title : "",
        icon : "",
        navLink : "",
        update : false,
        rowid : "",
        isChecked : false,
        tooltipOpen : false,
        date : [
          new Date(),
          new Date(new Date().valueOf() + 24 * 60 * 60 * 1000),
        ],
        user:{}
    }

     componentDidMount(){
        this.props.WithdrawHistoryLoad(
          this.props.parsedFilter,
          {
            start: this.state.date[0],
            end: this.state.date[1],
          }
        )
    }

    handleFilter = e => {
      this.setState({ value: e.target.value })
      this.props.filterData(e.target.value)
    }

    handleRowsPerPage = value => {
        let { parsedFilter, Withdrawpagenationchange } = this.props
        let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
        history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
        this.setState({ rowsPerPage: value })
        Withdrawpagenationchange({ page: parsedFilter.page, perPage: value })
    }

    handlePagination = page => {
        let { parsedFilter, Withdrawpagenationchange } = this.props
        let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 7
        let urlPrefix = history.location.pathname
        history.push( `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
        )
        Withdrawpagenationchange({ page: page.selected + 1, perPage: perPage })
        this.setState({ currentPage: page.selected })
    }

    date_change = async (e) =>{
      if(e.length === 2){
        await this.setState({date : e});
        this.props.WithdrawHistoryLoad(this.props.parsedFilter,{
          start: this.state.date[0],
          end: this.state.date[1],
        })        
      }
    }


  render() {
    let { columns,data,allData,totalPages,value,rowsPerPage,totalRecords,sortIndex} = this.state
    return (
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
              forcePage={ this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0 }
              onPageChange={page => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={data => this.setState({ selected: data.selectedRows }) }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              date={this.state.date}
              setDate={(e)=>this.date_change(e)}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
            />
          }
          sortIcon={<ChevronDown />}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.withdraw,
  }
}

export default connect(mapStateToProps, {WithdrawHistoryLoad,Withdrawpagenationchange})(DepositStatusChild)