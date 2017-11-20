Rails.application.routes.draw do
	get 'ajax_requests/headers_old'
	
	get 'ajax_requests/headers_new'
	
	root 'compare_csv#index'
	post 'compare/analyze', to: 'compare_csv#analyze'
	post 'ajax/headers_old', to: 'ajax_requests#headers_old'
	post 'ajax/headers_new', to: 'ajax_requests#headers_new'
	# post '/ajax/generate-html-table', to: 'ajax_requests#send_data_for_html_table'
	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
