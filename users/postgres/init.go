//
// Copyright (c) 2018
// Mainflux
//
// SPDX-License-Identifier: Apache-2.0
//

package postgres

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq" // required for SQL access
	migrate "github.com/rubenv/sql-migrate"
)

// Connect creates a connection to the PostgreSQL instance and applies any
// unapplied database migrations. A non-nil error is returned to indicate
// failure.
func Connect(host, port, name, user, pass string) (*sql.DB, error) {
	t := "host=%s port=%s user=%s dbname=%s password=%s sslmode=disable"
	url := fmt.Sprintf(t, host, port, user, name, pass)

	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}

	if err := migrateDB(db); err != nil {
		return nil, err
	}
	return db, nil
}

func migrateDB(db *sql.DB) error {
	migrations := &migrate.MemoryMigrationSource{
		Migrations: []*migrate.Migration{
			{
				Id: "users_1",
				Up: []string{
					`CREATE TABLE IF NOT EXISTS users (
						userId	     VARCHAR(30) PRIMARY KEY,
						email	     VARCHAR(254) NOT NULL,
						hadId	     VARCHAR(100) NOT NULL,
						clientId	 CHAR(30)     NOT NULL,
						accessToken  CHAR(60)	  NOT NULL,
						refreshToken CHAR(60)	  NOT NULL
					)`,
				},
				Down: []string{"DROP TABLE users"},
			},
		},
	}

	_, err := migrate.Exec(db, "postgres", migrations, migrate.Up)
	return err
}
