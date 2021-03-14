class UserSerializer
  include FastJsonapi::ObjectSerializer
  has_many :trades
  attributes :id, :username, :buying_power, :wallet_value
end
