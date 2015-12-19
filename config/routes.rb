Todo::Application.routes.draw do
  devise_for :users  

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :update, :show] do
      member do
        get 'tasks'
      end
      collection do 
        get 'approved'
        get 'pendings'
      end
    end
    devise_scope :user do
      resource :session, only: [:create, :destroy]
    end
    resources :tasks, only: [:index, :create, :update, :destroy]
  end

  root :to => "home#index"

  get '/dashboard' => 'templates#index'
  get '/task_lists/:id' => 'templates#index'
  get '/templates/:path.html' => 'templates#template', :constraints => { :path => /.+/  }
end
