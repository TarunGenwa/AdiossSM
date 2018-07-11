import { observable } from 'mobx';

class AppStore{
  @observable auth = 'admin'
}
var store = window.store =  new AppStore
export default store
