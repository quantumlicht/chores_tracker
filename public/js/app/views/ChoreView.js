// IndexView.js

define(["utils",
        "app",
        "models/ChoreModel",
        "text!templates/Chore.html"],

    function(utils, app, ChoreModel, ChoreTemplate){

        var ChoreView = Backbone.View.extend({

            // The DOM Element associated with this view
            tagName: 'div',
            className: 'chores',
            template: Handlebars.compile(ChoreTemplate),
            renderForListView: false,
            // View constructor
            initialize: function(options) {
                console.log('ChoreView', 'Fragment', Backbone.history.fragment);

                // $('#' + Backbone.history.fragment.split('/')[0]).addClass('active');

                if (options && options.renderForListView && typeof options.renderForListView === 'boolean' ) {
                    this.renderForListView = options.renderForListView;
                }
                _.bindAll(this);
                this.listenTo(this.model, 'saved', this.render);
            },


            getStatusClass: function(dueDate) {
                var DAY_IN_MS = 24*60*60*1000;

                if(dueDate.getTime() - new Date().getTime() < 0.5* DAY_IN_MS) {
                    return 'danger';
                }
                else if (dueDate.getTime() - new Date().getTime() < DAY_IN_MS) {
                    return 'warning';
                }
                else {
                    return 'info';
                }

            },

            // View Event Handlers
            events: {
                'click .completed': "choreCompleted",
                'click .delete': 'deleteChore'
            },

            deleteChore: function(){
                this.remove();
                var self = this;  
                this.model.destroy({
                    success: function(){
                        utils.showAlert('Succès', 'Tâche effacée' ,'alert-info');
                    }
                });
            },


            choreCompleted: function(){
                this.model.set('lastCompleted', new Date());
                console.log('ChoreView', 'choreCompleted','model', this.model);
                this.model.save();
                this.render();
                // this.model.save({lastCompleted: new Date()});
            },

            // Renders the view's template to the UI
            render: function() {
                console.log('ChoreView', 'render','model', this.model);
                var dueDate = new Date(this.model.get('lastCompleted'));
                dueDate.setHours(dueDate.getHours() + this.model.get('frequency'));

                var status_class = this.getStatusClass(dueDate);

                this.model.set({
                    renderForListView: this.renderForListView,
                    dueDate: dueDate,
                    status_class: status_class
                });
                this.$el.html( this.template(this.model.toJSON()));

                // Maintains chainability
                return this;

            }
        });

        // Returns the View class
        return ChoreView;

    }

);