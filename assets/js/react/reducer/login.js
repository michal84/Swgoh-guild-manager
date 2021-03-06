import types from '../actionType/login'

const initialState = {
  user: [],
  error: false,
  submitted: false,
  message: '',
  success: false,
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        submitted: false,
        error: false,
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        logged: true,
        success: true,
        message: null,
        submitted: false,
        error: false,
      }
    case types.REGISTER_ERROR:
      return {
        ...state,
        error: true,
        submitted: false,
        message: action.payload,
      }
    case types.REGISTER_REQUEST:
      return {
        ...state,
        error: false,
        submitted: false,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        submitted: false,
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}

export default loginReducer
