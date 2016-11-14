import _ from 'lodash'
import React, { Component } from 'react'
import MoneyCell from './MoneyCell'
import SalaryPieGraph from './SalaryPieGraph'
import SalaryBarGraph from './SalaryBarGraph'

type Props = {
  week: number,
  stats: any
}

export default class TeamDashboard extends Component {
  props: Props

  state: {
    week: number,
    stats: any,
    teams: Array<string>,
    team: string
  }

  constructor (props: Props) {
    super(props)

    let teams = _.uniq(_.map(_.values(this.props.stats), 'Team'))
    _.pull(teams, 'Substitute')

    this.state = {
      week: this.props.week,
      stats: this.props.stats,
      teams: teams,
      team: teams[0]
    }
  }

  componentDidMount () {
    window.$('.dropdown-button').dropdown()
    this.renderD3()
  }

  componentDidUpdate () {
    this.updateD3()
  }

  renderD3 () {
    this.pieChart = new SalaryPieGraph()
    this.pieChart.init(this.pieChartNode)
    let players = this.playersForCurrentTeam()
    this.pieChart.create(players)

    this.barChart = new SalaryBarGraph()
    this.barChart.init(this.barChartNode)
    let { teams, stats } = this.state
    this.barChart.create(teams, stats)
  }

  updateD3 () {
    let players = this.playersForCurrentTeam()
    this.pieChart.update(players)
  }

  renderTeams (teams: Array<any>) {
    return _.map(teams, (team) => {
      return (
        <li key={team}>
         <a onClick={() => { this.setState({team}) } }>
            {team}
          </a>
        </li>
      )
    })
  }

  renderTeamsDropdown () {
    let { team, teams } = this.state

    return (
      <div>
        <a className='dropdown-button btn' data-activates='team-dropdown'>{team}</a>

        <ul id='team-dropdown' className='dropdown-content'>
          {this.renderTeams(teams)}
        </ul>
      </div>
    )
  }

  playersForCurrentTeam () {
    let { team, stats } = this.state

    let players = []
    _.mapKeys(stats, (playerStats, playerName) => {
      if (playerStats['Team'] === team) {
        players.push({name: playerName, salary: playerStats['Salary']})
      }
    })

    players = _.sortBy(players, (p) => p.salary)

    return players
  }

  renderPlayers () {
    let players = this.playersForCurrentTeam()

    return (
      <table className='highlight'>
      <thead>
        <tr>
          <th>Player</th>
          <th>Salary</th>
        </tr>
      </thead>
        <tbody>
          { _.map(players, (player) => {
            return (
              <tr key={player.name} style={{lineHeight: 0.5}}>
                <td>{player.name}</td>
                <td><MoneyCell data={player.salary}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render () {
    return (
      <div>
        <div className="row" style={{paddingTop: 20}}>
          <div className="col m6">
            {this.renderTeamsDropdown()}
            {this.renderPlayers()}
          </div>
          <div className="col m6">
            <div id="pie-chart" ref={(node) => { this.pieChartNode = node }}></div>
          </div>
        </div>

        <div className="row" style={{paddingTop: 20}}>
          <div id="chart" ref={(node) => { this.barChartNode = node }}></div>
        </div>
      </div>
    )
  }
}
