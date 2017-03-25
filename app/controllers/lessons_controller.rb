class LessonsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @lesson = Lesson.new(lesson_params)
    @lesson.groupings << grouping

    params[:lesson][:assignment_ids].each do |assignment_id|
      @lesson.assignments << Assignment.find(assignment_id)
    end
    respond_to do |format|
      if @lesson.save
        teacher.lessons << @lesson
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

    if params[:lesson][:assignment_ids]
      lesson.assignments.each do |assignment|
        assignment.lessons.delete(lesson)
      end
      params[:lesson][:assignment_ids].each do |assignment_id|
        assignment = Assignment.find(assignment_id)
        lesson.assignments << assignment
        day.assignments << assignment
      end
    end

    if lesson_params[:title]
      lesson.update(title: lesson_params[:title])
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
    if lesson.assignments.any?
      lesson.assignments.each do |assignment|
        assignment.lessons.delete(lesson)
      end
    end

=begin
    days = Day.where(lesson_id: lesson.id)
    days.each do |day|
      day.lessons.delete(lesson)
    end
=end

    if lesson.groupings.any?
      lesson.groupings.each do |grouping|
        grouping.lessons.delete(lesson)
      end
    end

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

  def grouping
    @grouping ||= Grouping.find(params[:lesson][:grouping_id])
  end

  def teacher
    @teacher ||= Teacher.find(params[:lesson][:teacher_id])
  end

  def assignment
    @assignment ||= Assignment.find(params[:assignment_id])
  end

  def lesson_params
    params.require(:lesson).permit(:date, :assignment_id, :title)
  end
end
