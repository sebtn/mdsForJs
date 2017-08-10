let Me = {
  name: 'Seb',
  printName: function(name)  {
    console.log(`My name one time ${this.name}`)
  },
  printNameTwo: function(who){
    console.log(`My name second time who, points tor agrs passed ${who} ${typeof(who)}`)

  }
}

Me.printName() //seb
setTimeout(Me.printName , 2500)// undef
setTimeout(Me.printName.bind(Me) , 1000) //seb, binding callback to obj

let SomeOther = Object.create(Me)
SomeOther.speak = (p) => console.log('This is args passing', p)
SomeOther.speak2 = (printName) => console.log('Alert String printName')
SomeOther.speak('Sebastian') // sebastian 
SomeOther.printName('otherName not Seb') // sebastian 
SomeOther.printNameTwo( (you) => this.you ) 

aGirl = Object.create(SomeOther)
// point to Sebastian thru SomeOther 
// but available inside others object
aGirl.speak('aGirl from a aGirl.speak') //aGirl
aGirl.speak2('aGirl from a using speak2') //aGirl
aGirl.printName(this) // My name is Seb 
aGirl.printName('Using someOther girl name') // My name is Seb 

let so = SomeOther['name']
console.log('so:' +  so) //Points to Seb

console.log('Me:' +  Me) //[Object: Object]
console.log('someOtherr:' +  SomeOther) //[Object: Object]