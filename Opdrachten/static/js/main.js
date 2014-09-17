//opdracht 3.1

//self executing anonymous function
(function(){
	
//constructor object met argument & method
//name = argument
function Person(name) {
	//name = method
	this.name = name;
	//speak is method
	this.speak = function() {
		console.log(this.name + ' says Hello!' )
	}
}

//opdracht 3.2 Prototype methods
Person.prototype.walk = function(name) {
	console.log(this.name + ' is walking' )
}

Person.prototype.eat = function(name) {
	console.log(this.name + ' is eating' )
}

//call object with argument and methods
var person = new Person("Bob");
person.speak()
person.walk()
person.eat()

//end of self executing anonymous function
})();

//opdracht 3.3 Object literal met argument & methods
console.log('======================');

//self executing anonymous function
(function(){
	
	//object literal
	var person = {
		name: 'Bob',
		speak: function() {
			console.log(this.name + ' says hello')
		},
		walk: function() {
			console.log(this.name + ' is walking')
		},
		eat: function() {
			console.log(this.name + ' is eating')
		}
	}
	
	//call object with argument and methods
	person.speak()
	person.walk()
	person.eat()

//end of self executing anonymous function
})();