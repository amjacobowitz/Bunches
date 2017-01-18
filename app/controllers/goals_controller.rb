class GoalsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @goals = Goal.all
  end

  def show
  end

  def new
    @goal = Goal.new
  end

  def edit
  end

  def create
    group = Group.find(goal_params[:group_id])
    @goal = Goal.new(description: goal_params[:description])
    students = group.students

    if students
      students.each do |student|
        student.goals = []
        student.save
        student.goals << @goal
      end
    end

    respond_to do |format|
      if @goal.save
        format.json { render :show, status: :created }
      else
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @goal = goal.update(goal_params)
    respond_to do |format|
      if @goal.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    goal.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def goal
      @goal = Goal.find(params[:id])
    end

    def goal_params
      params.require(:goal).permit(:description, :group_id, :goal_type_id)
    end
end
