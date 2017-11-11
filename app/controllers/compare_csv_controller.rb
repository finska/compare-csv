require 'csv'
require 'open-uri'
class CompareCsvController < ApplicationController
	skip_before_action :verify_authenticity_token
	
	
	def index
	
	end
	
	
	def analyze
		header_old = params[:select_header_old]
		header_new = params[:select_header_new]
		headers_all_old = headers_from_csv(open(params[:csv_file_old]))
		index_old = headers_all_old.index(header_old)
		index_new = headers_from_csv(open(params[:csv_file_new])).index(header_new)
		old_csv = csv_from_url(params[:csv_file_old])
		new_csv = csv_from_url(params[:csv_file_new])
		diff = convert_to_array(old_csv, index_old) - convert_to_array(new_csv, index_new)
		data = find_whole_rows_based_on_one_column(old_csv, diff, index_old)
		csv_diff = to_csv(headers_all_old, data)
		send_csv(csv_diff)
	end
	
	
	def find_whole_rows_based_on_one_column(old_csv, diff, index)
		arr = []
		old_csv.each do |row|
			if diff.find {|dif| dif == row[index]}
				arr.push(row)
			end
		end
		arr
	end
	
	
	def send_csv(csv)
		send_data csv, :type => 'text/csv; charset=utf-8; header=present', :disposition => "attachment; filename=diff.csv"
	end
	
	
	def to_csv(headers, data)
		attributes = headers
		csv = CSV.generate(headers: true) do |csv|
			csv << attributes
			data.each do |row|
				csv << row
			end
		end
		return csv
	end
	
	
	def headers_old
		headers = headers_from_csv(open(params[:csv_file_old]))
		respond_to do |format|
			format.json {render json: {'headers_old' => headers}}
		end
	end
	
	
	def headers_new
		headers = headers_from_csv(open(params[:csv_file_new]))
		respond_to do |format|
			format.json {render json: {'headers_new' => headers}}
		end
	end
	
	
	private
	def csv_from_url(url)
		CSV.read(open(url))
	end
	
	
	def headers_from_csv(url)
		CSV.read(url, :headers => true).headers
	end
	
	
	def convert_to_array(csv, index)
		arr = []
		csv.each do |row|
			arr.push(row[index])
		end
		arr
	end
end
