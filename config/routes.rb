Rails.application.routes.draw do
  root 'compare_csv#index'
	post 'compare/analyze', to: 'compare_csv#analyze'
	post 'ajax/headers_old', to: 'compare_csv#headers_old'
	post 'ajax/headers_new', to: 'compare_csv#headers_new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
