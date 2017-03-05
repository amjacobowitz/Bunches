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
    @goal = Goal.new(description: goal_params[:description])
    respond_to do |format|
      if @goal.save
         teacher = Teacher.find(goal_params[:teacher_id])
         teacher.goals << @goal

         goal_params[:student_ids].each do |student_id|
           student = Student.find(student_id)
           @goal.students << student
         end

        group = Group.find(goal_params[:group_id])
        @goal.groups << group

        format.json { render :show, status: :created }
      else
        format.json { render json: goal.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    params[:student_ids].each do |student_id|
      student = Student.find(student_id)
      goal.students << student
    end

    if goal_params[:description]
      goal.update(description: goal_params[:description])
    end

    respond_to do |format|
      if goal.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: goal.errors, status: :unprocessable_entity }
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
      @goal ||= Goal.find(params[:id])
    end

    def goal_params
      params.permit(:description, :group_id, :goal_type_id, :teacher_id, student_ids: params[:student_ids])
    end
end
