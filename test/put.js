import chai from "chai";
import chaiHttp from "chai-http"
import { server } from "../index.js"

chai.use(chaiHttp)

describe("Probando respuesta del servidor para el metodo PUT /anime", () => {
    it("Comprueba que el metodo PUT responda con un codigo 200", (done) => {

        chai
        .request(server)
        .put("/anime?=7")
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