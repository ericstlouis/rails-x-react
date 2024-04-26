class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /tasks or /tasks.json
  def index
    @tasks = Task.all

    render json: @tasks
  end

  # GET /tasks/1 or /tasks/1.json
  def show
    render json: @task
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)
      if @task.save
        render json: @task, status: :created, location: api_v1_task_url(@task)
      else
        render json: @task.errors, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
      if @task.update(task_params)
        render json: @task, status: :ok
      else
        render json: @task.errors, status: :unprocessable_entity
      end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :completed)
    end
end
