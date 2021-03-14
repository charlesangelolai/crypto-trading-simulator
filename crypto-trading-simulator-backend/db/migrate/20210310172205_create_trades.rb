class CreateTrades < ActiveRecord::Migration[6.1]
  def change
    create_table :trades do |t|
      t.string :coin_id
      t.string :logo
      t.string :sym
      t.integer :qty
      t.decimal :cost, precision: 8, scale: 2
      t.integer :user_id

      t.timestamps
    end
  end
end
