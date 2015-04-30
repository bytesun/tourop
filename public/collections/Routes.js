// Collection.js
// -------------
define(["jquery","backbone","models/Route"],

  function($, Backbone, Model) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
      url: '/api/routes',
      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Model

    });

    // Returns the Model class
    return Collection;

  }

);