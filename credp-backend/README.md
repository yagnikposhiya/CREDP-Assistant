# credp backend system

-   First create "credp" database in local

### NOTE

-   if you face error like "disable only_full_group_by in MySQL or Sequelize" then follow this link [Full Group Error](https://stackoverflow.com/questions/35882816/how-to-disable-only-full-group-by-in-mysql-or-sequelize) or set `SET GLOBAL sql_mode = '';` in your database.

**create models and migration file using cmd**

```
npx sequelize-cli model:generate --name <table_name> --attributes <column>:<Type>,id:Integer,name:string,value:Double,
```

**Create new migration to modify any existing migration**

```
npx sequelize-cli migration:create --name modify_users_add_new_fields
```

**Undo the specific migration**

```
npx sequelize db:migrate:undo --name 20220607122728-add_address_type_column_in_address_history_table.js
```

**for migration**

-   to create tables in database

```
npm run migration
```

**seed data in database**

-   to seed data in database

```
npm run seed
```

Run server with nodemon

```
npm run dev
```

Generate new seeder

```
npx sequelize-cli seed:generate --name <name>
```

Run Specific seeder

```
npx sequelize-cli db:seed --seed <name>
```

shortcut for run specific seeder

```
npm run seed:file <name>
```
