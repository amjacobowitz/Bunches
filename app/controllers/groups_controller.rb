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
    respond_to do |format|
      if @group.update(group_params)
        format.json { render :show, status: :ok, location: @group }
      else
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    students = Student.where(group_id: group.id)
    group.students.delete(students)

    group.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def group
      @group ||= Group.find(params[:id])
    end

    def group_params
      params.require(:group).permit(:name, :grouping_id)
    end
end
