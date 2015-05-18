CANTOP LOCAL TOUR SYSTEM
=======================
Manage partner, route information, and create tour  
[Live demo](http://tour.sunorth.org) (cantop/cantop)

	    	*Note: this is only for development tracking, so it will be removed after deployment.

			Schedule
			Week-1 : User Interface development
			Week-2 : Basic Information(agency/hotel/restaurant/route) input functions
			Week-3/4 : Core business logic (order input, generate voucher/invoice)
			Week-5 : System deployment and defects fix 
			
			Backlog:
				1. passenger list for guide and hotel
			
			----------------------------------------------------------------------
			Development Trace
			[2015-5-17] 1. add notification function for tour operations
							2. edit logo text.
							3. add authentication support
							4. add "csrf" token in the ajax header.
							
			[2015-5-16] 1. finish all tour process.
			[2015-5-15] 1. finish "confirmation" function
			
			[2015/5/13] 1. add "feedback" and "commission" in tour db.
			
			[2015/5/12] 1. change "plate no." to "bus no."
						2. add a space in telephone numbers /postcode
						3. increase the width of province input field
						4. add "other" payment
						5. add "room types" in passenger
						6. set read-only for tour code and name during editing.
						7. support adding passenger by group
						
			[2015/5/11] 1. db.copyDatabase('records', 'archive_records')
						git push https://github.com/bytesun/tourop.git master:master
						2.bookingdate is the system date or input manually?
						3. about contact who is from tour's op and agency's contact?
						4. add "booking date" for passenger in tour.
						
			[2015/5/8] 1. add fax field in information 
						  2. format telephone input with '(_ _ _)_ _ _ - _ _ _ _ '
			[2015/5/6] Done new/edit tour 
			[2015/5/5] Add payment and bus company for partner input 
			 [2015/5/1] Finish create/query/update routes functions 
			 [2015/4/30] Create new route with itinerary 
			 [2015/4/29] Finish  partner information maintenance functions(add/edit/query) 
			
			 [2015/4/28] 1. Demo UI to client and get feedback  
			  2. Merge all agency/hotel/restaurant/admission to one page info. 
			  3. Add setting menu : company info, discount, tax rate  
			  4. Add company information for confirmation and invoice 
			  5. Enable remark in confirmation and invoice 
			 [2015/4/27] define the <a href="#route_list">route</a> basic layout.  Follow up: 1. basic layout 2.confirm operation process 3. check all data fields 4. logo 5. tour status 
			 [2015/4/26] create pages for tour generation(basic info, itinerary info, passengers, buses...) 
			 [2015/4/25] create a sample page for <a href="#voucher_info">voucher</a> and <a href="#invoice_info">invoice</a>(this two pages are copied from existed sample, so need to change base on real requirement) 
			 [2015/4/24] create basic information UI 
			 [2015/4/23]  initialize project : environment setup 
			 [2015/4/22]draft design documents 