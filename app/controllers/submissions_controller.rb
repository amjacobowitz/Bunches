class SubmissionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @submission = Submission.new(submission_params)
    @submission.answer = params[:answer]
    respond_to do |format|
      if @submission.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if submission.update(submission_params)
        format.json { render :show, status: :ok }
      else
        format.json { render json: submission.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def submission
    @submission = Submission.find_by(params[:id])
  end

  def assignment
    @assignment ||= Assignment.find_by(submission_params[:assignment_id])
  end

  def stuent
    @student ||= Student.find_by(submission_params[:student_id])
  end

  def submission_params
    params.require(:submission).permit(:completed, :submitted, :review, :score, :student_id, :assignment_id)
  end
end
