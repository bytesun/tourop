CANTOP LOCAL TOUR SYSTEM
=======================
Manage partner, route information, and create tour  
[Live demo](http://tour.sunorth.org) (cantop/cantop)

			-------------------------------------------------------------------			
			Backlog:
			-------------------------------------------------------------------			

				* result sorting and paging
				* auto fill partner list when type partner code
				* report 
				* calendar

				
			
			----------------------------------------------------------------------
			Development Trace:
			----------------------------------------------------------------------
			[2015-7-27] support searching invoices by no.
			
			[2015-7-17] keep original id when revise invoice.
			
			[2015-6-24] 1.add status of invoice.
						  2.search by route in tour list
			[2015-6-23] adjust invoice layout.
			[2015-6-22] change invoice no. by sequence number. 							(db.counters.insert({countername:'invoiceno',seq:0}))
						
			[2015-6-9] show "gender" in name list for hotel/guide
			[2015-6-2] add GST No. in invoice page.
			
			[2015-6-1]  1. sort confirmations/invoices by no.
			
			[2015-5-28] 1. support deleting partner and route information
							2. add confimation notice before doing deleting/confirm... operations
							
			[2015-5-27] 1. support revising confirmation/invoice and tour.
							2. add required information validation before saving.
			
			[2015-5-25] change the fare and meal commission to tourist relative instead of group. 
			[2015-5-23] 1. Print tour detail schedule report.
							2 search tour by status
							
			[2015-5-22] 1. support customize fare type and add extra commission.
						  2. add deleting operation for all list 
						  				* format text by escaping
						  
			[2015-5-19] 1. disable the limitation of phone length.
						2. add "chinese name", "cell" ,"email" in partner information
						3. add one status ('canceled') of tour.
			
			[2015-5-18] 1. user information editing.
							2. default 'op' with user name
							3. add more fields in signup page.
							4. name list for guide and hotel
			
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