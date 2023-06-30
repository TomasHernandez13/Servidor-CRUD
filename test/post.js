import chai from "chai";
import chaiHttp from "chai-http"
import { server } from "../index.js"

chai.use(chaiHttp)

describe("Probando respuesta del servidor para el metodo POST /anime", () => {
    it("Comprueba que el metodo POST responda con un codigo 200", (done) => {

        chai
        .request(server)
        .post("/anime")
        .send({
            "nombre": "(test) Violet Evergarden",
            "genero": "drama",
            "año": "2018",
            "autor": "Reiko Yoshida"
        })
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200)
            done()
        })

    })
})