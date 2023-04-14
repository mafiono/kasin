const initialState = {
    data: [],
    params: null,
    allData: [],
    totalPages: 0,
    filteredData: [],
    totalRecords: 0,
    sortIndex: [],
    result : {}
  }
  
const getIndex = (arr, arr2, arr3, params = {}) => {
    if(params.page && params.perPage){
        var a = parseInt(params.perPage);
        var index = parseInt(params.page);
        let startIndex = a * (index-1);
        let endIndex = startIndex + arr2.length;
        startIndex = startIndex === 0 ? 1 : startIndex;
        let finalArr = [startIndex,endIndex]
        return (arr3 = finalArr)
    }else{
        return (arr3 =[1,arr2.length])
    }
}
  
export const sattas = (state = initialState, action) => {
    switch (action.type) {
        case "SATTA_GET_DATA":
            return {
            ...state,
            data: action.data,
            totalPages: action.totalPages,
            allData: action.allData,
            params: action.params,
            totalRecords: action.allData.length,
            result : action.result,
            sortIndex: getIndex(
                action.allData,
                action.data,
                state.sortIndex,
                action.params
            )
        }

        case "SATTA_GET_PAGENATION":
            return {
            ...state,
            data: action.data,
            totalPages: action.totalPages,
            params: action.params,
            sortIndex: getIndex(
                state.allData,
                action.data,
                state.sortIndex,
                action.params
            )
        }

        default:
            return state
    }
}
        