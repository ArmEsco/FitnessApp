// Add these at the top with your other global variables
const teams = [
    { name: "Team Alpha", points: 1200 },
    { name: "Team Beta", points: 1150 },
    { name: "Team Gamma", points: 1100 },
    { name: "Team Delta", points: 1050 },
    { name: "Team Epsilon", points: 1000 },
    { name: "Team Zeta", points: 950 },
    // Add more teams as needed
];

const individuals = [
    { name: "Example Team", points: 420 },
    { name: "Example Team", points: 380 },
    { name: "Example Team", points: 460 },
    { name: "Example Team", points: 440 },
    { name: "Example Team", points: 560 },
    { name: "Example Team", points: 530 }
    // Add more individuals as needed
];

function updateLeaderboards() {
    // Sort teams and individuals by points (highest first)
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    const sortedIndividuals = [...individuals].sort((a, b) => b.points - a.points);

    // Get top 5 for each
    const topTeams = sortedTeams.slice(0, 6);
    const topIndividuals = sortedIndividuals.slice(0, 6);

    // Update team leaderboard
    const teamLeaderboard = document.querySelector('.team-leaderboard');
    teamLeaderboard.innerHTML = `
        <h3>Top Teams</h3>
        <ol>
            ${topTeams.map(team => `
                <li>
                    <span class="team-name">${team.name}</span>
                    <span class="team-points">${team.points} pts</span>
                </li>
            `).join('')}
        </ol>
    `;

    // Update individual leaderboard
    const individualLeaderboard = document.querySelector('.individual-leaderboard');
    individualLeaderboard.innerHTML = `
        <h3>Top Individuals</h3>
        <ol>
            ${topIndividuals.map(individual => `
                <li>
                    <span class="individual-name">${individual.name}</span>
                    <span class="individual-points">${individual.points} pts</span>
                </li>
            `).join('')}
        </ol>
    `;
}

// Add this to your existing event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboards();
});