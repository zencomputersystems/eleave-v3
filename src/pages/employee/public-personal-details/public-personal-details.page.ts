import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/services/shared-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _moment from 'moment';
const moment = _moment;
/**
 * Public Personal Details Page
 * @export
 * @class PublicPersonalDetailsPage
 * @implements {OnInit}
 */
@Component({
    selector: 'app-public-personal-details',
    templateUrl: './public-personal-details.page.html',
    styleUrls: ['./public-personal-details.page.scss'],
})
export class PublicPersonalDetailsPage implements OnInit {

    /**
     * Local property for user profile details value from API
     * @type {*}
     * @memberof PublicPersonalDetailsPage
     */
    public list: any;

    /**
     * Local property for personal details value from API
     * @type {*}
     * @memberof PublicPersonalDetailsPage
     */
    public personalItem: any;

    /**
     * Local property for personal name value from API
     * @type {string}
     * @memberof PublicPersonalDetailsPage
     */
    public personalName: string;

    /**
     * Local property for array of favourite name card list
     * @memberof PublicPersonalDetailsPage
     */
    public setAsFavourite = [];

    /**
     * Local property for show colored star icon on clicked star 
     * @type {boolean}
     * @memberof PublicPersonalDetailsPage
     */
    public numOfArray: boolean = false;
    public showSpinner: boolean = true;
    private _guid: string;
    private _subscription: Subscription = new Subscription();

    get personalList() {
        return this.list;
    }

    /**
     *Creates an instance of PublicPersonalDetailsPage.
     * @param {APIService} apiService
     * @param {ActivatedRoute} route
     * @param {Router} router
     * @memberof PublicPersonalDetailsPage
     */
    constructor(private apiService: APIService, private route: ActivatedRoute,
        public router: Router) {
        route.queryParams
            .subscribe((params) => {
                this._guid = params.GUID;
                this._subscription = this.apiService.get_user_profile_details(this._guid).subscribe(
                    (data: any[]) => {
                        this.showSpinner = false;
                        this.list = data;
                        this.list.personalDetail.dob = moment(this.list.personalDetail.dob).format('DD-MM-YYYY');
                    },
                    error => {
                        if (error.status === 401) {
                            window.location.href = '/login';
                        }
                    },
                );
            });
    }


    /**
     * Initial method
     * @memberof PublicPersonalDetailsPage
     */
    ngOnInit() {
        this._subscription = this.apiService.get_personal_details().subscribe(
            (data: any[]) => {
                this.personalItem = data;
                this.personalName = this.personalItem.employeeName;
            },
            error => {
                if (error) {
                    window.location.href = '/login';
                }
            }
        );
    }

    /**
     * Destroy subscription
     * @memberof PublicPersonalDetailsPage
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    /**
     * show or hide colored star icon
     * @memberof PublicPersonalDetailsPage
     */
    clickAsFavourite() {
        if (this.numOfArray) {
            this.numOfArray = false;
        } else { this.numOfArray = true; }
        // this.numOfArray = true;
    };

}
