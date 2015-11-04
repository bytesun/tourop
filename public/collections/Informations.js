// Collection.js
// -------------
define(["jquery","backbone",
        "models/Information"],

  function($, Backbone, Model) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
      url: '/api/partners',
      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Model

    });

    // Returns the Model class
    return Collection;

  }

);