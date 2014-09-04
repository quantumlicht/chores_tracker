// IndexCollection.js

define(["app", "models/ChoreModel"],
	function(app, ChoreModel) {

		// Creates a new Backbone Collection class object
		var ChoreCollection = Backbone.Collection.extend({
            
            reverseSort: true,

			applySortOrder: function(result) {
				return this.reverseSort ? -result: result;
			},

			byFrequencyComparator: function(a, b) {
				return this.applySortOrder(
					a.get('frequency') > b.get('frequency') ? 1 : -1
				);
			},

			byLastCompletedDateComparator: function(a,b) {
				return this.applySortOrder(
					new Date(a.get('lastCompleted')).getTime() > new Date(b.get('lastCompleted')).getTime() ? 1: -1
				);	
			},

			byCreationDateComparator: function(a, b) {
				return this.applySortOrder(
					new Date(a.get('creationDate')).getTime() > new Date(b.get('creationDate')).getTime() ? 1: -1
				);
			},

			byDueDateComparator: function(a, b) {
				time_a = new Date(a.get('lastCompleted'));
				time_a.setHours(time_a.getHours() + a.get('frequency'));
				time_b = new Date(b.get('lastCompleted'));
				time_b.setHours(time_b.getHours() + b.get('frequency'));
				return this.applySortOrder(
					time_a > time_b ? 1: -1
				);
			},			

			byTitleComparator: function(a, b) {
				return this.applySortOrder(
					a.get('title') > b.get('title') ? 1: -1
				);

			},

			comparator: this.byDueDateComparator,

			// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
			model: ChoreModel,
			url: 'menage/chores'

		});

		// Returns the Model class
		return ChoreCollection;

	}

);