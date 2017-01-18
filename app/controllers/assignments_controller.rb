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

    respond_to do |format|
      if @assignment.save
        format.json { render :show, status: :created }
      else
        format.json { render json: assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    assignments = Assignment.where(student_id: params[:student_id])
    respond_to do |format|
      if assignments[0].update(assignment_params)
        format.json { render json: {}, status: :ok }
      else
        format.json { render json: assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    assignment.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def assignment
      @assignment || @assignment = Assignment.find(params[:id])
    end

    def assignment_params
      params.require(:assignment).permit(:directions, :title, :completed, :submitted,  :student_id, :teacher_id)
    end
end
