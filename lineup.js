function calculateTotalSalary(lineup) {
  return 0
}

function getPositionCounts(lineup) {
  return {}
}

function getGameCounts(lineup) {
  return lineup.reduce((games, player) => {
    games[player.gameId] = games[player.gameId] === undefined ? 1 : games[player.gameId] + 1
    return games
  }, {})
}

function getTeamCounts(lineup) {
  return lineup.reduce((teams, player) => {
    teams[player.teamId] = teams[player.teamId] === undefined ? 1 : teams[player.teamId] + 1
    return teams
  }, {})
}

function violatesGameCount(games) {
  return Object.values(games).some((count) => { return count > 3 })
}

function violatesPositionCount(positions) {
  return positions['P'] !== 1 || positions['C'] !== 1 || positions['1B'] !== 1 ||
    positions['2B'] !== 1 || positions['3B'] !== 1 || positions['SS'] !== 1 ||
    positions['OF'] !== 3
}

function violatesSalary(lineup) {
  return calculateTotalSalary(lineup) > 45000
}

function violatesTeamCount(teams) {
  return Object.values(teams).some((count) => { return count > 2 })
}

function validateLineup(lineup) {
  const gameCounts = getGameCounts(lineup)
  const teamCounts = getTeamCounts(lineup)
  const positionCounts = getPositionCounts(lineup)

  return !violatesGameCount(gameCounts) && !violatesSalary(lineup) &&
    !violatesTeamCount(teamCounts) && !violatesPositionCount(positionCounts)
}

module.exports = {
  calculateTotalSalary,
  getPositionCounts,
  getGameCounts,
  getTeamCounts,
  violatesGameCount,
  violatesPositionCount,
  violatesSalary,
  violatesTeamCount,
  validateLineup,
}
