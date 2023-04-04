import asyncio
import websockets
import json


class DanmakuServer:
    def __init__(self):
        # TODO: define your variables needed in this class
        # raise NotImplementedError
        self.clients = []

    async def reply(self, websocket):
        # TODO: design your reply method
       
        print("New client connected.")
        response = "Welcome to my WebSocket server!"
        await websocket.send(json.dumps({'msg':response}))
        client = [websocket, False]
        self.clients.append(client)
        try:
            while True:
                # message = await websocket.recv()
                # if message=='admin':
                #     client[1] = True

                # print("Received message:", message)
                # if client[1]:
                    # response = "You said: " + message
                for c in self.clients:
                    await c[0].send(json.dumps({'msg':response}))
                
                await asyncio.sleep(10)
        except websockets.exceptions.ConnectionClosedOK:
            try:
                self.clients.remove(websocket)
            except:
                pass
            finally:
                print("Client disconnected.")


if __name__ == "__main__":
    server = DanmakuServer()
    asyncio.get_event_loop().run_until_complete(
        websockets.serve(server.reply, 'localhost', 5002))
    asyncio.get_event_loop().run_forever()
