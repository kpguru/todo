class Api::UsersController < Api::BaseController

  def index
    render json: User.non_admins
  end
  
  def show
    render json: user
  end
  
  def approved
    render json: User.approved
  end

  def pendings
    render json: User.pending
  end  

  def update
    user = User.find(params[:id])
    user.update_attributes!(user_params)
    render json: user
  end
  
  def tasks
    render json: user.tasks
  end

  private
  def user
    @user ||= User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:approved)
  end
end
