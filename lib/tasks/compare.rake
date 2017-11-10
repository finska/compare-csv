require 'csv'
require 'open-uri'


def first_csv_from_url
	puts('Enter url address for primary csv with more data: ')
	url1 = STDIN.gets.chomp.to_s
	convert_to_array(CSV.read(open(url1)))
end


def second_csv_from_url
	puts('Enter url address to second csv: ')
	url2 = STDIN.gets.chomp.to_s
	convert_to_array(CSV.read(open(url2)))
end


def convert_to_array(csv)
	arr = []
	csv.each do |row|
		arr.push(row[1])
	end
	arr
end


def first_csv_from_file
	puts('Enter path to first csv file: ')
	path1 = STDIN.gets.chomp.to_s
	convert_to_array(CSV.read(path1))
end


def second_csv_from_file
	puts('Enter path to second csv file: ')
	path2 = STDIN.gets.chomp.to_s
	convert_to_array(CSV.read(path2))
end


def find_all_rows_with_ids(haystack, needle, in_file)
	haystack.each do |row|
		needle.each do |need|
			if row[1] == need
				in_file.puts(row)
			end
		end
	end
end


namespace :compare do
	desc('Compare two CSV file and returns diff!')
	task csv: :environment do
		puts('Do you open file from url address? (y/n) ')
		from = STDIN.gets.chomp.to_s
		if from == 'y'
			csv1 = first_csv_from_url
			csv2 = second_csv_from_url
			diff1 = (csv1 - csv2)
			# diff2 = (csv2 - csv1)
			first = File.open("first_minus_second_diff.txt", "w")
			# second = File.open("second_minus_first_diff.txt", "w")
			# find_all_rows_with_ids(csv1, diff1, first)
			first.puts(diff1)
		else
			csv1 = first_csv_from_file
			csv2 = second_csv_from_file
			my_file = File.open("data.txt", "w")
			my_file.puts(csv2 - csv1)
		end
	end
end