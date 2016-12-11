class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def teacher
  end

  def student
    klass = Klass.find_by(pin: student_params[:pin])
    students = klass.students
    student = students.find do |student|
      student.name == student_params[:name]
    end

    if student
      render locals: { student: student }, status: 200
    else
      render json: { error: 'Couldn\'t find student.  Try again.' }
    end
  end

  private

  def teacher_params
  end

  def student_params
    params.require(:student).permit(:name, :pin)
  end
end
