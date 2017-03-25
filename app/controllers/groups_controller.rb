class GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @groups = Group.all
  end

  def show
  end

  def new
    @group = Group.new
  end

  def edit
  end

  def create
    grouping = Grouping.find(group_params[:grouping_id])
    @group = Group.create
    grouping.groups << @group

    respond_to do |format|
      if grouping.save
        format.json { render :show, status: :created }
      else
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
   if params[:group][:student_id]
     group.students << student
   end

   respond_to do |format|
      if group.update(group_params)
        format.json { render :show, status: :ok }
      else
        format.json { render json: group.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    group.students.delete(group.students)

    group.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def remove_student
    group.students.delete(student)

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def group
      @group ||= Group.find(params[:id])
    end

    def student
      @student ||= Student.find(params[:group][:student_id])
    end

    def assignment
      @assignment ||= Assignment.find(group_params[:assignment_id])
    end

    def group_params
      params.require(:group).permit(:name, :assignment_id, :grouping_id)
    end
end
