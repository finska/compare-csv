require 'csv'
require 'open-uri'
class CompareCsvController < ApplicationController
	skip_before_action :verify_authenticity_token
	
	
	def index
		old_input = params[:csv_file_old]
		new_input = params[:csv_file_new]
		session[:old] = old_input
		session[:new] = new_input
	end
	
	
	def analyze
		arr = Array.new
		old_data = arr.find_whole_rows_normal(params)
		new_data = arr.find_whole_rows_flipped(params)
		csv = CsvData.new.make_file(old_data, new_data, params)
		send_csv(csv)
	end
	
	
	def send_csv(csv)
		send_data csv, :type => 'text/csv; charset=utf-8; header=present', :disposition => "attachment; filename=diff.csv"
	end
end
