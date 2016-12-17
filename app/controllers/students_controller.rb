class StudentsController < ApplicationController
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
    student = Student.new(student_params)

    respond_to do |format|
      if student.save
        format.json { render :show, status: :created }
      else
        format.json { render json: student.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if student.update(student_params)
        format.json { render :show, status: :ok }
      else
        format.json { render json: student.errors, status: :unprocessable_entity }
      end
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
      params.require(:student).permit(:name)
    end
end
