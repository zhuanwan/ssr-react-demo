// initialize state
const initialState = {
  detail: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_DEMO_TWO': {
      return { ...state, detail: action.payload }
    }

    default:
      return state
  }
}
