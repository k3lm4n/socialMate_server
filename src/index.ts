import { server } from "./server";
import "./server/websocket";

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
