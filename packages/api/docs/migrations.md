## Migrations with Prisma

First, create a migrations directory and add a directory inside with your preferred name for the migration. In this
example, we will use 0_init as the migration name:

```shell
$ mkdir -p prisma/migrations  
```

Next, generate the migration file with prisma migrate diff. Use the following arguments:

- `--from-empty`: assumes the data model you're migrating from is empty
- `--to-schema-datamodel`: the current database state using the URL in the datasource block
- `--script`: output a SQL script

```shell
$ npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script >
  prisma/migrations/0_init/migration.sql
```

Review the SQL migration file to ensure everything is correct.

Next, mark the migration as applied using `prisma migrate resolve` with the `--applied` argument.

```shell
npx prisma migrate resolve --applied 0_init
```

The command will mark `0_init` as applied by adding it to the `_prisma_migrations` table.
