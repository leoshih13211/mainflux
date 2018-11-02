//
// Copyright (c) 2018
// Mainflux
//
// SPDX-License-Identifier: Apache-2.0
//

package users

// User represents a Mainflux user account. Each user is identified given its
// email and password.
type User struct {
	UserId       string
	HashId       string
	Email        string
	ClientId     string
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

// Validate returns an error if user representation is invalid.
func (u *User) Validate() error {
	if u.AccessToken == "" || u.RefreshToken == "" {
		return ErrMalformedEntity
	}

	return nil
}

// UserRepository specifies an account persistence API.
type UserRepository interface {
	// Save persists the user account. A non-nil error is returned to indicate
	// operation failure.
	Save(User) error

	// RetrieveByID retrieves user by its unique identifier (i.e. email).
	RetrieveByID(string) (User, error)
}
