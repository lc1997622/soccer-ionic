import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HomePage } from "../home/home";

@Injectable()
export class WebApi {

    private API_HOST = '/api';

    constructor(private http: Http) {

    }

    public getList(path: String, cityid: String) {
        return this.http.get('/api' + path + cityid).toPromise().then((res) => {
            let json = res.json();
            return json;
        }).catch((error) => {
            console.log(error);
        });
    }

    public handleResult(promise) {
        return promise.then((response) => {
            let jsonObject = response.json();
            return jsonObject;
        }).catch((error) => {
            console.log('error');
        });
    }

    public get1(cityid: string, movieid: string) {
        let promise = this.http.get('api2' + '/movie/detail.api?locationId=' + cityid + '&movieId=' + movieid).toPromise();
        return this.handleResult(promise);
    }
    
    public post(path: string, body: any) {
        let promise = this.http.post(path, body).toPromise();
        return this.handleResult(promise);
    }

} 