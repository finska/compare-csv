class Headers
	def all_old(params)
		open_url = CsvData.new.old_file_url(params)
		headers_from_csv(open_url)
	end
	
	
	def all_new(params)
		open_url = CsvData.new.new_file_url(params)
		headers_from_csv(open_url)
	end
	
	
	def headers_from_csv(open_url)
		CSV.read(open_url, :headers => true).headers
	end
	
	
	def selected_index_old(params)
		all_old(params).index(params[:select_header_old])
	end
	
	
	def selected_index_new(params)
		all_new(params).index(params[:select_header_new])
	end
end