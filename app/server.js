const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

const http = require('http');
const path = require('path');

const { AllRoutes } = require('./router/router');

module.exports = class Application {
    #app = express()
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }

    configApplication() {
        this.#app.use(cors())
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        this.#app.use(
            "/api-docs",
            swaggerUI.serve,
            swaggerUI.setup(
              swaggerJsDoc({
                swaggerDefinition: {
                  openapi: "3.0.0",
                  info: {
                    title: "cosmetics store",
                    version: "1.0.0",
                    description:
                      "فروشگاه لوازم آرایشی",
                    contact: {
                      name: "mehrdad samadi",
                      email: "samadimehrdad49@gmail.com",
                    },
                  },
                  servers: [
                    {
                      url: `http://localhost:${this.#PORT}`,
                    },
                  ],
                  components: {
                    securitySchemes: {
                      bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                      }
                    }
                  },
                  security: [{bearerAuth: []}]
                },
                apis: ["./app/router/**/*.js"],
              }),
              {explorer: true}
            )
        );
    }

    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run -> http://localhost:${this.#PORT}`);
        })
    }

    connectToMongoDB() {
        mongoose.connect(this.#DB_URI, (error) => {
            if(!error) return console.log("conncet to MongoDB");
            return console.log(error.message);
        })

        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to DB");
        })

        mongoose.connection.on("disconnected", () => {
            console.log("mongoose connection is disconnected");
        })

        process.on("SIGINT", async () => {
            await mongoose.connection.close()
            console.log("mongoose connection close");
            process.exit(0)
        })
    }

    createRoutes() {
        this.#app.use(AllRoutes)
    }

    errorHandling() {
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError()
            const status = error.status || serverError.status
            const message = error.message || serverError.message

            return res.status(status).json({
                errors: {
                    status,
                    success: false,
                    message
                }
            })
        })
    }
}