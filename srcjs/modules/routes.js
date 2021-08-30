import Extra from '../components/extra.f7.html';

export default [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/extra/',
    asyncComponent: () => Extra
  }
]
