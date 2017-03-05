class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def teacher
    teacher = Teacher.find_by(email: teacher_params[:email])

    if teacher
      render locals: { teacher: teacher }, status: :ok
    else
      render json: { error: 'Couldn\'t find teacher.  Try again.'}, status: :unprocessable_entity
    end
  end

  def student
    klass = Klass.find_by(pin: student_params[:pin])
    students = klass.students
    student = students.find do |student|
      student.name == student_params[:name]
    end

    if student
      render locals: { student: student }, status: :ok
    else
      render json: { error: 'Couldn\'t find student.  Try again.' }, status: :unprocessable_entity
    end
  end

  private

  def teacher_params
    params.require(:teacher).permit(:email, :password)
  end

  def student_params
    params.require(:student).permit(:name, :pin)
  end
end
