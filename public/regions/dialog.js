define([
    'app',
    'marionette'
], function(app, Marionette){

    return  Marionette.Region.extend({
    	el: "#dialog",
        onShow: function(view){
        	console.log('showing dialog!');
            this.listenTo(view, "dialog:close", this.closeDialog);

            var self = this;
            this.$el.modal({
                backdrop: true,
                keyboard: true,
                show: true
            });
        },

        closeDialog: function(){
            this.stopListening();
            this.close();
            this.$el.modal('hide');
        }
    });

});
