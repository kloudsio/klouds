export default function (app) {
	app.set('config', {
		stripe_pk: process.env.STRIPE_PK
	});
}