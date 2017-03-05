class LessonsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @lesson = Lesson.new(lesson_params)

    respond_to do |format|
      if @lesson.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: @lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if params[:lesson][:date]
      date = params[:lesson][:date]
      newDate = Date.new(date[:year], date[:month], date[:day])

      teacher = Teacher.find(params[:teacher_id])
      day = Day.find_or_create_by(date: newDate)
      teacher.days << day
      day.lessons << lesson
    end

    if params[:assignment_id]
      lesson.assignments << assignment
    end

    respond_to do |format|
      if lesson.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    assignments = Assignment.where(lesson_id: lesson.id)
    assignments.update(lesson_id: '')
=begin
    days = Day.where(lesson_id: lesson.id)
    days.each do |day|
      day.lessons.delete(lesson)
    end
=end
    groupings = Grouping.where(lesson_id: lesson.id)
    groupings.update(lesson_id: '')

    lesson.teacher.lessons.delete(lesson)

    lesson.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def lesson
    @lesson ||= Lesson.find(params[:id])
  end

  def assignment
    @assignment ||= Assignment.find(params[:assignment_id])
  end

  def lesson_params
    params.require(:lesson).permit(:date, :assignment_id)
  end
end
