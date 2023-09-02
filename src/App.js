import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Guides from './components/Guides'

import {MainContainer, Title, TravelUl} from './styled'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class App extends Component {
  state = {apiStatus: apiStatusConstants.initial, t: []}

  componentDidMount() {
    this.getApi()
  }

  fd = e => ({
    id: e.id,
    name: e.name,
    imageUrl: e.image_url,
    description: e.description,
  })

  getApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const options = {
      method: 'GET',
    }
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    const ud = resData.packages.map(e => this.fd(e))
    this.setState({t: ud, apiStatus: apiStatusConstants.success})
  }

  successView = () => {
    const {t} = this.state
    return (
      <TravelUl>
        {t.map(e => (
          <Guides key={e.id} data={e} />
        ))}
      </TravelUl>
    )
  }

  progressView = () => (
    <div data-testid="loader" className="spinner">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.inProgress:
        return this.progressView()
      default:
        return null
    }
  }

  render() {
    return (
      <MainContainer>
        <Title>Travel Guide</Title>
        {this.renderTravelView()}
      </MainContainer>
    )
  }
}

export default App
