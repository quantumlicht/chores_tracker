define([
    "app",
    "utils",
    "views/ChoreView",
    "models/ChoreModel",
    "collections/ChoreCollection",
    "text!templates/ChoreList.html"
    ],

    function(app, utils, ChoreView, ChoreModel, ChoreCollection, template){

        var ChoreAdminView = Backbone.View.extend({

            template: Handlebars.compile(template),

            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.collection = new ChoreCollection();
                this.collection.fetch({reset: true});
                this.render();
                this.listenTo(this.collection, 'add', this.render);
                this.listenTo(this.collection, 'reset', this.render);
            },

            // View Event Handlers
            events: {
                'click #add': 'addChore'
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.html(this.template);
                // Setting the view's template property using the Underscore template method
                this.collection.each(function(item) {
                    this.renderChore(item);
                }, this);


                // Maintains chainability
                return this;

            },

            addChore: function(e) {
                console.log('ChoreAdminView','addChore');
                e.preventDefault();
                var formData = {};
                $('#addChore div').children('input, textarea, select').each(function(i, el) {
                if ($(el).val() !== '') {
                    formData[el.id] = $(el).val();
                }
                $(el).val('');
                });
                // formData.user_id = app.session.user.get('user_id');
                // formData.username = app.session.user.get('name');
                console.log('ChoreAdminView','addChore','formData', formData);
                this.collection.create(formData);
            },

            renderChore: function(chore) {
                chore.set('alterable', true);
                var choreView = new ChoreView({
                    model: chore
                });
                this.$el.append(choreView.render().el);
            }

        });

        // Returns the View class
        
        return ChoreAdminView;

    }

);
