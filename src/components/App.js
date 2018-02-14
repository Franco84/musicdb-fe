import React, {Component} from 'react'
import axios from 'axios'
import SongTable from './SongTable'
import { Button, Dimmer, Dropdown, Grid, Input, Loader } from 'semantic-ui-react'
import '../../style/style.css';

class App extends Component {
  state = {data: '', searchType: 'all', query: ''}

  componentWillMount() {
    axios.get('http://tunecoredb.herokuapp.com/songs')
    .then( response => {
      this.setState({data: response.data})
    })
  }

  renderChoices = () => {
    if (this.state.data === '') {
      return (
        <Grid.Column verticalAlign='middle'>
          <Loader active inline='centered' />
        </Grid.Column>
      )
    } else {
      return (
        <Grid.Column>
          <SongTable data={this.state.data} />
        </Grid.Column>
      )
    }
  }

  handleDropdownChange = (e) => {
    this.setState({
      searchType: e.target.textContent.toLowerCase(), data: this.state.data, query: this.state.query
    })
  }

  handleText = (e) => {
    this.setState({
      searchType: this.state.searchType, data: this.state.data, query: e.target.value
    })
  }

  handleClick = () => {
    axios.post(`http://tunecoredb.herokuapp.com/${this.state.searchType}/search`, {search: {search: this.state.query}})
    .then( response => {
      debugger
      this.setState({data: response.data})
    })
  }

  render() {
    const options = [
      { key: 'All', text: 'All', value: 'All' },
      { key: 'Songs', text: 'Songs', value: 'Songs' },
      { key: 'Albums', text: 'Albums', value: 'Albums' },
      { key: 'Artists', text: 'Artists', value: 'Artists' }
    ]


    return (
      <Grid textAlign='center' centered container>
        <Grid.Row>
          <Grid.Column style={{fontSize: '4vw', textAlign: 'center', paddingTop:'50px'}}>
            Song Search
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered={true}>
          <Grid.Column textAlign='center' style={{paddingTop: '50px'}}>
            <Input
              name='search'
              label={<Dropdown onChange={e => this.handleDropdownChange(e)} defaultValue='All' options={options} />}
              labelPosition='left'
              placeholder='Search Music'
              value={this.state.query}
              onChange={e => this.handleText(e)}
              action={<Button content='Search' onClick={() => this.handleClick()} />}
             />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered={true}>
            {this.renderChoices()}
        </Grid.Row>
      </Grid>
    )
  }
}

export default App
