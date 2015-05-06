// Model.js
// --------
define(["jquery", "backbone"],
		function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
        	 urlRoot: '/api/tours',
  	       idAttribute: '_id',
            // Model Constructor
            initialize: function() {
//         	   this.formatDepartureDate();
            },

            // Default values for all of the Model attributes
            defaults: {
        		routecode:'',
        		code:'',
        		name:'Tour Information',
        		status:'New', //new, confirm ,close
        		op:'',
        		guide:'',
        		departuredate:'',
        		days:'',
        		passenger:[{
        			no:1,
        			group:1,
        			name:'',
        			gender:'',
        			age:0,
        			phone:'',
        			fee:0.0,
        			meal:0.0,
        			admission:0.0,
        			pickup:'',
        			dropoff:'',
//        			confirmation:'',
//        			invoice:'',
        			agency:''
        		}],        		
        		itinerary:[{
        			day:1,
        			from:'',
        			via:'',
        			to:'',
        			hotel:'',
        			breakfast:'',
        			lunch:'',
        			dinner:'',
        			itinerary:''
        		}] ,
        		bus:[{
        			no:'',
        			plateno:'',
        			driver:'',
        			seats:Number,        			
        			note:''
        		}],
        		note:''
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

<<<<<<< HEAD
            }
//            formatDepartureDate: function() {
//           	 
//                var val = this.get( 'departuredate' );
//           
//                if ( val ) {
//                   val = Moment( val );
//                   this.set( 'departuredate', val.format('MM/DD/YYYY') );
//                   console.log('formated date is :'+this.get('departuredate'));
////                   this.set( 'when_fmt_long', val.format('MM/DD/YYYY h:mm:ss a') );
////                   this.set( 'when_fmt_duration_ago', val.fromNow() );
////                   this.set( 'when_fmt_ellapsed_seconds', moment.duration( moment() - val ).as('seconds') + ' seconds' );
//                }
//             }
=======
            },
            formatDepartureDate: function() {
           	 
                var val = this.get( 'departuredate' );
           
                if ( val ) {
                   val = Moment( val );
                   this.set( 'departuredate', val.format('MM/DD/YYYY') );
                   console.log('formated date is :'+this.get('departuredate'));
//                   this.set( 'when_fmt_long', val.format('MM/DD/YYYY h:mm:ss a') );
//                   this.set( 'when_fmt_duration_ago', val.fromNow() );
//                   this.set( 'when_fmt_ellapsed_seconds', moment.duration( moment() - val ).as('seconds') + ' seconds' );
                }
             }
>>>>>>> c06b8d7fa5a5911bb5b2422db847d4e23003ed5a

        });

        // Returns the Model class
        return Model;

    }

);