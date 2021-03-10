class CreateCoins < ActiveRecord::Migration[6.1]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :sym
      t.string :logo
      t.decimal :bought_at
      t.decimal :current_price
      t.integer :user_id

      t.timestamps
    end
  end
end
