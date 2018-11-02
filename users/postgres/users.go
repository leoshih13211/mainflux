//
// Copyright (c) 2018
// Mainflux
//
// SPDX-License-Identifier: Apache-2.0
//

package postgres

import (
	"database/sql"

	"github.com/lib/pq"
	"github.com/mainflux/mainflux/users"
)

var _ users.UserRepository = (*userRepository)(nil)

const errDuplicate = "unique_violation"

type userRepository struct {
	db *sql.DB
}

// New instantiates a PostgreSQL implementation of user
// repository.
func New(db *sql.DB) users.UserRepository {
	return &userRepository{db}
}

func (ur userRepository) Save(user users.User) error {
	q := `INSERT INTO users (userId, email, hadId, clientId, accessToken, refreshToken)
			VALUES ($1, $2, $3, $4, $5, $6)
			ON CONFLICT (userid) do update
  			set accesstoken = $5, refreshtoken = $6`

	if _, err := ur.db.Exec(q, user.UserId, user.Email, user.HashId, user.ClientId, user.AccessToken, user.RefreshToken); err != nil {
		if pqErr, ok := err.(*pq.Error); ok && errDuplicate == pqErr.Code.Name() {
			return users.ErrConflict
		}
		return err
	}

	return nil
}

func (ur userRepository) RetrieveByID(email string) (users.User, error) {
	q := `SELECT hashId FROM users WHERE email = $1`

	user := users.User{}
	if err := ur.db.QueryRow(q, email).Scan(&user.UserId); err != nil {
		if err == sql.ErrNoRows {
			return user, users.ErrNotFound
		}
		return user, err
	}

	user.Email = email

	return user, nil
}
