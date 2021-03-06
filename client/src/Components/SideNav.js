import React, { Component } from 'react'
import { Link } from 'react-router'

class SideNav extends Component {
  render () {
    let spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1efPmmiEBjpAcVpSFlicd7b5b-1kDzBSPsAhebpupo7I/edit?usp=sharing'
    let srcUrl = 'https://github.com/kevinhughes27/parity-server'

    return (
      <div>
        <li>
          <div className='userView'>
            <img src='logo.png' style={{width: 240}} role="presentation"/>
          </div>
        </li>

        <li><Link to='/'>Raw Stats</Link></li>
        <li><Link to='/leaderboards'>Leaderboards</Link></li>
        <li><Link to='/compare_players'>Compare Players</Link></li>
        <li><Link to='/team_dashboard'>Team Dashboard</Link></li>
        <li><Link to='/trade_simulator'>Trade Simulator</Link></li>

        <li><div className='divider'></div></li>

        <li><a href={spreadsheetUrl} target='_blank'>Spreadsheets</a></li>
        <li><a href={srcUrl} target='_blank'>Source Code</a></li>
      </div>
    )
  }
}

module.exports = SideNav
