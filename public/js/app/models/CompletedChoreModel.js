// IndexModel.js

define(["app", "utils"],

    function(app, utils) {

        // Creates a new Backbone Model class object
        var CompletedChoreModel = Backbone.Model.extend({
            url : function() {           
                return app.root + '/chores/' + this.get('chore') + '/completed';
            }

        });

        // Returns the Model class
        return CompletedChoreModel;

    }

);
