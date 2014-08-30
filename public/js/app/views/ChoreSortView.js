// IndexView.js

define([
    "app",
    "models/ChoreModel",
    "views/ChoreListView",
    "collections/ChoreCollection",
    "text!templates/ChoreSort.html"
    ],

    function(app,ChoreModel,ChoreListView, ChoreCollection, ChoreSortTemplate){

        var ChoreSortView = Backbone.View.extend({

            template: Handlebars.compile(ChoreSortTemplate),

            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.render();
            },

            // View Event Handlers
            events: {
                'click #orderby-frequency': 'orderByFrequency',
                'click #orderby-due_date': 'orderByDueDate',
                'click #orderby-creation_date': 'orderByCreationDate',
                'click #orderby-title': 'orderByTitle',
                'click #sortOrder': 'toggleSortOrder'
            },

            orderByFrequency: function(e){
                e.preventDefault();
                this.listView.trigger('order:frequency');
            },

            orderByDueDate: function(e){
                e.preventDefault();
                this.listView.trigger('order:due_date');
            },

            orderByCreationDate: function(e){
                e.preventDefault();
                this.listView.trigger('order:creation_date');
            },

            orderByTitle: function(e){
                e.preventDefault();
                this.listView.trigger('order:title');
            },

            toggleSortOrder: function(e){
                e.preventDefault();
                this.listView.trigger('order:toggle_order');
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.html(this.template);
                this.listView = new ChoreListView();
                console.log('this.listView', this.listView);
                this.$el.append(this.listView.$el);
                // this.listView.render();
            }

        });

        // Returns the View class
        
        return ChoreSortView;

    }

);
