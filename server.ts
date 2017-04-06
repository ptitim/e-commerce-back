import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { RouterProduit } from './routeur/RouterProduit';
import { RouterCategorie } from './routeur/RouteurCategorie';

export class ServeurExpress {
    private express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routeur();
    }
    /**
     * instancie les middleware ici bodyParser
     */
    private middleware(): void {
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    /**
     * inscrit les different routeur sur express
     */
    private routeur(): void {
        this.express.options('/api/*', function (request, response, next) {
            response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            response.send();
        });

        this.express.use('/produit', new RouterProduit().router);
        this.express.use('/categorie', new RouterCategorie().router);
    }
    /**
     * Lance l'ecoute sur le port donnée
     * @param port Port d'écoute du serveur
     */
    public run(port: number) {
        this.express.listen(port);
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Origin", "localhost:*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, application");
            res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST ');
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });
    }

}

