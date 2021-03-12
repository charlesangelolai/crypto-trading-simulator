class CreateCoins < ActiveRecord::Migration[6.1]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :sym
      t.string :logo
      t.decimal :price
      t.decimal :hourly_percentage_change
      t.decimal :high
      t.decimal :low

      t.timestamps
    end
  end
end
