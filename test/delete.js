import chai from "chai";
import chaiHttp from "chai-http"
import { server } from "../index.js"

chai.use(chaiHttp)

describe("Probando respuesta del servidor para el metodo DELETE /anime", () => {
    it("Comprueba que el metodo DELETE responda con un codigo 200", (done) => {

        chai.request(server)
        .delete("/anime?id=7")
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200)
            done()
        })

    })
})