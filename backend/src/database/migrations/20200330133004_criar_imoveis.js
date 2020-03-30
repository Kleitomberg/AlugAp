
exports.up = function(knex) {
    return knex.schema.createTable('imoveis', function (table) {
        table.increments();
        
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();

        table.string('propietario_id').notNullable();

        table.foreign('propietario_id').references('id').inTable('propietario');
        
      
   });
};

exports.down = function(knex) {
    return knex.schema.dropTable('imoveis');
};
