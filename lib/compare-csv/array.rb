class Array
	def converted_old(params)
		if params.has_key?(:mapped_csv_file_old)
			old_file = CSV.read(open(params[:mapped_csv_file_old]))
			index = CSV.read(open(params[:mapped_csv_file_old]), :headers => true).headers.index(params[:mapped_selected_field_old])
		else
			old_file = CsvData.new.old_file(params)
			index = Headers.new.selected_index_old(params)
		end
		convert_to_array(old_file, index)
	end
	
	
	def converted_new(params)
		if params.has_key?(:mapped_csv_file_new)
			new_file = CSV.read(open(params[:mapped_csv_file_new]))
			index = CSV.read(open(params[:mapped_csv_file_new]), :headers => true).headers.index(params[:mapped_selected_field_new])
		else
			new_file = CsvData.new.new_file(params)
			index = Headers.new.selected_index_new(params)
		end
		
		convert_to_array(new_file, index)
	end
	
	
	def convert_to_array(csv, index)
		arr = []
		csv.each do |row|
			arr.push(row[index])
		end
		arr
	end
	
	
	def difference_normal(params)
		converted_old(params) - converted_new(params)
	end
	
	
	def difference_flipped(params)
		converted_new(params) - converted_old(params)
	end
	
	
	def find_whole_rows_normal(params)
		arr = []
		old_csv = CsvData.new.old_file(params)
		diff = difference_normal(params)
		index = Headers.new.selected_index_old(params)
		old_csv.each do |row|
			if diff.find {|dif| dif == row[index]}
				arr.push(row)
			end
		end
		arr
	end
	
	
	def find_whole_rows_flipped(params)
		arr = []
		new_csv = CsvData.new.new_file(params)
		diff = difference_flipped(params)
		index = Headers.new.selected_index_new(params)
		new_csv.each do |row|
			if diff.find {|dif| dif == row[index]}
				arr.push(row)
			end
		end
		arr
	end
	
	
	def join_old_and_new_data(params)
		[find_whole_rows_normal(params), find_whole_rows_flipped(params)]
	end
end