export enum employeeStatus {
    "Probation",
    "Confirmed",
    "Terminated"
}

import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/services/shared-service/api.service';
import { ActivatedRoute } from '@angular/router';
import { PersonalDetailsService } from '../personal-details/personal-details.service';
import * as _moment from 'moment';
const moment = _moment;
/**
 * Employment Details Page
 * @export
 * @class EmploymentDetailsPage
 * @implements {OnInit}
 */
@Component({
    selector: 'app-employment-details',
    templateUrl: './employment-details.page.html',
    styleUrls: ['./employment-details.page.scss'],
})
export class EmploymentDetailsPage implements OnInit {

    /**
     * This local property is used to get employment details from API
     * @type {*}
     * @memberof EmploymentDetailsPage
     */
    public list: any;

    /**
     * This local property is used to get employment status from API
     * @type {string}
     * @memberof EmploymentDetailsPage
     */
    public status: string;

    /**
     * This local property is used to show progress header
     * @type {boolean}
     * @memberof EmploymentDetailsPage
     */
    public showHeader: boolean = true;

    /**
     * This local property is used to show profile completeness %
     * @type {number}
     * @memberof EmploymentDetailsPage
     */
    public progressPercentage: number;

    /**
     * This local property is used to get employment details from API
     * @type {string}
     * @memberof EmploymentDetailsPage
     */
    public userId: string;

    /**
     * This local property is used to show or hide loading spinner 
     * @type {boolean}
     * @memberof EmploymentDetailsPage
     */
    public showSpinner: boolean = true;

    /**
     * Local property to show or hide content during loading
     * @type {boolean}
     * @memberof EmploymentDetailsPage
     */
    public showContent: boolean = false;

    /**
     * return API content
     * @readonly
     * @memberof EmploymentDetailsPage
     */
    get personalList() {
        return this.list;
    }

    /**
     *Creates an instance of EmploymentDetailsPage.
     * @param {APIService} apiService
     * @param {ActivatedRoute} route
     * @memberof EmploymentDetailsPage
     */
    constructor(private apiService: APIService,
        private route: ActivatedRoute, private xservice: PersonalDetailsService) {
        route.params.subscribe(params => {
            this.userId = params.id;
        });
        xservice.percentChanged.subscribe(value => {
            this.progressPercentage = value;
        })
    }

    /**
     * Initial method
     * Get employment details content from API
     * @memberof EmploymentDetailsPage
     */
    ngOnInit() {
        this.apiService.get_employment_details(this.userId).subscribe(
            data => {
                this.list = data;
                this.list.employmentDetail.dateOfJoin = moment(this.list.employmentDetail.dateOfJoin).format('DD-MM-YYYY');
                this.list.employmentDetail.dateOfConfirmation = moment(this.list.employmentDetail.dateOfConfirmation).format('DD-MM-YYYY');
                this.list.employmentDetail.dateOfResign = moment(this.list.employmentDetail.dateOfResign).format('DD-MM-YYYY');
                this.status = employeeStatus[this.list.employmentDetail.employmentStatus];
                this.showSpinner = false;
                this.showContent = true;
            },
            error => {
                if (error) {
                    window.location.href = '/login';
                }
            }
        )
    }

    /**
     * This method is used to hide header of profile completeness
     * @memberof EmploymentDetailsPage
     */
    clickToHideHeader() {
        this.showHeader = false;
    }

}
