# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

101.times do |i|
    User.create({username: "user-#{i}", password: '123456', email: "user-#{i}@mailinator.com"})
end

User.first.items.create([
    {title: 'item 1', description: 'description 1'},
])