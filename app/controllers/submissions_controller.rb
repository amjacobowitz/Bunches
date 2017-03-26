class SubmissionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @submission = Submission.new(submission_params)
    @submission.answer = params[:answer]
    respond_to do |format|
      if @submission.save
        year = Time.now.year
        month = Time.now.month
        day = Time.now.day
        currentDate = Date.new(year, month, day)

        day = Day.find_by(date: currentDate)
        day.submissions << @submission

        format.json { render :show, status: :ok }
      else
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if params[:answer]
      submission.update(answer: params[:answer])
    end
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
    @submission = Submission.find(params[:id])
  end

  def assignment
    @assignment ||= Assignment.find_by(submission_params[:assignment_id])
  end

  def student
    @student ||= Student.find_by(submission_params[:student_id])
  end

  def submission_params
    params.require(:submission).permit(:completed, :submitted, :review, :rating, :score, :student_id, :assignment_id)
  end
end
