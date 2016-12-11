Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'small_groups#index'

  resources :teachers do
    resources :klasses do
      resources :groups do
        resources :students
      end
      resources :students do
        resources :goals
      end
    end
  end

  get '*path', to: 'small_groups#index'
end
