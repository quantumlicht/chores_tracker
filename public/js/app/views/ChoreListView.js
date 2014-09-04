// IndexView.js

define([
    "utils",
    "app",
    "views/ChoreView",
    "models/ChoreModel",
    "collections/ChoreCollection",
    "text!templates/ChoreList.html"
    ],

    function(utils, app, ChoreView, ChoreModel, ChoreCollection, ChoreListTemplate){

        var ChoreListView = Backbone.View.extend({

            template: Handlebars.compile(ChoreListTemplate),
            // View constructor
            initialize: function() {
                // Calls the view's render method
                _.bindAll(this);
                this.collection = new ChoreCollection();
                // this.collection.comparator = this.collection.byDueDateComparator;
                // console.log('init comparator', this.collection.comparator)
                this.collection.fetch({reset: true});
                this.collection.toggleSortOrder();

                this.listenTo(this.collection, 'add', this.renderChore);
                this.listenTo(this.collection, 'reset', this.render);
                this.listenTo(this.collection, 'sort', this.render);

                this.on('order:frequency', this.orderByFrequency);
                this.on('order:due_date', this.orderByDueDate);
                this.on('order:creation_date', this.orderByCreationDate);
                this.on('order:title', this.orderByTitle);
                this.on('order:lastcompleted', this.orderByLastCompletedDate);
                this.on('order:toggle_order', this.toggleSortOrder);

            },

            // View Event Handlers
            events: {
                'click #add': 'addChore',
                'click #orderby-frequency': 'orderByFrequency',
                'click #orderby-due_date': 'orderByDueDate',
                'click #orderby-creation_date': 'orderByCreationDate',
                'click #orderby-title': 'orderByTitle',
                'click #orderby-lastcompleted': 'orderByLastCompletedDate',
                'click #sortOrder': 'toggleSortOrder'
            },

            addChore: function(e) {
                console.log('ChoreListView','addChore');
                e.preventDefault();
                var formData = {};
                var empty = [];
                $('#addChore div').children('input, textarea, select').each(function(i, el) {
                    if ($(el).val() !== '') {
                        formData[el.id] = $(el).val();
                    }
                    else {
                        empty.push(el.id);
                    }
                    $(el).val('');
                });
                
                formData.user_id = app.session.user.get('user_id');
                formData.username = app.session.user.get('name') || app.session.user.get('username');
                choreModel = new ChoreModel(formData);
                console.log('ChoreListView','addChore','formData', formData);
                if (empty.length > 0) {
                    utils.showAlert('Erreur', 'Tous les champs doivent être remplis', 'alert-danger');    
                }
                else {
                    if (choreModel.isValid()){
                        this.collection.add(choreModel);
                        choreModel.save({}, {
                            error: function(model, response, options){
                                utils.showAlert('Erreur!', response.responseText, 'alert-danger');   
                                console.log('ERREUR', model, response,options);
                            },
                            success: function(){
                                utils.showAlert('Succès', 'Tâche ajoutée!', 'alert-success');
                            }
                        });                        
                    }
                    else if (choreModel.validationError && 
                        (choreModel.validationError.hasOwnProperty('username') || choreModel.validationError.hasOwnProperty('user_id'))) {
                        utils.showAlert('Attention!', 'Vous devez être connecté pour ajouter des tâches', 'alert-warning');
                    
                    }
                }
            },

            orderByFrequency: function(){
                this.collection.comparator = this.collection.byFrequencyComparator;
                this.collection.sort();
            },

            orderByDueDate: function(){
                this.collection.comparator = this.collection.byDueDateComparator;
                this.collection.sort();
            },

            orderByCreationDate: function(){
                this.collection.comparator = this.collection.byCreationDateComparator;
                this.collection.sort();
            },

            orderByLastCompletedDate: function() {
                console.log('orderByLastCompletedDate');
                this.collection.comparator = this.collection.byLastCompletedDateComparator;
                this.collection.sort(); 
            },

            orderByTitle: function(){
                this.collection.comparator = this.collection.byTitleComparator;
                this.collection.sort();
            },

            toggleSortOrder: function(){
                this.$el.find('#tooltip-btn').button('toggle');
                this.collection.toggleSortOrder();
                 // = $('#sortOrder').hasClass('active');
            },

            // Renders the view's template to the UI
            render: function() {
                console.log('render', 'comparator', this.collection.comparator);
                // this.collection.sort();
                this.$el.html(this.template);
                if (this.collection.length) {
                    this.collection.each(function(item) {
                        this.renderChore(item);
                    }, this);
                }

                return this;

            },

            renderChore: function(chore) {
                chore.set('alterable', false);
                var choreView = new ChoreView({
                    model: chore,
                    renderForListView: true
                });
                this.$el.append(choreView.render().el);
                
            }

        });

        // Returns the View class
        
        return ChoreListView;

    }

);
