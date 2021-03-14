class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.decimal :buying_power, precision: 8, scale: 2, default: 100000.00
      t.decimal :wallet_value, precision: 8, scale: 2,default: 0.00

      t.timestamps
    end
  end
end
