exports.up = function(knex) {
   return knex.schema.createTable('propietario', function (table) {
           table.string('id').primary();
           table.string('Nome_Completo').notNullable();
           table.string('email').notNullable();
           table.string('whatsapp').notNullable();
           table.string('senha').notNullable();
      });
};

exports.down = function(knex) {
   return knex.schema.dropTable('propietario');
};
