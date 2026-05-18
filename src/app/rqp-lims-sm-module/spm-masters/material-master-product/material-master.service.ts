import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialMasterService {
  private API_URL = environment.apiBaseURL;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // getAllMaterial(size: any, index: any) {
  //   let queryParams = `?pageIndex=${index}&size=${size}&unitCode=${this.cookieService.get(
  //     'buCode'
  //   )}`;
  //   const ALLSALEPRODUCTURL =
  //     this.API_URL + 'pmm/pmm_master/get-all' + queryParams;
  //   return this.http.post(ALLSALEPRODUCTURL, '');
  // }
  // getUserProfileFilterData(body) {
  //   let fetchProfileListUrlAll = this.API_URL + 'pmm/pmm_master/search';
  //   return this.http.post(fetchProfileListUrlAll, body);
  // }
  // getActiveMaterial(size: any, index: any) {
  //   let queryParams = `?pageIndex=${index}&size=${size}&unitCode=${this.cookieService.get(
  //     'buCode'
  //   )}`;
  //   let fetchProfileListUrlAll =
  //     this.API_URL + 'pmm/pmm_master/get-max-all' + queryParams;
  //   return this.http.post(fetchProfileListUrlAll, '');
  // }
  // onLoadUpdatePage(UC0001: any) {
  //   let queryParams = `?UC0001=${UC0001}`;
  //   let fetchAllBusinessUnitInfoApiUrl =
  //     this.API_URL + 'pmm/pmm_master/get-by-max-code' + queryParams;
  //   return this.http.post(fetchAllBusinessUnitInfoApiUrl, '');
  // }
  
  onCreate(body: any) {
      console.log(body);
      let token = this.cookieService.get('token');
      let createUserURL = this.API_URL + 'pmm/pmm_master/save-update';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
      };
      return this.http.post(createUserURL, body, httpOptions);
    }
  onAllRoleAuditTrail(uc0001: any) {
    let queryParams = `?UC0001=${uc0001}`;
    let fetchAllBusinessUnitInfoApiUrl =
      this.API_URL + 'pmm/pmm_master/get-by-code-all' + queryParams;

    return this.http.get(fetchAllBusinessUnitInfoApiUrl);
  }
  getDropDownList(unitCode:any) {
    let queryParams = `?unitCode=${unitCode}`;
    let fetchAllBusinessUnitInfoApiUrl = this.API_URL + 'pmm/input'+ queryParams ;
    return this.http.get(fetchAllBusinessUnitInfoApiUrl);
  }
}
