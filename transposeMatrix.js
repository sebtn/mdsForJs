// the state is composed of arrays and the keys are map as columns using 
// teh following func, change the column Keys accordingly to the components 

const mapStateToProps = state => {
	const columnKeys = [ 
		'location', 
		'jukebox', 
		'favorites',
		'favoritesPercent',
		'multiCredits',  
		'multiCreditsPercent',  
		'totalFavoriteMultiCredits'
	]
	
	convert columns into rows
	const newState = state.playReports
	let tableRows = []
	const rowsLen = newState[columnKeys[0]].length
	for(let i=0; i<rowsLen; i++) {
		let row = {}
		columnKeys.forEach( colKey => {
			row[colKey] = newState[colKey][i]
		})
		tableRows.push(row)
	}
	console.log('TABLE:', tableRows)
	return { tableRows }
}
