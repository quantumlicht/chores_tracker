// IndexView.js

define(["utils",
        "app",
        "models/ChoreModel",
        "models/CompletedChoreModel",
        "text!templates/Chore.html"],

    function(utils, app, ChoreModel, CompletedChoreModel, ChoreTemplate){

        var ChoreView = Backbone.View.extend({

            // The DOM Element associated with this view
            tagName: 'div',
            className: 'chores',
            template: Handlebars.compile(ChoreTemplate),
            renderForListView: false,
            // View constructor
            initialize: function(options) {
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
                if (app.session.get("logged_in")) {
                    console.log('ChoreView', 'choreCompleted', app.session);
                    // this.model.set('lastCompleted', new Date());
                    completedChore = new CompletedChoreModel({
                        chore: this.model.get('id'),
                        user: app.session.user
                    });
                    console.log('ChoreView', 'choreCompleted', app.session);
                    this.model.save({lastCompleted: new Date()},{
                        success: function(chore){
                            console.log('ChoreView','choreCompleted','model save success callback', 'chore', chore);
                        },
                        error: function(res){
                        utils.showAlert('Erreur', res, 'alert-danger');
                        }
                    });
                    
                    completedChore.save({error: function(res){
                        utils.showAlert('Erreur',res);
                    }});
                    this.render();
                }
                else {
                    utils.showAlert('Attention!', 'Vous devez être connecté pour compléter une tâche', 'alert-warning')
                }

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