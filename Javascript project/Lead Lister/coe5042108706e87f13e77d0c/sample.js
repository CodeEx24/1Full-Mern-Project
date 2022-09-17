const person = {
    name: "Jocarl",
    walk(){console.log(this)},
    talk(){console.log("I'm talking")}
}

person.walk() //Will log the whole person object because of this keyword
person.talk() //Will log or print "I'm talking"

const walk1 = person.walk; //walk1 is now a function because it reference the walk to the person object
console.log(walk1()) //Will log the function and it's body.
walk1(); //this will treat as undefined now - This is standalone function

const walk = person.walk.bind(person) //Is basically to bind the function into an object. which is the object person.
walk(); //It will now return the whole peron object VALUE which is name, walk() and talk()
