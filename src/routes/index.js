module.exports = [
  {
    prefix: 'admins',
    path: require('../resources/admins/route')
  },
  {
    prefix: 'authentications',
    path: require('../resources/authentications/route')
  },
  {
    prefix: 'doctors',
    path: require('../resources/doctors/route')
  },
  {
    prefix: 'attendants',
    path: require('../resources/attendants/route')
  },
  {
    prefix: 'health-check',
    path: require('../resources/health-check/route')
  },
]