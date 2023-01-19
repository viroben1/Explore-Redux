// DOM elements
const valueEl = document.getElementById('value')
const customInput = document.getElementById('custom-input')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plusFive')
const minusFiveBtn = document.getElementById('minusFive')
const addCustomBtn = document.getElementById('input-submit')
const incrementOddBtn = document.getElementById('increment-odd')
const incrementAsyncBtn = document.getElementById('increment-async')

// initial State
const initialState = {
    value: 0,
    
}
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/plusFive':
          return { value: state.value + 5 }
        case 'counter/minusFive':
          return { value: state.value - 5 }
        case 'counter/incrementOdd':
          if(state.value % 2 == 0) {
            return state
          } else {
            return { value: state.value + 1 }
          }
          case 'counter/custom':
            return { value: state.value + action.payload }
        default:
        return state
    }
}
// action object definitions
const addAction = {
    type: 'counter/incremented'
  }
  
  const subAction = {
    type: 'counter/decremented'
  }
  
  const addFiveAction = {
    type: 'counter/plusFive'
  }
  
  const subFiveAction = {
    type: 'counter/minusFive'
  }
  
  const incrementOddAction = {
    type: 'counter/incrementOdd'
  }
// declaration of Reducer
	let store = Redux.createStore(counterReducer)
// define render
const render = () => {
    const state = store.getState()
    
    valueEl.innerHTML = state.value.toString()
}
const addOne = () => {
    store.dispatch(addAction)
  }
	 const subOne = () => {
    store.dispatch({type: 'counter/decremented'})
}

const addFive = () => {
    store.dispatch({type: 'counter/custom', payload: 5})
}

const subFive = () => {
    store.dispatch({type: 'counter/custom', payload: -5})
}
const incrementAsync = () => {
    setTimeout(() => {
      store.dispatch(addAction)
    }, 1000);
  }
const incrementOdd = () => {
    store.dispatch(incrementOddAction)
  }
  const addCustom = () => {
    let num = +customInput.value
    store.dispatch({
      type: 'counter/custom',
      payload: num
    })
  }

// adding event listeners to dispatch actions
minusBtn.addEventListener('click', subOne)
plusBtn.addEventListener('click', addOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', subFive)
addCustomBtn.addEventListener('click', addCustom)
incrementAsyncBtn.addEventListener('click', incrementAsync)
incrementOddBtn.addEventListener('click', incrementOdd)
// call initial render
render()
    

// re-render every time state is changed.
store.subscribe(render);