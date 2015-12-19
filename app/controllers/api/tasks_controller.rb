class Api::TasksController < Api::BaseController

  def index
    render json: current_user.tasks.where(:completed => false) 
  end

  def create
    task = Task.create!(task_params)
    render json: task, status: 201
  end

  def update
    task.update_attributes(task_params)
    render nothing: true, status: 204
  end

  def destroy
    task.destroy
    render nothing: true, status: 204
  end

  private
  def task
    @task ||= Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :completed, :due_date, :user_id)
  end
end
