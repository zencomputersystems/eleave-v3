import { Injectable } from '@angular/core';
import { APIService } from 'src/services/shared-service/api.service';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

/**
 * ALl API for dashboard page
 * @export
 * @class DashboardApiService
 */
@Injectable({
    providedIn: 'root'
})
export class DashboardApiService {

    /**
     *Creates an instance of DashboardApiService.
     * @param {APIService} apiService
     * @param {Http} http
     * @memberof DashboardApiService
     */
    constructor(private apiService: APIService, public http: Http) {
    }

    /**
     * To get employee onleave status
     * Number of total employee
     * Number of employee onleave
     * @param {*} param
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_status_onleave(param): Observable<any> {
        this.apiService.headerAuthorization();
        return this.http.get(this.apiService.baseUrl + '/api/employee/status-onleave', { params: param, headers: this.apiService.headers })
            .pipe(map((res: Response) => res.json()))
    }

    /**
     * To get employee onleave details
     * Name of employee 
     * Designation of employee
     * @param {*} value
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_onleave_list(value): Observable<any> {
        this.apiService.headerAuthorization();
        return this.http.get(this.apiService.baseUrl + '/api/employee/leave-list', { params: value, headers: this.apiService.headers })
            .pipe(map((response: Response) => response.json()))
    }

    /**
     * To get notification message, category
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_news_notification(): Observable<any> {
        return this.apiService.getApi('/api/admin/notification');
    }

    /**
     * get all announcement created from admin
     * @returns
     * @memberof DashboardApiService
     */
    get_announcement_list() {
        return this.apiService.getApi('/api/admin/announcement');
    }

    /**
     * get upcoming holidays from today date
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_upcoming_holidays(): Observable<any> {
        return this.apiService.getApi('/api/employee/upcoming-holiday');
    }

    /**
     * get details of birthday
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_birthday_details(): Observable<any> {
        return this.apiService.getApi('/api/employee/date-of-birth');
    }

    /**
     * get long leave (>5 days) details
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_long_leave_reminder(): Observable<any> {
        return this.apiService.getApi('/api/employee/long-leave');
    }

    /**
     * get annual leave balance
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_annual_leave(): Observable<any> {
        return this.apiService.getApi('/api/employee/dashboard-annual-leave');
    }

    /**
     * get medical leave balance
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_medical_leave(): Observable<any> {
        return this.apiService.getApi('/api/employee/dashboard-medical-leave');
    }

    /**
     * get replacement leave balance
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_replacement_leave(): Observable<any> {
        return this.apiService.getApi('/api/employee/dashboard-replacement-leave');
    }

    /**
     * get dashboard task to be done
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_task_list(): Observable<any> {
        return this.apiService.getApi('/api/employee/dashboard-my-task');
    }

    /**
     * superior approve task leave from dashboard
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    post_approve_list(leaveTransactionGUID): Observable<any> {
        return this.apiService.postApi(leaveTransactionGUID, '/api/leave/approved');
    }

    /**
     * superior reject task leave from dashboard
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    post_reject_list(GUID): Observable<any> {
        return this.apiService.postApi(GUID, '/api/leave/rejected');
    }


}