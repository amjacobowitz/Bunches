class StudentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @students = Student.all
  end

  def show
    respond_to do |format|
      if student
        format.json { render locals: { student: student }, status: :ok }
      else
        format.json { render json: 'Student not found' , status: :unprocessable_entity  }
      end
    end
  end

  def create
    teacher = Teacher.find(student_params[:teacher_id])
    klass = teacher.klasses[0]
    @student = Student.create(first_name: student_params[:first_name], last_name: student_params[:last_name])
    klass.students << @student

    respond_to do |format|
      if klass.save
        format.json { render :show, status: :created }
      else
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    student.update(
      first_name: student_params[:first_name],
      last_name: student_params[:last_name],
      id: student_params[:id],
      group_id: student_params[:group_id]
    )

    if student_params[:goal_id]
      goal = Goal.find(student_params[:goal_id])
      student.goals << goal
    end

    respond_to do |format|
      if student.save
        format.json { render :show, status: :ok }
      else
        format.json { render json: student.errors, status: :unprocessable_entity } end
    end
  end

  def destroy
    student.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def student
      @student || @student = Student.find(params[:id])
    end

    def student_params
      params.require(:student).permit(:id, :last_name, :first_name, :group_id, :teacher_id, :goal_id)
    end
end
