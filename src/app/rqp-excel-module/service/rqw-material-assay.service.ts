import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RqwMaterialAssayService {
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient) { }

  public save(data: any): Observable<any> {
    return this.http.post(this.API_URL + 'xl/ras1', data);
  }

  public moduleRequestNo(lc0001: string, lc0002: string): Observable<any> {
    return this.http.get(
      this.API_URL +
      `xl/Common-module-request-no?lc0002=${lc0002}&lc0001=${lc0001}`
    );
  }

  public asList(lc0003: string): Observable<any> {
    return this.http.get(this.API_URL + `xl/get-xl-as1-list?lc0003=${lc0003}`);
  }

  public commonList(lc0003: string): Observable<any> {
    return this.http.get(
      this.API_URL + `xl/get-xl-common-list?lc0003=${lc0003}`
    );
  }
  onCommentsData(ff0001: any, lcnum: any, ff0005: number) {
    const queryParams = `?FF0001=${ff0001}&FF0002=${lcnum}&FF0005=${ff0005}`;
    const reviewURL =
      this.API_URL + 'gm/gmap-record/review-comments' + queryParams;
    return this.http.get(reviewURL);
  }
  getResquestNoIDForURS(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  documentList(lc0003: any, lc0002:string) {
    const queryParams = `?lc0003=${lc0003}&lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/document-list' + queryParams;
    return this.http.get(reviewURL);
  }
  attachmentList(lc0003: any, moduleCode: any) {
    const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
  getDocumetPreview(PdfType: string, uc0001: any, ff0001: any, ff0002: any) {
    const queryParams = `?PdfType=${PdfType}&uc0001=${uc0001}&ff0001=${ff0001}&ff0002=${ff0002}`;
    const reviewURL = this.API_URL + 'file/pdf-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
  getDocumet(PdfType: string, uc0001: any, lcrqNumber: any, lcnum: any) {
    const queryParams = `?PdfType=${PdfType}&uc0001=${uc0001}&ff0001=${lcrqNumber}&ff0002=${lcnum}`;
    const reviewURL = this.API_URL + 'file/pdf-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
  onApproval(body: any) {
    const lcApprovalURL = this.API_URL + 'gm/lc-approval/save-update';
    return this.http.post(lcApprovalURL, body);
  }
  onReject(body: any) {
    const lcRejectURL = this.API_URL + 'gm/lc-reject/save-update';
    return this.http.post(lcRejectURL, body);
  }

  downloadras1s(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/ras1s-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  //lcRequestNumber,lcNumber,templateName,qtNo,stage,userid,moduleCode
  downloadras1a(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    stage: number,
    userid: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/ras1a-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  downloadras1(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/ras1-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  downloadfas1s(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/fas1s-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  //lcRequestNumber,lcNumber,templateName,qtNo,stage,userid,moduleCode
  downloadfas1a(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    stage: number,
    userid: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/fas1a-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  downloadfas1(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/fas1-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  downloadmrsles(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/fas1s-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  //lcRequestNumber,lcNumber,templateName,qtNo,stage,userid,moduleCode
  downloadmrslea(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    stage: number,
    userid: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/fas1a-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }
  downloadmrsle(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string,
    lc0003: string
  ) {
    return this.http.post(
      this.API_URL +
      `xl/fas1-report?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}&lc0003=${lc0003}`,
      ''
    );
  }

}
