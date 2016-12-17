Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'small_groups#index'

  resources :teachers
  resources :klasses
  resources :groups
  resources :students
  resources :goals

  post 'auth/student' => 'auth#student'
  post 'auth/teacher' => 'auth#teacher'

  get '*path', to: 'small_groups#index'
end
