class AssignmentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @assignments = Assignment.where(student_id: params[:student_id])
    respond_to do |format|
      if @assignments
        format.json { render locals: { assignment: @assignments[0] }, status: :ok }
      else
        format.json { render json: 'Assignment not found' , status: :unprocessable_entity  }
      end
    end
  end

  def show
  end

  def create
    @assignment = Assignment.new(assignment_params)
    teacher.assignments << @assignment

    respond_to do |format|
      if @assignment.save
        format.json { render :show, status: :created }
      else
        format.json { render json: assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    assignment.update(assignment_params)

    respond_to do |format|
      if @assignment.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    groups = Group.where(assignment_id: assignment.id)

    if groups
      groups.update(assignment_id: '')
    end

    assignment.teacher.assignments.delete(assignment)

    if (assignment.lesson)
      assignment.lesson.assignments.delete(assignment)
    end

    assignment.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def teacher
      @teacher ||= Teacher.find(params[:teacher_id])
    end

    def assignment
      @assignment ||= Assignment.find(params[:id])
    end

    def assignment_params
      params.require(:assignment).permit(:directions, :title, :completed, :submitted)
    end
end
