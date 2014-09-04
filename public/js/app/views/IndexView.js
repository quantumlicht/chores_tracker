// IndexView.js

define(["app",
        "views/ChoreSortView",
        "collections/CompletedChoreCollection",
        "collections/ChoreCollection",
        "text!templates/Index.html",
        "text!templates/LoggedIn.html",
        "text!templates/ChoreCompletedList.html"],

    function(app, ChoreSortView, CompletedChoreCollection, ChoreCollection, IndexTemplate, LoggedInTemplate, ChoreCompletedListTemplate){

        var IndexView = Backbone.View.extend({

            template: Handlebars.compile(IndexTemplate),
            choreCompletedListTemplate: Handlebars.compile(ChoreCompletedListTemplate),
            // View constructor
            initialize: function() {

                // Calls the view's render method
                _.bindAll(this);

                app.session.on("change:logged_in", this.render);

                this.collection = new CompletedChoreCollection({reset:true});
                this.collection.reverseSort = false;
                this.collection.comparator = this.collection.byLastCompletedDateComparator;
                var self = this;
                this.collection.fetch({success: function(data) {
                    self.collection.trigger('reset');
                }});
                this.choreSortView = new ChoreSortView();
                
                this.listenTo(this.collection, 'reset', this.renderSideBar);
            },

            // View Event Handlers
            events: {
                "click #login": "redirectLogin",
                "click #register": "redirectRegister"
            },

            redirectRegister: function(){
                app.router.navigate('/login', {trigger:true});
            },

            redirectLogin: function(){
                app.router.navigate('/login', {trigger:true});
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                // Dynamically updates the UI with the view's template
                if(app.session.get('logged_in')){
                    app.router.navigate('', {trigger:true});
                }

                console.log('IndexView','render','app.session.user.toJSON', app.session.toJSON());
                this.$el.html(this.template({
                    logged_in: app.session.get('logged_in'),
                    user: app.session.user.toJSON()
                }));
                this.$el.append(this.choreSortView.$el);
                this.choreSortView.render();

                // this.collection.sort()
             
                // Maintains chainability
                return this;

            },

            renderSideBar: function() {
                var self = this;
                this.collection.sort();
                _.each(this.collection.slice(-app.LIMIT_LAST_COMPLETED), function(completed_chore){
                    $('#r-sidebar #choreCompletedContainer').append(self.choreCompletedListTemplate({
                        completed_task: completed_chore.toJSON()
                    }));

                });

                return this;
            }

        });

        // Returns the View class
        return IndexView;

    }

);
