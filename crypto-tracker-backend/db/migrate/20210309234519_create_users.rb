class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.decimal :buying_power, default: 100000
      t.decimal :portfolio_value, default: 0

      t.timestamps
    end
  end
end
