class TeachersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @teachers = Teacher.all
  end

  def show
    if teacher
      render locals: { teacher: teacher }, status: 200
    else
      render json: { error: 'Couldn\'t find teacher.  Try again.'}
    end
  end

  def new
    @teacher = Teacher.new
  end

  def edit
  end

  def create
    @teacher = Teacher.new(teacher_params)

    respond_to do |format|
      if @teacher.save
        format.json { render :show, status: :created, location: @teacher }
      else
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @teacher.update(teacher_params)
        format.json { render :show, status: :ok, location: @teacher }
      else
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @teacher.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def teacher
      @teacher = Teacher.find(params[:id])
    end

    def teacher_params
      params.require(:teacher).permit(:id, :email)
    end
end
