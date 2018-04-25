 static defaultProps = {
     schedules: [
       { close: [ 0, 20, 30 ],   open: [ 0, 10, 15 ]  },
       { close: [ 6, 2, 0   ],   open: [ 1, 4, 0   ]  },
       { close: [ 6, 13, 0  ],   open: [ 6, 8, 15  ]  }
     ],
     daysOfWeek:  [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
   }


	 renderAlternative = () => {
	 	let result = [
	 		{open: null, close: null, closed: true, day: 0},
	 		{open: null, close: null, closed: true, day: 1},
	 		{open: null, close: null, closed: true, day: 2},
	 		{open: null, close: null, closed: true, day: 3},
	 		{open: null, close: null, closed: true, day: 4},
	 		{open: null, close: null, closed: true, day: 5},
	 		{open: null, close: null, closed: true, day: 6}
	 	]

	 	const { schedules, daysOfWeek } = this.props
	 	const	isSameDay = day => day.close[0] === day.open[0]

	 	const NA = schedules.reduce((result, element, index, arr) => {

	 		const openDay = element.open[0]
	 		const closeDay = element.close[0]
	 		result[openDay].open = element.open[1] + ":" + element.open[2]
	 		result[closeDay].close = element.close[1] + ":" + element.close[2]

	 		const range

	 		 if(!isSameDay(element)) {
	 			range(openDay, closeDay).forEach(d => {
	 				result[d].closed = false
	 			})

	 		 }




	 		console.log("ACC => ", result)
	 		 acc.concat({close: element.close})

	 	})

	 	return (
	 			<td key={1444}><b>Hello</b></td>

	 	)
	 }


   renderHours = () => {

	 	const { schedules, daysOfWeek } = this.props
	 	const	isSameDay = day => day.close[0] === day.open[0]

     const hours = []
     schedules.forEach(element => {

       if(!isSameDay(element)) {

	 			const diff = element.close[0] - element.open[0] - 2
	 			const fullDaysIndexes = range(element.open[0] + 1, element.close[0])
         console.log("DIFF  => ", diff)

         hours.push({open: element.open})

         for(let i=0; i < diff; i++) {
           hours.push({ isFullDay: true })
         }

         hours.push({close: element.close})

       } else {
         console.log("HOURS => ", hours)
         hours.push(element)

          newArray.push(moment({ hour: element.open[1], minute: element.open[2] }) )
	 		}

	 	})

     return (
     <tbody>
       { hours.map((hour, index) => {
         return (
           <HoursRow
             key={index}
             hours={hour}
             label={daysOfWeek[index]}
           />
         )
       }) }
       </tbody>
     )

   }

   render() {
     return (
       <div className="opening-hours">
         <table>
	 				{this.renderHours()}
	 				{/* {this.renderAlternative()} */}
         </table>
         {/* <button className="btn btn-info opening-hours-button">Edit</button> */}
       </div>
     )
	 }
