
// END-TO-END ENCRYPTION
// https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/

/**
Use socket-io for updating the front-end data-viz of CPU/Memory usage
*/
const io = require("socket.io")(httpServer, {
	cors: {
		origin: clientOrigins,
		methods: ["GET"]
	}
});
