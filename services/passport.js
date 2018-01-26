const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
}); //Uses the userID assigned by mongoDB

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	})
}); //Uses the userID assigned by mongoDB


passport.use(
	new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	proxy: true
	}, 
	async (accessToken, refreshToken, profile, done) => {
		const existingUser = await User.findOne({ googleId: profile.id })
		
		if (existingUser) {
			//we already have a record with the given profile ID
			return done(null, existingUser);
		} 
			//we dont have a user record with this ID, make a new record
			const user = await new User({ googleId: profile.id }).save()
			done(null, user);
	
		// console.log('access token', accessToken)
		// console.log('refresh token', refreshToken)
		// console.log('profile', profile)
	}
)
);
