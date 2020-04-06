
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        // primary key incremental
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // relacionamento com a tabela ong
        table.string('ong_id').notNullable();

        // chave estrangeira - vinculo com o id da tabela ong
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};
