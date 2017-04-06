import { Produit } from '../Entity/Produit';
import { Router, Request, Response } from 'express';
import { IProduit } from '../Entity/IProduit';
import { IDaoProduit } from '../dao/IDaoProduit';
import { DaoProduit } from '../dao/DaoProduit';
import { DaoCategorie } from '../dao/DaoCategorie';
import { IDaoCategorie } from '../dao/IDaoCategorie';
import { Categorie } from '../Entity/Categorie';
import { ICategorie } from '../Entity/ICategorie';
import { RouterCategorie } from './RouteurCategorie';

export class RouterProduit{
    router: Router;
    private static dao : IDaoProduit = new DaoProduit();
    private static daoCat : IDaoCategorie = new DaoCategorie();
    constructor(){
        this.router = Router();
        this.routeInit();
    }


    //Definition des routes

    private getAllProduit(request : Request, response : Response ){
           RouterProduit.dao.getAllProduits().then((produits) => response.json(produits))
    }

    private getProduitById(request : Request, response : Response ){
        let id = request.params.index;
        RouterProduit.dao.getProduitById(id).then((produit) => response.json(produit))
     }

    private getProduitsByCategorie(request : Request, response : Response  )
    { 
        let cat = request.params.categorie;
        RouterProduit.dao.getProduitsByCategorie(cat).then((produits) => response.json(produits));
    }

    private addProduit(request : Request, response : Response )
    {
        let produit = new Produit();
        produit.libelle = request.body.libelle;
        produit.description = request.body.description;
        produit.categorie = request.body.cateorie;
        produit.prix = parseFloat(request.body.prix);
        produit.stock = request.body.stock != null ? parseInt(request.body.stock) : 0;
        RouterProduit.dao.addProduit(produit).then((rep) => response.send());
    }

    private removeProduit(request : Request, response : Response )
    { 
        let produit = new Produit();
        produit.id = request.body.index;
        RouterProduit.dao.removeProduit(produit).then((rep) => response.send()) ;
    }

    private updateProduit(request : Request, response : Response )
    { 
        let produit = new Produit();
        produit.id = request.body.index;
        produit.categorie = request.body.categorie != null && request.body.categorie != "" ? request.body.categorie : produit.categorie;
        produit.description = request.body.description != null && request.body.description != "" ? request.body.description : produit.description;
        produit.libelle = request.body.libelle != null && request.body.libelle != "" ? request.body.libelle : produit.libelle;
        produit.prix = request.body.prix != null && request.body.prix != "" ? request.body.prix : produit.prix;
        produit.stock = request.body.stock != null && request.body.stock != "" ? parseInt(request.body.stock) : produit.stock;
        RouterProduit.dao.updateProduit(produit).then((rep) => response.send());
    }
    /**
     * Initialise les routes
     */
    private routeInit(){
        this.router.get('/', this.getAllProduit);
        this.router.get('/:index', this.getProduitById);
        this.router.get('/:categorie', this.getProduitsByCategorie);
        this.router.post('/add', this.addProduit);
        this.router.post('/remove', this.removeProduit);
        this.router.post('/update', this.updateProduit);

    }


}