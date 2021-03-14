class TradesController < ApplicationController
  before_action :set_trade, only: [:show, :update, :destroy]

  # GET /trades
  def index
    @trades = Trade.all
    render json: TradeSerializer.new(@trades, {include: [:user]})
  end
  
  # GET /trades/1
  def show
    render json: TradeSerializer.new(@trade, {include: [:user]})
  end

  # POST /trades
  def create
    @trade = Trade.new(trade_params)

    if @trade.save
      # render json: @trade, status: :created, location: @trade, except: [:created_at, :updated_at], include: [:user]
      render json: TradeSerializer.new(@trade, {include: [:user]}), status: :created, location: @trade
    else
      render json: @trade.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trades/1
  def update
    if @trade.update(trade_params)
      render json: @trade, except: [:created_at, :updated_at], include: [:user]
    else
      render json: @trade.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trades/1
  def destroy
    @trade.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trade
      @trade = Trade.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def trade_params
      params.require(:trade).permit(:qty, :cost, :logo, :sym, :qty, :coin_id, :user_id)
    end
end
