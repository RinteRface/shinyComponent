import Extra from '../components/extra.f7.jsx';

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
