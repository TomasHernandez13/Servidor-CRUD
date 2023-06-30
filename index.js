import http from "http";
import { URLSearchParams } from "url";
import fs from 'fs/promises';

const server = http.createServer(async function(req, res) {
    const { searchParams, pathname } = new URL(req.url, `http://$(req.header.host)`)
    const params = new URLSearchParams(searchParams)
    console.log(pathname)

    if(pathname == "/anime" & req.method == "POST") {
        try {
            const readAnime = await readAnimeFile()
            const animeOriginal = JSON.parse(readAnime)
            const newId = Object.keys(animeOriginal).length + 1
            let datosAnime

            req.on("data", (data) => {
                datosAnime = JSON.parse(data)
            })
            req.on("end", async () => {
                animeOriginal[newId] = datosAnime
                await fs.writeFile("anime.json", JSON.stringify(animeOriginal, null, 2))
                res.write("Anime agregado")
                res.end()
            })
        } catch(error) {
            console.error(error);
            res.write("Ha ocurrido un error inesperado");
            res.end();
        }
    }

    if (pathname == "/anime" && req.method == "GET") {
        try {
            const readAnime = await readAnimeFile();
            const animeOriginal = JSON.parse(readAnime);
            const id = params.get("id");
            const name = params.get("name");
            let result;
            if (id) {
                result = animeOriginal[id];
            } else if (name) {
                result = Object.values(animeOriginal).find(anime => anime.nombre === name);
            } else {
                result = animeOriginal;
            }
            res.statusCode = 200;
            res.write(JSON.stringify(result, null, 2));
            res.end();
        } catch(error) {
            console.error(error);
            res.write("Ha ocurrido un error inesperado");
            res.end();
        }
    }

    if(pathname == "/anime" & req.method == "PUT") {
        try {
            const readAnime = await readAnimeFile();
            const animeOriginalFile = JSON.parse(readAnime)
            const id = params.get("id");
            let infoToModify
            req.on("data", (data) => {
                infoToModify = JSON.parse(data)
            })
            req.on("end", async () => {
                const animeOriginal = animeOriginalFile[id]
                const updatedAnime = {...animeOriginal, ...infoToModify}

                animeOriginalFile[id] = updatedAnime;

                await fs.writeFile("anime.json", JSON.stringify(animeOriginalFile, null, 2))

                res.statusCode = 200
                res.write("los datos se han modificado")
                res.end();
            })
        } catch {
            console.error(error);
            res.write("Ha ocurrido un error inesperado");
            res.end();
        }
    }

    if(pathname == "/anime" & req.method == "DELETE") {
        try {
            const readAnime = await readAnimeFile();
            const animeOriginalFile = JSON.parse(readAnime)
            const id = params.get("id")
            delete animeOriginalFile[id]

            await fs.writeFile("anime.json", JSON.stringify(animeOriginalFile, null, 2))

            res.statusCode = 200
            res.write("El anime seleccionado ha sido eliminado")
            res.end()
        } catch {
            console.error(error);
            res.write("Ha ocurrido un error inesperado");
            res.end();
        }
    }

})
server.listen(3000, function() {
    console.log("servidor iniciado en puerto 3000")
})
export { server }
console.log("bienvenido")

const readAnimeFile = async () => {
    const readAnime = await fs.readFile("anime.json")
    return readAnime
}