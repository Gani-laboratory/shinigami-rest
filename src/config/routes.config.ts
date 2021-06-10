import { Application } from "express";
export abstract class RoutesConfig {
    app: Application;
    name: string;

    constructor(app: Application, name: string) {
    	this.app = app;
    	this.name = name;
    	this.handler();
    }
    getName(): string {
    	return this.name;
    }
    abstract handler(): Application;
}