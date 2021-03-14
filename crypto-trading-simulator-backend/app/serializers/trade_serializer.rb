class TradeSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :user
  attributes :id, :qty, :cost, :coin_id, :sym, :logo, :user_id
end
