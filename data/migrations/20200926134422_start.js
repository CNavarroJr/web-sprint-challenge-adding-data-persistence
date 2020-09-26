
exports.up = function (knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments('id')
    tbl.text('name')
      .notNullable()
      .unique()
    tbl.text('description')
    tbl.boolean('completed')
      .defaultTo(false)
  })
    .createTable('resources', tbl => {
      tbl.increments('id')
      tbl.text('name')
        .notNullable()
      tbl.text('description')
    })
    .createTable('tasks', tbl => {
      tbl.increments('id')
      tbl.text('description')
        .notNullable()
      tbl.text('notes')
      tbl.boolean('completed')
        .defaultTo(false)
      tbl.integer('projectId')
        .notNullable()
        .unsigned()
        .references('projects.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .createTable('projects_resources', tbl => {
      tbl.integer('projectId')
        .notNullable()
        .unsigned()
        .references('projects.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('resourceId')
        .notNullable()
        .unsigned()
        .references('resources.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function (knex) {
  return knex.schema.dropTable('projects_resources')
    .dropTable('tasks')
    .dropTable('resources')
    .dropTable('projects')
};
