const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_DEMO_ONE_LIST': {
      return { ...state, list: state.list.concat(action.payload) }
    }
    default:
      return state
  }
}
