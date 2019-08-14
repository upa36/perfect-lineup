const expect = require('chai').expect
const { describe, it } = require('mocha')
const lineupTools = require('./lineup')

describe('Lineup', () => {
  describe('calculateTotalSalary', () => {
    it('returns the total salary for all players in the lineup', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 22, gameId: 123, salary: 9500 },
        { id: 2, name: 'Bryce Harper', position: 'OF', teamId: 12, gameId: 119, salary: 3800 },
        { id: 3, name: 'Mookie Betts', position: 'OF', teamId: 22, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.calculateTotalSalary(lineup)).to.equal(16900)
    })
  })

  describe('getGameCounts', () => {
    it('returns all teams currently in lineup and the count of players in each', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 22, gameId: 123, salary: 9500 },
        { id: 2, name: 'Bryce Harper', position: 'OF', teamId: 12, gameId: 119, salary: 3800 },
        { id: 3, name: 'Mookie Betts', position: 'OF', teamId: 22, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.getGameCounts(lineup)).to.deep.equal({ 119: 1, 123: 2 })
    })
  })

  describe('getPositionCounts', () => {
    it('returns all positions currently filled and the count of players in each', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 22, gameId: 123, salary: 9500 },
        { id: 2, name: 'Bryce Harper', position: 'OF', teamId: 12, gameId: 119, salary: 3800 },
        { id: 3, name: 'Mookie Betts', position: 'OF', teamId: 22, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.getPositionCounts(lineup)).to.deep.equal({ 'P': 1, 'OF': 2 })
    })
  })

  describe('getTeamCounts', () => {
    it('returns all teams currently filled and the count of players in each', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 22, gameId: 123, salary: 9500 },
        { id: 2, name: 'Bryce Harper', position: 'OF', teamId: 12, gameId: 119, salary: 3800 },
        { id: 3, name: 'Mookie Betts', position: 'OF', teamId: 22, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.getTeamCounts(lineup)).to.deep.equal({ 12: 1, 22: 2 })
    })
  })

  describe('violatesGameCount', () => {
    it('returns true if more than 3 players from a single game are in the lineup', () => {
      const gameCounts = { 123: 1, 456: 4, 789: 3 }

      expect(lineupTools.violatesGameCount(gameCounts)).to.equal(true)
    })

    it('returns false if no more than 3 players from a single game are in a lineup', () => {
      const gameCounts = { 123: 1, 456: 3, 789: 2 }

      expect(lineupTools.violatesGameCount(gameCounts)).to.equal(false)
    })
  })

  describe('violatesPositionCount', () => {
    it('returns false when all positions exist and have the correct counts', () => {
      const positionCounts = { 'P': 1, 'C': 1, '1B': 1, '2B': 1, '3B': 1, 'SS': 1, 'OF': 3 }

      expect(lineupTools.violatesPositionCount(positionCounts)).to.equal(false)
    })

    it('returns true when a position is missing', () => {
      const positionCounts = { 'P': 1, 'C': 1, '1B': 1, '2B': 1, '3B': 1, 'SS': 1 }

      expect(lineupTools.violatesPositionCount(positionCounts)).to.equal(true)
    })

    it('returns true when a position has not enough players', () => {
      const positionCounts = { 'P': 1, 'C': 1, '1B': 1, '2B': 1, '3B': 1, 'SS': 1, 'OF': 2 }

      expect(lineupTools.violatesPositionCount(positionCounts)).to.equal(true)
    })

    it('returns true when a position has too many players', () => {
      const positionCounts = { 'P': 2, 'C': 1, '1B': 1, '2B': 1, '3B': 1, 'SS': 1, 'OF': 3 }

      expect(lineupTools.violatesPositionCount(positionCounts)).to.equal(true)
    })
  })

  describe('violatesSalary', () => {
    it('returns true when the salary is above 45000', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 22, gameId: 123, salary: 16000 },
        { id: 2, name: 'Bryce Harper', position: 'OF', teamId: 12, gameId: 119, salary: 15000 },
        { id: 3, name: 'Mookie Betts', position: 'OF', teamId: 22, gameId: 123, salary: 15000 },
      ]

      expect(lineupTools.violatesSalary(lineup)).to.equal(true)
    })

    it('returns false when the salary equals 45000', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 22, gameId: 123, salary: 15000 },
        { id: 2, name: 'Bryce Harper', position: 'OF', teamId: 12, gameId: 119, salary: 15000 },
        { id: 3, name: 'Mookie Betts', position: 'OF', teamId: 22, gameId: 123, salary: 15000 },
      ]

      expect(lineupTools.violatesSalary(lineup)).to.equal(false)
    })

    it('returns false when the salary is below 45000', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 22, gameId: 123, salary: 9500 },
        { id: 2, name: 'Bryce Harper', position: 'OF', teamId: 12, gameId: 119, salary: 3800 },
        { id: 3, name: 'Mookie Betts', position: 'OF', teamId: 22, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.violatesSalary(lineup)).to.equal(false)
    })
  })

  describe('violatesTeamCount', () => {
    it('returns true if more than 2 players from a single team are in the lineup', () => {
      const teamCounts = { 12: 1, 34: 3 }

      expect(lineupTools.violatesTeamCount(teamCounts)).to.equal(true)
    })

    it('returns false if no more than 2 players from a single team are in a lineup', () => {
      const teamCounts = { 12: 1, 34: 2 }

      expect(lineupTools.violatesTeamCount(teamCounts)).to.equal(false)
    })
  })

  describe('validateLineup', () => {
    it('returns true when the lineup satisfies all conditions', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500 },
        { id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500 },
        { id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800 },
        { id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200 },
        { id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100 },
        { id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300 },
        { id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800 },
        { id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800 },
        { id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.validateLineup(lineup)).to.equal(true)
    })

    it('returns false when the lineup includes too many players from a single team', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500 },
        { id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500 },
        { id: 3, name: 'Mitch Morelane', position: '1B', teamId: 12, gameId: 123, salary: 2800 },
        { id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200 },
        { id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100 },
        { id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300 },
        { id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800 },
        { id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800 },
        { id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.validateLineup(lineup)).to.equal(false)
    })

    it('returns false when the lineup includes too many players from a single game', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500 },
        { id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 123, salary: 2500 },
        { id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800 },
        { id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200 },
        { id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100 },
        { id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300 },
        { id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800 },
        { id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 123, salary: 3800 },
        { id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.validateLineup(lineup)).to.equal(false)
    })

    it('returns false when the lineup includes too many players from a single position', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500 },
        { id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500 },
        { id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800 },
        { id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200 },
        { id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100 },
        { id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300 },
        { id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800 },
        { id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800 },
        { id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600 },
        { id: 10, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 2200 },
      ]

      expect(lineupTools.validateLineup(lineup)).to.equal(false)
    })

    it('returns false when the lineup includes too few players from a single position', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500 },
        { id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500 },
        { id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800 },
        { id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200 },
        { id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100 },
        { id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300 },
        { id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800 },
        { id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800 },
      ]

      expect(lineupTools.validateLineup(lineup)).to.equal(false)
    })

    it('returns false when the lineup does not include a player from a position', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500 },
        { id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800 },
        { id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200 },
        { id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100 },
        { id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300 },
        { id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800 },
        { id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800 },
        { id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600 },
      ]

      expect(lineupTools.validateLineup(lineup)).to.equal(false)
    })

    it('returns false when the lineup has a total salary greater than 45000', () => {
      const lineup = [
        { id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 10800 },
        { id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 4000 },
        { id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 4400 },
        { id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 4500 },
        { id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 4100 },
        { id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 4500 },
        { id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 4200 },
        { id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 4400 },
        { id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 4200 },
      ]

      expect(lineupTools.validateLineup(lineup)).to.equal(false)
    })
  })
})
