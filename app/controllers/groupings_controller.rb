class GroupingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @groupings = Grouping.all
  end

  def show
  end

  def new
    @grouping = Grouping.new
  end

  def edit
  end

  def create
    teacher = Teacher.find(grouping_params[:teacher_id])
    klass = teacher.klasses[0]
    @grouping = Grouping.new(title: grouping_params[:title])
    klass.groupings << @grouping

    respond_to do |format|
      if @grouping.save
        format.json { render :show, status: :created }
      else
        format.json { render json: @grouping.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @grouping.update(grouping_params)
        format.json { render :show, status: :ok }
      else
        format.json { render json: @grouping.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    students = Student.where(grouping_id: grouping.id)

    grouping.groups.each do |group|
      group.students.delete(students)
    end
    grouping.groups.delete(groups)

    grouping.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def grouping
      @grouping ||= Grouping.find(params[:id])
    end

    def grouping_params
      params.require(:grouping).permit(:title, :teacher_id)
    end
end
