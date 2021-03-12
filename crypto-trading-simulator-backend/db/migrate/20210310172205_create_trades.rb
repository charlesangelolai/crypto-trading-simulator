class CreateTrades < ActiveRecord::Migration[6.1]
  def change
    create_table :trades do |t|
      t.integer :qty
      t.decimal :cost
      t.decimal :value
      t.decimal :profit
      t.integer :user_id
      t.integer :coin_id

      t.timestamps
    end
  end
end
