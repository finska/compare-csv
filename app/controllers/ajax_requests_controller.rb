class AjaxRequestsController < ApplicationController
	def headers_old
		headers = Headers.new.all_old(params)
		respond_to do |format|
			format.json {render json: {'headers_old' => headers}}
		end
	end
	
	
	def headers_new
		headers = Headers.new.all_new(params)
		respond_to do |format|
			format.json {render json: {'headers_new' => headers}}
		end
	end
	
	
	# def send_data_for_html_table
	# 	headers = Headers.new.all_old(params)
	# 	old_data = Array.new.find_whole_rows_normal(params)
	# 	new_data = Array.new.find_whole_rows_flipped(params)
	# 	respond_to do |format|
	# 		format.json {render json: {'headers' => headers, 'old_data' => old_data, 'new_data' => new_data, 'params_all' => params}}
	# 	end
	# end
end
