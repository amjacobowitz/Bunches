Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'small_groups#index'

  resources :teachers
  resources :klasses
  resources :groups
  put 'groups/:id/remove_student' => 'groups#remove_student'
  resources :assignments
  resources :students
  get 'students/:id/assignment' => 'students#assignment'
  post 'students/live'
  resources :goals
  resources :groupings
  resources :lessons
  resources :days
  resources :submissions

  post 'auth/student' => 'auth#student'
  post 'auth/teacher' => 'auth#teacher'

  get '*path', to: 'small_groups#index'
end
