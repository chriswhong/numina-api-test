import moment from 'moment'

const NUMINA_GRAPHQL_ENDPOINT = 'https://api.numina.co/graphql'

const localizeDate = date => moment(date).format('YYYY-MM-DDT00:00:00')

// make an authenticated call to the numina graphQL api
const numinaGraphqlFetch = (query) => {
  return fetch(NUMINA_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ query })
  })
    .then(r => r.json())
}

// authenticate with the numina graphql api
export const login = (username, password) => {
  const loginMutation = `
  mutation {
    logIn(
        email:"${username}",
        password:"${password}") {
      jwt {
        token
        exp
      }
    }
  }
`

  return fetch(NUMINA_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ query: loginMutation })
  })
    .then(r => r.json())
    .then(({ data, errors }) => {
      if (errors) throw new Error(errors[0].message)
      return data.logIn.jwt.token
    })
    .then((token) => {
      localStorage.setItem('token', token)
    })
}

// given a date and mode, get hourly analytics data
export const fetchDateData = (date, mode) => {
  const copiedDate = new Date(date.valueOf())
  const dateQuery = `
  query {
    feedCountMetrics(
      serialnos:["SANDBOX"],
      startTime:"${localizeDate(copiedDate)}",
      endTime:"${localizeDate(new Date(copiedDate.setHours(copiedDate.getHours() + 24)))}",
      objClasses:["${mode}"],
      timezone:"America/New_York",
      interval:"1h") {
      edges {
        node {
          serialno
          result
          objClass
          time
        }
      }
    }
  }
`

  return numinaGraphqlFetch(dateQuery)
    .then(({ data }) => {
      // transform into array of x,y objects
      return data.feedCountMetrics.edges.map((d) => {
        // truncate time to just time of day (no date)
        const x = moment(d.node.time).format('HH:mm')
        const y = d.node.result
        return { x, y }
      })
    })
}
