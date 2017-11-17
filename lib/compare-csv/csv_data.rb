class CsvData
	def old_file(params)
		CSV.read(old_file_url(params))
	end
	
	
	def old_file_url(params)
		open(params[:csv_file_old])
	end
	
	
	def new_file(params)
		CSV.read(new_file_url(params))
	end
	
	
	def new_file_url(params)
		open(params[:csv_file_new])
	end
	
	
	def make_file(data_old, data_new, params)
		attributes = Headers.new.all_old(params)
		attributes.unshift('Not in NEW', 'Not in OLD')
		csv = CSV.generate(headers: true) do |csv|
			csv << attributes
			data_old.each do |row|
				row.unshift('Only in OLD', '')
				csv << row
			end
			data_new.each do |row|
				row.unshift('', 'Only in NEW')
				csv << row
			end
		end
		return csv
	end
end