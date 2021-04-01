// const initialState = {};

const initialState = {
  email: "",
  password: "",

  isSignedIn: false,
};

export default function signin(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN":
      console.log(action);
      return {
        ...state,
        email: action.email,
        password: action.password,
        isSignedIn: true,
       
      };
    case "SIGN_OUT":
      return { ...state, email: "", isSignedIn: false };

    default:
      return state;
  }
}

// export default function signinReducer(state = initialState, action) {}
