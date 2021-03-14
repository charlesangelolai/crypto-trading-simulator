class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: UserSerializer.new(@users, {include: [:trades]})
  end

  # GET /users/1
  def show
    # render json: @user, except: [:created_at, :updated_at], include: [:trades]
    render json: UserSerializer.new(@user, {include: [:trades]})
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user, except: [:created_at, :updated_at], include: [:trades]
      # render json: UserSerializer.new(@user, {include: [:trades]}), location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user, except: [:created_at, :updated_at], include: [:trades]
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :buying_power, :wallet_value)
    end
end
