class DaysController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    day.lessons.delete(lesson)

    respond_to do |format|
      if day.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: day.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def day
    @day ||= Day.find(params[:id])
  end

  def lesson
    @lesson ||= Lesson.find(day_params[:lesson_id])
  end

  def day_params
    params.require(:day).permit(:lesson_id)
  end
end
