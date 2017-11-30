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
	
	//convert columns into rows
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


//--------------------------------------------------------
/* More functionality added when mocking the state with arrays
transpose the matrix function */
export const generateRows = ({
  columnValues = defaultColumnValues,
  length,
  random = randomSeed(329972281),
}) => {
  const data = []
  const columns = Object.keys(columnValues)
  for (let i = 0; i < length; i += 1) {
    const record = {}
    columns.forEach((column) => {
      let values = columnValues[column]
      if (typeof values === 'function') {
        record[column] = values({ random, index: i, record })
        return
      }
      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]]
      }
      const value = values[Math.floor(random() * values.length)]
      if (typeof value === 'object') {
        record[column] = Object.assign({}, value)
      } else {
        record[column] = value
      }
    })
    data.push(record)
  }
  return data
}

//--------------------------------------------------------
export const randomSeed = (seed = 123456789) => {
  let mW = seed
  let mZ = 987654321
  const mask = 0xffffffff
  return () => {
    mZ = ((36969 * (mZ & 65535)) + (mZ >> 16)) & mask
    mW = ((18000 * (mW & 65535)) + (mW >> 16)) & mask
    let result = ((mZ << 16) + mW) & mask
    result /= 4294967296
    return result + 0.5
  }
}
