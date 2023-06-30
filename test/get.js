import chai from "chai";
import chaiHttp from "chai-http"
import { server } from "../index.js"

chai.use(chaiHttp)

describe("Probando respuesta del servidor para el metodo GET /anime", () => {
    it("Comprueba que el metodo GET responda con un codigo 200", (done) => {

        chai.request(server).get("/anime").end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200)
            done()
        })

    })
})