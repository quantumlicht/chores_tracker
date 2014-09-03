// IndexCollection.js

define(["app", "collections/ChoreCollection", "models/CompletedChoreModel"],
	function(app, ChoreCollection, Model) {

		// Creates a new Backbone Collection class object
		var CompletedChoreCollection = ChoreCollection.extend({
			// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
			model: Model,
			url: app.root + '/chores/completed'
		});

		// Returns the Model class
		return CompletedChoreCollection;

	}

);