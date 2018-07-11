import { createStore, applyMiddleware } from 'redux'
import reducers from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

if (module.hot) {
  module.hot.accept('./redux/reducers', () =>
    store.replaceReducer(reducers)
  )
}

export default store
