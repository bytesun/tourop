// Collection.js
// -------------
define(["jquery","backbone",
        "models/Confirmation"],

  function($, Backbone, Model) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
      url: '/api/confirmations',
      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Model,
      comparator: function( collection ){
          return( collection.get("no") );
        }
    });

    // Returns the Model class
    return Collection;

  }

);