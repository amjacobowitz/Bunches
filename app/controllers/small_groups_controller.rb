class SmallGroupsController < ApplicationController
  def index
    render locals: { name: 'Aaron' }
  end
end
